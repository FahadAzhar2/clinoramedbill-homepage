export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  summary: string;
  readTime: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "denial-strategy-before-submission",
    category: "Denial prevention",
    title: "The strongest denial strategy starts before submission.",
    image: "/media/blog-denials-magnific-4k.jpg",
    imageAlt: "Clinical and billing professionals reviewing documentation before claim submission",
    summary: "Practical ways to identify documentation, coding, and claim-quality issues before they become payer rework.",
    readTime: "7 min read",
    intro: "Denial prevention works best when it is built into the workflow before a claim reaches the payer. Clean inputs, clear ownership, and consistent review give every claim a stronger starting point.",
    sections: [
      {
        heading: "Start with the source documentation",
        paragraphs: ["A claim can only be as accurate as the documentation behind it. Confirm that clinical notes support the selected codes, required modifiers are present, and payer-specific details are addressed before submission."],
        bullets: ["Verify eligibility and patient information early", "Review documentation against coding requirements", "Resolve missing details before the claim enters the queue"],
      },
      {
        heading: "Build a reliable pre-submission review",
        paragraphs: ["A repeatable claim-quality check reduces avoidable rework. The goal is not to add another administrative layer, but to catch predictable issues at the point where they are easiest to correct."],
      },
      {
        heading: "Use denial data to improve the front end",
        paragraphs: ["Denial trends should inform training, workflow updates, and payer-specific rules. When root causes are visible, teams can prevent the same issue from recurring instead of repeatedly working the same problem downstream."],
      },
    ],
  },
  {
    slug: "what-clean-claim-rate-tells-you",
    category: "Revenue visibility",
    title: "What your clean-claim rate is—and is not—telling you.",
    image: "/media/blog-eligibility-magnific-4k.jpg",
    imageAlt: "Healthcare administrator reviewing claim performance information",
    summary: "Look beyond one metric to understand where claims slow down and where teams need clearer next actions.",
    readTime: "5 min read",
    intro: "Clean-claim rate is an important signal, but it is not a complete picture of revenue performance. It becomes more useful when viewed alongside payment speed, denial patterns, and unresolved balances.",
    sections: [
      {
        heading: "What a clean-claim rate shows",
        paragraphs: ["The metric indicates how many claims pass initial submission without payer rejection or preventable edits. A strong rate generally reflects disciplined eligibility, documentation, coding, and claim-scrubbing workflows."],
      },
      {
        heading: "What it can hide",
        paragraphs: ["A claim may be technically clean while still taking too long to pay. Payer delays, underpayments, authorization issues, and weak follow-up can all affect revenue after the initial claim has been accepted."],
        bullets: ["Compare clean claims with days in A/R", "Review payer-specific payment timelines", "Track denials by root cause, not only by volume"],
      },
      {
        heading: "Turn the metric into an action plan",
        paragraphs: ["Use the clean-claim rate as one part of a connected reporting view. When teams can see where performance changes and who owns the next step, the metric supports decisions instead of becoming a dashboard number without context."],
      },
    ],
  },
  {
    slug: "read-ar-aging-earlier",
    category: "A/R performance",
    title: "A/R aging tells a story. Here is how to read it earlier.",
    image: "/media/medical-billing-workflow-4k.jpg",
    imageAlt: "Medical billing specialist reviewing account follow-up workflow",
    summary: "Use aging movement, payer behavior, and account status to spot recovery risk before balances become harder to resolve.",
    readTime: "6 min read",
    intro: "A/R reports are most useful when they reveal movement, ownership, and risk—not just totals. Reading the aging pattern early helps teams focus follow-up before balances become harder to recover.",
    sections: [
      {
        heading: "Look for movement between aging buckets",
        paragraphs: ["A static total can hide meaningful changes. Track how accounts move from current balances into older categories and identify where follow-up slows down or payer responses remain unresolved."],
      },
      {
        heading: "Separate payer and patient responsibility",
        paragraphs: ["Different balance types require different next steps. Clear segmentation helps teams prioritize payer follow-up, appeals, corrected claims, and patient communication without mixing unrelated workflows."],
        bullets: ["Group balances by payer and denial reason", "Flag high-value accounts approaching the next aging bucket", "Assign a clear owner and follow-up date"],
      },
      {
        heading: "Turn aging insight into a weekly rhythm",
        paragraphs: ["A focused weekly review helps prevent accounts from quietly aging. Use concise worklists, documented next actions, and escalation rules so each balance keeps moving toward resolution."],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
