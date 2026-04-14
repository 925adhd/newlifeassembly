"use client";

import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import VideoExperienceSection, {
  type Video,
} from "@/components/VideoExperienceSection";

const thumb = (id: string) => `/thumbs/${id}.jpg`;

const sermons: Video[] = [
  { id: "2647737832246553", date: "July 27, 2025", thumbnail: thumb("2647737832246553") },
  { id: "609702385121850", date: "July 13, 2025", thumbnail: thumb("609702385121850") },
  { id: "1054167483483185", date: "June 1, 2025", thumbnail: thumb("1054167483483185") },
  {
    id: "1005841564835385",
    date: "April 20, 2025",
    label: "Resurrection Day",
    thumbnail: thumb("1005841564835385"),
  },
];

const worship: Video[] = [
  { id: "644015321627140", date: "August 17, 2025", thumbnail: thumb("644015321627140") },
  { id: "1282550930213215", date: "July 27, 2025", thumbnail: thumb("1282550930213215") },
  { id: "598329929727976", date: "July 13, 2025", thumbnail: thumb("598329929727976") },
  { id: "1236258307523153", date: "June 22, 2025", thumbnail: thumb("1236258307523153") },
];

export default function WatchPage() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const fadeIn = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } };
  const slideUp = prefersReducedMotion
    ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } }
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, ease } };

  return (
    <>
      {/* Hero */}
      <section className="relative py-8 md:py-24 bg-brand-primary overflow-hidden gradient-mesh">
        <div className="absolute inset-0 opacity-25 md:opacity-40">
          <img
            src="/new-life-assembly-worship-service.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_25%] md:object-[center_75%]"
            width={800}
            height={600}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-black/40 to-brand-primary/80 md:bg-black/35 md:bg-none" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center md:pt-8">
          <motion.div {...fadeIn}>
            <p className="text-white/80 font-medium text-[11px] md:text-sm tracking-[0.25em] uppercase mb-2 md:mb-4">
              Watch Online
            </p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6">
              Past Services
            </h1>
            <p className="text-white/75 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Missed a Sunday? Catch up on past services from New Life Assembly
              of God.
            </p>
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

      {/* Follow on Facebook */}
      <section className="py-16 md:py-20 bg-brand-primary">
        <motion.div
          {...slideUp}
          className="max-w-3xl mx-auto px-4 text-center"
        >
          <p className="text-white/70 mb-4">
            Follow us on Facebook for live services and updates
          </p>
          <a
            href="https://www.facebook.com/newlifeagleitchfield"
            target="_blank"
            rel="noopener noreferrer"
            className="tap bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2 group"
          >
            Follow on Facebook
            <ExternalLink
              className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </section>
    </>
  );
}
