"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteConversionFooter from "../components/SiteConversionFooter";
import { pageFaqs } from "../content/faqs";
import MotionReveal from "../components/MotionReveal";
import InteriorHero from "../components/InteriorHero";
import MobileCarousel from "../components/MobileCarousel";
import { submitEnquiryForm, type EnquiryStatus } from "../lib/enquiry";

export default function ContactPage() {
  const [enquiryStatus, setEnquiryStatus] = useState<EnquiryStatus>("idle");
  async function submit(event: FormEvent<HTMLFormElement>) {
    setEnquiryStatus("sending");
    try {
      await submitEnquiryForm(event, "contact");
      setEnquiryStatus("success");
    } catch {
      setEnquiryStatus("error");
    }
  }

  return (
    <main id="main-content" className="contact-page contact-redesign-page">
      <MotionReveal />
      <SiteHeader active="about" />

      <InteriorHero
        titleId="contact-title"
        eyebrow="Let’s get connected"
        title="Tell us what your practice needs next."
        description="Share your current billing challenges and the support you’re looking for. Our team will review your request and make the next step clear."
        imageSrc="/media/hero-mapped/12-contact-us-hero-desktop.png"
        imageAlt="Physician using a laptop in a medical office"
        imagePosition="68% center"
        ctaHref="#contact-form"
        ctaLabel="Start a conversation"
        badgeIcon={Phone}
        badgeEyebrow="ClinoraMedBill team"
        badgeText="A clear next step for your practice."
      />

      <section id="contact-form" className="contact-form-section">
        <div className="contact-form-shell">
          <form className="contact-redesign-form" onSubmit={submit} data-motion>
            <div><span>Start a conversation</span><h2>Let’s talk about your revenue cycle.</h2><p>Fields marked with an asterisk (*) are required.</p></div>
            <div className="contact-form-row"><label>Full name *<input name="name" autoComplete="name" placeholder="Dr. Sarah Mitchell" maxLength={120} required /></label><label>Practice name *<input name="practice" autoComplete="organization" placeholder="North Austin Family Medicine" maxLength={160} required /></label></div>
            <div className="contact-form-row"><label>Work email *<input type="email" name="email" autoComplete="email" placeholder="sarah@practice.com" maxLength={200} required /></label><label>Phone number<input type="tel" name="phone" autoComplete="tel" placeholder="(512) 555-0148" maxLength={40} /></label></div>
            <div className="contact-form-row"><label>Monthly collections<select name="collections" defaultValue=""><option value="">Select range</option><option>Under $50K</option><option>$50K–$150K</option><option>$150K–$500K</option><option>$500K+</option></select></label><label>Total A/R<input name="ar" placeholder="e.g. $185,000" maxLength={80} /></label></div>
            <label>How can we help? *<textarea name="message" rows={4} placeholder="Tell us about your current billing workflow, denial volume, aging A/R, or the support your team needs." maxLength={2000} required /></label>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1 }} />
            <button className="button button-large" type="submit" disabled={enquiryStatus === "sending"}>{enquiryStatus === "sending" ? "Sending…" : "Send request"} <ArrowRight aria-hidden="true" size={18} /></button>
            <p className="contact-form-status" role="status" aria-live="polite">{enquiryStatus === "success" ? "Thank you. Your request has been emailed to our team." : enquiryStatus === "error" ? "We could not send your request. Please email info@clinoramedbill.com." : ""}</p>
          </form>
        </div>
      </section>

      <section className="section contact-info-section">
        <div className="container contact-info-heading" data-motion><span className="eyebrow">Contact ClinoraMedBill</span><h2>Reach our team directly.</h2></div>
        <MobileCarousel id="contact-options-carousel" label="Ways to contact ClinoraMedBill" className="container contact-info-grid">
          <a href="tel:+19453350950" data-motion><span><Phone aria-hidden="true" /></span><small>Call us</small><strong>+1 (945) 335-0950</strong></a>
          <a href="mailto:info@clinoramedbill.com" data-motion><span><Mail aria-hidden="true" /></span><small>Email us</small><strong>info@clinoramedbill.com</strong></a>
          <div data-motion><span><MapPin aria-hidden="true" /></span><small>Visit or write</small><strong>5900 Balcones Dr, STE 20866, Austin, TX 78731</strong></div>
          <div data-motion><span><Clock3 aria-hidden="true" /></span><small>Response time</small><strong>Within one business day</strong></div>
        </MobileCarousel>
      </section>

      <section id="location" className="contact-map-section" aria-label="ClinoraMedBill location">
        <div className="contact-map-shell" data-motion>
          <div className="contact-map-details">
            <div className="contact-map-heading"><span className="eyebrow eyebrow-light">Austin, Texas</span><h2>Nationwide service.<br />A clear place to start.</h2></div>
            <address><MapPin aria-hidden="true" /><span><small>ClinoraMedBill office</small><strong>5900 Balcones Dr, STE 20866<br />Austin, TX 78731</strong></span></address>
          </div>
          <div className="contact-map-frame"><iframe title="ClinoraMedBill office location on Google Maps" src="https://www.google.com/maps?q=5900%20Balcones%20Dr%2C%20Austin%2C%20TX%2078731&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
        </div>
      </section>

      <SiteConversionFooter faqs={pageFaqs["contact-us"]} faqEyebrow="Contact answers" showAudit={false} />
    </main>
  );
}
