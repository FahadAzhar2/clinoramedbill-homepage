import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { ServiceSection, ServiceSlug } from "../content/service-pages";
import { servicePages } from "../content/service-pages";
import { pageFaqs } from "../content/faqs";
import { medicalSpecialties } from "../specialties/specialties";
import SiteConversionFooter from "./SiteConversionFooter";
import SiteHeader from "./SiteHeader";
import InteriorHero from "./InteriorHero";
import MotionReveal from "./MotionReveal";
import MobileCarousel from "./MobileCarousel";

const serviceOrder = Object.keys(servicePages) as ServiceSlug[];
const editorialImages = [
  "/media/services/01-revenue-cycle-management-4k.jpg",
  "/media/services/02-medical-billing-4k.jpg",
  "/media/services/03-medical-coding.jpg",
  "/media/services/04-ar-management-4k.jpg",
  "/media/services/05-medical-billing-audits-4k.jpg",
  "/media/services/06-provider-credentialing-4k.jpg",
  "/media/services/07-virtual-front-desk.jpg",
];

function includes(section: ServiceSection, words: string[]) {
  const label = section.eyebrow.toLowerCase();
  return words.some((word) => label.includes(word));
}

export default function ServiceDetailPage({ slug }: { slug: ServiceSlug }) {
  const service = servicePages[slug];
  const sections = [...service.sections] as ServiceSection[];
  const definition = sections.find((section) => includes(section, ["what is"])) ?? {
    eyebrow: `What is ${service.shortTitle}?`,
    title: `What Is ${service.title}?`,
    description: service.description,
    points: sections[0].points,
  };
  const capabilities = sections.find((section) => includes(section, ["services", "what we audit"])) ?? sections[0];
  const process = sections.find((section) => includes(section, ["process", "how it works"])) ?? sections[1];
  const why = sections.find((section) => includes(section, ["why choose clinora"]))
    ?? sections.find((section) => includes(section, ["why "]))
    ?? sections[2];
  const audience = sections.find((section) => includes(section, ["who we serve", "who we help"])) ?? {
    eyebrow: "Who we serve",
    title: `${service.title} Support for Healthcare Teams`,
    description: "ClinoraMedBill supports healthcare practices with service delivery shaped around their workflow, scale, and care environment.",
    points: ["Independent practices", "Physician groups", "Specialty clinics"],
  };
  const specialty = sections.find((section) => includes(section, ["specialty expertise"])) ?? {
    eyebrow: "Specialty expertise",
    title: `${service.title} Expertise Across Medical Specialties`,
    description: "Our workflow adapts to the documentation, payer rules, and operating patterns that vary across healthcare specialties.",
    points: medicalSpecialties.slice(0, 3).map((item) => item.name),
  };
  const primarySections = new Set([definition, capabilities, process, why, audience, specialty]);
  const supportingSections = sections.filter((section) => !primarySections.has(section));
  const variant = serviceOrder.indexOf(slug) % 3;
  const visualIndex = serviceOrder.indexOf(slug);
  const definitionImage = editorialImages[visualIndex];
  const capabilityImages = [1, 2, 3].map((offset) => editorialImages[(visualIndex + offset) % editorialImages.length]);
  const processImage = editorialImages[(visualIndex + 4) % editorialImages.length];
  const audienceImage = editorialImages[(visualIndex + 5) % editorialImages.length];

  return (
    <main id="main-content" className={`service-detail-page service-story-page service-story-${slug} service-story-variant-${variant}`}>
      <a className="skip-link" href="#service-content">Skip to service details</a>
      <MotionReveal />
      <SiteHeader active="services" />

      <InteriorHero
        id="service-content"
        titleId={`${slug}-title`}
        eyebrow={<>Service / {service.shortTitle}</>}
        title={service.title}
        lead={service.heroTitle}
        description={service.description}
        imageSrc={service.heroImage}
        mobileImageSrc={"heroMobileImage" in service ? service.heroMobileImage : undefined}
        imageAlt={`Healthcare professionals supporting ${service.title.toLowerCase()}`}
        imagePosition={variant === 1 ? "64% center" : "58% center"}
        ctaHref="mailto:info@clinoramedbill.com"
        ctaLabel="Request a free audit"
      />

      <section className="section service-definition-section">
        <div className="container service-definition-grid">
          <div className="service-definition-heading" data-motion><span className="eyebrow">{definition.eyebrow}</span><h2>{definition.title}</h2></div>
          <div className="service-definition-copy" data-motion><p>{definition.description}</p><ul>{definition.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
          <figure className="service-definition-media" data-motion><Image src={definitionImage} alt={`${service.title} workflow in a modern healthcare practice`} fill sizes="(max-width: 760px) calc(100vw - 40px), 1200px" /></figure>
        </div>
      </section>

      <section className="section service-capabilities-section" id="service-sections">
        <div className="container service-capabilities-shell">
          <div className="service-story-heading" data-motion><div><span className="eyebrow">{capabilities.eyebrow}</span><h2>{capabilities.title}</h2><p>{capabilities.description}</p></div></div>
          <MobileCarousel id={`${slug}-capabilities-carousel`} label={`${service.title} capabilities`} className="service-capabilities-grid">
            {capabilities.points.map((point, index) => (
              <article className="service-capability-card service-capability-card-clean" data-motion key={point}>
                <figure>
                  <Image src={capabilityImages[index % capabilityImages.length]} alt={`${service.title}: ${point}`} fill sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1100px) 44vw, 31vw" />
                </figure>
                <div className="service-capability-card-copy">
                  <span className="service-capability-icon"><CheckCircle2 aria-hidden="true" /></span>
                  <small>{service.shortTitle} capability</small>
                  <h3>{point}</h3>
                </div>
              </article>
            ))}
          </MobileCarousel>
          {supportingSections.length ? <MobileCarousel id={`${slug}-supporting-carousel`} label={`More ${service.title} services`} className="service-supporting-cards">{supportingSections.map((section) => <article className="service-supporting-card" data-motion key={section.title}><div className="service-supporting-meta"><span className="service-supporting-icon"><CheckCircle2 aria-hidden="true" /></span><small>{section.eyebrow}</small></div><div className="service-supporting-copy"><h3>{section.title}</h3><p>{section.description}</p></div></article>)}</MobileCarousel> : null}
        </div>
      </section>

      <section className="section service-process-section">
        <div className="container service-process-layout">
          <figure className="service-process-media" data-motion><Image src={processImage} alt={`${service.title} workflow supported by ClinoraMedBill`} fill sizes="(max-width: 760px) 100vw, 48vw" /></figure>
          <div className="service-process-copy" data-motion><span className="eyebrow">{process.eyebrow}</span><h2>{process.title}</h2><p>{process.description}</p><MobileCarousel as="ol" id={`${slug}-process-carousel`} label={`${service.title} process steps`} className="service-process-list">{process.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><strong>{point}</strong></li>)}</MobileCarousel></div>
        </div>
      </section>

      <section className="service-why-section">
        <div className="container service-why-panel" data-motion>
          <div className="service-why-copy"><span className="eyebrow eyebrow-light">Why choose Clinora</span><h2>{why.title}</h2><p>{why.description}</p><a className="button service-why-cta" href="mailto:info@clinoramedbill.com">Talk with our team <ArrowRight aria-hidden="true" size={17} /></a></div>
          <MobileCarousel as="ol" id={`${slug}-why-carousel`} label={`Reasons to choose ClinoraMedBill for ${service.title}`} className="service-why-list">{why.points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><strong>{point}</strong><CheckCircle2 aria-hidden="true" /></li>)}</MobileCarousel>
        </div>
      </section>

      <section className="section service-audience-section">
        <div className="container service-audience-layout">
          <div className="service-audience-copy" data-motion><span className="eyebrow">Who we serve + specialty expertise</span><h2>{audience.title}</h2><p>{audience.description}</p><ul className="service-audience-list">{audience.points.map((point) => <li key={point}>{point}<ArrowRight aria-hidden="true" size={15} /></li>)}</ul></div>
          <div className="service-audience-image" data-motion><Image src={audienceImage} alt="Healthcare practice team working together" fill sizes="(max-width: 760px) calc(100vw - 24px), 42vw" /></div>
          <div className="service-specialty-block" data-motion><small>{specialty.eyebrow}</small><h3>{specialty.title}</h3><p>{specialty.description}</p><div>{medicalSpecialties.slice(0, 8).map((item) => <a href="/specialties" key={item.name}>{item.name}<ArrowRight aria-hidden="true" size={14} /></a>)}</div></div>
        </div>
      </section>

      <SiteConversionFooter
        faqs={pageFaqs[slug]}
        faqEyebrow={`${service.shortTitle} FAQs`}
        faqTitle="Frequently Asked Questions"
        faqDescription={`Clear answers about ClinoraMedBill's ${service.title.toLowerCase()} services.`}
        faqId="service-faqs"
      />
    </main>
  );
}
