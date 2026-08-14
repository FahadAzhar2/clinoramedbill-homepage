import type { Metadata } from "next";
import { Layers3, Sparkles, Stethoscope } from "lucide-react";
import SiteConversionFooter from "../components/SiteConversionFooter";
import SiteHeader from "../components/SiteHeader";
import { pageFaqs } from "../content/faqs";
import SpecialtyDirectory from "./SpecialtyDirectory";
import InteriorHero from "../components/InteriorHero";

export const metadata: Metadata = {
  title: "Medical Billing Specialties | ClinoraMedBill",
  description: "Specialty-aware medical billing and revenue cycle management for 43 healthcare specialties across the United States.",
};

export default function SpecialtiesPage() {
  return (
    <main id="main-content" className="specialties-page">
      <a className="skip-link" href="#specialties-content">Skip to medical specialties</a>
      <SiteHeader active="specialties" />

      <InteriorHero
        id="specialties-content"
        titleId="specialties-title"
        eyebrow="Specialty-aware revenue operations"
        title={<>Your specialty has details. <em>So should your billing.</em></>}
        description="ClinoraMedBill adapts coding, claims, denial management, and reporting to the clinical and payer realities of your practice."
        imageSrc="/media/hero-mapped/08-specialties-hero-desktop.png"
        mobileImageSrc="/media/hero-mapped/08-specialties-hero-mobile.png"
        imageAlt="Healthcare specialists reviewing clinical information together"
        imagePosition="67% 48%"
        ctaHref="#specialty-directory"
        ctaLabel="Explore specialties"
        badgeIcon={Stethoscope}
        badgeEyebrow="43 specialties supported"
        badgeText="Specialty-aware workflows. Complete revenue coverage."
      />

      <section className="specialty-value-strip">
        <div className="container">
          <span><Sparkles aria-hidden="true" /><strong>Purpose-built, not generic.</strong> Workflows shaped around specialty-specific details.</span>
          <span><Layers3 aria-hidden="true" /><strong>Complete revenue coverage.</strong> From eligibility through payment and follow-up.</span>
        </div>
      </section>

      <section id="specialty-directory" className="specialty-directory-section section">
        <div className="container">
          <div className="specialty-page-heading">
            <span className="eyebrow">Medical specialties we serve</span>
            <h2>Find the billing support<br />your practice needs.</h2>
            <p>Explore the specialties supported by ClinoraMedBill’s billing, coding, and revenue cycle teams.</p>
          </div>
          <SpecialtyDirectory />
        </div>
      </section>

      <SiteConversionFooter faqs={pageFaqs.specialties} faqEyebrow="Specialty billing answers" />
    </main>
  );
}
