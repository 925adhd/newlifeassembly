"use client";

import { motion, useReducedMotion } from "motion/react";

type LegalType = "privacy-policy" | "terms-of-service";

const legalData: Record<
  LegalType,
  { title: string; lastUpdated: string; sections: { heading: string; content: string }[] }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    lastUpdated: "April 2026",
    sections: [
      {
        heading: "Information We Collect",
        content:
          "When you contact us through our website form, we collect your name, email address, phone number (if provided), and message content. This information is submitted via Web3Forms and used solely to respond to your inquiry.",
      },
      {
        heading: "How We Use Your Information",
        content:
          "We use the information you provide to respond to your inquiries, communicate about church events and services, and improve our website experience. We do not sell, trade, or rent your personal information to third parties.",
      },
      {
        heading: "Cookies",
        content:
          "Our website may use minimal cookies for basic functionality. We do not use tracking cookies or third-party advertising cookies.",
      },
      {
        heading: "Third-Party Services",
        content:
          "Our contact form is powered by Web3Forms. Google Maps is embedded on our contact page. These services have their own privacy policies that govern their use of data.",
      },
      {
        heading: "Contact Us",
        content:
          "If you have questions about this privacy policy, please contact us at (270) 200-3422 (Pastor Tony) or (270) 868-0369 (Church Office).",
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of Service",
    lastUpdated: "April 2026",
    sections: [
      {
        heading: "Acceptance of Terms",
        content:
          "By accessing and using the New Life Assembly of God website, you agree to these terms of service. If you do not agree with any part of these terms, please do not use our website.",
      },
      {
        heading: "Use of Website",
        content:
          "This website is provided for informational purposes about New Life Assembly of God, its services, ministries, and events. All content is provided in good faith and intended to be accurate.",
      },
      {
        heading: "Intellectual Property",
        content:
          "The content on this website, including text, images, and design, is the property of New Life Assembly of God unless otherwise noted. You may not reproduce or distribute this content without permission.",
      },
      {
        heading: "Limitation of Liability",
        content:
          "New Life Assembly of God provides this website as-is and makes no warranties regarding accuracy or availability. We are not liable for any damages arising from the use of this website.",
      },
      {
        heading: "Contact Us",
        content:
          "If you have questions about these terms, please contact us at (270) 200-3422 (Pastor Tony) or (270) 868-0369 (Church Office).",
      },
    ],
  },
};

interface LegalContentProps {
  type: LegalType;
}

export default function LegalContent({ type }: LegalContentProps) {
  const data = legalData[type];
  const prefersReducedMotion = useReducedMotion();
  const fadeIn = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } } : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } };

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <motion.div
          {...fadeIn}
        >
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-2">
            {data.title}
          </h1>
          <p className="text-brand-primary/65 text-sm mb-12">
            Last updated: {data.lastUpdated}
          </p>

          <div className="space-y-8">
            {data.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-xl font-bold text-brand-primary mb-3">
                  {section.heading}
                </h2>
                <p className="text-brand-primary/75 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
