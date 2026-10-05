import type { Metadata } from "next";
import BeliefsPage from "./content";

export const metadata: Metadata = {
  title: "What We Believe",
  description:
    "What New Life Assembly of God in Leitchfield, KY believes: the core truths of our Assemblies of God faith, our view of marriage, and the Scriptures behind them.",
  alternates: {
    canonical: "/beliefs",
  },
  openGraph: {
    title: "What We Believe | New Life Assembly of God",
    description:
      "What New Life Assembly of God in Leitchfield, KY believes: the core truths of our Assemblies of God faith, our view of marriage, and the Scriptures behind them.",
    url: "/beliefs",
    type: "website",
  },
};

export default function Page() {
  return <BeliefsPage />;
}
