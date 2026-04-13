import type { Metadata } from "next";
import WatchPage from "./content";

export const metadata: Metadata = {
  title: "Watch Services",
  description:
    "Watch past Sunday morning services from New Life Assembly of God in Leitchfield, KY. Catch up on sermons from Pastor Tony Redmon.",
  alternates: {
    canonical: "/watch",
  },
  openGraph: {
    title: "Watch Services | New Life Assembly of God",
    description:
      "Watch past Sunday morning services from New Life Assembly of God in Leitchfield, KY. Catch up on sermons from Pastor Tony Redmon.",
    url: "/watch",
    type: "website",
  },
};

export default function Page() {
  return <WatchPage />;
}
