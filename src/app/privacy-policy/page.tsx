import type { Metadata } from "next";
import LegalContent from "../legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How New Life Assembly of God in Leitchfield, KY handles what you share through our contact and prayer forms, and the outside services our website uses.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | New Life Assembly of God",
    description:
      "How New Life Assembly of God in Leitchfield, KY handles what you share through our contact and prayer forms, and the outside services our website uses.",
    url: "/privacy-policy",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <LegalContent type="privacy-policy" />;
}
