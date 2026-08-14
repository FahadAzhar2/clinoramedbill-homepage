import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Eye, Gauge, Handshake, ShieldCheck, Target, TrendingUp } from "lucide-react";
import SiteConversionFooter from "../components/SiteConversionFooter";
import SiteHeader from "../components/SiteHeader";
import { pageFaqs } from "../content/faqs";
import MotionReveal from "../components/MotionReveal";
import InteriorHero from "../components/InteriorHero";
import MobileCarousel from "../components/MobileCarousel";

export const metadata: Metadata = {
  title: "About ClinoraMedBill",
  description: "Learn how ClinoraMedBill brings accuracy, transparency, and accountability to medical billing and revenue cycle management.",
};

const values = [
  { icon: ShieldCheck, title: "Precision Without Compromise", text: "We take the time to get the details right because accuracy can make a real difference to your revenue." },
  { icon: Eye, title: "Radical Financial Transparency", text: "Clear communication gives you a straightforward view of what is happening throughout your revenue cycle." },
  { icon: TrendingUp, title: "Proactive Revenue Protection", text: "We act on denials, outstanding claims, and revenue risks before they grow into larger problems." },
  { icon: Handshake, title: "Relentless Accountability", text: "When something needs attention, we take ownership and follow through." },
  { icon: Gauge, title: "Continuous Optimization", text: "We keep looking for ways to improve workflows and make your revenue cycle more efficient." },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <MotionReveal />
      <SiteHeader active="about" />

      <InteriorHero
        titleId="about-title"
        eyebrow="About Clinora Medbill"
        title="Medical Billing Built Around Your Practice"
        description="Clinora Medbill helps healthcare providers take control of their revenue cycle with accurate, transparent, and dependable medical billing solutions."
        imageSrc="/media/hero-mapped/11-about-us-hero-desktop.png"
        mobileImageSrc="/media/hero-mapped/11-about-us-hero-mobile.png"
        imageAlt="Healthcare professionals reviewing patient and practice records together"
        imagePosition="68% 42%"
        ctaHref="mailto:info@clinoramedbill.com"
        ctaLabel="Let’s Work Together"
        badgeIcon={Handshake}
        badgeEyebrow="ClinoraMedBill partnership"
        badgeText="Accurate. Transparent. Dependable."
      />

      <section className="section about-story-section">
        <div className="container about-story-grid" data-motion>
          <figure><Image src="/media/doctor-lifestyle-v1.png" alt="Physician reviewing practice information" fill sizes="(max-width: 760px) 100vw, 44vw" /></figure>
          <div>
            <span className="eyebrow">About Clinora Medbill</span>
            <h2>A reliable partner behind your revenue cycle.</h2>
            <p>Running a healthcare practice involves much more than patient care. Billing, coding, claims, denials, payments, follow-ups, and payer requirements can create unnecessary pressure for providers and their teams.</p>
            <p>Our role is to take that burden off your shoulders. We manage the details with accuracy, transparency, and consistent follow-up—helping you keep billing organized and revenue moving.</p>
          </div>
        </div>
      </section>

      <section className="section about-purpose-section">
        <div className="container about-purpose-grid">
          <article className="about-purpose-card" data-motion><Image src="/media/about-mission-magnific-4k.jpg" alt="A practice administrator and physician reviewing a revenue report together" fill sizes="(max-width: 760px) 100vw, 48vw" /><div className="about-purpose-shade" aria-hidden="true" /><div><span><Target aria-hidden="true" /></span><small>Our Mission</small><h2>Make medical billing simpler, more transparent, and more dependable.</h2><p>We give healthcare practices the support they need to reduce administrative pressure and spend more time focused on patients.</p></div></article>
          <article className="about-purpose-card" data-motion><Image src="/media/about-vision-magnific-4k.jpg" alt="Healthcare professionals collaborating around a clinical workflow" fill sizes="(max-width: 760px) 100vw, 48vw" /><div className="about-purpose-shade" aria-hidden="true" /><div><span><Eye aria-hidden="true" /></span><small>Our Vision</small><h2>Set a higher standard for accountable revenue-cycle partnership.</h2><p>We want every client to feel confident that their revenue cycle is handled with the attention and responsibility it deserves.</p></div></article>
        </div>
      </section>

      <section className="section about-approach-section" data-motion>
        <div className="container about-approach-grid">
          <div><span className="eyebrow eyebrow-light">Our complete approach</span><h2>Billing is more than submitting claims and waiting.</h2><p>A healthy revenue cycle requires attention at every stage. We look across eligibility, coding, claims, denials, payment posting, and A/R follow-up to identify what needs attention and keep the process moving.</p></div>
          <ul>
            <li><CheckCircle2 aria-hidden="true" /><span><strong>See the whole cycle</strong> Every billing step is connected to what comes before and after it.</span></li>
            <li><CheckCircle2 aria-hidden="true" /><span><strong>Act before issues grow</strong> Patterns and exceptions receive clear, timely follow-up.</span></li>
            <li><CheckCircle2 aria-hidden="true" /><span><strong>Improve with evidence</strong> Reporting helps turn billing activity into practical action.</span></li>
          </ul>
        </div>
      </section>

      <section className="section about-values-section" data-motion>
        <div className="container">
          <div className="section-heading centered"><span className="eyebrow">Why Clinora Medbill</span><h2>Values that protect your time and revenue.</h2></div>
          <MobileCarousel id="about-values-carousel" label="ClinoraMedBill values" className="about-values-grid">{values.map(({ icon: Icon, title, text }, index) => <article key={title} data-motion style={{ "--motion-delay": `${index * 80}ms` } as CSSProperties}><Icon aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>)}</MobileCarousel>
          <div className="about-commitment" data-motion><Image src="/media/about-commitment-magnific-upscaled-2x.jpg" alt="Physician reviewing practice information from the right side of a modern clinic" fill sizes="(max-width: 760px) 100vw, 1180px" /><div className="about-commitment-shade" aria-hidden="true" /><strong>Your patients come first. Your revenue matters.</strong><p>We’ll take care of the billing in between with reliable support, clear communication, and consistent attention to detail.</p><a href="mailto:info@clinoramedbill.com">Start a conversation <ArrowRight aria-hidden="true" size={17} /></a></div>
        </div>
      </section>

      <SiteConversionFooter faqs={pageFaqs["about-us"]} faqEyebrow="About Clinora answers" />
    </main>
  );
}
