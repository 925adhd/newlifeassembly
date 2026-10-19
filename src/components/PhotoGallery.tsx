"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { albums } from "@/app/gallery";
import { useReveal, ease } from "@/lib/useReveal";

// Newest album featured, then this many cards; older albums drop off the page
const CARD_COUNT = 3;

function monthLabel(month?: string) {
  if (!month) return null;
  const [y, m] = month.split("-");
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

const zoom = "hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]";

export default function PhotoGallery() {
  const [viewing, setViewing] = useState<{ album: number; photo: number } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);
  const { slideUp, scaleIn, prefersReducedMotion } = useReveal();

  const [featured, ...rest] = albums;
  const cards = rest.slice(0, CARD_COUNT);

  const open = useCallback((album: number, photo: number, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setViewing({ album, photo });
    // Lets the phone's back button close the viewer instead of leaving the page
    window.history.pushState({ lightbox: true }, "");
  }, []);

  const close = useCallback(() => {
    if (viewing) window.history.back();
  }, [viewing]);

  const step = useCallback((by: number) => {
    setViewing((v) => {
      if (!v) return v;
      const total = albums[v.album].photos.length;
      return { album: v.album, photo: (v.photo + by + total) % total };
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setViewing(null);
      triggerRef.current?.focus();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const isOpen = viewing !== null;
  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);

  // Escape closes, arrows page through, Tab stays inside the viewer
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        const buttons = Array.from(dialogRef.current.querySelectorAll<HTMLButtonElement>("button"));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close, step]);

  if (!featured) return null;

  const fade = prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease } };
  const current = viewing && albums[viewing.album];
  const currentPhoto = current && current.photos[viewing.photo];
  const featuredMonth = monthLabel(featured.month);
  const [cover, ...extras] = featured.photos;
  const sidePhotos = extras.slice(0, 2);

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden" aria-labelledby="gallery-heading">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div {...slideUp()} className="text-center mb-10">
          <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
            Moments Together
          </p>
          <h2 id="gallery-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-tight">
            Events &amp; Activities
          </h2>
        </motion.div>

        {/* Newest event, featured */}
        <motion.article
          {...slideUp()}
          className="grid md:grid-cols-5 gap-5 md:gap-10 md:items-center mb-10 md:mb-14"
        >
          <div className={`md:col-span-3 grid gap-2 md:gap-3 aspect-[4/3] ${sidePhotos.length === 2 ? "grid-cols-3 grid-rows-2" : sidePhotos.length === 1 ? "grid-cols-3" : ""}`}>
            {[cover, ...sidePhotos].map((photo, index) => (
              <button
                key={photo.src}
                type="button"
                onClick={(e) => open(0, index, e.currentTarget)}
                className={`tap cursor-pointer overflow-hidden rounded-xl ${index === 0 && sidePhotos.length > 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  style={{ objectPosition: photo.focus }}
                  className={`w-full h-full object-cover ${zoom}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
          <div className="md:col-span-2">
            <p className="text-brand-accent font-medium text-xs md:text-sm tracking-[0.2em] uppercase mb-2">
              Latest{featuredMonth && ` · ${featuredMonth}`}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-primary tracking-tight leading-tight mb-3">
              {featured.title}
            </h3>
            {featured.description && (
              <p className="text-brand-primary/75 text-base leading-relaxed mb-4">
                {featured.description}
              </p>
            )}
            <button
              type="button"
              onClick={(e) => open(0, 0, e.currentTarget)}
              className="group cursor-pointer inline-flex items-center gap-2 py-1.5 text-brand-accent font-medium hover:text-brand-accent-dark transition-colors"
            >
              <Images className="w-5 h-5" aria-hidden="true" />
              View the photos
              <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </motion.article>

        {/* Earlier events: swipe row on phones, three across on desktop */}
        {cards.length > 0 && (
          <ul className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-2 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0">
            {cards.map((album, index) => {
              const month = monthLabel(album.month);
              const albumIndex = index + 1;
              return (
                <motion.li
                  key={album.title}
                  {...scaleIn(index * 0.05)}
                  className="relative shrink-0 w-[78%] sm:w-[45%] md:w-auto snap-start rounded-2xl border border-brand-primary/10 bg-white overflow-hidden lift tap has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-accent has-[:focus-visible]:ring-offset-2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={album.photos[0].src}
                      alt={album.photos[0].alt}
                      width={album.photos[0].width}
                      height={album.photos[0].height}
                      style={{ objectPosition: album.photos[0].focus }}
                      className={`w-full h-full object-cover ${zoom}`}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-serif text-xl font-bold text-brand-primary tracking-tight leading-tight">
                      {/* Stretched over the whole card so the photo is clickable too */}
                      <button
                        type="button"
                        onClick={(e) => open(albumIndex, 0, e.currentTarget)}
                        className="text-left cursor-pointer after:absolute after:inset-0 focus-visible:shadow-none!"
                      >
                        {album.title}
                      </button>
                    </h3>
                    {month && (
                      <p className="mt-1 text-brand-primary/65 text-sm">{month}</p>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Photo viewer: rendered on <body> so it covers the fixed navbar */}
      {typeof document !== "undefined" && createPortal(
      <AnimatePresence>
        {current && currentPhoto && viewing && (
          <motion.div
            {...fade}
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${current.title} photos`}
            className="fixed inset-0 z-[10000] bg-black/90 flex flex-col items-center justify-center p-4 cursor-pointer"
            onClick={close}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <button
              ref={closeBtnRef}
              type="button"
              onClick={close}
              className="cursor-pointer absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close photos"
            >
              <X className="w-8 h-8" aria-hidden="true" />
            </button>

            <motion.img
              key={currentPhoto.src}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease }}
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              width={currentPhoto.width}
              height={currentPhoto.height}
              className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg cursor-default"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="mt-4 flex items-center gap-4 text-white cursor-default" onClick={(e) => e.stopPropagation()}>
              {current.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="cursor-pointer p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" aria-hidden="true" />
                </button>
              )}
              <p className="text-sm text-white/80 text-center" aria-live="polite">
                <span className="font-medium text-white">{current.title}</span>
                {current.photos.length > 1 && ` · ${viewing.photo + 1} of ${current.photos.length}`}
              </p>
              {current.photos.length > 1 && (
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="cursor-pointer p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </section>
  );
}
