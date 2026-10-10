"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import VideoExperienceSection, {
  type Video,
} from "@/components/VideoExperienceSection";
import { useReveal } from "@/lib/useReveal";

const thumb = (name: string) => `/thumbs/new-life-${name}.webp`;

const sermons: Video[] = [
  { id: "2647737832246553", date: "July 27, 2025", thumbnail: thumb("sermon-2025-07-27") },
  { id: "609702385121850", date: "July 13, 2025", thumbnail: thumb("sermon-2025-07-13") },
  { id: "1054167483483185", date: "June 1, 2025", thumbnail: thumb("sermon-2025-06-01") },
  {
    id: "1005841564835385",
    date: "April 20, 2025",
    label: "Resurrection Day",
    thumbnail: thumb("sermon-resurrection-day-2025-04-20"),
  },
];

const worship: Video[] = [
  { id: "644015321627140", date: "August 17, 2025", thumbnail: thumb("worship-2025-08-17") },
  { id: "1282550930213215", date: "July 27, 2025", thumbnail: thumb("worship-2025-07-27") },
  { id: "598329929727976", date: "July 13, 2025", thumbnail: thumb("worship-2025-07-13") },
  { id: "1236258307523153", date: "June 22, 2025", thumbnail: thumb("worship-2025-06-22") },
];

export default function WatchPage() {
  const { fadeIn, slideUp } = useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative py-8 md:py-24 bg-brand-primary overflow-hidden gradient-mesh">
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src="/new-life-assembly-worship-service-1600.webp"
            srcSet="/new-life-assembly-worship-service-480.webp 480w, /new-life-assembly-worship-service-960.webp 960w, /new-life-assembly-worship-service-1600.webp 1600w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_25%] md:object-[center_75%]"
            width={1500}
            height={1000}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center md:pt-8">
          <motion.div {...fadeIn}>
            <span className="block h-px w-12 bg-white/40 mx-auto mb-5" aria-hidden="true" />
            <p className="text-white/80 md:text-white font-medium text-[10px] md:text-sm tracking-[0.25em] uppercase mb-3 md:mb-4">
              Watch Online
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15] mb-3 md:mb-6">
              Past Services
            </h1>
            <p className="text-white/75 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Missed a Sunday? Catch up on past services here.
            </p>
            <a
              href="https://www.facebook.com/newlifeagleitchfield"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 md:mt-4 py-1 inline-flex items-center gap-2 text-white/85 text-sm md:text-base hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 md:w-[18px] md:h-[18px] shrink-0" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span className="underline decoration-white/40 underline-offset-4 hover:decoration-white">
                More videos and updates on Facebook
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </motion.div>
        </div>
      </section>

      <VideoExperienceSection
        eyebrow="Pastor Tony Redmon"
        title="Sermons"
        videos={sermons}
        kind="Sermon"
      />

      <VideoExperienceSection
        eyebrow="Sunday Morning"
        title="Worship"
        videos={worship}
        kind="Worship"
      />

      {/* Conversion CTA: bridge from "watched online" to "visit in person" */}
      <section className="relative py-16 md:py-24 bg-brand-primary overflow-hidden aurora">
        <motion.div
          {...slideUp()}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center"
        >
          <p className="text-brand-gold font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
            Continue The Journey
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Join Us This Sunday
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-4">
            These videos come from our Sunday morning services. We begin at
            11:00 AM with praise and worship, and Pastor Tony Redmon brings a
            message from God&apos;s Word at 11:30. Watch from home, catch up
            on a week you missed, or share a message with a friend. Our
            newest videos and church updates are always on Facebook.
          </p>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            Online is a great start. Worshiping in person is even better.
            We&apos;d love to meet you at 47 Embry Acres Dr in Leitchfield and
            welcome you to the family.
          </p>
          <a
            href="/contact"
            className="tap group btn-gold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
          >
            Plan Your Visit
            <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </motion.div>
      </section>
    </>
  );
}
