/* eslint-disable @next/next/no-html-link-for-pages -- Plain anchors preserve compatibility with the Vinext runtime. */
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "iPhone 17 Pro Max Mobile Preview | ClinoraMedBill",
  description: "ClinoraMedBill mobile website presentation for the iPhone 17 Pro Max viewport.",
};

export default function MobilePreviewPage() {
  return (
    <main className="mobile-preview-page">
      <section className="mobile-preview-shell">
        <div className="mobile-preview-copy">
          <a className="mobile-preview-brand" href="/" aria-label="Open ClinoraMedBill homepage">
            <Image src="/brand/clinora-primary.svg" alt="ClinoraMedBill" width={220} height={114} priority />
          </a>
          <span className="mobile-preview-eyebrow"><Smartphone aria-hidden="true" size={15} /> iPhone 17 Pro Max presentation</span>
          <h1>ClinoraMedBill,<br /><em>optimized for mobile.</em></h1>
          <p>The same premium healthcare brand experience, rebuilt with shorter sections, compact swipeable cards, tighter spacing, and a faster reading rhythm for a 6.9-inch screen.</p>
          <div className="mobile-preview-points">
            <span><Check aria-hidden="true" /> 440 × 956 CSS viewport</span>
            <span><Check aria-hidden="true" /> No horizontal overflow</span>
            <span><Check aria-hidden="true" /> Touch-friendly navigation and cards</span>
          </div>
          <a className="button button-dark" href="/">Open the live mobile website <ArrowUpRight aria-hidden="true" size={17} /></a>
        </div>

        <figure className="mobile-preview-device">
          <Image
            src="/mockups/clinora-iphone-17-pro-max.png"
            alt="ClinoraMedBill mobile homepage shown inside a deep blue iPhone 17 Pro Max"
            width={853}
            height={1844}
            priority
          />
          <figcaption>iPhone 17 Pro Max · 6.9-inch Super Retina XDR presentation</figcaption>
        </figure>
      </section>
    </main>
  );
}
