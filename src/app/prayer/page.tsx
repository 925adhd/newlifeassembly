import type { Metadata } from "next";
import PrayerPage from "./content";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Share a prayer request with New Life Assembly of God in Leitchfield, KY. Pastor Tony and our church family will lift your need up in prayer — confidentially and with care.",
  alternates: {
    canonical: "/prayer",
  },
  openGraph: {
    title: "Prayer Requests | New Life Assembly of God",
    description:
      "Send a prayer request to New Life Assembly of God. Pastor Tony and our church family will pray with you — confidentially and with care.",
    url: "/prayer",
    type: "website",
  },
};

export default function Page() {
  return <PrayerPage />;
}
