"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Video = {
  id: string;
  date: string;
  label?: string;
  thumbnail: string;
};

function buildFacebookEmbed(id: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    `https://www.facebook.com/reel/${id}`,
  )}&show_text=false&width=1280&autoplay=true&mute=1`;
}

function MainVideoPlayer({
  video,
  kind,
}: {
  video: Video;
  kind: "Sermon" | "Worship";
}) {
  return (
    <div className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
      <iframe
        key={video.id}
        src={buildFacebookEmbed(video.id)}
        className="absolute inset-0 w-full h-full"
        style={{ border: "none" }}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title={`${kind} from New Life Assembly of God — ${video.date}`}
      />
    </div>
  );
}

function VideoCard({
  video,
  active,
  onSelect,
  kind,
}: {
  video: Video;
  active: boolean;
  onSelect: () => void;
  kind: "Sermon" | "Worship";
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Watch ${kind.toLowerCase()} from ${video.date}`}
      aria-pressed={active}
      className={`group relative shrink-0 w-60 md:w-72 snap-start rounded-xl md:rounded-2xl overflow-hidden bg-black/40 text-left border-2 transition-[border-color,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:border-brand-accent ${
        active
          ? "border-brand-accent shadow-[0_0_0_1px_rgba(37,99,171,0.4),0_12px_32px_-12px_rgba(37,99,171,0.55)]"
          : "border-white/10 hover:border-white/30"
      }`}
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-80 group-hover:opacity-95"
          }`}
        />
        {active && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-brand-accent text-white text-[10px] font-semibold tracking-widest uppercase shadow-md">
            Now Playing
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-4">
          {video.label && (
            <p className="text-brand-accent text-xs font-medium tracking-widest uppercase mb-1">
              {video.label}
            </p>
          )}
          <p className="font-serif text-base md:text-lg font-bold text-white drop-shadow">
            {video.date}
          </p>
        </div>
      </div>
    </button>
  );
}

function VideoRail({
  videos,
  activeId,
  onSelect,
  kind,
}: {
  videos: Video[];
  activeId: string;
  onSelect: (id: string) => void;
  kind: "Sermon" | "Worship";
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [videos.length]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 280);
    el.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <div className="relative -mx-4 md:-mx-8">
      <div
        ref={scrollerRef}
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-proximity px-4 md:px-8 pr-10 md:pr-12 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            active={video.id === activeId}
            onSelect={() => onSelect(video.id)}
            kind={kind}
          />
        ))}
        <div aria-hidden="true" className="shrink-0 w-2 md:w-4" />
      </div>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 ${
          canScrollLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-black to-transparent transition-opacity duration-300 ${
          canScrollRight ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        type="button"
        aria-label={`Scroll ${kind.toLowerCase()} list left`}
        onClick={() => scrollBy(-1)}
        disabled={!canScrollLeft}
        className={`hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm ring-1 ring-white/15 text-white transition-all duration-300 hover:bg-black/90 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
          canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`Scroll ${kind.toLowerCase()} list right`}
        onClick={() => scrollBy(1)}
        disabled={!canScrollRight}
        className={`hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 items-center justify-center rounded-full bg-black/70 backdrop-blur-sm ring-1 ring-white/15 text-white transition-all duration-300 hover:bg-black/90 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
          canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default function VideoExperienceSection({
  title,
  eyebrow,
  videos,
  kind,
  decor,
}: {
  title: string;
  eyebrow?: string;
  videos: Video[];
  kind: "Sermon" | "Worship";
  decor?: string;
}) {
  const [activeId, setActiveId] = useState<string>(videos[0]?.id ?? "");
  const active = videos.find((v) => v.id === activeId) ?? videos[0];

  if (!active) return null;

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#0a1328] via-[#070e1f] to-[#050916] overflow-hidden aurora gradient-mesh">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,88,152,0.28),transparent_65%)]"
        aria-hidden="true"
      />
      <span
        aria-hidden="true"
        className="orb orb-float absolute w-[420px] h-[420px] -top-24 -right-28 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(232,184,108,0.16) 0%, rgba(232,184,108,0) 70%)",
        }}
      />
      {decor && (
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-4 md:right-8 md:bottom-10 font-serif italic text-[7rem] md:text-[16rem] leading-none text-white/[0.05] select-none pointer-events-none z-0"
        >
          {decor}
        </span>
      )}
      <div className="relative max-w-6xl mx-auto px-4 md:px-8">
        <span
          aria-hidden="true"
          className="block h-px w-12 bg-brand-gold/70 mb-5"
        />
        {eyebrow && (
          <p className="text-brand-gold text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase font-medium mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.05] mb-8 md:mb-12 [text-shadow:0_4px_24px_rgba(0,0,0,0.35)]">
          {title}
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainVideoPlayer video={active} kind={kind} />
            <figcaption className="mt-4 md:mt-5 text-white/80">
              <p className="font-serif text-lg md:text-xl font-bold text-white">
                {active.label ? `${active.label} ${kind}` : `Sunday ${kind}`} — {active.date}
              </p>
              <p className="text-sm md:text-base text-white/65 mt-1 max-w-2xl">
                {kind === "Sermon"
                  ? `Sermon from Pastor Tony Redmon at New Life Assembly of God in Leitchfield, Kentucky, recorded ${active.date}.`
                  : `Sunday morning worship with the New Life Assembly of God church family in Leitchfield, Kentucky, recorded ${active.date}.`}
              </p>
            </figcaption>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 md:mt-10">
          <VideoRail
            videos={videos}
            activeId={active.id}
            onSelect={setActiveId}
            kind={kind}
          />
        </div>
      </div>
    </section>
  );
}
