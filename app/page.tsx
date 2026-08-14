"use client";
/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  Code2,
  FileSearch,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Mail,
  Map,
  MapPin,
  MessageSquareText,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";
import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { audiences } from "./who-we-serve/audiences";
import { medicalSpecialties } from "./specialties/specialties";
import { useCmsBundle } from "./lib/useCmsBundle";
import SiteHeader from "./components/SiteHeader";
import FooterSocialLinks from "./components/FooterSocialLinks";
import MobileCarousel from "./components/MobileCarousel";
import { pageFaqs } from "./content/faqs";
import { submitEnquiryForm, type EnquiryStatus, type EnquiryType } from "./lib/enquiry";

const services = [
  {
    slug: "revenue-cycle-management",
    icon: Layers3,
    image: "/media/services/01-revenue-cycle-management-4k.jpg",
    imageAlt: "Healthcare leadership team reviewing revenue-cycle documents in a modern clinical office",
    imagePosition: "50% 42%",
    titleLines: ["Revenue Cycle", "Management"],
    title: "Revenue Cycle Management",
    text: "End-to-end revenue cycle support.",
  },
  {
    slug: "medical-billing",
    icon: CircleDollarSign,
    image: "/media/services/02-medical-billing-4k.jpg",
    imageAlt: "Medical billing professional working with a tablet in a bright healthcare office",
    imagePosition: "50% 40%",
    titleLines: ["Medical", "Billing"],
    title: "Medical Billing",
    text: "Accurate billing from claim to payment.",
  },
  {
    slug: "medical-coding",
    icon: Code2,
    image: "/media/services/03-medical-coding.jpg",
    imageAlt: "Physician reviewing clinical documentation for accurate medical coding",
    imagePosition: "52% 38%",
    titleLines: ["Medical", "Coding"],
    title: "Medical Coding",
    text: "Precise coding for cleaner claims.",
  },
  {
    slug: "ar-management",
    icon: RefreshCcw,
    image: "/media/services/04-ar-management-4k.jpg",
    imageAlt: "Healthcare administrator managing account follow-up from a clinical office workstation",
    imagePosition: "32% 42%",
    titleLines: ["AR", "Management"],
    title: "AR Management",
    text: "Focused follow-up for outstanding revenue.",
  },
  {
    slug: "medical-billing-audits",
    icon: ClipboardCheck,
    image: "/media/services/05-medical-billing-audits-4k.jpg",
    imageAlt: "Medical review team comparing healthcare records during a billing audit",
    imagePosition: "50% 40%",
    titleLines: ["Medical Billing", "Audits"],
    title: "Medical Billing Audits",
    text: "Evidence-led reviews that find revenue gaps.",
  },
  {
    slug: "provider-credentialing-enrollment",
    icon: BadgeCheck,
    image: "/media/services/06-provider-credentialing-4k.jpg",
    imageAlt: "Provider and enrollment specialist reviewing credentialing documents together",
    imagePosition: "50% 40%",
    titleLines: ["Provider Credentialing", "& Enrollment"],
    title: "Provider Credentialing & Enrollment",
    text: "Clear credentialing from application to approval.",
  },
  {
    slug: "virtual-front-desk-services",
    icon: Phone,
    image: "/media/services/07-virtual-front-desk.jpg",
    imageAlt: "Healthcare professional coordinating patient front-desk support",
    imagePosition: "50% 37%",
    titleLines: ["Virtual Front Desk", "Services"],
    title: "Virtual Front Desk Services",
    text: "Responsive support for patients and practices.",
  },
];

const ehrPlatforms = [
  { name: "AdvancedMD", logo: "/media/ehr-logos/advancedmd.png" },
  { name: "CareCloud", logo: "/media/ehr-logos/carecloud.png" },
  { name: "Cerner", logo: "/media/ehr-logos/cerner.png" },
  { name: "Epic", logo: "/media/ehr-logos/epic.png" },
  { name: "athenahealth", logo: "/media/ehr-logos/athenahealth.png" },
  { name: "DrChrono", logo: "/media/ehr-logos/drchrono.png" },
  { name: "eClinicalWorks", logo: "/media/ehr-logos/eclinicalworks.png" },
  { name: "Kareo", logo: "/media/ehr-logos/kareo.png" },
  { name: "NextGen", logo: "/media/ehr-logos/nextgen.png" },
  { name: "WebPT", logo: "/media/ehr-logos/webpt.png" },
];

const process = [
  {
    icon: UserRoundCheck,
    label: "Patient access",
    title: "Patient Registration & Eligibility",
    text: "Insurance verification and demographic capture before every appointment.",
    metric: "99.4%",
    metricLabel: "Eligibility verified",
    signal: "+2.1% verification accuracy",
    bars: [42, 55, 49, 67, 62, 76, 72, 87, 82, 94],
  },
  {
    icon: Code2,
    label: "Clinical coding",
    title: "Charge Capture & Coding",
    text: "Certified coders review every encounter note for accurate ICD-10 and CPT codes.",
    metric: "<24h",
    metricLabel: "Coding turnaround",
    signal: "Certified review in motion",
    bars: [48, 62, 57, 73, 69, 82, 79, 91, 87, 97],
  },
  {
    icon: ClipboardCheck,
    label: "Clean claims",
    title: "Claims Scrubbing & Submission",
    text: "Automated error detection before electronic submission to all major payers.",
    metric: "98.7%",
    metricLabel: "First-pass acceptance",
    signal: "+3.2% this month",
    bars: [44, 58, 51, 72, 67, 82, 78, 91, 88, 98],
  },
  {
    icon: CircleDollarSign,
    label: "Payment integrity",
    title: "Payment Posting & Reconciliation",
    text: "ERA/EOB processing with full audit trail and payer contract verification.",
    metric: "1:1",
    metricLabel: "Payment reconciliation",
    signal: "Every remittance traced",
    bars: [38, 52, 61, 58, 75, 72, 88, 83, 94, 91],
  },
  {
    icon: RefreshCcw,
    label: "Revenue recovery",
    title: "Denial Management & Appeals",
    text: "Root-cause analysis and rapid appeals process to recover maximum revenue.",
    metric: "8.4d",
    metricLabel: "Average days in A/R",
    signal: "Faster follow-up rhythm",
    bars: [74, 71, 67, 65, 58, 54, 49, 43, 38, 31],
  },
  {
    icon: BarChart3,
    label: "Performance",
    title: "Reporting & Ongoing Optimization",
    text: "Monthly performance reviews to continuously maximize your revenue cycle.",
    metric: "Live",
    metricLabel: "Practice visibility",
    signal: "Clear next actions",
    bars: [45, 52, 60, 64, 71, 77, 82, 86, 92, 98],
  },
];

const specialties = medicalSpecialties.map((specialty) => specialty.name);

const specialtyRows = [
  specialties.slice(0, 15),
  specialties.slice(15, 29),
  specialties.slice(29),
];

const footerSpecialties = [
  "Family Medicine",
  "Internal Medicine",
  "Pediatrics",
  "Emergency Medicine",
  "Cardiology",
  "Orthopedic Surgery",
  "Obstetrics & Gynecology (OB/GYN)",
];

const benefits = [
  {
    icon: CircleDollarSign,
    title: "Faster Payment",
    text: "Insurance reimburses more quickly when precise claims get submitted properly. Payments come on time and without any interruptions when there are no errors. This increases cash flow and maintains the financial stability of your practice.",
  },
  {
    icon: TrendingUp,
    title: "Cost Savings",
    text: "Effective billing lowers the probabilities of mistakes that cost money. Fewer denied claims mean staff spend a reduced amount of time fixing problems. This reduces overhead and helps your practice save on administrative costs.",
  },
  {
    icon: RefreshCcw,
    title: "Consistent AR Follow-Up",
    text: "Every unpaid claim is being tracked until it is resolved. Frequent follow-up keeps claims from being ignored or delayed. This offers a regular and dependable revenue flow for your healthcare practice.",
  },
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant Medical Billing",
    text: "Our HIPAA compliant medical billing services protect all patient information and keep it safe. We follow strict HIPAA rules to ensure nothing is shared without permission. This keeps both your patients and your practice safe and secure.",
  },
];

const insights = [
  {
    category: "Denial prevention",
    readTime: "7 min read",
    title: "The strongest denial strategy starts before a claim is submitted.",
    text: "A practical look at the eligibility, documentation, coding, and claim-scrubbing signals that help practices prevent avoidable revenue loss.",
    image: "/media/blog-denials-magnific-4k.jpg",
    imageAlt: "Healthcare professionals reviewing revenue data together",
    link: "/blogs/denial-strategy-before-submission",
  },
  {
    category: "Revenue visibility",
    readTime: "5 min read",
    title: "What your clean-claim rate is—and is not—telling you.",
    text: "Turn a familiar billing metric into a clearer view of workflow quality, payer friction, and the next operational action.",
    image: "/media/blog-eligibility-magnific-4k.jpg",
    imageAlt: "Abstract data lines representing revenue performance",
    link: "/blogs/what-clean-claim-rate-tells-you",
  },
  {
    category: "Specialty billing",
    readTime: "6 min read",
    title: "Why specialty-aware billing workflows outperform generic playbooks.",
    text: "Documentation patterns, payer rules, and coding details change by specialty. Your revenue workflow should account for that reality.",
    image: "/media/medical-billing-workflow-4k.jpg",
    imageAlt: "Connected digital workflow representing specialty billing operations",
    link: "/specialties#specialty-directory",
  },
  {
    category: "A/R performance",
    readTime: "8 min read",
    title: "A/R aging tells a story. Here is how to read it earlier.",
    text: "Use payer trends, claim status patterns, and ownership signals to identify stalled revenue before it becomes old revenue.",
    image: "/media/blogs-hero-magnific-4k.jpg",
    imageAlt: "Revenue cycle specialists analyzing accounts receivable trends",
    link: "/blogs/read-ar-aging-earlier",
  },
  {
    category: "Compliance",
    readTime: "4 min read",
    title: "Clear reporting is part of a secure billing operation.",
    text: "Operational visibility and thoughtful access controls help teams communicate clearly without compromising sensitive information.",
    image: "/media/about-hero-magnific-4k.jpg",
    imageAlt: "Secure healthcare data and compliance workflow",
    link: "/compliance#hipaa-compliance",
  },
  {
    category: "Reporting",
    readTime: "6 min read",
    title: "The monthly billing report your practice can actually act on.",
    text: "Move beyond static totals with context, ownership, and clear next actions for every important revenue-cycle signal.",
    image: "/media/specialties-hero-magnific-4k.jpg",
    imageAlt: "Healthcare revenue reporting reviewed by an operations team",
    link: "/services/revenue-cycle-management#service-sections",
  },
];

export default function Home() {
  const cms = useCmsBundle();
  const [enquiryStatus, setEnquiryStatus] = useState<Record<EnquiryType, EnquiryStatus>>({
    "hero-audit": "idle",
    "billing-audit": "idle",
    contact: "idle",
  });
  const [videoPaused, setVideoPaused] = useState(false);
  const blogRailRef = useRef<HTMLDivElement>(null);
  const blogAutoResumeAtRef = useRef(0);
  const cmsHome = cms?.homepage;
  const cmsSettings = cms?.settings;
  const liveServices = services;
  const liveInsights = cms?.insights?.length
    ? cms.insights.map((insight, index) => ({
        category: insight.category,
        readTime: insight.readTime,
        title: insight.title,
        text: insight.description,
        image: insight.imageUrl || insights[index % insights.length].image,
        imageAlt: insight.imageAlt || insights[index % insights.length].imageAlt,
        link: insight.link || insights[index % insights.length].link,
      }))
    : insights;
  const liveFaqs = cms?.faqs?.length ? cms.faqs : pageFaqs.home;

  const scrollBlogs = (direction: -1 | 1) => {
    const rail = blogRailRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>(".blog-card");
    const cardStep = firstCard ? firstCard.offsetWidth + 18 : rail.clientWidth * 0.72;
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    const nextPosition = direction > 0 && rail.scrollLeft >= maxScroll - 4
      ? 0
      : direction < 0 && rail.scrollLeft <= 4
        ? maxScroll
        : Math.max(0, rail.scrollLeft + direction * cardStep);

    blogAutoResumeAtRef.current = performance.now() + 1400;
    rail.scrollTo({ left: nextPosition, behavior: "smooth" });
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      window.requestAnimationFrame(() => setVideoPaused(true));
      document.querySelector<HTMLVideoElement>(".hero-video")?.pause();
    }
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const metricValues = Array.from(document.querySelectorAll<HTMLElement>("[data-count-to]"));
    let observer: IntersectionObserver | undefined;
    let metricObserver: IntersectionObserver | undefined;
    const metricFrames = new Set<number>();
    let frame = 0;

    if (!reducedMotion) {
      document.documentElement.classList.add("motion-enabled");
      metricValues.forEach((item) => {
        const decimals = Number(item.dataset.countDecimals ?? 0);
        const prefix = item.dataset.countPrefix ?? "";
        const suffix = item.dataset.countSuffix ?? "";
        item.textContent = `${prefix}${Number(0).toFixed(decimals)}${suffix}`;
      });

      metricObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const item = entry.target as HTMLElement;
            const target = Number(item.dataset.countTo ?? 0);
            const decimals = Number(item.dataset.countDecimals ?? 0);
            const prefix = item.dataset.countPrefix ?? "";
            const suffix = item.dataset.countSuffix ?? "";
            const delay = Number(item.dataset.countDelay ?? 0);
            const duration = 1450;
            const start = performance.now() + delay;

            const tick = (now: number) => {
              const progress = Math.max(0, Math.min(1, (now - start) / duration));
              const eased = 1 - Math.pow(1 - progress, 4);
              item.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
              if (progress < 1) {
                const request = window.requestAnimationFrame(tick);
                metricFrames.add(request);
              }
            };

            const request = window.requestAnimationFrame(tick);
            metricFrames.add(request);
            metricObserver?.unobserve(item);
          });
        },
        { threshold: 0.55 },
      );
      metricValues.forEach((item) => metricObserver?.observe(item));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add("is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      revealItems.forEach((item) => observer?.observe(item));

      const humanSection = document.querySelector<HTMLElement>("[data-human-scroll]");
      const humanPanel = humanSection?.querySelector<HTMLElement>(".human-story") ?? null;
      let humanScrollFrame = 0;
      let humanCurrent = 0;
      let humanTarget = 0;
      let humanAnimating = false;

      const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
      const smoothstep = (edge0: number, edge1: number, value: number) => {
        const amount = clamp01((value - edge0) / Math.max(0.0001, edge1 - edge0));
        return amount * amount * (3 - 2 * amount);
      };
      const applyHumanProgress = (progress: number) => {
        if (!humanSection || !humanPanel) return;
        const eased = smoothstep(0, 1, progress);
        const initialWidth = Math.min(1360, Math.max(0, window.innerWidth - 48));
        const initialHeight = Math.min(720, Math.max(620, window.innerHeight - 112));
        const insetX = Math.max(0, (window.innerWidth - initialWidth) / 2) * (1 - eased);
        const insetY = Math.max(0, (window.innerHeight - initialHeight) / 2) * (1 - eased);
        const radius = 30 * (1 - eased);
        const titleOut = smoothstep(0.18, 0.58, progress);
        const copyIn = smoothstep(0.48, 0.88, progress);

        humanSection.style.setProperty("--human-progress", eased.toFixed(4));
        humanSection.style.setProperty("--human-inset-x", `${insetX.toFixed(2)}px`);
        humanSection.style.setProperty("--human-inset-y", `${insetY.toFixed(2)}px`);
        humanSection.style.setProperty("--human-radius", `${radius.toFixed(2)}px`);
        humanSection.style.setProperty("--human-title-opacity", (1 - titleOut).toFixed(4));
        humanSection.style.setProperty("--human-copy-opacity", copyIn.toFixed(4));
        const humanCopy = humanPanel.querySelector<HTMLElement>(".human-story-copy");
        humanCopy?.classList.toggle("is-revealed", copyIn > 0.35);
        humanCopy?.style.setProperty("pointer-events", copyIn > 0.5 ? "auto" : "none");
      };
      const readHumanProgress = () => {
        if (!humanSection || window.innerWidth <= 760) return 1;
        const rect = humanSection.getBoundingClientRect();
        const scrollDistance = Math.max(window.innerHeight * 0.82, 560);
        return clamp01(-rect.top / scrollDistance);
      };
      const tickHumanScroll = () => {
        // A short dampening pass removes wheel/trackpad jitter without creating
        // the delayed, autonomous feeling of a timed transition.
        const smoothing = 0.055;
        const response = 1 - Math.exp(-1 / (60 * smoothing));
        humanCurrent += (humanTarget - humanCurrent) * response;
        if (Math.abs(humanTarget - humanCurrent) < 0.0004) {
          humanCurrent = humanTarget;
          humanAnimating = false;
        }
        applyHumanProgress(humanCurrent);
        humanScrollFrame = humanAnimating ? window.requestAnimationFrame(tickHumanScroll) : 0;
      };
      const requestHumanScrollUpdate = () => {
        humanTarget = readHumanProgress();
        if (!humanAnimating) {
          humanAnimating = true;
          humanScrollFrame = window.requestAnimationFrame(tickHumanScroll);
        }
      };
      const resetHumanScroll = () => {
        humanTarget = readHumanProgress();
        humanCurrent = humanTarget;
        applyHumanProgress(humanCurrent);
      };
      resetHumanScroll();
      window.addEventListener("scroll", requestHumanScrollUpdate, { passive: true });
      window.addEventListener("resize", resetHumanScroll, { passive: true });

      const updateParallax = () => {
        frame = 0;
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((item) => {
          const rect = item.getBoundingClientRect();
          const offset = Math.max(-42, Math.min(42, (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.06));
          item.style.setProperty("--parallax-y", `${offset}px`);
        });
      };
      const onMotionScroll = () => {
        if (!frame) frame = window.requestAnimationFrame(updateParallax);
      };
      updateParallax();
      window.addEventListener("scroll", onMotionScroll, { passive: true });
      window.addEventListener("resize", onMotionScroll, { passive: true });
      window.addEventListener("orientationchange", onMotionScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onMotionScroll);
        window.removeEventListener("resize", onMotionScroll);
        window.removeEventListener("orientationchange", onMotionScroll);
        if (frame) window.cancelAnimationFrame(frame);
        metricFrames.forEach((request) => window.cancelAnimationFrame(request));
        observer?.disconnect();
        metricObserver?.disconnect();
        window.removeEventListener("scroll", requestHumanScrollUpdate);
        window.removeEventListener("resize", resetHumanScroll);
        if (humanScrollFrame) window.cancelAnimationFrame(humanScrollFrame);
      };
    }

    revealItems.forEach((item) => item.classList.add("is-visible"));
    return () => {
      observer?.disconnect();
      metricObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    const rail = blogRailRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!rail || reducedMotion) return;

    let frame = 0;
    let previousTime = 0;
    let isInView = false;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
    }, { threshold: 0.15 });
    visibilityObserver.observe(rail);

    const autoScroll = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 0;
      previousTime = time;
      const paused = !isInView
        || rail.matches(":focus-within")
        || rail.matches(":hover")
        || document.hidden
        || time < blogAutoResumeAtRef.current;

      if (!paused) {
        const maxScroll = rail.scrollWidth - rail.clientWidth;
        if (maxScroll > 0) {
          rail.scrollLeft = rail.scrollLeft >= maxScroll - 1
            ? 0
            : rail.scrollLeft + elapsed * 0.045;
        }
      }

      frame = window.requestAnimationFrame(autoScroll);
    };

    frame = window.requestAnimationFrame(autoScroll);
    return () => {
      visibilityObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const submitAudit = async (event: FormEvent<HTMLFormElement>, type: "hero-audit" | "billing-audit") => {
    setEnquiryStatus((current) => ({ ...current, [type]: "sending" }));
    try {
      await submitEnquiryForm(event, type);
      setEnquiryStatus((current) => ({ ...current, [type]: "success" }));
    } catch {
      setEnquiryStatus((current) => ({ ...current, [type]: "error" }));
    }
  };

  return (
    <main id="main-content" className="home-refinement">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader active="home" overlay />

      <section id="top" className="hero hero-approved hero-split" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-human-centered-v2.jpg"
          aria-hidden="true"
          ref={(node) => {
            if (!node) return;
            if (videoPaused) node.pause();
          }}
        >
          <source src="/media/clinora-hero-human-4k.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-wash" aria-hidden="true" />
        <div className="container hero-content" data-reveal>
          <div className="hero-copy-column">
              <div className="hero-kicker">
                <span className="status-dot" aria-hidden="true" />
                Professional Medical Billing Services
              </div>
              <h1 id="hero-title">Medical Billing Company Trusted by Practices Around the USA</h1>
              <div className="hero-copy">
                <p>Clinora Medbill is a trusted provider of medical billing services in the USA, delivering accurate, compliant, and reliable revenue cycle management solutions for healthcare providers.</p>
                <p>Our experienced billing and coding team works closely with physicians, clinics, and healthcare organizations to simplify their billing processes and help keep their revenue cycle running smoothly.</p>
              </div>
              <div className="hero-actions">
                <a className="button button-large" href="mailto:info@clinoramedbill.com">Request a free billing audit <ArrowRight aria-hidden="true" size={18} /></a>
                <a className="button button-large button-ghost" href="#process">See how it works</a>
              </div>
              <div className="hero-assurance" aria-label="Service assurances">
            <a
              className="hero-google-rating"
              href={cmsSettings?.googleReviewsUrl ?? "https://www.google.com/maps/search/?api=1&query=Clinora+Medbill+LLC+Austin+TX"}
              target="_blank"
              rel="noreferrer"
              aria-label="Open ClinoraMedBill reviews on Google Maps"
            >
              <img className="hero-google-mark" src="/brand/google-g.png" alt="" width="48" height="48" />
              <span className="hero-google-copy">
                <strong>ClinoraMedBill</strong>
                <span className="hero-google-stars" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} />)}
                </span>
                <span><b>{cmsSettings?.googleRating ?? "5.0"}</b> Google Reviews</span>
              </span>
            </a>
            <span><ShieldCheck aria-hidden="true" size={17} /> 100% HIPAA-secure</span>
            <span><Check aria-hidden="true" size={17} /> No contracts</span>
            <span><MessageSquareText aria-hidden="true" size={17} /> Clear communication</span>
              </div>
          </div>
          <form className="hero-audit-form" onSubmit={(event) => submitAudit(event, "hero-audit")} aria-label="Request a free billing audit">
            <div className="hero-form-intro">
              <span>Start with clarity</span>
              <strong>Get a clear picture of your billing performance.</strong>
            </div>
            <label>
              <span>Full name</span>
              <input name="name" type="text" autoComplete="name" placeholder="Your full name" maxLength={120} required />
            </label>
            <label>
              <span>Work email</span>
              <input name="email" type="email" autoComplete="email" placeholder="you@practice.com" maxLength={200} required />
            </label>
            <label>
              <span>Phone number</span>
              <input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={40} />
            </label>
            <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1 }} />
            <button type="submit" disabled={enquiryStatus["hero-audit"] === "sending"} aria-label="Submit free billing audit request">
              {enquiryStatus["hero-audit"] === "sending" ? "Sending…" : "Request audit"} <ArrowRight aria-hidden="true" size={17} />
            </button>
            <div className="hero-form-status" role="status" aria-live="polite">
              {enquiryStatus["hero-audit"] === "success" ? "Thank you. Your request has been emailed to our team." : enquiryStatus["hero-audit"] === "error" ? "We could not send your request. Please email info@clinoramedbill.com." : ""}
            </div>
          </form>
        </div>

      </section>

      <section className="metric-ribbon home-credibility-strip" aria-label="ClinoraMedBill service commitments">
        <div className="container metric-ribbon-shell" data-reveal role="list">
          <div className="metric-commitment" role="listitem">
            <span className="metric-ribbon-icon"><Map aria-hidden="true" /></span>
            <strong>Nationwide Services</strong>
          </div>
          <div className="metric-commitment" role="listitem">
            <span className="metric-ribbon-icon"><Stethoscope aria-hidden="true" /></span>
            <strong>40+ Medical Specialties</strong>
          </div>
          <div className="metric-commitment" role="listitem">
            <span className="metric-ribbon-icon"><ShieldCheck aria-hidden="true" /></span>
            <strong>100% HIPAA Compliant</strong>
          </div>
          <div className="metric-commitment" role="listitem">
            <span className="metric-ribbon-icon"><Star aria-hidden="true" /></span>
            <strong>100% Client Satisfaction</strong>
          </div>
        </div>
      </section>

      <section id="revenue-problem" className="section partner-intro-section" aria-labelledby="partner-intro-title">
        <div className="container partner-intro-layout">
          <div className="partner-intro-copy" data-reveal>
            <h2 id="partner-intro-title">A Trusted Medical Billing Partner for Healthcare Providers</h2>
            <p>
              Clinora Medbill is a trusted medical billing and revenue cycle management company based in Austin, Texas, offering nationwide services to healthcare providers across the USA. We work with physicians, clinics, and healthcare organizations to handle the complexities of medical billing and help them maintain a more efficient and reliable revenue cycle.
            </p>
            <p>
              Our experienced billing and coding team takes care of the essential details, from accurate claim submission and payment posting to denial management and accounts receivable follow-up. We focus on getting the details right, staying on top of outstanding claims, and keeping you informed, so you can spend less time dealing with billing issues and more time focused on your patients.
            </p>
          </div>
          <figure className="partner-intro-visual" data-reveal>
            <span className="partner-intro-frame" aria-hidden="true" />
            <div className="partner-intro-media">
              <Image
                src="/media/services/01-revenue-cycle-management-4k.jpg"
                alt="Healthcare providers collaborating with ClinoraMedBill on revenue-cycle operations"
                fill
                quality={90}
                sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) 86vw, 560px"
              />
            </div>
            <figcaption className="partner-intro-location">
              <MapPin aria-hidden="true" size={17} />
              <span><small>Based in Austin, Texas</small><strong>Nationwide billing support</strong></span>
            </figcaption>
            <div className="partner-intro-status" aria-label="ClinoraMedBill workflow focus">
              <span aria-hidden="true"><i /><i /><i /></span>
              <small>Revenue operations</small>
              <strong>Clearly managed.</strong>
            </div>
          </figure>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container section-heading services-editorial-heading" data-reveal>
          <div>
            <span className="eyebrow">What we do</span>
            <h2>Revenue solutions that actually work.</h2>
          </div>
          <p>Connected services, specialty-aware teams, and a clear line of sight from patient registration to final payment.</p>
        </div>
        <MobileCarousel id="home-services-carousel" label="Medical billing services" className="container service-grid">
          {liveServices.map((service) => (
            <article className={`service-card service-photo-card service-card-${service.slug}`} key={service.title} data-reveal>
              <a className="service-card-link" href={`/services/${service.slug}`} aria-label={`Explore ${service.title}`}>
                <div className="service-card-media">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    quality={90}
                    sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1199px) calc(50vw - 38px), 340px"
                    style={{ objectPosition: service.imagePosition }}
                  />
                </div>
                <div className="service-photo-copy">
                  <h3>{service.titleLines.map((line) => <span key={line}>{line}</span>)}</h3>
                  <p>{service.text}</p>
                  <span className="service-photo-cta">Explore service <ArrowRight aria-hidden="true" size={15} /></span>
                </div>
              </a>
            </article>
          ))}
        </MobileCarousel>
      </section>

      <section id="process" className="section process-section">
        <div className="container split-heading" data-reveal>
          <div>
            <span className="eyebrow eyebrow-light">{cmsHome?.processEyebrow ?? "The RCM process"}</span>
            <h2>{cmsHome?.processTitle ?? "Every claim. Every step. Clearly managed."}</h2>
          </div>
          <p>{cmsHome?.processDescription ?? "A transparent, step-by-step process built for healthcare providers who demand accuracy, speed, and complete accountability at every stage."}</p>
        </div>
        <div className="container process-journey-track" data-reveal aria-hidden="true">
          <span className="process-journey-line" />
          {process.map((step, index) => (
            <span
              className="process-journey-node"
              key={`track-${step.title}`}
              style={{ "--process-delay": `${index * 50}ms` } as CSSProperties}
            >
              <i>{String(index + 1).padStart(2, "0")}</i>
              <em>{step.label}</em>
            </span>
          ))}
        </div>
        <MobileCarousel as="ol" id="home-process-carousel" label="Revenue cycle stages" className="container process-simple-timeline">
            {process.map((step, index) => {
              const StepIcon = step.icon;
              return (
              <li key={step.title} data-reveal style={{ "--process-delay": `${index * 50}ms` } as CSSProperties}>
                <span className="process-simple-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="process-simple-icon"><StepIcon aria-hidden="true" /></span>
                <div>
                  <span>{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
              );
            })}
        </MobileCarousel>
      </section>

      <section id="who-we-serve-preview" className="section home-audience-section" aria-labelledby="home-audience-title">
        <div className="container home-audience-layout">
          <div className="home-audience-gallery" data-reveal>
            <figure className="home-audience-photo home-audience-photo-primary">
              <img src="/media/medical-billing-workflow-4k.jpg" alt="Physician reviewing care information with a colleague in a modern clinic" />
            </figure>
            <figure className="home-audience-photo home-audience-photo-secondary">
              <img src="/media/specialties-hero-magnific-4k.jpg" alt={audiences[2].alt} />
            </figure>
            <figure className="home-audience-photo home-audience-photo-tertiary">
              <img src="/media/services/06-provider-credentialing-4k.jpg" alt="Physician reviewing practice information with a healthcare colleague" />
            </figure>
            <div className="home-audience-note">
              <strong>7</strong>
              <span>provider environments supported</span>
            </div>
          </div>
          <div className="home-audience-copy" data-reveal>
            <span className="eyebrow">Who we serve</span>
            <h2 id="home-audience-title">Built around the way healthcare teams actually work.</h2>
            <p>From independent practices to hospital systems, ClinoraMedBill adapts revenue operations to the people, workflows, and patient communities behind every claim.</p>
            <div className="home-audience-tags" aria-label="Healthcare organizations served">
              <span>Medical practices</span><span>Hospitals</span><span>Urgent care</span><span>Behavioral health</span><span>ASCs</span><span>Home health</span>
            </div>
            <a className="button button-dark" href="/who-we-serve">Explore who we serve <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
        </div>
      </section>

      <section id="specialties" className="section specialties-section">
        <div className="container specialties-layout" data-reveal>
          <div className="specialty-copy">
            <span className="eyebrow">Specialties we serve</span>
            <h2>Every specialty has its own revenue rhythm.</h2>
            <p>Specialty-aware coding and revenue workflows help reduce preventable errors while keeping communication grounded in the reality of your practice.</p>
            <a className="button button-dark" href="mailto:info@clinoramedbill.com">Discuss your specialty <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div className="specialty-cloud" aria-label="Medical specialties served">
            <div className="specialty-orbit-glow" aria-hidden="true" />
            {specialtyRows.map((row, rowIndex) => (
              <div className="specialty-lane" key={`specialty-row-${rowIndex}`}>
                <div className="specialty-run">
                  {[false, true].map((duplicate) => (
                    <div className="specialty-group" aria-hidden={duplicate || undefined} key={duplicate ? "duplicate" : "primary"}>
                      {row.map((specialty, index) => {
                        const globalIndex = specialtyRows.slice(0, rowIndex).reduce((total, item) => total + item.length, 0) + index;
                        return (
                          <div className="specialty-pill" key={`${specialty}-${duplicate ? "copy" : "original"}`}>
                            <span className="specialty-number">{String(globalIndex + 1).padStart(2, "0")}</span>
                            {globalIndex === 0 ? <Stethoscope aria-hidden="true" size={18} /> : globalIndex === 1 ? <HeartPulse aria-hidden="true" size={18} /> : null}
                            <strong>{specialty}</strong>
                            <i aria-hidden="true" />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nationwide-coverage" className="section nationwide-home-section" aria-labelledby="nationwide-home-title">
        <div className="container nationwide-home-shell" data-reveal>
          <div className="nationwide-home-copy">
            <span className="eyebrow eyebrow-light nationwide-home-eyebrow"><Map aria-hidden="true" size={16} /> Serving all 50 U.S. states</span>
            <h2 id="nationwide-home-title">Medical billing support, wherever your practice operates.</h2>
            <p>ClinoraMedBill serves healthcare providers across all 50 states with disciplined revenue-cycle workflows, clear reporting, and accountable communication.</p>
            <div className="nationwide-home-states" aria-label="Featured states">
              <span>Texas</span><span>California</span><span>Florida</span><span>New York</span><span>Illinois</span><span>New Jersey</span>
            </div>
            <a className="button button-light" href="/nationwide-solutions">Explore all 50 states <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div className="nationwide-home-map" aria-label="ClinoraMedBill serves healthcare providers throughout the United States">
            <img src="/media/usa-states-map.svg" alt="Map of the United States showing nationwide coverage" width="959" height="593" />
            <a className="map-location map-location-texas" href="/nationwide-solutions#texas"><MapPin aria-hidden="true" /> Texas</a>
            <a className="map-location map-location-california" href="/nationwide-solutions#california"><MapPin aria-hidden="true" /> California</a>
            <a className="map-location map-location-new-york" href="/nationwide-solutions#new-york"><MapPin aria-hidden="true" /> New York</a>
            <a className="map-location map-location-florida" href="/nationwide-solutions#florida"><MapPin aria-hidden="true" /> Florida</a>
            <a className="map-location map-location-illinois" href="/nationwide-solutions#illinois"><MapPin aria-hidden="true" /> Illinois</a>
            <a className="map-location map-location-new-jersey" href="/nationwide-solutions#new-jersey"><MapPin aria-hidden="true" /> New Jersey</a>
          </div>
        </div>
      </section>

      <section id="human-accountability" className="section human-story-section" data-human-scroll>
        <div className="container human-story human-benefits-stage">
          <div className="human-image-shell">
            <img
              src="/media/human-team.jpg"
              alt="Healthcare professionals reviewing revenue performance together"
              className="human-image"
              data-parallax
            />
            <div className="human-image-shade" />
          </div>
          <div className="human-opening-title" aria-hidden="true">
            <span>Human accountability</span>
            <strong>Dedicated people.<br />Clearer revenue.</strong>
            <div className="human-opening-rule">
              <i />
              <em>Scroll to meet your revenue team</em>
            </div>
          </div>
          <div className="human-story-copy human-benefits-story">
            <span className="eyebrow eyebrow-light">Why outsource billing</span>
            <h2>Benefits of Outsourcing Medical Billing</h2>
            <p>We thoroughly review a claim before submitting it to insurance like medicare or medicaid. Appropriate claims get approved more often, while others get denied more rarely. This keeps your practice working smoothly, saves time, and reduces stress.</p>
            <div className="human-benefits-list">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <details key={benefit.title}
                    name="human-benefits"
                    open={index === 0}
                    style={{ "--benefit-delay": `${180 + index * 40}ms` } as CSSProperties}
                  >
                    <summary>
                      <span><Icon aria-hidden="true" /></span>
                      <strong>{benefit.title}</strong>
                      <ChevronDown aria-hidden="true" />
                    </summary>
                    <p>{benefit.text}</p>
                  </details>
                );
              })}
            </div>
          </div>
          <div className="human-scroll-cue" aria-hidden="true">
            <span>Scroll to explore</span>
            <ChevronDown />
          </div>
        </div>
      </section>

      <section className="section home-ehr-section" aria-labelledby="home-ehr-title">
        <div className="container home-ehr-shell" data-reveal>
          <div className="home-ehr-heading">
            <span className="eyebrow">Connected workflows</span>
            <h2 id="home-ehr-title">Experience across the EHR systems your practice uses.</h2>
            <p>ClinoraMedBill works around established clinical and billing workflows, with experience across leading EHR and practice-management platforms.</p>
          </div>
          <div className="home-ehr-showcase" aria-label="Representative EHR software platform logos">
            <article className="home-ehr-feature-card">
              <span className="home-ehr-feature-mark"><img src="/brand/clinora-mark.svg" alt="" /></span>
              <span className="eyebrow">Workflow compatibility</span>
              <h3>One billing partner. Your existing systems.</h3>
              <p>Our team adapts revenue operations to established clinical workflows instead of forcing practices into a disconnected process.</p>
              <div className="home-ehr-feature-tags" aria-label="Supported workflow areas">
                <span>Clinical workflow</span>
                <span>Claims operations</span>
                <span>Performance reporting</span>
              </div>
            </article>
            <MobileCarousel id="home-ehr-carousel" label="EHR and practice-management platforms" className="home-ehr-platform-grid" role="list" continuous hideControls>
              {ehrPlatforms.map((platform, index) => (
                <span
                  className="home-ehr-platform-card"
                  role="listitem"
                  key={platform.name}
                  style={{ "--ehr-delay": `${100 + index * 40}ms` } as CSSProperties}
                >
                  <span><img src={platform.logo} alt="" loading="lazy" /></span>
                  <strong>{platform.name}</strong>
                </span>
              ))}
            </MobileCarousel>
          </div>
          <a className="button home-ehr-cta" href="/ehr-software">Explore EHR software <ArrowRight aria-hidden="true" size={18} /></a>
        </div>
      </section>

      <section id="insights" className="section insights-section">
        <div className="container blog-heading centered">
          <span className="eyebrow">{cmsHome?.insightsEyebrow ?? "Clinora insights"}</span>
          <h2>{cmsHome?.insightsTitle ?? "Practical reads for healthier revenue."}</h2>
          <p>{cmsHome?.insightsDescription ?? "Focused guidance for the people managing claims, billing performance, and specialty workflows."}</p>
          <div className="blog-controls" aria-label="Browse insights">
            <button type="button" onClick={() => scrollBlogs(-1)} aria-label="View previous insights">
              <ArrowLeft aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollBlogs(1)} aria-label="View more insights">
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="blog-carousel">
          <div className="container blog-card-grid" ref={blogRailRef}>
            {liveInsights.map((insight, index) => (
              <article key={insight.title} className="blog-card">
                <a className="blog-card-image" href={insight.link} aria-label={`Read insight: ${insight.title}`}>
                  <img src={insight.image} alt={insight.imageAlt} />
                  <span className="blog-card-count">{String(index + 1).padStart(2, "0")}</span>
                  <span className="blog-card-category">{insight.category}</span>
                </a>
                <div className="blog-card-body">
                  <span className="blog-card-time"><Clock3 aria-hidden="true" /> {insight.readTime}</span>
                  <h3>{insight.title}</h3>
                  <p>{insight.text}</p>
                  <a className="blog-card-link" href={insight.link}>
                    Read insight <span><ArrowRight aria-hidden="true" /></span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="audit" className="section audit-section">
        <div className="container audit-shell" data-reveal>
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
          <form className="audit-form" onSubmit={(event) => submitAudit(event, "billing-audit")}>
            <div className="form-heading">
              <span>Free audit request</span>
              <p>Fields marked with an asterisk (*) are required.</p>
            </div>
            <div className="form-row">
              <label>
                Full name *
                <input name="name" type="text" autoComplete="name" placeholder="Your full name" maxLength={120} required />
              </label>
              <label>
                Practice name *
                <input name="practice" type="text" autoComplete="organization" placeholder="Practice name" maxLength={160} required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Work email *
                <input name="email" type="email" autoComplete="email" placeholder="you@practice.com" maxLength={200} required />
              </label>
              <label>
                Phone number
                <input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" maxLength={40} />
              </label>
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
            <button className="button button-large button-form" type="submit" disabled={enquiryStatus["billing-audit"] === "sending"}>
              {enquiryStatus["billing-audit"] === "sending" ? "Sending…" : "Request my free audit"} <ArrowRight aria-hidden="true" size={18} />
            </button>
            <p className="form-privacy"><LockKeyhole aria-hidden="true" size={14} /> Your information is used only to respond to this request. <a href="/privacy-policy">Privacy Policy</a></p>
            <div className="form-status" role="status" aria-live="polite">
              {enquiryStatus["billing-audit"] === "success" ? "Thank you. Your request has been emailed to our team." : enquiryStatus["billing-audit"] === "error" ? "We could not send your request. Please email info@clinoramedbill.com." : ""}
            </div>
          </form>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="container footer-faq" data-reveal>
          <div className="footer-faq-heading">
            <span className="eyebrow eyebrow-light">Answers before action</span>
            <h2>Frequently asked questions</h2>
            <p>Clear answers about onboarding, security, specialties, and the complimentary audit.</p>
          </div>
          <div className="footer-faq-list">
            {liveFaqs.map((faq, index) => (
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
            <a href="#process">Our process</a>
            <a href="/who-we-serve">Who We Serve</a>
            <a href="/nationwide-solutions">Nationwide Solutions</a>
            <a href="/compliance">Security & Compliance</a>
            <a href="mailto:info@clinoramedbill.com">Free Billing Audit</a>
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
            <a href="/compliance">Security & Compliance</a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">ClinoraMedBill</div>
      </footer>
    </main>
  );
}
