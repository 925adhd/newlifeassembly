import type { Metadata } from "next";
import PrayerPage from "./content";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Share a prayer request with New Life Assembly of God in Leitchfield, KY. Pastor Tony and our church family will pray for you with confidentiality and care.",
  alternates: {
    canonical: "/prayer",
  },
  openGraph: {
    title: "Prayer Requests | New Life Assembly of God",
    description:
      "Share a prayer request with New Life Assembly of God in Leitchfield, KY. Pastor Tony and our church family will pray for you with confidentiality and care.",
    url: "/prayer",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <PrayerPage />;
}
