"use client";

/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Plain anchors preserve compatibility with the Vinext runtime. */
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { FaqItem } from "../content/faqs";
import FooterSocialLinks from "./FooterSocialLinks";

const footerSpecialties = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Emergency Medicine",
  "Cardiology",
  "Orthopedic Surgery",
  "Obstetrics & Gynecology (OB/GYN)",
];

type SiteFooterProps = {
  faqs?: readonly FaqItem[];
  faqEyebrow?: string;
  faqTitle?: string;
  faqDescription?: string;
  faqId?: string;
};

export default function SiteFooter({
  faqs,
  faqEyebrow = "FAQ",
  faqTitle = "Questions providers ask before partnering",
  faqDescription = "Still have a question? Talk to our team and we'll walk through your specific situation, no pressure and no patient data needed.",
  faqId,
}: SiteFooterProps) {

  return (
    <footer id="contact" className="site-footer">
      {faqs?.length ? (
        <div id={faqId} className="container footer-faq" data-reveal>
          <div className="footer-faq-heading">
            <span className="eyebrow eyebrow-light">{faqEyebrow}</span>
            <h2>{faqTitle}</h2>
            <div className="footer-faq-prompt">
              <p>{faqDescription}</p>
              <a className="button" href="/contact-us">Get a consultation <ArrowRight aria-hidden="true" size={16} /></a>
            </div>
          </div>
          <div className="footer-faq-list">
            {faqs.map((faq, index) => (
              <details className={index >= 4 ? "faq-mobile-extra" : undefined} key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true" />
                </summary>
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
          <p>Clinora Medbill is a leading healthcare revenue cycle, medical billing and coding company based in Texas, offering nationwide services.</p>
          <a href="mailto:info@clinoramedbill.com" className="button button-light">Request a free billing audit <ArrowRight aria-hidden="true" size={16} /></a>
          <FooterSocialLinks />
        </div>
        <div className="footer-column">
          <h2>Services</h2>
          <a href="/services/revenue-cycle-management">Revenue Cycle Management</a>
          <a href="/services/medical-billing">Medical Billing</a>
          <a href="/services/medical-coding">Medical Coding</a>
          <a href="/services/ar-management">AR Management</a>
          <a href="/services/medical-billing-audits">Medical Billing Audits</a>
          <a href="/services/provider-credentialing-enrollment">Provider Credentialing &amp; Enrollment</a>
          <a href="/services/virtual-front-desk-services">Virtual Front Desk Services</a>
        </div>
        <div className="footer-column">
          <h2>Specialties</h2>
          {footerSpecialties.map((specialty) => <a href="/specialties" key={specialty}>{specialty}</a>)}
          <a href="/specialties">All specialties</a>
        </div>
        <div className="footer-column">
          <h2>Company</h2>
          <a href="/about-us">About Clinora</a>
          <a href="/#process">Our process</a>
          <a href="/who-we-serve">Who We Serve</a>
          <a href="/nationwide-solutions">Nationwide Solutions</a>
          <a href="/compliance">Security &amp; Compliance</a>
          <a href="/ehr-software">EHR/EMR Softwares</a>
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>

      <div className="container footer-contact">
        <a href="tel:+19453350950"><Phone aria-hidden="true" /> <span>+1 (945) 335-0950</span></a>
        <a href="mailto:info@clinoramedbill.com"><Mail aria-hidden="true" /> <span>info@clinoramedbill.com</span></a>
        <div><MapPin aria-hidden="true" /> <span>5900 Balcones Dr, STE 20866, Austin, TX 78731</span></div>
      </div>
      <div className="container footer-bottom">
        <p>© 2026 ClinoraMedBill. All rights reserved.</p>
        <div>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="#contact">Terms</a>
          <a href="/compliance">Security &amp; Compliance</a>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">ClinoraMedBill</div>
    </footer>
  );
}
