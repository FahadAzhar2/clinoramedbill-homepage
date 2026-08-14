import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "./annotation-pass.css";
import "./consistency-pass.css";
import "./redesign-pass.css";
import "./interior-hero.css";
import "./service-detail-revision.css";
import "./final-revisions.css";
import "./container-system.css";
import "./current-polish.css";
import "./mobile-optimization.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.clinoramedbill.com"),
  title: "ClinoraMedBill | Medical Billing & Revenue Cycle Management",
  description:
    "Secure, specialty-aware medical billing and revenue cycle management for healthcare providers across the United States.",
  icons: {
    icon: "/brand/clinora-mark.svg",
    shortcut: "/brand/clinora-mark.svg",
  },
  openGraph: {
    title: "Medical billing, managed with clarity.",
    description:
      "Secure, specialty-aware medical billing and revenue cycle management for healthcare providers across the United States.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "ClinoraMedBill revenue cycle management" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical billing, managed with clarity.",
    description: "Secure, specialty-aware medical billing and revenue cycle management.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>{children}</body>
    </html>
  );
}
