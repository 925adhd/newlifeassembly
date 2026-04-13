import type { Metadata } from "next";
import LegalContent from "../legal-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of service for the New Life Assembly of God website in Leitchfield, KY.",
  alternates: {
    canonical: "/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | New Life Assembly of God",
    description:
      "Terms of service for the New Life Assembly of God website in Leitchfield, KY.",
    url: "/terms-of-service",
    type: "website",
    images: ["/new-life-assembly-og.png"],
  },
};

export default function Page() {
  return <LegalContent type="terms-of-service" />;
}
