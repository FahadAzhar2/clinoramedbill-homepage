const MAX_BODY_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimit = new Map<string, number[]>();

const requiredFields = {
  "hero-audit": ["name", "email"],
  "billing-audit": ["name", "practice", "email", "specialty"],
  "ehr-consultation": ["name", "email"],
  contact: ["name", "practice", "email", "message"],
} as const;

type EnquiryType = keyof typeof requiredFields;
type EnquiryFields = Record<string, string>;

const allowedFields = new Set([
  "name",
  "practice",
  "email",
  "phone",
  "specialty",
  "collections",
  "ar",
  "message",
  "ehr",
  "website",
]);

const fieldLabels: Record<string, string> = {
  name: "Full name",
  practice: "Practice name",
  email: "Work email",
  phone: "Phone number",
  specialty: "Practice specialty",
  collections: "Monthly collections",
  ar: "Total A/R",
  message: "How can we help?",
  ehr: "EHR/EMR system",
};

const formLabels: Record<EnquiryType, string> = {
  "hero-audit": "Homepage quick audit",
  "billing-audit": "Free billing audit",
  "ehr-consultation": "EHR/EMR consultation",
  contact: "Contact request",
};

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function cleanFields(input: unknown): EnquiryFields {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  return Object.fromEntries(
    Object.entries(input)
      .filter(([key, value]) => allowedFields.has(key) && typeof value === "string")
      .map(([key, value]) => [key, (value as string).trim().slice(0, key === "message" ? 2_000 : 200)]),
  );
}

function isRateLimited(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const key = forwarded || "unknown";
  const now = Date.now();
  const recent = (rateLimit.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  recent.push(now);
  rateLimit.set(key, recent);
  return false;
}

const enquiryFunction = {
  async fetch(request: Request) {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const origin = request.headers.get("origin");
    if (origin && origin !== new URL(request.url).origin) return json({ error: "Invalid origin" }, 403);

    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) return json({ error: "Request too large" }, 413);
    if (isRateLimited(request)) return json({ error: "Too many requests. Please try again later." }, 429);

    let payload: { type?: unknown; page?: unknown; fields?: unknown };
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Invalid request" }, 400);
    }

    if (typeof payload.type !== "string" || !(payload.type in requiredFields)) {
      return json({ error: "Invalid form type" }, 400);
    }

    const type = payload.type as EnquiryType;
    const fields = cleanFields(payload.fields);
    if (fields.website) return json({ ok: true });

    const missing = requiredFields[type].filter((field) => !fields[field]);
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email || "");
    if (missing.length || !emailIsValid) return json({ error: "Please complete all required fields." }, 400);

    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.ENQUIRY_FROM_EMAIL;
    const to = process.env.ENQUIRY_TO_EMAIL || "info@clinoramedbill.com";
    if (!apiKey || !from) return json({ error: "Email delivery is not configured." }, 503);

    const page = typeof payload.page === "string" ? payload.page.slice(0, 200) : "/";
    const lines = [
      `New ${formLabels[type]} submission`,
      "",
      ...Object.entries(fields)
        .filter(([key, value]) => key !== "website" && value)
        .map(([key, value]) => `${fieldLabels[key] || key}: ${value}`),
      "",
      `Submitted from: ${page}`,
      `Received: ${new Date().toISOString()}`,
    ];

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email,
        subject: `[ClinoraMedBill] ${formLabels[type]} — ${fields.name}`,
        text: lines.join("\n"),
      }),
    });

    if (!resendResponse.ok) return json({ error: "Email delivery failed." }, 502);
    return json({ ok: true });
  },
};

export default enquiryFunction;
