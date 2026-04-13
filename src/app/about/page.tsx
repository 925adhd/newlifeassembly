import type { Metadata } from "next";
import AboutPage from "./content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about New Life Assembly of God in Leitchfield, KY. Led by Pastor Tony Redmon, we are a welcoming Assemblies of God church committed to faith, worship, and community.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | New Life Assembly of God",
    description:
      "Learn about New Life Assembly of God in Leitchfield, KY. Led by Pastor Tony Redmon, we are a welcoming Assemblies of God church committed to faith, worship, and community.",
    url: "/about",
    type: "website",
  },
};

export default function Page() {
  return <AboutPage />;
}
