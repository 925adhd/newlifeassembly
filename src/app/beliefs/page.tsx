import type { Metadata } from "next";
import BeliefsPage from "./content";
import { showMarriage } from "./beliefs";

const description = `What New Life Assembly of God in Leitchfield, KY believes: the core truths of our Assemblies of God faith, ${showMarriage ? "our view of marriage, " : ""}and the Scriptures behind them.`;

export const metadata: Metadata = {
  title: "What We Believe",
  description,
  alternates: {
    canonical: "/beliefs",
  },
  openGraph: {
    title: "What We Believe | New Life Assembly of God",
    description,
    url: "/beliefs",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <BeliefsPage />;
}
