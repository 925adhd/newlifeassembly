"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronRight, ExternalLink } from "lucide-react";
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
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src="/new-life-assembly-worship-service-1600.webp"
            srcSet="/new-life-assembly-worship-service-480.webp 480w, /new-life-assembly-worship-service-960.webp 960w, /new-life-assembly-worship-service-1600.webp 1600w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_25%] md:object-[center_75%]"
            width={800}
            height={600}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center md:pt-8">
          <motion.div {...fadeIn}>
            <span className="block h-px w-12 bg-white/40 mx-auto mb-5" aria-hidden="true" />
            <p className="text-white/80 font-medium text-[10px] md:text-sm tracking-[0.25em] uppercase mb-3 md:mb-4">
              Watch Online
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15] mb-3 md:mb-6">
              Watch With Us
            </h1>
            <p className="text-white/75 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Missed a Sunday? Catch up on past services here — and find more
              videos and updates on our Facebook page.
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

      {/* Conversion CTA — bridge from "watched online" to "visit in person" */}
      <section className="relative py-16 md:py-24 bg-brand-primary overflow-hidden aurora">
        <motion.div
          {...slideUp}
          className="relative z-10 max-w-3xl mx-auto px-4 text-center"
        >
          <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
            Continue The Journey
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Join Us This Sunday
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8">
            Online is a great start. Worshiping in person is even better —
            we&apos;d love to meet you and welcome you to the family.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/contact"
              className="tap group btn-gold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              Plan Your Visit
              <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a
              href="https://www.facebook.com/newlifeagleitchfield"
              target="_blank"
              rel="noopener noreferrer"
              className="tap group relative border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-medium text-lg overflow-hidden hover:border-white hover:-translate-y-0.5 hover:text-brand-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
              <span className="relative z-10 inline-flex items-center gap-2">
                Follow on Facebook
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </span>
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
