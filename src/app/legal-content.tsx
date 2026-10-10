"use client";

import { motion } from "motion/react";
import { useReveal } from "@/lib/useReveal";

type LegalType = "privacy-policy" | "terms-of-service";

const legalData: Record<
  LegalType,
  { title: string; lastUpdated: string; sections: { heading: string; content: string }[] }
> = {
  "privacy-policy": {
    title: "Privacy Policy",
    lastUpdated: "October 2026",
    sections: [
      {
        heading: "Information We Collect",
        content:
          "We only collect what you choose to send us. Our contact form asks for your name, email address, an optional phone number, and your message. Our prayer request form asks for your prayer request and, if you like, your name, email address, and phone number. You can leave your name off a prayer request to stay anonymous.",
      },
      {
        heading: "How We Use Your Information",
        content:
          "We use what you send to answer your questions, follow up with you, and pray for you. We do not sell, trade, or rent your personal information to anyone.",
      },
      {
        heading: "Prayer Requests",
        content:
          "Prayer requests are sent to the church by email and forwarded to Pastor Tony. Unless you check the box to keep your request confidential, it may also be shared with our church prayer circle so they can pray for you. Confidential requests are marked for Pastor Tony only and are not shared with the prayer circle. We never post prayer requests on this website or share them outside the church.",
      },
      {
        heading: "Cookies",
        content:
          "We use Google Analytics to understand how many people visit and which pages help them, and it sets cookies to do that. We do not use advertising cookies. The Facebook video player on our Watch page and the Google Map on our Contact page may also set their own cookies when they load. You can block or clear cookies in your browser settings, or opt out of Google Analytics with Google's browser add-on at tools.google.com/dlpage/gaoptout.",
      },
      {
        heading: "Third-Party Services",
        content:
          "Our contact and prayer forms are sent to the church by email through Web3Forms. Google Analytics counts visits and form submissions, but never receives what you write in our forms. Our sermon and worship videos are played through Facebook, and our map is provided by Google Maps. Each of these services has its own privacy policy that governs how it handles data.",
      },
      {
        heading: "Contact Us",
        content:
          "If you have questions about this privacy policy, or would like us to delete a message or prayer request you sent, please contact us at (270) 200-3422 (Pastor Tony) or (270) 868-0369 (Church Office).",
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
  const { fadeIn } = useReveal();

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
