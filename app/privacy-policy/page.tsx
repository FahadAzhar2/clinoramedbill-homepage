/* eslint-disable @next/next/no-html-link-for-pages -- Vinext's next/link shim currently triggers duplicate-React hook errors. */
import type { Metadata } from "next";
import { LockKeyhole, Mail, MapPin } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import InteriorHero from "../components/InteriorHero";
import SiteFooter from "../components/SiteFooter";

export const metadata: Metadata = {
  title: "Privacy Policy | ClinoraMedBill",
  description:
    "Learn how ClinoraMedBill collects, uses, protects, and retains personal information.",
};

const sections = [
  { id: "information-we-collect", label: "Information we collect" },
  { id: "how-we-use-information", label: "How we use information" },
  { id: "data-protection", label: "Data protection" },
  { id: "cookies", label: "Use of cookies" },
  { id: "third-party-links", label: "Third-party links" },
  { id: "your-rights", label: "Your rights" },
  { id: "data-retention", label: "Data retention" },
  { id: "childrens-privacy", label: "Children’s privacy" },
  { id: "policy-changes", label: "Policy changes" },
  { id: "contact-us", label: "Contact us" },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <a className="skip-link" href="#privacy-content">
        Skip to privacy policy
      </a>

      <SiteHeader />

      <main id="privacy-content" className="legal-page">
        <InteriorHero
          titleId="privacy-title"
          eyebrow="Your information, handled responsibly"
          title="Privacy Policy"
          description="Clear information about what we collect, why we use it, and how we protect it."
          imageSrc="/media/hero-mapped/16-privacy-policy-hero-desktop.png"
          imageAlt="Healthcare professional reviewing secure practice information"
          imagePosition="66% center"
          ctaHref="#information-we-collect"
          ctaLabel="Review the policy"
          badgeIcon={LockKeyhole}
          badgeEyebrow="ClinoraMedBill privacy"
          badgeText="Clear handling. Responsible protection."
        />

        <div className="container legal-layout">
          <aside className="legal-toc" aria-label="Privacy policy contents">
            <p>On this page</p>
            <ol>
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.label}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="legal-article">
            <div className="legal-intro">
              <p>
                Clinora Medbill (“we,” “us,” or “our”) is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, and protect the personal
                information you provide when you visit our website, www.clinoramedbill.com (the
                “Site”), or interact with us through our services.
              </p>
              <p>
                By using our Site, you agree to the collection and use of information in
                accordance with this policy.
              </p>
            </div>

            <section id="information-we-collect" className="legal-section">
              <span className="legal-section-number">01</span>
              <h2>Information We Collect</h2>
              <p>
                We collect personal information directly from you when you fill out forms on our
                website, such as the “Contact Us” form. The information we may collect includes:
              </p>
              <ul>
                <li>Full Name</li>
                <li>Practice Name</li>
                <li>Email Address</li>
                <li>Physical Address</li>
                <li>Contact Number</li>
                <li>State of Practice</li>
              </ul>
              <p>
                This information is used solely for the purpose of communicating with you
                regarding our services and is never shared or sold to third parties.
              </p>
            </section>

            <section id="how-we-use-information" className="legal-section">
              <span className="legal-section-number">02</span>
              <h2>How We Use Your Information</h2>
              <p>The information we collect is used for the following purposes:</p>
              <ul>
                <li>To respond to your inquiries and provide you with requested services.</li>
                <li>
                  To improve the quality of our services by personalizing your experience on our
                  Site.
                </li>
                <li>
                  To communicate with you about updates, services, or special offers that may be
                  relevant to you.
                </li>
              </ul>
              <p>
                Your data is used exclusively for communication purposes and is not shared with
                any external parties unless required by law.
              </p>
            </section>

            <section id="data-protection" className="legal-section">
              <span className="legal-section-number">03</span>
              <h2>Data Protection and Security</h2>
              <p>
                We take the security of your personal information seriously. We implement a
                variety of security measures to maintain the confidentiality, integrity, and
                availability of your data. These include:
              </p>
              <ul>
                <li>Encryption of sensitive data during transmission.</li>
                <li>Secure storage of personal data.</li>
                <li>Regular monitoring of our systems for vulnerabilities and potential threats.</li>
              </ul>
              <p>
                We limit access to personal information to authorized personnel only, ensuring
                that your data remains confidential.
              </p>
            </section>

            <section id="cookies" className="legal-section">
              <span className="legal-section-number">04</span>
              <h2>Use of Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing
                experience on our Site. Cookies are small text files stored on your device that
                help improve page loading speed, remember your preferences, and provide you with a
                seamless browsing experience.
              </p>
              <h3>Types of Cookies We Use</h3>
              <ul>
                <li>
                  <strong>Session Cookies:</strong> These cookies are temporary and are deleted
                  when you close your browser.
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> These remain on your device for a set period
                  or until you delete them.
                </li>
              </ul>
              <p>
                You can control your cookie preferences through your browser settings. However,
                please note that disabling cookies may affect the functionality of certain
                features on our Site.
              </p>
            </section>

            <section id="third-party-links" className="legal-section">
              <span className="legal-section-number">05</span>
              <h2>Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services. We are not
                responsible for the privacy practices or content of those third-party sites. We
                recommend reviewing the privacy policies of any external websites you visit
                through links on our Site.
              </p>
            </section>

            <section id="your-rights" className="legal-section">
              <span className="legal-section-number">06</span>
              <h2>Your Rights</h2>
              <p>
                As a user of our Site, you have the following rights regarding your personal
                information:
              </p>
              <ul>
                <li>
                  <strong>Right to Access:</strong> You can request a copy of the personal data we
                  hold about you.
                </li>
                <li>
                  <strong>Right to Rectification:</strong> You have the right to correct any
                  inaccuracies in your personal data.
                </li>
                <li>
                  <strong>Right to Erasure:</strong> You may request the deletion of your personal
                  data, subject to legal obligations.
                </li>
                <li>
                  <strong>Right to Restrict Processing:</strong> You can request that we limit the
                  processing of your personal information.
                </li>
                <li>
                  <strong>Right to Object:</strong> You can object to the processing of your
                  personal information for specific purposes, such as direct marketing.
                </li>
              </ul>
              <p>If you wish to exercise any of these rights, please contact us.</p>
            </section>

            <section id="data-retention" className="legal-section">
              <span className="legal-section-number">07</span>
              <h2>Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes
                for which it was collected, including compliance with legal obligations and the
                resolution of disputes. After that period, your data will be securely deleted or
                anonymized.
              </p>
            </section>

            <section id="childrens-privacy" className="legal-section">
              <span className="legal-section-number">08</span>
              <h2>Children’s Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not
                knowingly collect personal information from children. If you believe we have
                inadvertently collected information from a child, please contact us, and we will
                take steps to delete that information.
              </p>
            </section>

            <section id="policy-changes" className="legal-section">
              <span className="legal-section-number">09</span>
              <h2>Changes to This Privacy Policy</h2>
              <p>
                We reserve the right to update or modify this Privacy Policy at any time. If we
                make any material changes, we will notify you by updating the “Effective Date” at
                the top of this page. Your continued use of our Site after any changes indicates
                your acceptance of the new terms.
              </p>
            </section>

            <section id="contact-us" className="legal-section legal-contact-card">
              <span className="legal-section-number">10</span>
              <h2>Contact Us</h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or our data
                handling practices, please contact us at:
              </p>
              <div className="legal-contact-details">
                <p><strong>Clinora Medbill LLC®</strong></p>
                <p>
                  <MapPin aria-hidden="true" size={18} />
                  <span>5900 Balcones Dr, Austin, TX 78731, United States</span>
                </p>
                <p>
                  <Mail aria-hidden="true" size={18} />
                  <a href="mailto:info@clinoramedbill.com">info@clinoramedbill.com</a>
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
