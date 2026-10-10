import type { Metadata } from "next";
import ContactPage from "./content";
import { faqs } from "./faqs";

export const metadata: Metadata = {
  title: "Contact & Plan Your Visit",
  description:
    "Plan your visit to New Life Assembly of God in Leitchfield, KY. Find directions, service times, and how to reach Pastor Tony or the church office by phone.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Plan Your Visit | New Life Assembly of God",
    description:
      "Plan your visit to New Life Assembly of God in Leitchfield, KY. Find directions, service times, and how to reach Pastor Tony or the church office by phone.",
    url: "/contact",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
