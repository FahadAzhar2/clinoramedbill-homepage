import type { FaqItem } from "../content/faqs";

export default function PageFaqs({ items, eyebrow = "Helpful answers", title = "Frequently asked questions", description = "Clear answers to the questions healthcare teams ask most often." }: { items: readonly FaqItem[]; eyebrow?: string; title?: string; description?: string }) {
  return (
    <section className="page-faq-section section" aria-labelledby="page-faq-title">
      <div className="container page-faq-shell">
        <div className="page-faq-heading">
          <span className="eyebrow">{eyebrow}</span>
          <h2 id="page-faq-title">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="page-faq-list">
          {items.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}<span aria-hidden="true" /></summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
