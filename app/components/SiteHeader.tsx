"use client";

/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  Code2,
  FileSearch,
  MapPin,
  Menu,
  Phone,
  RefreshCcw,
  ShieldCheck,
  Stethoscope,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

export type NavigationSection = "home" | "services" | "specialties" | "who-we-serve" | "resources" | "about" | "compliance" | "nationwide";

const serviceLinks = [
  { href: "/services/revenue-cycle-management", label: "Revenue Cycle Management", icon: RefreshCcw },
  { href: "/services/medical-billing", label: "Medical Billing", icon: CircleDollarSign },
  { href: "/services/medical-coding", label: "Medical Coding", icon: Code2 },
  { href: "/services/ar-management", label: "AR Management", icon: FileSearch },
  { href: "/services/medical-billing-audits", label: "Medical Billing Audits", icon: ClipboardCheck },
  { href: "/services/provider-credentialing-enrollment", label: "Provider Credentialing & Enrollment", icon: BadgeCheck },
  { href: "/services/virtual-front-desk-services", label: "Virtual Front Desk Services", icon: Phone },
];

const companyLinks = [
  { href: "/about-us", label: "About Us", icon: Building2 },
  { href: "/contact-us", label: "Contact Us", icon: Phone },
  { href: "/nationwide-solutions", label: "Nationwide Solutions", icon: MapPin },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/ehr-software", label: "EHR Software", icon: BookOpenText },
];

const megaMenus = {
  services: {
    label: "Services",
    groups: [
      { title: "Core Revenue", links: serviceLinks.slice(0, 4) },
      { title: "Practice Support", links: serviceLinks.slice(4) },
    ],
  },
  about: {
    label: "About Us",
    groups: [
      { title: "Company", links: companyLinks.slice(0, 2) },
      { title: "Coverage & Trust", links: companyLinks.slice(2) },
    ],
  },
} as const;

type MegaMenuName = keyof typeof megaMenus;

function GroupedMegaMenu({ name, active }: { name: MegaMenuName; active?: boolean }) {
  const menu = megaMenus[name];

  return (
    <details className={`nav-details nav-details-${name}`}>
      <summary className={active ? "is-active" : undefined}>
        {menu.label} <ChevronDown aria-hidden="true" size={15} />
      </summary>
      <div className={`grouped-mega-menu grouped-mega-menu-${name}`}>
        {menu.groups.map((group) => (
          <section className="grouped-mega-group" aria-label={group.title} key={group.title}>
            <p>{group.title}</p>
            <div>
              {group.links.map(({ href, label, icon: Icon }) => (
                <a href={href} key={href}>
                  <span className="grouped-mega-icon"><Icon aria-hidden="true" size={22} /></span>
                  <span className="grouped-mega-label">{label}</span>
                  <ArrowRight className="grouped-mega-arrow" aria-hidden="true" size={16} />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>
    </details>
  );
}

export default function SiteHeader({ active = "home", overlay = false }: { active?: NavigationSection; overlay?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solid, setSolid] = useState(!overlay);

  useEffect(() => {
    if (!overlay) return;
    const update = () => setSolid(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [overlay]);

  return (
    <header className={`site-header ${solid ? "is-solid" : ""}`}>
      <div className="header-inner">
        <a className="logo-link" href="/" aria-label="ClinoraMedBill homepage">
          <img className="header-logo-mark" src="/brand/clinora-mark.svg" alt="" width="112" height="98" />
          <img className="header-logo-wordmark" src="/brand/clinora-header-wordmark.svg" alt="ClinoraMedBill" width="292" height="70" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <GroupedMegaMenu name="services" active={active === "services"} />
          <a className={active === "specialties" ? "is-active" : undefined} href="/specialties"><Stethoscope aria-hidden="true" size={15} /> Specialties</a>
          <a className={active === "who-we-serve" ? "is-active" : undefined} href="/who-we-serve"><UsersRound aria-hidden="true" size={15} /> Who We Serve</a>
          <a className={active === "resources" ? "is-active" : undefined} href="/blogs"><BookOpenText aria-hidden="true" size={15} /> Blogs</a>
          <GroupedMegaMenu name="about" active={["about", "compliance", "nationwide"].includes(active)} />
        </nav>

        <a className="button button-small header-cta" href="mailto:info@clinoramedbill.com">
          Free billing audit <ArrowRight aria-hidden="true" size={16} />
        </a>

        <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}>
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-nav" className={`mobile-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
        <details>
          <summary>Services <ChevronDown aria-hidden="true" size={16} /></summary>
          <div>{serviceLinks.map(({ href, label }) => <a href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</a>)}</div>
        </details>
        <a href="/specialties" onClick={() => setMobileOpen(false)}>Specialties</a>
        <a href="/who-we-serve" onClick={() => setMobileOpen(false)}>Who We Serve</a>
        <a href="/blogs" onClick={() => setMobileOpen(false)}>Blogs</a>
        <details>
          <summary>About Us <ChevronDown aria-hidden="true" size={16} /></summary>
          <div>{companyLinks.map(({ href, label }) => <a href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</a>)}</div>
        </details>
        <a className="button" href="mailto:info@clinoramedbill.com" onClick={() => setMobileOpen(false)}>Free billing audit</a>
      </nav>
    </header>
  );
}
