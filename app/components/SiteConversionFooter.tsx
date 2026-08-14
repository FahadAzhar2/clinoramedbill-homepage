"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Plain anchors avoid the current Vinext Link shim issue. */
import { ArrowRight, CheckCircle2, LockKeyhole, Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { medicalSpecialties } from "../specialties/specialties";
import { useCmsBundle } from "../lib/useCmsBundle";
import type { FaqItem } from "../content/faqs";
import MotionReveal from "./MotionReveal";
import FooterSocialLinks from "./FooterSocialLinks";
import { submitEnquiryForm, type EnquiryStatus } from "../lib/enquiry";

const specialties = medicalSpecialties.map((specialty) => specialty.name);
const footerSpecialties = ["Family Medicine", "Internal Medicine", "Pediatrics", "Emergency Medicine", "Cardiology", "Orthopedic Surgery", "Obstetrics & Gynecology (OB/GYN)"];

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
  faqEyebrow = "Answers before action",
  faqTitle = "Frequently asked questions",
  faqDescription = "Clear answers to the questions healthcare teams ask most often.",
  faqId,
  showAudit = true,
}: SiteConversionFooterProps) {
  const cms = useCmsBundle();
  const [enquiryStatus, setEnquiryStatus] = useState<EnquiryStatus>("idle");
  const cmsHome = cms?.homepage;
  const cmsSettings = cms?.settings;

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

      <footer id="contact" className="site-footer">
        {faqs?.length ? (
          <div id={faqId} className="container footer-faq" data-reveal>
            <div className="footer-faq-heading">
              <span className="eyebrow eyebrow-light">{faqEyebrow}</span>
              <h2>{faqTitle}</h2>
              <p>{faqDescription}</p>
            </div>
            <div className="footer-faq-list">
              {faqs.map((faq, index) => (
                <details className={index >= 4 ? "faq-mobile-extra" : undefined} key={faq.question}>
                  <summary>{faq.question}<span aria-hidden="true" /></summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
              <a className="mobile-faq-more" href="/faqs">View all frequently asked questions <ArrowRight aria-hidden="true" size={16} /></a>
            </div>
          </div>
        ) : null}
        <div className="container footer-top">
          <div className="footer-brand">
            <img src="/brand/clinora-primary.svg" alt="ClinoraMedBill" width="348" height="180" />
            <p>{cmsSettings?.footerDescription ?? "Clinora Medbill is a leading healthcare revenue cycle, medical billing and coding company based in Texas, offering nationwide services."}</p>
            <a href="mailto:info@clinoramedbill.com" className="button button-light">Request a free billing audit <ArrowRight aria-hidden="true" size={16} /></a>
            <FooterSocialLinks />
          </div>
          <div className="footer-column"><h2>Services</h2><a href="/services/revenue-cycle-management">Revenue Cycle Management</a><a href="/services/medical-billing">Medical Billing</a><a href="/services/medical-coding">Medical Coding</a><a href="/services/ar-management">AR Management</a><a href="/services/medical-billing-audits">Medical Billing Audits</a><a href="/services/provider-credentialing-enrollment">Provider Credentialing &amp; Enrollment</a><a href="/services/virtual-front-desk-services">Virtual Front Desk Services</a></div>
          <div className="footer-column"><h2>Specialties</h2>{footerSpecialties.map((specialty) => <a href="/specialties" key={specialty}>{specialty}</a>)}<a href="/specialties">All specialties</a></div>
          <div className="footer-column"><h2>Company</h2><a href="/about-us">About Clinora</a><a href="/who-we-serve">Who We Serve</a><a href="/#process">Our process</a><a href="/nationwide-solutions">Nationwide Solutions</a><a href="/compliance">Security &amp; Compliance</a><a href="mailto:info@clinoramedbill.com">Free Billing Audit</a></div>
        </div>
        <div className="container footer-contact">
          <a href={`tel:${(cmsSettings?.phone ?? "+1 (945) 335-0950").replace(/[^+\d]/g, "")}`}><Phone aria-hidden="true" /><span>{cmsSettings?.phone ?? "+1 (945) 335-0950"}</span></a>
          <a href={`mailto:${cmsSettings?.email ?? "info@clinoramedbill.com"}`}><Mail aria-hidden="true" /><span>{cmsSettings?.email ?? "info@clinoramedbill.com"}</span></a>
          <div><MapPin aria-hidden="true" /><span>{cmsSettings?.address ?? "5900 Balcones Dr, STE 20866, Austin, TX 78731"}</span></div>
        </div>
        <div className="container footer-bottom"><p>© 2026 ClinoraMedBill. All rights reserved.</p><div><a href="/privacy-policy">Privacy Policy</a><a href="#contact">Terms</a><a href="/compliance">Security &amp; Compliance</a></div></div>
        <div className="footer-wordmark" aria-hidden="true">ClinoraMedBill</div>
      </footer>
    </>
  );
}
