import type { Metadata } from "next";
import LeadershipPage from "./content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leaders of New Life Assembly of God in Leitchfield, KY: Pastor Tony Redmon, our church board, and the people who serve in our ministries.",
  alternates: {
    canonical: "/leadership",
  },
  openGraph: {
    title: "Leadership | New Life Assembly of God",
    description:
      "Meet the leaders of New Life Assembly of God in Leitchfield, KY: Pastor Tony Redmon, our church board, and the people who serve in our ministries.",
    url: "/leadership",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <LeadershipPage />;
}
