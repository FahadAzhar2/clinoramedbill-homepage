import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/SiteHeader";
import SiteConversionFooter from "../../components/SiteConversionFooter";
import { pageFaqs } from "../../content/faqs";
import { blogPosts, getBlogPost } from "../../content/blog-posts";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title} | ClinoraMedBill`, description: post.summary };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = blogPosts.filter((item) => item.slug !== post.slug);

  return (
    <main id="main-content" className="blog-detail-page">
      <SiteHeader active="resources" />
      <article>
        <header className="blog-detail-hero">
          <figure><Image src={post.image} alt={post.imageAlt} fill priority quality={92} sizes="(max-width: 900px) 100vw, 1360px" /></figure>
        </header>

        <div className="blog-detail-layout">
          <div className="blog-detail-heading">
            <Link href="/blogs" className="blog-back-link"><ArrowLeft aria-hidden="true" size={16} /> All insights</Link>
            <span className="eyebrow">{post.category}</span>
            <h1>{post.title}</h1>
            <p>{post.summary}</p>
            <small><Clock3 aria-hidden="true" /> {post.readTime}</small>
          </div>
          <aside><span>In this insight</span>{post.sections.map((section) => <a href={`#${section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} key={section.heading}>{section.heading}</a>)}</aside>
          <div className="blog-detail-content">
            <p className="blog-detail-intro">{post.intro}</p>
            {post.sections.map((section) => {
              const id = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return <section id={id} key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets ? <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul> : null}</section>;
            })}
          </div>
        </div>
      </article>

      <section className="blog-related-section">
        <div className="container"><span className="eyebrow">Keep reading</span><h2>More practical revenue insights.</h2><div>{related.map((item) => <a href={`/blogs/${item.slug}`} key={item.slug}><figure><Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 760px) calc(100vw - 40px), 40vw" /></figure><span>{item.category}</span><strong>{item.title}</strong><em>Read more <ArrowRight aria-hidden="true" size={15} /></em></a>)}</div></div>
      </section>
      <SiteConversionFooter faqs={pageFaqs.blogs} faqEyebrow="Resource answers" />
    </main>
  );
}
