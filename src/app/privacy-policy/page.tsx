import type { Metadata } from "next";
import LegalContent from "../legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the New Life Assembly of God website in Leitchfield, KY.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | New Life Assembly of God",
    description:
      "Privacy policy for the New Life Assembly of God website in Leitchfield, KY.",
    url: "/privacy-policy",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <LegalContent type="privacy-policy" />;
}
