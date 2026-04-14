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

const SITE = "https://newlifeassembly.vercel.app";

const fbEmbed = (id: string) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    `https://www.facebook.com/reel/${id}`,
  )}&show_text=false&width=1280&autoplay=true&mute=1`;

const videos = [
  { id: "2647737832246553", date: "2025-07-27", kind: "Sermon" as const },
  { id: "609702385121850", date: "2025-07-13", kind: "Sermon" as const },
  { id: "1054167483483185", date: "2025-06-01", kind: "Sermon" as const },
  { id: "1005841564835385", date: "2025-04-20", kind: "Sermon" as const, label: "Resurrection Day" },
  { id: "644015321627140", date: "2025-08-17", kind: "Worship" as const },
  { id: "1282550930213215", date: "2025-07-27", kind: "Worship" as const },
  { id: "598329929727976", date: "2025-07-13", kind: "Worship" as const },
  { id: "1236258307523153", date: "2025-06-22", kind: "Worship" as const },
];

const videoObjects = videos.map((v) => {
  const readableDate = new Date(v.date + "T00:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const name = v.label
    ? `${v.label} ${v.kind} — New Life Assembly of God (${readableDate})`
    : `Sunday ${v.kind} — New Life Assembly of God (${readableDate})`;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description: `${v.kind} from Pastor Tony Redmon and the New Life Assembly of God church family in Leitchfield, Kentucky, recorded ${readableDate}.`,
    thumbnailUrl: `${SITE}/thumbs/${v.id}.jpg`,
    uploadDate: v.date,
    embedUrl: fbEmbed(v.id),
    contentUrl: `https://www.facebook.com/reel/${v.id}`,
    publisher: {
      "@type": "Organization",
      name: "New Life Assembly of God",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/new-life-assembly-logo.webp`,
      },
    },
  };
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjects) }}
      />
      <WatchPage />
    </>
  );
}
