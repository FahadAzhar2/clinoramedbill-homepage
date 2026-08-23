"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Plain anchors avoid the current Vinext Link shim issue. */
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { medicalSpecialties } from "../specialties/specialties";
import { useCmsBundle } from "../lib/useCmsBundle";
import type { FaqItem } from "../content/faqs";
import MotionReveal from "./MotionReveal";
import SiteFooter from "./SiteFooter";
import { submitEnquiryForm, type EnquiryStatus } from "../lib/enquiry";

const specialties = medicalSpecialties.map((specialty) => specialty.name);
type SiteConversionFooterProps = {
  faqs?: readonly FaqItem[];
  faqEyebrow?: string;
  faqTitle?: string;
  faqDescription?: string;
  faqId?: string;
  showAudit?: boolean;
};

export default function SiteConversionFooter({
  faqs,
  faqEyebrow,
  faqTitle,
  faqDescription,
  faqId,
  showAudit = true,
}: SiteConversionFooterProps) {
  const cms = useCmsBundle();
  const [enquiryStatus, setEnquiryStatus] = useState<EnquiryStatus>("idle");
  const cmsHome = cms?.homepage;

  const submitAudit = async (event: FormEvent<HTMLFormElement>) => {
    setEnquiryStatus("sending");
    try {
      await submitEnquiryForm(event, "billing-audit");
      setEnquiryStatus("success");
    } catch {
      setEnquiryStatus("error");
    }
  };

  const auditSection = (
      <section id="audit" className="section audit-section">
        <div className="container audit-shell" data-motion>
          <div className="audit-copy">
            <span className="eyebrow eyebrow-light">{cmsHome?.auditEyebrow ?? "Complimentary billing audit"}</span>
            <h2>{cmsHome?.auditTitle ?? "Stop leaving revenue on the table."}</h2>
            <p>{cmsHome?.auditDescription ?? "See exactly where your practice could be recovering more. No contracts. No obligations. Just clarity."}</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Review of billing performance indicators</li>
              <li><CheckCircle2 aria-hidden="true" /> Identification of preventable revenue leakage</li>
              <li><CheckCircle2 aria-hidden="true" /> Clear, practical next-step recommendations</li>
            </ul>
          </div>
          <form className="audit-form" onSubmit={submitAudit}>
            <div className="form-heading"><span>Free audit request</span><p>Fields marked with an asterisk (*) are required.</p></div>
            <div className="form-row">
              <label>Full name *<input name="name" type="text" autoComplete="name" placeholder="Your full name" maxLength={120} required /></label>
              <label>Practice name *<input name="practice" type="text" autoComplete="organization" placeholder="Practice name" maxLength={160} required /></label>
            </div>
            <div className="form-row">
              <label>Work email *<input name="email" type="email" autoComplete="email" placeholder="you@practice.com" maxLength={200} required /></label>
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={40} /></label>
            </div>
            <label>
              Practice specialty *
              <select name="specialty" defaultValue="" required>
                <option value="" disabled>Select a specialty</option>
                {specialties.map((specialty) => <option value={specialty} key={specialty}>{specialty}</option>)}
                <option value="Other">Other</option>
              </select>
            </label>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1 }} />
            <button className="button button-large button-form" type="submit" disabled={enquiryStatus === "sending"}>{enquiryStatus === "sending" ? "Sending…" : "Request my free audit"} <ArrowRight aria-hidden="true" size={18} /></button>
            <p className="form-privacy"><LockKeyhole aria-hidden="true" size={14} /> Your information is used only to respond to this request. <a href="/privacy-policy">Privacy Policy</a></p>
            <div className="form-status" role="status" aria-live="polite">{enquiryStatus === "success" ? "Thank you. Your request has been emailed to our team." : enquiryStatus === "error" ? "We could not send your request. Please email info@clinoramedbill.com." : ""}</div>
          </form>
        </div>
      </section>
  );

  return (
    <>
      <MotionReveal />
      {showAudit ? auditSection : null}

      <SiteFooter
        faqs={faqs}
        faqEyebrow={faqEyebrow}
        faqTitle={faqTitle}
        faqDescription={faqDescription}
        faqId={faqId}
      />
    </>
  );
}
