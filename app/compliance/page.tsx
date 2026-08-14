import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteConversionFooter from "../components/SiteConversionFooter";
import { pageFaqs } from "../content/faqs";
import InteriorHero from "../components/InteriorHero";

export const metadata: Metadata = {
  title: "Compliance | ClinoraMedBill",
  description:
    "Learn how ClinoraMedBill approaches HIPAA, OIG, FCA, HITECH, PCI-DSS, coding, payer, and state-level compliance.",
};

const complianceSections = [
  {
    id: "hipaa-compliance",
    title: "HIPAA Compliance",
    summary:
      "The Health Insurance Portability and Accountability Act (HIPAA) mandates that healthcare-related companies protect patients’ health information. Clinora Medbill implements safeguards designed to support the confidentiality, integrity, and security of Protected Health Information (PHI).",
    points: [
      ["Security Measures", "All PHI is stored in encrypted systems accessible only to authorized personnel."],
      ["Employee Training", "Our team undergoes regular HIPAA training to stay current with privacy best practices."],
      ["Secure Communication", "We use encrypted channels for communication so patient data remains private."],
    ],
  },
  {
    id: "oig-compliance",
    title: "OIG Compliance",
    summary:
      "The Office of Inspector General (OIG) issues guidance to prevent fraud, waste, and abuse in federal healthcare programs. Our corporate compliance approach aligns with OIG guidance to support ethical billing practices and help avoid fraudulent claims.",
    points: [
      ["Corporate Compliance Plan", "We regularly audit and assess our processes to prevent and detect non-compliant activities."],
      ["Ethical Billing", "We prioritize integrity throughout claims and billing procedures to safeguard clients and patients."],
      ["Staff Training", "Team members receive compliance and ethics training that reinforces a culture of honesty."],
    ],
  },
  {
    id: "false-claims-act",
    title: "False Claims Act Compliance",
    summary:
      "The False Claims Act (FCA) protects the government against fraud by prohibiting false or inaccurate billing claims. Clinora Medbill supports FCA compliance by carefully reviewing and validating claims before submission.",
    points: [
      ["Claims Accuracy", "Each claim undergoes a thorough review process designed to prevent errors."],
      ["Double-Check Procedures", "We combine software-supported checks with manual review to help confirm that claims are legitimate and accurate."],
      ["Fraud Prevention", "Our processes are designed to prevent fraudulent claims and protect against unintentional overbilling."],
    ],
  },
  {
    id: "hitech-compliance",
    title: "HITECH Act Compliance",
    summary:
      "The Health Information Technology for Economic and Clinical Health (HITECH) Act strengthens HIPAA protections, particularly for electronically stored and transmitted data. We follow HITECH standards for electronic PHI (ePHI) and maintain procedures for responding to security incidents.",
    points: [
      ["Enhanced Security Protocols", "Our ePHI systems follow security measures aligned with HITECH requirements."],
      ["Breach Notification", "We maintain a response plan for addressing and reporting applicable security incidents."],
      ["Privacy by Design", "Data protection is considered across systems that handle patient information."],
    ],
  },
  {
    id: "pci-dss-compliance",
    title: "PCI-DSS Compliance",
    summary:
      "The Payment Card Industry Data Security Standard (PCI-DSS) helps safeguard cardholder data. Clinora Medbill follows applicable PCI-DSS requirements to support secure payment processing.",
    points: [
      ["Encrypted Payment Processing", "Card payments are encrypted for additional security."],
      ["Access Control", "Only authorized personnel handle sensitive payment information."],
      ["Data Security Training", "Staff training reinforces the practices required to reduce payment-data risk."],
    ],
  },
  {
    id: "state-compliance",
    title: "State-Level Compliance",
    summary:
      "States may impose specific requirements for medical billing, licensing, and data handling. We monitor relevant state-level obligations across the areas in which we operate.",
    points: [
      ["Licensing", "We maintain applicable licenses required for the states we serve."],
      ["Data Handling", "Our privacy protocols are designed to align with applicable federal and state regulations."],
      ["Adaptability", "We monitor changes in state-specific rules and update our practices as appropriate."],
    ],
  },
  {
    id: "payer-policies",
    title: "Adherence to Payer Policies",
    summary:
      "Insurance providers maintain their own claims-processing requirements. Clinora Medbill monitors requirements from Medicare, Medicaid, and private insurers to support accurate, timely submissions.",
    points: [
      ["Regular Updates", "We update our processes to reflect relevant changes in payer policies."],
      ["Specialized Knowledge", "Our billing team works with payer requirements to help reduce avoidable claim denials."],
      ["Accurate Coding and Documentation", "We support claims with coding and documentation aligned to applicable payer standards."],
    ],
  },
  {
    id: "coding-compliance",
    title: "Coding Compliance",
    summary:
      "Accurate coding is fundamental to compliant billing. We work with current ICD, CPT, and HCPCS standards so procedures and diagnoses can be documented correctly.",
    points: [
      ["Certified Coders", "Our coders maintain relevant certifications and stay informed about current standards."],
      ["Regular Training", "Continuous education helps our team respond to changes in codes and guidance."],
      ["Error Reduction", "Regular audits help identify and minimize coding errors that could affect claim acceptance."],
    ],
  },
  {
    id: "fdcpa-compliance",
    title: "Fair Debt Collection Practices",
    summary:
      "When collection activity is required, our approach follows applicable Fair Debt Collection Practices Act (FDCPA) standards and reflects our commitment to fair, respectful patient treatment.",
    points: [
      ["Ethical Collections", "We follow applicable standards intended to prevent harassment and unfair practices."],
      ["Transparency", "We support clear communication with patients regarding outstanding balances."],
      ["Respectful Interaction", "Our approach to collections is designed to uphold patient dignity."],
    ],
  },
  {
    id: "training-and-privacy",
    title: "Employee Training and Data Privacy Protocols",
    summary:
      "Employee education and controlled access are central to maintaining high compliance standards. Our training and privacy protocols reflect established industry practices.",
    points: [
      ["Continuous Training", "Employees receive ongoing training on privacy and security protocols."],
      ["Regular Assessments", "We conduct periodic security assessments to identify and address vulnerabilities."],
      ["Strict Access Control", "Access to sensitive information is limited to authorized personnel."],
    ],
  },
] as const;

export default function CompliancePage() {
  return (
    <>
      <a className="skip-link" href="#compliance-content">Skip to compliance information</a>

      <SiteHeader active="compliance" />

      <main id="compliance-content" className="legal-page">
        <InteriorHero
          titleId="compliance-title"
          eyebrow="Responsible, secure revenue operations"
          title="Compliance"
          description="How ClinoraMedBill approaches regulatory standards, data protection, ethical billing, and operational accountability."
          imageSrc="/media/hero-mapped/15-compliance-hero-desktop.png"
          imageAlt="Healthcare team working within a secure clinical environment"
          imagePosition="66% center"
          ctaHref="#hipaa-compliance"
          ctaLabel="Explore our approach"
          badgeIcon={ShieldCheck}
          badgeEyebrow="ClinoraMedBill compliance"
          badgeText="Privacy. Accuracy. Accountability."
        />

        <div className="container legal-layout">
          <aside className="legal-toc" aria-label="Compliance page contents">
            <p>On this page</p>
            <ol>
              {complianceSections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="legal-article">
            <div className="legal-intro">
              <p>
                At Clinora Medbill, compliance with regulatory standards is at the heart of
                everything we do. We recognize the critical role that accurate, secure, and
                ethical medical billing practices play in healthcare.
              </p>
              <p>
                Our compliance approach is designed to protect patient information, support
                billing accuracy, and reinforce the trust our clients place in us as a healthcare
                billing partner.
              </p>
            </div>

            {complianceSections.map((section, index) => (
              <section id={section.id} className="legal-section" key={section.id}>
                <span className="legal-section-number">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                <p>{section.summary}</p>
                <ul>
                  {section.points.map(([label, detail]) => (
                    <li key={label}><strong>{label}:</strong> {detail}</li>
                  ))}
                </ul>
              </section>
            ))}
          </article>
        </div>
      </main>

      <SiteConversionFooter faqs={pageFaqs.compliance} faqEyebrow="Compliance answers" />
    </>
  );
}
