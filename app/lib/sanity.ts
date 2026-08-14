export const SANITY_PROJECT_ID = "doowpoj0";
export const SANITY_DATASET = "production";
export const SANITY_API_VERSION = "2026-08-01";

export type CmsService = {
  title: string;
  description: string;
  iconKey?: string;
  order?: number;
};

export type CmsFaq = { question: string; answer: string; order?: number };

export type CmsInsight = {
  category: string;
  readTime: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt?: string;
  link?: string;
  order?: number;
};

export type CmsHomepage = Partial<{
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCta: string;
  heroSecondaryCta: string;
  servicesEyebrow: string;
  servicesTitle: string;
  servicesDescription: string;
  processEyebrow: string;
  processTitle: string;
  processDescription: string;
  specialtiesEyebrow: string;
  specialtiesTitle: string;
  specialtiesDescription: string;
  audienceEyebrow: string;
  audienceTitle: string;
  audienceDescription: string;
  nationwideEyebrow: string;
  nationwideTitle: string;
  nationwideDescription: string;
  insightsEyebrow: string;
  insightsTitle: string;
  insightsDescription: string;
  auditEyebrow: string;
  auditTitle: string;
  auditDescription: string;
}>;

export type CmsSiteSettings = Partial<{
  companyName: string;
  phone: string;
  email: string;
  address: string;
  googleReviewsUrl: string;
  googleRating: string;
  footerDescription: string;
}>;

export type CmsBundle = {
  homepage?: CmsHomepage;
  settings?: CmsSiteSettings;
  services?: CmsService[];
  faqs?: CmsFaq[];
  insights?: CmsInsight[];
};

const bundleQuery = `{
  "homepage": *[_type == "homepage" && _id == "homepage"][0],
  "settings": *[_type == "siteSettings" && _id == "siteSettings"][0],
  "services": *[_type == "service"] | order(order asc){title, "description": description, iconKey, order},
  "faqs": *[_type == "faq"] | order(order asc){question, answer, order},
  "insights": *[_type == "insight"] | order(order asc){category, readTime, title, "description": description, "imageUrl": image.asset->url, imageAlt, link, order}
}`;

export async function fetchCmsBundle(signal?: AbortSignal): Promise<CmsBundle> {
  const endpoint = new URL(`https://${SANITY_PROJECT_ID}.apicdn.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`);
  endpoint.searchParams.set("query", bundleQuery);
  const response = await fetch(endpoint, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`CMS request failed with ${response.status}`);
  const payload = (await response.json()) as { result?: CmsBundle };
  return payload.result ?? {};
}
