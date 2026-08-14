import { notFound } from "next/navigation";
import ServiceDetailPage from "../../components/ServiceDetailPage";
import { servicePages, type ServiceSlug } from "../../content/service-pages";

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const service = servicePages[slug as ServiceSlug];
    return service ? { title: `${service.title} | ClinoraMedBill`, description: service.description } : {};
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in servicePages)) notFound();
  return <ServiceDetailPage slug={slug as ServiceSlug} />;
}

