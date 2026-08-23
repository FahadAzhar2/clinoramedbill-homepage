import type { FormEvent } from "react";

export type EnquiryType = "hero-audit" | "billing-audit" | "ehr-consultation" | "contact";
export type EnquiryStatus = "idle" | "sending" | "success" | "error";

export async function submitEnquiryForm(event: FormEvent<HTMLFormElement>, type: EnquiryType) {
  event.preventDefault();
  const form = event.currentTarget;
  const fields = Object.fromEntries(
    Array.from(new FormData(form).entries(), ([key, value]) => [key, typeof value === "string" ? value.trim() : ""]),
  );

  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type,
      page: window.location.pathname,
      fields,
    }),
  });

  if (!response.ok) {
    throw new Error("Your request could not be sent. Please email info@clinoramedbill.com.");
  }

  form.reset();
}
