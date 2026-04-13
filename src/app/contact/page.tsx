import type { Metadata } from "next";
import ContactPage from "./content";

export const metadata: Metadata = {
  title: "Contact & Plan Your Visit",
  description:
    "Plan your visit to New Life Assembly of God in Leitchfield, KY. Get directions, service times, and contact information. Call Pastor Tony at (270) 200-3422 or the church office at (270) 868-0369.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Plan Your Visit | New Life Assembly of God",
    description:
      "Plan your visit to New Life Assembly of God in Leitchfield, KY. Get directions, service times, and contact information.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}
