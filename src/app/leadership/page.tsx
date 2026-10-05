import type { Metadata } from "next";
import LeadershipPage from "./content";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "Meet the leadership of New Life Assembly of God in Leitchfield, KY: Pastor Tony Redmon, our church board, and the people who lead Sunday School, worship, and Children's Church.",
  alternates: {
    canonical: "/leadership",
  },
  openGraph: {
    title: "Leadership | New Life Assembly of God",
    description:
      "Meet the leadership of New Life Assembly of God in Leitchfield, KY: Pastor Tony Redmon, our church board, and the people who lead Sunday School, worship, and Children's Church.",
    url: "/leadership",
    type: "website",
  },
};

export default function Page() {
  return <LeadershipPage />;
}
