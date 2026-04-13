import type { Metadata } from "next";
import MinistriesPage from "./content";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Explore ministries at New Life Assembly of God in Leitchfield, KY. Sunday worship, children's church, Wednesday Bible study, and community outreach.",
  alternates: {
    canonical: "/ministries",
  },
  openGraph: {
    title: "Ministries | New Life Assembly of God",
    description:
      "Explore ministries at New Life Assembly of God in Leitchfield, KY. Sunday worship, children's church, Wednesday Bible study, and community outreach.",
    url: "/ministries",
    type: "website",
  },
};

export default function Page() {
  return <MinistriesPage />;
}
