import type { Metadata } from "next";
import AboutPage from "./content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Get to know New Life Assembly of God in Leitchfield, KY, a welcoming Assemblies of God church led by Pastor Tony Redmon and committed to faith and community.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | New Life Assembly of God",
    description:
      "Get to know New Life Assembly of God in Leitchfield, KY, a welcoming Assemblies of God church led by Pastor Tony Redmon and committed to faith and community.",
    url: "/about",
    type: "website",
    images: ["/new-life-assembly-og-v2.png"],
  },
};

export default function Page() {
  return <AboutPage />;
}
