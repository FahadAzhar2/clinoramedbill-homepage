import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the privacy policy page", async () => {
  const response = await render("/privacy-policy/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Privacy Policy \| ClinoraMedBill<\/title>/i);
  assert.match(html, /Information We Collect/i);
  assert.match(html, /Data Protection and Security/i);
  assert.match(html, /Children’s Privacy/i);
  assert.match(html, /5900 Balcones Dr, Austin, TX 78731/i);
});

test("server-renders the compliance page", async () => {
  const response = await render("/compliance/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Compliance \| ClinoraMedBill<\/title>/i);
  assert.match(html, /HIPAA Compliance/i);
  assert.match(html, /OIG Compliance/i);
  assert.match(html, /False Claims Act Compliance/i);
  assert.match(html, /HITECH Act Compliance/i);
  assert.match(html, /PCI-DSS Compliance/i);
  assert.match(html, /Coding Compliance/i);
  assert.match(html, /Employee Training and Data Privacy Protocols/i);
});

test("server-renders the nationwide solutions directory", async () => {
  const response = await render("/nationwide-solutions/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Nationwide Medical Billing Services \| ClinoraMedBill/i);
  assert.match(html, /Medical billing,/i);
  assert.match(html, /Medical billing services nationwide/i);
  assert.match(html, /Texas/i);
  assert.match(html, /Alabama/i);
  assert.match(html, /Search a state, capital, or region/i);
  assert.match(html, /Stop leaving revenue on the table/i);
  assert.match(html, /Frequently asked questions/i);
});

test("server-renders the medical specialties directory", async () => {
  const response = await render("/specialties/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Medical Billing Specialties \| ClinoraMedBill/i);
  assert.match(html, /Your specialty has details/i);
  assert.match(html, /Family Medicine/i);
  assert.match(html, /Hematology/i);
  assert.match(html, /Search a medical specialty/i);
  assert.match(html, /View all 43 specialties/i);
  assert.match(html, /Stop leaving revenue on the table/i);
  assert.match(html, /Frequently asked questions/i);
});

test("server-renders the who we serve experience", async () => {
  const response = await render("/who-we-serve/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Who We Serve \| ClinoraMedBill/i);
  assert.match(html, /Built around the way/i);
  assert.match(html, /Physician &amp; Medical Practices/i);
  assert.match(html, /Hospitals &amp; Health Systems/i);
  assert.match(html, /Clinics &amp; Urgent Care Centers/i);
  assert.match(html, /Behavioral &amp; Mental Health Practices/i);
  assert.match(html, /Ambulatory Surgery Centers/i);
  assert.match(html, /Home Health &amp; Nursing Services/i);
  assert.match(html, /DME Suppliers/i);
  assert.match(html, /Stop leaving revenue on the table/i);
  assert.match(html, /Frequently asked questions/i);
});

test("server-renders the ClinoraMedBill homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>ClinoraMedBill \| Medical Billing &amp; Revenue Cycle Management<\/title>/i,
  );
  assert.match(html, /Medical billing, managed with clarity/i);
  assert.match(html, /Free billing audit/i);
  assert.match(html, /A Trusted Medical Billing Partner for Healthcare Providers/i);
  assert.match(html, /Benefits of Outsourcing Medical Billing/i);
  assert.match(html, /Faster Payment/i);
  assert.doesNotMatch(html, /From visit to payment, nothing gets lost/i);
  assert.doesNotMatch(html, /Live revenue operations/i);
  assert.match(html, /Specialties we serve/i);
  assert.match(html, /Who we serve/i);
  assert.match(html, /Provider Credentialing &amp; Enrollment/i);
  assert.match(html, /Virtual Front Desk Services/i);
  assert.match(html, /Medical billing support, wherever your practice operates/i);
  assert.match(html, /Google Reviews/i);
  assert.match(html, /google\.com\/maps\/search/i);
  assert.match(html, /google-g\.png/i);
  assert.match(html, /Oral &amp; Maxillofacial Surgery/i);
  assert.match(html, /Otolaryngology \(ENT\)/i);
  assert.match(html, /New Jersey/i);
  assert.match(html, /Illinois/i);
  assert.match(html, /Florida/i);
  assert.match(html, /medical-billing-workflow-4k\.jpg/i);
  assert.match(html, /about-hero-magnific-4k\.jpg/i);
  assert.match(html, /href="\/nationwide-solutions"/i);
  assert.match(html, /href="\/blogs\/denial-strategy-before-submission"/i);
  assert.match(html, /href="\/blogs\/what-clean-claim-rate-tells-you"/i);
  assert.match(html, /href="\/blogs\/read-ar-aging-earlier"/i);
  assert.match(html, /href="\/specialties#specialty-directory"/i);
  assert.doesNotMatch(html, /class="blog-card-link" href="#audit"/i);
  assert.match(html, /Security &amp; Compliance/i);
  assert.doesNotMatch(html, /name="hero-practice"/i);
  assert.doesNotMatch(html, /Pause background motion/i);
  assert.doesNotMatch(html, /Accessibility Statement/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("routes enquiry forms through the validated email endpoint", async () => {
  const [home, contact, footer, endpoint] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact-us/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteConversionFooter.tsx", import.meta.url), "utf8"),
    readFile(new URL("../api/enquiry.ts", import.meta.url), "utf8"),
  ]);

  assert.match(home, /submitEnquiryForm\(event, type\)/);
  assert.match(contact, /submitEnquiryForm\(event, "contact"\)/);
  assert.match(footer, /submitEnquiryForm\(event, "billing-audit"\)/);
  assert.match(endpoint, /ENQUIRY_TO_EMAIL \|\| "info@clinoramedbill\.com"/);
  assert.match(endpoint, /https:\/\/api\.resend\.com\/emails/);
  assert.match(endpoint, /requiredFields/);
  assert.match(endpoint, /Invalid origin/);
  assert.doesNotMatch(`${home}\n${contact}\n${footer}`, /prototype request has been received/i);
});

test("keeps state exploration CTAs on relevant state content", async () => {
  const [response, directorySource] = await Promise.all([
    render("/nationwide-solutions/"),
    readFile(new URL("../app/nationwide-solutions/StateDirectory.tsx", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /href="#texas"/i);
  assert.match(directorySource, /id=\{state\.slug\}/);
  assert.match(directorySource, /href="\/contact-us#contact-form"/i);
});

test("keeps core accessibility and project metadata in source", async () => {
  const [page, header, layout, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteHeader.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="skip-link"/);
  assert.match(header, /aria-label="Primary navigation"/);
  assert.match(page, /aria-live="polite"/);
  assert.match(page, /<label>/);
  assert.match(page, /A Trusted Medical Billing Partner for Healthcare Providers/);
  assert.match(page, /Benefits of Outsourcing Medical Billing/);
  assert.match(page, /process-simple-timeline/);
  assert.match(page, /<details key=\{benefit\.title\}/);
  assert.match(page, /IntersectionObserver/);
  assert.match(layout, /ClinoraMedBill \| Medical Billing & Revenue Cycle Management/);
  assert.match(layout, /openGraph:/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(packageJson, /"lint":\s*"eslint/);
  assert.doesNotMatch(page, /_sites-preview|SkeletonPreview/);
});

test("ships 128 page-specific FAQs across 16 mapped pages", async () => {
  const source = await readFile(new URL("../app/content/faqs.ts", import.meta.url), "utf8");
  const pageKeys = [...source.matchAll(/^  "([^"]+)": \[$/gm)].map((match) => match[1]);
  const questions = source.match(/^      "question": .+$/gm) ?? [];

  assert.equal(pageKeys.length, 16);
  assert.equal(new Set(pageKeys).size, 16);
  assert.equal(questions.length, 128);
});

test("places every inner-page FAQ inside the shared footer", async () => {
  const routes = [
    "/about-us/",
    "/blogs/",
    "/faqs/",
    "/contact-us/",
    "/specialties/",
    "/who-we-serve/",
    "/nationwide-solutions/",
    "/compliance/",
    "/services/revenue-cycle-management/",
    "/services/medical-billing/",
    "/services/medical-coding/",
    "/services/ar-management/",
    "/services/medical-billing-audits/",
    "/services/provider-credentialing-enrollment/",
    "/services/virtual-front-desk-services/",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    assert.equal((html.match(/class="container footer-faq"/g) ?? []).length, 1, route);
    assert.doesNotMatch(html, /page-faq-section/, route);
    assert.match(
      html,
      /<footer[^>]*class="site-footer"[^>]*>[\s\S]*class="container footer-faq"[\s\S]*class="container footer-top"/i,
      route,
    );
  }
});
