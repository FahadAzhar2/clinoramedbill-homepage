import { CheckCircle2, type LucideIcon } from "lucide-react";
import type { NavigationSection } from "./SiteHeader";
import SiteHeader from "./SiteHeader";
import SiteConversionFooter from "./SiteConversionFooter";
import { pageFaqs } from "../content/faqs";
import InteriorHero from "./InteriorHero";
import MobileCarousel from "./MobileCarousel";

export default function StandardContentPage({ active, faqKey, eyebrow, title, description, icon: Icon, children }: { active: NavigationSection; faqKey: string; eyebrow: string; title: string; description: string; icon: LucideIcon; children?: React.ReactNode }) {
  const heroImages: Record<string, string> = { blogs: "/media/hero-mapped/10-blogs-hero-desktop.png", faqs: "/media/hero-mapped/17-faqs-hero-desktop.png" };
  const heroImage = heroImages[faqKey] ?? "/media/human-team.jpg";
  return (
    <main id="main-content" className="standard-content-page">
      <a className="skip-link" href="#standard-content">Skip to page content</a>
      <SiteHeader active={active} />
      <InteriorHero
        id="standard-content"
        titleId={`${faqKey}-title`}
        eyebrow={eyebrow}
        title={title}
        description={description}
        imageSrc={heroImage}
        imageAlt="ClinoraMedBill healthcare revenue operations"
        imagePosition="62% center"
        ctaHref="mailto:info@clinoramedbill.com"
        ctaLabel="Talk with our team"
        badgeIcon={Icon}
        badgeEyebrow="ClinoraMedBill guidance"
        badgeText="Clear answers. Practical next steps."
      />
      {children ?? <section className="section standard-content-intro"><MobileCarousel id={`${faqKey}-content-carousel`} label={`${title} highlights`} className="container standard-content-cards"><article><CheckCircle2 aria-hidden="true" /><h2>Clear ownership</h2><p>A named, accountable team that understands what happens next.</p></article><article><CheckCircle2 aria-hidden="true" /><h2>Practical visibility</h2><p>Useful information that helps your practice make better operational decisions.</p></article><article><CheckCircle2 aria-hidden="true" /><h2>Built around healthcare</h2><p>Workflows designed for the financial and administrative realities of care delivery.</p></article></MobileCarousel></section>}
      <SiteConversionFooter faqs={pageFaqs[faqKey]} />
    </main>
  );
}
