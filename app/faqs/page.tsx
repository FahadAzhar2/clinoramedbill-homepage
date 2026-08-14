import type { Metadata } from "next";
import { FileQuestion } from "lucide-react";
import StandardContentPage from "../components/StandardContentPage";

export const metadata: Metadata = { title: "Frequently Asked Questions | ClinoraMedBill", description: "Answers about outsourcing medical billing and revenue cycle management with ClinoraMedBill." };
export default function FaqPage() { return <StandardContentPage active="resources" faqKey="faqs" eyebrow="Questions before choosing a billing partner" title="Straight answers about medical billing support." description="Understand outsourcing, onboarding, pricing, denials, and what to look for in a revenue-cycle partner." icon={FileQuestion} />; }

