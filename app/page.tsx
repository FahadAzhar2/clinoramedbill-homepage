"use client";
/* eslint-disable @next/next/no-img-element */

import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Code2,
  FileSearch,
  HeartPulse,
  Layers3,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

const services = [
  {
    icon: Layers3,
    title: "Revenue Cycle Management",
    text: "End-to-end RCM from patient registration through final payment. We handle every touchpoint so your team can focus entirely on patient care — not paperwork.",
  },
  {
    icon: Code2,
    title: "Medical Coding",
    text: "ICD-10, CPT & HCPCS certified coders across all specialties, maximizing reimbursement and accuracy.",
  },
  {
    icon: RefreshCcw,
    title: "AR Management",
    text: "Proactive follow-up that drastically reduces days in AR and recovers stalled reimbursements.",
  },
  {
    icon: UserRoundCheck,
    title: "Eligibility Verification",
    text: "Real-time insurance verification before every encounter — stopping denials before they start.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    text: "Live KPI dashboards and financial reporting giving full visibility into every dollar flowing in.",
  },
  {
    icon: FileSearch,
    title: "Denial Management",
    text: "Root-cause analysis and rapid re-submission turns every denied claim into recovered revenue.",
  },
  {
    icon: CircleDollarSign,
    title: "Patient Billing",
    text: "Clear, patient-friendly statements with flexible payment options that improve collection rates.",
  },
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

const specialties = [
  "Family Medicine",
  "Internal Medicine",
  "Cardiology",
  "Orthopedics",
  "Pediatrics",
  "Behavioral Health",
  "Dermatology",
  "Urgent Care",
  "Neurology",
  "Gastroenterology",
  "Telehealth",
  "Physical Therapy",
  "Oncology",
  "Radiology",
  "Obstetrics & Gynecology",
  "Multi-Physician Groups",
];

const specialtyRows = [
  specialties.slice(0, 5),
  specialties.slice(5, 11),
  specialties.slice(11),
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "HIPAA Certified",
    text: "Full HIPAA compliance with encrypted data handling, regular audits, and zero-tolerance breach policy.",
  },
  {
    icon: Activity,
    title: "Real-Time Visibility",
    text: "Live dashboards give you 24/7 insight into claim status, collections, and your full revenue pipeline.",
  },
  {
    icon: Sparkles,
    title: "48-Hour Onboarding",
    text: "Seamless EHR integration and full workflow setup within 48 hours — minimal disruption guaranteed.",
  },
  {
    icon: UsersRound,
    title: "Dedicated Account Team",
    text: "A named account manager who knows your practice, your payers, and your revenue goals inside-out.",
  },
];

const megaColumns = [
  {
    title: "Revenue operations",
    links: ["Revenue Cycle Management", "Medical Coding", "AR Management", "Denial Management"],
  },
  {
    title: "Front office",
    links: ["Eligibility Verification", "Patient Billing", "Analytics & Reporting"],
  },
];

const faqs = [
  {
    question: "How quickly can ClinoraMedBill onboard our practice?",
    answer: "Our workflow, EHR integration, and account-team setup can be completed within 48 hours with minimal disruption to your practice.",
  },
  {
    question: "How is patient and practice information protected?",
    answer: "ClinoraMedBill uses HIPAA-conscious workflows, encrypted data handling, regular audits, and controlled access across the revenue cycle.",
  },
  {
    question: "Do you support specialty-specific billing?",
    answer: "Yes. Our coding and revenue-cycle workflows account for the payer rules, documentation patterns, and billing details that differ across medical specialties.",
  },
  {
    question: "Do we need to sign a long-term contract for an audit?",
    answer: "No. The complimentary billing audit has no contract and no obligation. It is designed to give your practice a clear view of potential revenue leakage.",
  },
];

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [activeProcess, setActiveProcess] = useState(0);

  useEffect(() => {
    const onScroll = () => setHeaderSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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

      const updateParallax = () => {
        frame = 0;
        document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((item) => {
          const rect = item.getBoundingClientRect();
          const offset = Math.max(-42, Math.min(42, (window.innerHeight / 2 - rect.top - rect.height / 2) * 0.06));
          item.style.setProperty("--parallax-y", `${offset}px`);
        });
        document.querySelectorAll<HTMLElement>("[data-human-scroll]").forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.max(1, rect.height - window.innerHeight);
          const progress = Math.max(0, Math.min(1, -rect.top / distance));
          const open = Math.max(0, Math.min(1, progress / 0.28));
          const copy = Math.max(0, Math.min(1, (progress - 0.22) / 0.24));
          const details = Math.max(0, Math.min(1, (progress - 0.42) / 0.26));
          section.style.setProperty("--human-progress", progress.toFixed(3));
          section.style.setProperty("--human-open", open.toFixed(3));
          section.style.setProperty("--human-copy", copy.toFixed(3));
          section.style.setProperty("--human-details", details.toFixed(3));
        });
      };
      const onMotionScroll = () => {
        if (!frame) frame = window.requestAnimationFrame(updateParallax);
      };
      updateParallax();
      window.addEventListener("scroll", onMotionScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("scroll", onMotionScroll);
        if (frame) window.cancelAnimationFrame(frame);
        metricFrames.forEach((request) => window.cancelAnimationFrame(request));
        observer?.disconnect();
        metricObserver?.disconnect();
      };
    }

    revealItems.forEach((item) => item.classList.add("is-visible"));
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
      metricObserver?.disconnect();
    };
  }, []);

  const submitAudit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main-content">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className={`site-header ${headerSolid ? "is-solid" : ""}`}>
        <div className="header-inner">
          <a className="logo-link" href="#top" aria-label="ClinoraMedBill home">
            <img src="/brand/clinora-primary.svg" alt="ClinoraMedBill" width="348" height="180" />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <details className="nav-details">
              <summary>
                Services <ChevronDown aria-hidden="true" size={15} />
              </summary>
              <div className="mega-menu">
                <div className="mega-intro">
                  <span className="eyebrow">Revenue that moves</span>
                  <h2>One accountable team for your entire billing cycle.</h2>
                  <a href="#services">
                    Explore all services <ArrowRight aria-hidden="true" size={16} />
                  </a>
                </div>
                {megaColumns.map((column) => (
                  <div className="mega-column" key={column.title}>
                    <p>{column.title}</p>
                    {column.links.map((link) => (
                      <a href="#services" key={link}>
                        {link}
                      </a>
                    ))}
                  </div>
                ))}
                <div className="mega-proof">
                  <ShieldCheck aria-hidden="true" />
                  <strong>Secure by design</strong>
                  <span>HIPAA-conscious workflows and encrypted data handling.</span>
                </div>
              </div>
            </details>
            <a href="#process">How it works</a>
            <a href="#specialties">Specialties</a>
            <a href="#why-clinora">Why Clinora</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="button button-small header-cta" href="#audit">
            Free billing audit <ArrowRight aria-hidden="true" size={16} />
          </a>

          <button
            className="mobile-menu-button"
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <nav id="mobile-nav" className={`mobile-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
          <a href="#services" onClick={() => setMobileOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMobileOpen(false)}>How it works</a>
          <a href="#specialties" onClick={() => setMobileOpen(false)}>Specialties</a>
          <a href="#why-clinora" onClick={() => setMobileOpen(false)}>Why Clinora</a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>Contact</a>
          <a className="button" href="#audit" onClick={() => setMobileOpen(false)}>Free billing audit</a>
        </nav>
      </header>

      <section id="top" className="hero" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/media/hero-poster.jpg"
          aria-hidden="true"
          ref={(node) => {
            if (!node) return;
            if (videoPaused) node.pause();
          }}
        >
          <source src="/media/clinora-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-wash" aria-hidden="true" />

        <div className="container hero-content" data-reveal>
          <div className="hero-kicker">
            <span className="status-dot" aria-hidden="true" />
            Medical billing & revenue cycle management
          </div>
          <h1 id="hero-title">
            Recover more. <span>Bill smarter.</span><br />
            Grow with clarity.
          </h1>
          <p className="hero-copy">
            AI-powered medical billing that maximizes reimbursements, slashes denials, and puts your practice back in full control of its revenue cycle.
          </p>
          <div className="hero-actions">
            <a className="button button-large" href="#audit">
              Request your free billing audit <ArrowRight aria-hidden="true" size={18} />
            </a>
            <a className="button button-large button-ghost" href="#process">
              See how we manage RCM
            </a>
          </div>
          <div className="hero-assurance" aria-label="Service assurances">
            <span><ShieldCheck aria-hidden="true" size={17} /> 100% HIPAA-secure</span>
            <span><Check aria-hidden="true" size={17} /> No contracts</span>
            <span><MessageSquareText aria-hidden="true" size={17} /> Clear communication</span>
          </div>
          <form className="hero-audit-form" onSubmit={submitAudit} aria-label="Request a free billing audit">
            <div className="hero-form-intro">
              <span>Start with clarity</span>
              <strong>Request a free billing audit</strong>
            </div>
            <label>
              <span>Practice name</span>
              <input name="hero-practice" type="text" autoComplete="organization" placeholder="Your practice" required />
            </label>
            <label>
              <span>Work email</span>
              <input name="hero-email" type="email" autoComplete="email" placeholder="you@practice.com" required />
            </label>
            <label>
              <span>Specialty</span>
              <select name="hero-specialty" defaultValue="" required>
                <option value="" disabled>Select specialty</option>
                {specialties.map((specialty) => <option value={specialty} key={`hero-${specialty}`}>{specialty}</option>)}
                <option value="Other">Other</option>
              </select>
            </label>
            <button type="submit" aria-label="Submit free billing audit request">
              Get my audit <ArrowRight aria-hidden="true" size={17} />
            </button>
            <div className="hero-form-status" role="status" aria-live="polite">
              {submitted ? "Request received for this prototype." : ""}
            </div>
          </form>
        </div>

        <div className="hero-motion-rail" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <button
          className="video-control"
          type="button"
          aria-pressed={videoPaused}
          onClick={(event) => {
            const video = event.currentTarget.parentElement?.querySelector("video");
            if (!video) return;
            if (videoPaused) video.play();
            else video.pause();
            setVideoPaused(!videoPaused);
          }}
        >
          {videoPaused ? "Play background motion" : "Pause background motion"}
        </button>
      </section>

      <section className="metric-ribbon" aria-label="Performance metrics">
        <div className="container metric-ribbon-shell" data-reveal>
          <div className="metric-ribbon-head">
            <span><Activity aria-hidden="true" /> Revenue performance</span>
            <small>Operating benchmarks, made visible.</small>
          </div>
          <div className="metrics">
            <div>
              <span className="metric-ribbon-icon"><CheckCircle2 aria-hidden="true" /></span>
              <strong
                data-count-to="98.7"
                data-count-decimals="1"
                data-count-suffix="%"
                aria-label="98.7 percent"
              >98.7%</strong>
              <span>Clean claim rate</span>
              <i className="metric-ribbon-progress" aria-hidden="true"><b style={{ width: "98.7%" }} /></i>
            </div>
            <div>
              <span className="metric-ribbon-icon"><FileSearch aria-hidden="true" /></span>
              <strong
                data-count-to="1"
                data-count-prefix="&lt;"
                data-count-suffix="%"
                data-count-delay="90"
                aria-label="Less than 1 percent"
              >&lt;1%</strong>
              <span>Denial rate</span>
              <i className="metric-ribbon-progress" aria-hidden="true"><b style={{ width: "18%" }} /></i>
            </div>
            <div>
              <span className="metric-ribbon-icon"><TrendingUp aria-hidden="true" /></span>
              <strong
                data-count-to="28"
                data-count-prefix="&lt;"
                data-count-suffix=" days"
                data-count-delay="180"
                aria-label="Less than 28 days"
              >&lt;28 days</strong>
              <span>Average A/R days</span>
              <i className="metric-ribbon-progress" aria-hidden="true"><b style={{ width: "72%" }} /></i>
            </div>
            <div>
              <span className="metric-ribbon-icon"><ShieldCheck aria-hidden="true" /></span>
              <strong
                data-count-to="99.9"
                data-count-decimals="1"
                data-count-suffix="%"
                data-count-delay="270"
                aria-label="99.9 percent"
              >99.9%</strong>
              <span>HIPAA compliance</span>
              <i className="metric-ribbon-progress" aria-hidden="true"><b style={{ width: "99.9%" }} /></i>
            </div>
          </div>
        </div>
      </section>

      <section className="section clarity-section">
        <div className="container split-heading" data-reveal>
          <div>
            <span className="eyebrow">The revenue problem</span>
            <h2>Billing complexity should not obscure your financial health.</h2>
          </div>
          <div className="clarity-copy">
            <p>
              ClinoraMedBill replaces fragmented billing tasks with one organized, accountable revenue operation—so your practice can see what is happening, what needs attention, and what comes next.
            </p>
            <a className="text-link" href="#services">See the complete service model <ArrowRight aria-hidden="true" size={16} /></a>
          </div>
        </div>
        <div className="container clarity-track">
          <article data-reveal>
            <span>01</span>
            <FileSearch aria-hidden="true" />
            <h3>Find revenue leakage</h3>
            <p>Surface coding gaps, preventable denials, and stalled reimbursements.</p>
          </article>
          <div className="track-arrow" aria-hidden="true"><ArrowRight /></div>
          <article data-reveal>
            <span>02</span>
            <ClipboardCheck aria-hidden="true" />
            <h3>Run the full cycle</h3>
            <p>Coordinate eligibility, coding, claims, posting, appeals, and collections.</p>
          </article>
          <div className="track-arrow" aria-hidden="true"><ArrowRight /></div>
          <article data-reveal>
            <span>03</span>
            <TrendingUp aria-hidden="true" />
            <h3>Improve with evidence</h3>
            <p>Use clear reporting and monthly reviews to keep performance moving.</p>
          </article>
        </div>
      </section>

      <section id="services" className="section services-section">
        <div className="container section-heading centered" data-reveal>
          <span className="eyebrow">What we do</span>
          <h2>Revenue solutions that actually work.</h2>
          <p>Connected services, specialty-aware teams, and a clear line of sight from patient registration to final payment.</p>
        </div>
        <div className="container service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article className={index === 0 ? "service-card featured tilt-card" : "service-card tilt-card"} key={service.title} data-reveal>
                <div className="service-icon"><Icon aria-hidden="true" /></div>
                <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href="#audit" aria-label={`Request an audit for ${service.title}`}>
                  Learn more <ArrowRight aria-hidden="true" size={16} />
                </a>
              </article>
            );
          })}
          <article className="service-card service-cta-card tilt-card" data-reveal>
            <div>
              <span className="eyebrow">Not sure where revenue is leaking?</span>
              <h3>Start with an evidence-based billing audit.</h3>
            </div>
            <a className="button button-light" href="#audit">Request a free audit <ArrowRight aria-hidden="true" size={17} /></a>
          </article>
        </div>
      </section>

      <section className="flow-bridge" aria-label="Connected revenue operation">
        <div className="container flow-bridge-shell" data-reveal>
          <div className="flow-endpoint">
            <span><Stethoscope aria-hidden="true" /></span>
            <div>
              <small>Starts with</small>
              <strong>Patient encounter</strong>
            </div>
          </div>
          <div className="flow-bridge-core">
            <span className="flow-bridge-kicker"><Activity aria-hidden="true" /> One accountable system</span>
            <strong>From visit to payment, nothing gets lost.</strong>
            <div className="flow-signal-track" aria-hidden="true">
              <span />
              <i />
              <i />
              <i />
            </div>
            <small>Clinora manages every handoff with clear ownership and visibility.</small>
          </div>
          <div className="flow-endpoint flow-endpoint-revenue">
            <span><CircleDollarSign aria-hidden="true" /></span>
            <div>
              <small>Ends with</small>
              <strong>Collected revenue</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="section process-section">
        <div className="container split-heading" data-reveal>
          <div>
            <span className="eyebrow eyebrow-light">The RCM process</span>
            <h2>Every claim. Every step. Clearly managed.</h2>
          </div>
          <p>A transparent, step-by-step process built for healthcare providers who demand accuracy, speed, and complete accountability at every stage.</p>
        </div>
        <div className="container process-layout">
          <ol className="process-list" aria-label="Revenue cycle stages" data-reveal>
            {process.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = activeProcess === index;
              return (
              <li key={step.title} className={isActive ? "is-active" : ""}>
                <button
                  type="button"
                  className="process-step"
                  aria-pressed={isActive}
                  onClick={() => setActiveProcess(index)}
                  onFocus={() => setActiveProcess(index)}
                  onMouseEnter={() => setActiveProcess(index)}
                >
                  <span className="process-marker">
                    <StepIcon aria-hidden="true" />
                    <small>{String(index + 1).padStart(2, "0")}</small>
                  </span>
                  <span className="process-content">
                    <span>{step.label}</span>
                    <strong>{step.title}</strong>
                    <small>{step.text}</small>
                  </span>
                  <ArrowRight className="process-arrow" aria-hidden="true" />
                </button>
              </li>
              );
            })}
          </ol>
          <div
            className="process-proof"
            data-reveal
            data-stage={String(activeProcess + 1).padStart(2, "0")}
            role="region"
            aria-label={`Stage ${activeProcess + 1}: ${process[activeProcess].title}`}
          >
            <div className="dashboard-head">
              <div>
                <span className="dashboard-dot" />
                <span className="dashboard-dot" />
                <span className="dashboard-dot" />
              </div>
              <span>Live revenue operations</span>
              <strong>{String(activeProcess + 1).padStart(2, "0")} / 06</strong>
            </div>
            <div className="dashboard-body">
              <div className="dashboard-stage-title">
                <span>{process[activeProcess].label}</span>
                <strong>{process[activeProcess].title}</strong>
              </div>
              <div className="dashboard-kpi">
                <span>{process[activeProcess].metricLabel}</span>
                <strong key={process[activeProcess].metric}>{process[activeProcess].metric}</strong>
                <small><TrendingUp size={13} /> {process[activeProcess].signal}</small>
              </div>
              <div className="dashboard-graph">
                {process[activeProcess].bars.map((height, index) => (
                  <i key={`${activeProcess}-${index}`} style={{ height: `${height}%`, animationDelay: `${index * 45}ms` }} />
                ))}
              </div>
              <div className="dashboard-list">
                <div><span><BadgeCheck size={16} /> Stage validation</span><strong>Complete</strong></div>
                <div><span><RefreshCcw size={16} /> {process[activeProcess].label}</span><strong>Active</strong></div>
                <div><span><BarChart3 size={16} /> Team visibility</span><strong>Live</strong></div>
              </div>
              <div className="dashboard-route" aria-hidden="true">
                {process.map((step, index) => (
                  <i key={step.title} className={index <= activeProcess ? "is-complete" : ""}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </i>
                ))}
              </div>
            </div>
            <div className="proof-caption"><LockKeyhole size={15} /> Secure access · Clear audit trail · Actionable reporting</div>
          </div>
        </div>
      </section>

      <section className="section proof-section">
        <div className="container proof-shell" data-reveal>
          <div className="proof-intro">
            <div>
              <span className="eyebrow eyebrow-light">Operational outcomes</span>
              <h2>Performance you can see.</h2>
            </div>
            <div className="proof-live" aria-label="Performance snapshot">
              <i aria-hidden="true" />
              Performance snapshot
            </div>
          </div>
          <div className="proof-metrics" role="list" aria-label="ClinoraMedBill performance metrics">
            <article className="proof-metric" role="listitem">
              <span className="metric-index">01</span>
              <div className="metric-icon"><CircleDollarSign aria-hidden="true" /></div>
              <strong data-count-to="2.1" data-count-decimals="1" data-count-prefix="$" data-count-suffix="B+" data-count-delay="0" aria-label="2.1 billion dollars plus">$2.1B+</strong>
              <span>Revenue processed</span>
              <div className="metric-progress" aria-hidden="true"><i /></div>
            </article>
            <article className="proof-metric" role="listitem">
              <span className="metric-index">02</span>
              <div className="metric-icon"><Sparkles aria-hidden="true" /></div>
              <strong data-count-to="48" data-count-suffix="hr" data-count-delay="100" aria-label="48 hours">48hr</strong>
              <span>Onboarding time</span>
              <div className="metric-progress" aria-hidden="true"><i /></div>
            </article>
            <article className="proof-metric" role="listitem">
              <span className="metric-index">03</span>
              <div className="metric-icon"><Activity aria-hidden="true" /></div>
              <strong data-count-to="8.4" data-count-decimals="1" data-count-suffix="d" data-count-delay="200" aria-label="8.4 days">8.4d</strong>
              <span>Average days in A/R</span>
              <div className="metric-progress" aria-hidden="true"><i /></div>
            </article>
            <article className="proof-metric" role="listitem">
              <span className="metric-index">04</span>
              <div className="metric-icon"><ShieldCheck aria-hidden="true" /></div>
              <strong data-count-to="99.9" data-count-decimals="1" data-count-suffix="%" data-count-delay="300" aria-label="99.9 percent">99.9%</strong>
              <span>HIPAA compliance</span>
              <div className="metric-progress" aria-hidden="true"><i /></div>
            </article>
          </div>
        </div>
      </section>

      <section id="specialties" className="section specialties-section">
        <div className="container specialties-layout" data-reveal>
          <div className="specialty-copy">
            <span className="eyebrow">Specialties we serve</span>
            <h2>Every specialty has its own revenue rhythm.</h2>
            <p>Specialty-aware coding and revenue workflows help reduce preventable errors while keeping communication grounded in the reality of your practice.</p>
            <a className="button button-dark" href="#audit">Discuss your specialty <ArrowRight aria-hidden="true" size={17} /></a>
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

      <section className="section human-story-section" data-human-scroll>
        <div className="container human-story" data-reveal>
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
          <div className="human-story-copy">
            <span className="eyebrow eyebrow-light">Your team, not a ticket number</span>
            <h2>People who know your practice—and keep revenue moving.</h2>
            <p>Your named account team stays close to your workflow, payers, and goals—turning every report into a clear next action.</p>
            <div className="human-proof-row">
              <div>
                <UsersRound aria-hidden="true" />
                <span>Account lead</span>
                <strong>One responsible point of contact</strong>
              </div>
              <div>
                <MessageSquareText aria-hidden="true" />
                <span>Reporting</span>
                <strong>Clear updates and next actions</strong>
              </div>
            </div>
            <a className="button button-light" href="#audit">Talk to a revenue specialist <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div className="human-scroll-cue" aria-hidden="true">
            <span>Scroll to explore</span>
            <ChevronDown />
          </div>
        </div>
      </section>

      <section id="why-clinora" className="section why-section">
        <div className="container section-heading centered" data-reveal>
          <span className="eyebrow">Why ClinoraMedBill</span>
          <h2>Built for healthcare. Obsessed with clear execution.</h2>
          <p>Secure workflows, responsive people, and transparent performance—without making your practice adapt to a black box.</p>
        </div>
        <div className="container benefit-grid">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article key={benefit.title} className="tilt-card" data-reveal>
                <div className="benefit-icon"><Icon aria-hidden="true" /></div>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="audit" className="section audit-section">
        <div className="container audit-shell" data-reveal>
          <div className="audit-copy">
            <span className="eyebrow eyebrow-light">Complimentary billing audit</span>
            <h2>Stop leaving revenue on the table.</h2>
            <p>See exactly where your practice could be recovering more. No contracts. No obligations. Just clarity.</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Review of billing performance indicators</li>
              <li><CheckCircle2 aria-hidden="true" /> Identification of preventable revenue leakage</li>
              <li><CheckCircle2 aria-hidden="true" /> Clear, practical next-step recommendations</li>
            </ul>
          </div>
          <form className="audit-form" onSubmit={submitAudit}>
            <div className="form-heading">
              <span>Free audit request</span>
              <p>Fields marked with an asterisk (*) are required.</p>
            </div>
            <div className="form-row">
              <label>
                Full name *
                <input name="name" type="text" autoComplete="name" required />
              </label>
              <label>
                Practice name *
                <input name="practice" type="text" autoComplete="organization" required />
              </label>
            </div>
            <div className="form-row">
              <label>
                Work email *
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Phone number
                <input name="phone" type="tel" autoComplete="tel" />
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
            <button className="button button-large button-form" type="submit">
              Request my free audit <ArrowRight aria-hidden="true" size={18} />
            </button>
            <p className="form-privacy"><LockKeyhole aria-hidden="true" size={14} /> Your information is used only to respond to this request.</p>
            <div className="form-status" role="status" aria-live="polite">
              {submitted ? "Thank you. Your prototype request has been received." : ""}
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
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
        <div className="container footer-top">
          <div className="footer-brand">
            <img src="/brand/clinora-primary.svg" alt="ClinoraMedBill" width="348" height="180" />
            <p>Professional medical billing agency delivering accurate, efficient, and reliable revenue cycle management for healthcare providers nationwide.</p>
            <a href="#audit" className="button button-light">Request a free billing audit <ArrowRight aria-hidden="true" size={16} /></a>
          </div>
          <div className="footer-column">
            <h2>Services</h2>
            <a href="#services">Revenue Cycle Management</a>
            <a href="#services">Medical Coding</a>
            <a href="#services">AR Management</a>
            <a href="#services">Eligibility Verification</a>
            <a href="#services">Denial Management</a>
          </div>
          <div className="footer-column">
            <h2>Specialties</h2>
            <a href="#specialties">Family Medicine</a>
            <a href="#specialties">Cardiology</a>
            <a href="#specialties">Behavioral Health</a>
            <a href="#specialties">Urgent Care</a>
            <a href="#specialties">All specialties</a>
          </div>
          <div className="footer-column">
            <h2>Company</h2>
            <a href="#why-clinora">About Clinora</a>
            <a href="#process">Our process</a>
            <a href="#why-clinora">Security & Compliance</a>
            <a href="#audit">Free Billing Audit</a>
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
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms</a>
            <a href="#contact">Accessibility Statement</a>
            <a href="#why-clinora">Security & Compliance</a>
          </div>
        </div>
        <div className="footer-wordmark" aria-hidden="true">ClinoraMedBill</div>
      </footer>
    </main>
  );
}
