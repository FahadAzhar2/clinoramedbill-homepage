/* eslint-disable @next/next/no-img-element -- Local photos are responsive CSS crops. */
import type { Metadata } from "next";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import SiteConversionFooter from "../components/SiteConversionFooter";
import SiteHeader from "../components/SiteHeader";
import { pageFaqs } from "../content/faqs";
import StateDirectory from "./StateDirectory";
import { stateSolutions } from "./states";
import InteriorHero from "../components/InteriorHero";
import MobileCarousel from "../components/MobileCarousel";

export const metadata: Metadata = {
  title: "Nationwide Medical Billing Services | ClinoraMedBill",
  description: "Specialty-aware medical billing and revenue cycle management for healthcare providers across all 50 U.S. states.",
};

const featuredStates = ["texas", "california", "florida", "new-york"]
  .map((slug) => stateSolutions.find((state) => state.slug === slug))
  .filter((state): state is (typeof stateSolutions)[number] => Boolean(state));

export default function NationwideSolutionsPage() {
  return (
    <main id="main-content" className="nationwide-page">
      <a className="skip-link" href="#nationwide-content">Skip to nationwide solutions</a>

      <SiteHeader active="nationwide" />

      <InteriorHero
        id="nationwide-content"
        titleId="nationwide-title"
        eyebrow="Medical billing services nationwide"
        title={<>Medical billing, <em>nationwide.</em></>}
        description="Specialty-aware billing, accountable communication, and clear reporting for healthcare providers across all 50 states."
        imageSrc="/media/hero-mapped/13-nationwide-hero-desktop.png"
        imageAlt="Healthcare revenue team supporting medical practices nationwide"
        imagePosition="64% center"
        ctaHref="#all-states"
        ctaLabel="Find your state"
        badgeIcon={MapPin}
        badgeEyebrow="Nationwide service"
        badgeText="50 states. One accountable operating standard."
      />

      <section id="featured-markets" className="featured-markets section">
        <div className="container">
          <div className="nationwide-section-heading">
            <span className="eyebrow"><Sparkles aria-hidden="true" size={14} /> Nationwide reach, market-level attention</span>
            <h2>Built for the realities of<br />your state and specialty.</h2>
            <p>Every practice gets the same disciplined revenue-cycle process, adapted to the payer mix and operational realities around it.</p>
          </div>
          <MobileCarousel id="featured-states-carousel" label="Featured state markets" className="featured-state-grid">
            {featuredStates.map((state, index) => (
              <article className="featured-state-card" key={state.slug}>
                <img src={`/media/states/${state.slug}.jpg`} alt={`${state.capital}, ${state.name}`} />
                <div className="featured-state-overlay" />
                <span>{String(index + 1).padStart(2, "0")} · Featured market</span>
                <div>
                  <p><MapPin aria-hidden="true" size={14} /> {state.capital}</p>
                  <h3>{state.name}</h3>
                  <p>{state.description}</p>
                  <a href={`#${state.slug}`} aria-label={`Explore medical billing services in ${state.name}`}>Explore {state.name} <ArrowRight aria-hidden="true" size={17} /></a>
                </div>
              </article>
            ))}
          </MobileCarousel>
        </div>
      </section>

      <section id="all-states" className="state-directory section">
        <div className="container">
          <div className="nationwide-section-heading compact">
            <span className="eyebrow">Medical billing services nationwide</span>
            <h2>Find ClinoraMedBill in your state.</h2>
            <p>Search by state, capital, or region to see how we support reliable billing operations where your practice works.</p>
          </div>
          <StateDirectory />
        </div>
      </section>

      <SiteConversionFooter faqs={pageFaqs["nationwide-solutions"]} faqEyebrow="Nationwide coverage answers" />
    </main>
  );
}
