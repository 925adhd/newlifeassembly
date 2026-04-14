import type { Metadata } from "next";
import { Inter, Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://newlifeassembly.vercel.app"),
  title: {
    default: "New Life Assembly of God | Leitchfield, KY",
    template: "%s | New Life Assembly of God",
  },
  description:
    "Welcome to New Life Assembly of God in Leitchfield, Kentucky. Join Pastor Tony Redmon and our church family for Sunday worship, children's church, and Wednesday Bible study.",
  keywords: [
    "New Life Assembly of God",
    "church Leitchfield KY",
    "Assemblies of God Kentucky",
    "Pastor Tony Redmon",
    "Sunday worship Leitchfield",
    "Bible study Grayson County",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "New Life Assembly of God | Leitchfield, KY",
    description:
      "A welcoming Assemblies of God church in Leitchfield, Kentucky. Join us for worship, fellowship, and spiritual growth.",
    type: "website",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/new-life-assembly-og.png",
        width: 1200,
        height: 630,
        alt: "New Life Assembly of God church building in Leitchfield, Kentucky",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "New Life Assembly of God | Leitchfield, KY",
    description:
      "A welcoming Assemblies of God church in Leitchfield, Kentucky. Join us for worship, fellowship, and spiritual growth.",
    images: ["/new-life-assembly-og.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${poppins.variable} h-full`}>
      <head>
        <link rel="preload" href="/dove-logo.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              name: "New Life Assembly of God",
              description:
                "A welcoming Assemblies of God church in Leitchfield, Kentucky. Join Pastor Tony Redmon and our church family for Sunday worship, children's church, and Wednesday Bible study.",
              url: "https://newlifeassembly.vercel.app",
              telephone: "+1-270-200-3422",
              address: {
                "@type": "PostalAddress",
                streetAddress: "47 Embry Acres Dr",
                addressLocality: "Leitchfield",
                addressRegion: "KY",
                postalCode: "42754",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 37.5088931,
                longitude: -86.2883226,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Sunday",
                  opens: "10:00",
                  closes: "12:30",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: "Wednesday",
                  opens: "18:30",
                  closes: "20:00",
                },
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "5",
                bestRating: "5",
              },
              review: [
                {
                  "@type": "Review",
                  author: { "@type": "Person", name: "E Howe" },
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                  },
                  reviewBody:
                    "An amazing church with an amazing pastor.",
                },
              ],
              image: "https://newlifeassembly.vercel.app/church.webp",
              logo: "https://newlifeassembly.vercel.app/new-life-assembly-logo.webp",
              sameAs: [
                "https://www.facebook.com/newlifeagleitchfield",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
