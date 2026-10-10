import type { Metadata } from "next";
import MinistriesPage from "./content";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Ministries at New Life Assembly of God in Leitchfield, KY: Sunday School, worship, children's church, Wednesday Bible study, women's ministries, and outreach.",
  alternates: {
    canonical: "/ministries",
  },
  openGraph: {
    title: "Ministries | New Life Assembly of God",
    description:
      "Ministries at New Life Assembly of God in Leitchfield, KY: Sunday School, worship, children's church, Wednesday Bible study, women's ministries, and outreach.",
    url: "/ministries",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <MinistriesPage />;
}
