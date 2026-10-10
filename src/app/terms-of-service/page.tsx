import type { Metadata } from "next";
import LegalContent from "../legal-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms for using the New Life Assembly of God website in Leitchfield, KY, including how our content may be shared and the limits of our responsibility.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | New Life Assembly of God",
    description:
      "The terms for using the New Life Assembly of God website in Leitchfield, KY, including how our content may be shared and the limits of our responsibility.",
    url: "/terms-of-service",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <LegalContent type="terms-of-service" />;
}
