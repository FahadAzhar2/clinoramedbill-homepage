import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, CheckCircle2, PlugZap, ShieldCheck } from "lucide-react";
import SiteConversionFooter from "../components/SiteConversionFooter";
import SiteHeader from "../components/SiteHeader";
import InteriorHero from "../components/InteriorHero";
import MobileCarousel from "../components/MobileCarousel";

export const metadata: Metadata = {
  title: "EHR Software Experience | ClinoraMedBill",
  description: "Explore the EHR and practice-management systems ClinoraMedBill can support within medical billing and revenue-cycle workflows.",
};

const software = [
  { name: "Epic", description: "A leading EHR platform used by hospitals, health systems, and medical practices to manage clinical records, workflows, and patient care.", logo: "/media/ehr-logos/epic.png", href: "https://www.epic.com/" },
  { name: "Oracle Health", description: "An enterprise EHR platform supporting healthcare organizations with clinical records, workflows, interoperability, and financial processes.", logo: "/media/ehr-directory/oracle.png", href: "https://www.oracle.com/health/" },
  { name: "athenahealth", description: "A widely used healthcare platform combining EHR, practice management, medical billing, and patient engagement.", logo: "/media/ehr-logos/athenahealth.png", href: "https://www.athenahealth.com/solutions/athenaone/electronic-health-records" },
  { name: "eClinicalWorks", description: "A comprehensive EHR and practice management platform supporting clinical documentation, patient care, and billing workflows.", logo: "/media/ehr-logos/eclinicalworks.png", href: "https://www.eclinicalworks.com/products-services/ehr/" },
  { name: "MEDITECH Expanse", description: "An EHR platform used by hospitals and health systems to connect clinical, financial, and patient information.", logo: "/media/ehr-directory/meditech.png", href: "https://ehr.meditech.com/ehr-solutions/meditech-expanse" },
  { name: "NextGen Healthcare", description: "An integrated EHR and practice management platform designed for specialty and multi-location healthcare organizations.", logo: "/media/ehr-logos/nextgen.png", href: "https://www.nextgen.com/" },
  { name: "Veradigm", description: "A healthcare technology platform offering EHR, practice management, and revenue cycle solutions for medical practices.", logo: "/media/ehr-directory/veradigm.png", href: "https://veradigm.com/veradigm-ehr/" },
  { name: "Tebra", description: "An all-in-one platform for independent practices combining EHR, billing, payments, and practice management tools.", logo: "/media/ehr-directory/tebra.png", href: "https://www.tebra.com/" },
  { name: "AdvancedMD", description: "A cloud-based platform combining EHR, practice management, billing, and patient engagement for medical practices.", logo: "/media/ehr-logos/advancedmd.png", href: "https://login.advancedmd.com/" },
  { name: "CareCloud", description: "A cloud-based healthcare platform offering EHR, practice management, revenue cycle, and patient engagement solutions.", logo: "/media/ehr-logos/carecloud.png", href: "https://carecloud.com/ehr/" },
  { name: "DrChrono", description: "A cloud-based EHR and practice management platform supporting clinical documentation, scheduling, billing, and patient engagement.", logo: "/media/ehr-logos/drchrono.png", href: "https://www.drchrono.com/" },
  { name: "ModMed", description: "A specialty-focused EHR and practice management platform serving fields such as dermatology, orthopedics, ophthalmology, and gastroenterology.", logo: "/media/ehr-directory/modmed.png", href: "https://www.modmed.com/" },
  { name: "WebPT", description: "An EHR and practice management platform built specifically for physical therapy and rehabilitation practices.", logo: "/media/ehr-logos/webpt.png", href: "https://www.webpt.com/products/emr" },
  { name: "Greenway Health", description: "A healthcare technology provider offering EHR, practice management, and revenue cycle solutions for medical practices.", logo: "/media/ehr-directory/greenway.png", href: "https://www.greenwayhealth.com/" },
  { name: "PrognoCIS", description: "A cloud-based EHR and practice management platform supporting clinical workflows, documentation, and medical billing.", logo: "/media/ehr-directory/prognocis.png", href: "https://prognocis.com/" },
  { name: "Practice Fusion", description: "A cloud-based EHR designed for independent practices, with tools for clinical documentation, patient management, and billing.", logo: "/media/ehr-directory/practice-fusion.png", href: "https://www.practicefusion.com/" },
  { name: "SimplePractice", description: "A leading platform for independent behavioral health practices, combining EHR, scheduling, documentation, billing, and telehealth.", logo: "/media/ehr-directory/simplepractice.png", href: "https://www.simplepractice.com/" },
  { name: "Open Dental", description: "A dental practice management platform supporting patient records, scheduling, insurance, claims, and billing workflows.", logo: "/media/ehr-directory/open-dental.png", href: "https://www.opendental.com/" },
  { name: "ICANotes", description: "A behavioral health EHR designed to simplify clinical documentation, treatment planning, scheduling, and billing.", logo: "/media/ehr-directory/icanotes.png", href: "https://www.icanotes.com/" },
  { name: "MEDHOST", description: "An enterprise EHR platform designed for hospitals and healthcare facilities, integrating clinical and financial workflows.", logo: "/media/ehr-directory/medhost.png", href: "https://www.medhost.com/" },
] as const;

export default function EhrSoftwarePage() {
  return (
    <main id="main-content" className="ehr-page">
      <SiteHeader active="about" />
      <InteriorHero
        titleId="ehr-title"
        eyebrow="Connected workflows"
        title="Experience Across the EHR Systems Your Practice Uses"
        description="ClinoraMedBill adapts billing operations to your existing technology wherever possible—without forcing your team into an unfamiliar workflow."
        imageSrc="/media/hero-mapped/14-ehr-software-hero-desktop.png"
        mobileImageSrc="/media/hero-mapped/14-ehr-software-hero-mobile.png"
        imageAlt="Healthcare professionals using connected clinical software in a modern practice"
        imagePosition="68% 44%"
        ctaHref="#ehr-directory"
        ctaLabel="Explore software"
        badgeIcon={PlugZap}
        badgeEyebrow="Connected workflows"
        badgeText="Built around the systems your practice already uses."
      />

      <section className="ehr-proof-strip"><div className="container"><span><PlugZap aria-hidden="true" /><strong>Workflow-aligned onboarding</strong></span><span><ShieldCheck aria-hidden="true" /><strong>Secure access coordination</strong></span><span><CheckCircle2 aria-hidden="true" /><strong>Clear clinical-to-billing handoffs</strong></span></div></section>

      <section id="ehr-directory" className="section ehr-directory-section">
        <div className="container section-heading centered"><span className="eyebrow">EHR software experience</span><h2>Built to work with the systems behind your practice.</h2><p>Every setup is reviewed during onboarding. Compatibility and access requirements are confirmed before work begins.</p></div>
        <MobileCarousel id="ehr-directory-carousel" label="EHR software platforms" className="container ehr-grid">
          {software.map((platform, index) => (
            <a className="ehr-software-card" href={platform.href} target="_blank" rel="noreferrer" key={platform.name}>
              <span className="ehr-logo-stage">
                <img
                  className="ehr-platform-logo"
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width="280"
                  height="88"
                    loading="eager"
                  decoding="async"
                />
              </span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{platform.name}</h3>
              <p>{platform.description}</p>
              <span className="ehr-platform-link">Visit platform <ArrowUpRight aria-hidden="true" size={17} /></span>
            </a>
          ))}
        </MobileCarousel>
      </section>

      <section id="workflow-review" className="section ehr-cta-section">
        <div className="container ehr-cta-shell" data-motion>
          <figure className="ehr-cta-visual">
            <Image
              src="/media/medical-billing-workflow-4k.jpg"
              alt="Healthcare operations team reviewing a connected billing workflow together"
              fill
              sizes="(max-width: 760px) 100vw, 64vw"
              quality={92}
            />
          </figure>
          <div className="ehr-cta-content">
            <span className="eyebrow eyebrow-light">Already using another platform?</span>
            <h2>Let’s review your current workflow.</h2>
            <p>This directory is representative, not exhaustive. We’ll confirm how your EHR, practice-management system, clearinghouse, and billing workflow can connect during discovery.</p>
            <ul className="ehr-cta-review-list" aria-label="Workflow areas reviewed">
              {[
                "EHR system",
                "Clearinghouse",
                "Billing workflow",
              ].map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a className="button button-light ehr-cta-action" href="mailto:info@clinoramedbill.com">
              Discuss your software <ArrowRight aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
      </section>

      <SiteConversionFooter faqTitle="EHR integration questions" faqDescription="We confirm system compatibility and access requirements during onboarding." />
    </main>
  );
}
