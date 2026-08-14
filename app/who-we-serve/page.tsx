import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, UsersRound } from "lucide-react";
import SiteConversionFooter from "../components/SiteConversionFooter";
import SiteHeader from "../components/SiteHeader";
import { pageFaqs } from "../content/faqs";
import WhoWeServeDirectory from "./WhoWeServeDirectory";
import { audiences } from "./audiences";
import InteriorHero from "../components/InteriorHero";
import MobileCarousel from "../components/MobileCarousel";

export const metadata: Metadata = {
  title: "Who We Serve | ClinoraMedBill",
  description: "Medical billing and revenue cycle management for medical practices, hospitals, clinics, ASCs, home health organizations, and DME suppliers.",
};

export default function WhoWeServePage() {
  return (
    <main id="main-content" className="who-serve-page">
      <a className="skip-link" href="#who-serve-content">Skip to who we serve</a>

      <SiteHeader active="who-we-serve" />

      <InteriorHero
        id="who-serve-content"
        titleId="who-serve-title"
        eyebrow="Revenue operations for real healthcare teams"
        title={<>Built around the way <em>you deliver care.</em></>}
        description="One disciplined billing operation, adapted to the structure, specialty, scale, and patient experience of your organization."
        imageSrc="/media/hero-mapped/09-who-we-serve-hero-desktop.png"
        mobileImageSrc="/media/hero-mapped/09-who-we-serve-hero-mobile.png"
        imageAlt={audiences[0].alt}
        imagePosition="64% center"
        ctaHref="#organizations"
        ctaLabel="Find your organization"
        badgeIcon={UsersRound}
        badgeEyebrow="ClinoraMedBill partnership"
        badgeText="One accountable team across every revenue touchpoint."
      />

      <section id="organizations" className="section who-serve-directory-section">
        <div className="container">
          <div className="who-serve-heading centered">
            <span className="eyebrow">Who we serve</span>
            <h2>Revenue support that fits<br />your care environment.</h2>
            <p>Select an organization to see how ClinoraMedBill adapts billing, collections, and communication to the way your team works.</p>
          </div>
          <WhoWeServeDirectory />
        </div>
      </section>

      <section className="who-serve-trust-section">
        <MobileCarousel id="who-we-serve-trust-carousel" label="Why healthcare organizations trust ClinoraMedBill" className="container who-serve-trust-grid">
          <article><span>01</span><UsersRound aria-hidden="true" /><h2>Scale-aware operations</h2><p>Support that works for independent teams, multi-site groups, and health systems.</p></article>
          <article><span>02</span><ShieldCheck aria-hidden="true" /><h2>Secure information handling</h2><p>Controlled access and disciplined workflows built for sensitive healthcare information.</p></article>
          <article><span>03</span><CheckCircle2 aria-hidden="true" /><h2>Clear ownership</h2><p>Named people, visible reporting, and practical next actions—not a black-box billing vendor.</p></article>
        </MobileCarousel>
      </section>

      <SiteConversionFooter faqs={pageFaqs["who-we-serve"]} faqEyebrow="Who we serve answers" />
    </main>
  );
}
