import type { Metadata } from "next";
import { BookOpenText } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteConversionFooter from "../components/SiteConversionFooter";
import { pageFaqs } from "../content/faqs";
import InteriorHero from "../components/InteriorHero";
import { blogPosts } from "../content/blog-posts";
import BlogsGrid from "./BlogsGrid";

export const metadata: Metadata = { title: "Medical Billing Insights | ClinoraMedBill", description: "Practical medical billing, coding, denial, A/R, and revenue-cycle insights for healthcare teams." };

export default function BlogsPage() {
  return (
    <main id="main-content" className="blogs-editorial-page">
      <SiteHeader active="resources" />
      <InteriorHero
        titleId="blogs-title"
        eyebrow="ClinoraMedBill resources"
        title="Insights for healthier revenue operations."
        description="Practical guidance for physicians, practice managers, and healthcare leaders responsible for billing performance."
        imageSrc="/media/hero-mapped/10-blogs-hero-desktop.png"
        mobileImageSrc="/media/hero-mapped/10-blogs-hero-mobile.png"
        imageAlt="Healthcare professional preparing practical clinical and billing insights"
        imagePosition="70% 42%"
        ctaHref="mailto:info@clinoramedbill.com"
        ctaLabel="Talk with our team"
        badgeIcon={BookOpenText}
        badgeEyebrow="ClinoraMedBill insights"
        badgeText="Clear thinking for complex revenue work."
      />

      <section className="section blogs-featured-section">
        <div className="container blogs-featured-heading"><span className="eyebrow">Latest perspectives</span><h2>Useful thinking.<br />Built for action.</h2><p>Focused perspectives on the operational details that keep claims, payments, and follow-up moving.</p></div>
        <BlogsGrid posts={blogPosts} />
      </section>
      <SiteConversionFooter faqs={pageFaqs.blogs} faqEyebrow="Resource answers" />
    </main>
  );
}
