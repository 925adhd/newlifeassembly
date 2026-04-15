"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Clock,
  MapPin,
  Phone,
  BookOpen,
  Church,
  Users,
  Baby,
  Music2,
  ChevronRight,
  X,
} from "lucide-react";
import Tilt from "@/components/Tilt";

const serviceTimes: {
  day: string;
  services: { name: string; time: string; icon: typeof Church }[];
  note?: string;
}[] = [
  {
    day: "Sunday",
    services: [
      { name: "Sunday School", time: "10:00 AM", icon: BookOpen },
      { name: "Sunday Morning Service", time: "11:00 AM", icon: Church },
      { name: "Children's Church", time: "11:30 AM", icon: Baby },
    ],
  },
  {
    day: "Wednesday",
    services: [
      { name: "Bible Study", time: "6:30 PM", icon: BookOpen },
    ],
    note: "Casual setting · drop in any week — no prior study required.",
  },
];

const ministries = [
  {
    title: "Sunday Worship",
    href: "/ministries#sunday-worship",
    description:
      "Experience uplifting praise and worship with our church family every Sunday morning. All are welcome.",
    icon: Music2,
  },
  {
    title: "Children's Church",
    href: "/ministries#childrens-church",
    description:
      "A fun, safe environment where kids learn about God's love through age-appropriate lessons and activities.",
    icon: Baby,
  },
  {
    title: "Bible Study",
    href: "/ministries#bible-study",
    description:
      "Dive deeper into God's Word every Wednesday evening. Grow in faith through study, discussion, and prayer.",
    icon: BookOpen,
  },
  {
    title: "Community & Fellowship",
    href: "/ministries#outreach",
    description:
      "Build meaningful relationships with fellow believers through fellowship events, outreach, and service.",
    icon: Users,
  },
];

const testimonials = [
  {
    quote: "An amazing church with an amazing pastor.",
    author: "E. Howe",
  },
];

export default function HomePage() {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const openLightbox = useCallback((photo: { src: string; alt: string }, trigger?: HTMLElement) => {
    triggerRef.current = trigger || null;
    setLightboxImg(photo);
    window.history.pushState({ lightbox: true }, "");
  }, []);

  const closeLightbox = useCallback(() => {
    if (lightboxImg) {
      window.history.back();
    }
  }, [lightboxImg]);

  useEffect(() => {
    const handlePopState = () => {
      setLightboxImg(null);
      triggerRef.current?.focus();
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Focus the close button when lightbox opens
  useEffect(() => {
    if (lightboxImg) {
      closeBtnRef.current?.focus();
    }
  }, [lightboxImg]);

  // Trap focus inside lightbox and handle Escape
  useEffect(() => {
    if (!lightboxImg) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      }
      if (e.key === "Tab") {
        // Trap focus on the close button (only focusable element)
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxImg, closeLightbox]);

  const ease = [0.16, 1, 0.3, 1] as const;
  const fade = prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.25, ease } };
  const fadeScale = prefersReducedMotion ? {} : { initial: { scale: 0.92, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.92, opacity: 0 }, transition: { duration: 0.3, ease } };
  const slideUp = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, delay, ease } };
  const slideLeft = prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, x: -32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.9, ease } };
  const slideRight = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, x: 32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.9, delay, ease } };
  const heroContainer = prefersReducedMotion
    ? { initial: "hidden" as const, animate: "visible" as const, variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } } }
    : { initial: "hidden" as const, animate: "visible" as const, variants: { hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } } };
  const heroChild = prefersReducedMotion
    ? { variants: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } } }
    : { variants: { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } } } };
  const heroRight = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, x: 32 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.9, delay: 0.25, ease } };
  const scaleIn = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, scale: 0.96 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.7, delay, ease } };

  return (
    <>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            {...fade}
            role="dialog"
            aria-modal="true"
            aria-label="Enlarged image"
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
          >
            <button
              ref={closeBtnRef}
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close image"
            >
              <X className="w-8 h-8" aria-hidden="true" />
            </button>
            <motion.img
              {...fadeScale}
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-4 md:pt-12 pb-16 md:pb-16 -mb-px bg-gradient-to-r from-brand-primary via-[#3d5575] to-[#7e94ad] overflow-hidden gradient-mesh">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-64 md:h-96 z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(248,246,241,0) 0%, rgba(248,246,241,0.08) 25%, rgba(248,246,241,0.3) 55%, rgba(248,246,241,0.7) 78%, rgba(248,246,241,1) 94%, rgba(248,246,241,1) 100%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center mt-4 md:mt-0">
            {/* Text */}
            <motion.div
              {...heroContainer}
              className="text-center md:text-left order-2 md:order-1 -mt-[55px] md:mt-0 relative z-10"
            >
              <motion.p {...heroChild} className="text-white/60 md:text-white/70 font-medium text-[10px] md:text-xs tracking-[0.2em] md:tracking-widest uppercase mb-3 md:mb-2">
                Assemblies of God &middot; Leitchfield, Kentucky
              </motion.p>
              <motion.h1 {...heroChild} className="font-serif text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-3 italic [text-shadow:0_4px_12px_rgba(0,0,0,0.35)]">
                Welcome to New Life Assembly of God
              </motion.h1>
              <motion.p {...heroChild} className="text-white/80 text-sm md:text-xl max-w-lg mb-6 leading-relaxed md:mx-0 mx-auto">
                A welcoming church family in Leitchfield, KY where you can
                experience God&apos;s love, grow in faith, and find your purpose.
              </motion.p>
              <motion.div {...heroChild} className="flex flex-row items-center md:items-start justify-center md:justify-start gap-3">
                <a
                  href="/contact"
                  className="tap group relative btn-gold px-5 py-3 md:px-8 md:py-4 rounded-lg text-sm md:text-lg inline-flex items-center gap-2 hover:-translate-y-1"
                >
                  <span className="relative z-10">Plan Your Visit</span>
                  <ChevronRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <a
                  href="/watch"
                  className="tap group relative border-2 border-white/40 bg-white/10 backdrop-blur-sm text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-medium text-sm md:text-lg overflow-hidden hover:border-white hover:-translate-y-1 hover:text-brand-primary transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span className="absolute inset-0 bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
                  <span className="relative z-10">Watch a Service</span>
                </a>
              </motion.div>
            </motion.div>

            {/* Church Photo */}
            <motion.div
              {...heroRight}
              className="relative order-1 md:order-2 md:-mr-16 lg:-mr-24"
            >
              <img
                src="/new-life-assembly-church-building-960.webp"
                srcSet="/new-life-assembly-church-building-480.webp 480w, /new-life-assembly-church-building-960.webp 960w, /new-life-assembly-church-building-1600.webp 1600w"
                sizes="(min-width: 1280px) 640px, (min-width: 768px) 50vw, 100vw"
                alt="New Life Assembly of God church building in Leitchfield, Kentucky"
                width={960}
                height={720}
                className="w-full h-auto hero-img-mask"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section
        id="service-times"
        aria-labelledby="service-times-heading"
        className="py-16 md:py-24 scroll-mt-20 grid-pattern"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-px w-24 mx-auto bg-brand-primary/15 mb-12" aria-hidden="true" />
          <motion.div
            {...slideUp()}
            className="text-center mb-12"
          >
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
              Join Us
            </p>
            <h2 id="service-times-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              When We Gather
            </h2>
            <p className="text-brand-primary/70 max-w-xl mx-auto">
              We&apos;d love to see you this week. All services are open to
              everyone — come as you are.
            </p>
          </motion.div>

          <motion.div
            {...scaleIn()}
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-brand-primary/5 shadow-[0_1px_2px_rgba(27,42,74,0.04)] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-primary/10 items-stretch">
              {serviceTimes.map((day) => (
                <div key={day.day} className="p-8 md:p-10 flex flex-col">
                  <span className="block h-px w-10 bg-brand-accent mb-5" aria-hidden="true" />
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-primary tracking-tight mb-6">
                    {day.day}
                  </h3>
                  <ul className="divide-y divide-brand-primary/5">
                    {day.services.map((service) => {
                      const Icon = service.icon;
                      return (
                        <li
                          key={service.name}
                          className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                        >
                          <Icon
                            className="w-4 h-4 text-brand-primary/40 shrink-0"
                            aria-hidden="true"
                            strokeWidth={1.5}
                          />
                          <p className="flex-1 text-sm text-brand-primary">
                            {service.name}
                          </p>
                          <p className="text-sm text-brand-primary/60 tabular-nums tracking-tight">
                            {service.time}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                  {day.note && (
                    <p className="mt-5 pt-5 border-t border-brand-primary/5 text-xs text-brand-primary/55 italic leading-relaxed">
                      {day.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="border-t border-brand-primary/10 bg-brand-warm/40 px-6 md:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-brand-primary/75">
                <MapPin className="w-4 h-4 text-brand-accent shrink-0" aria-hidden="true" strokeWidth={1.75} />
                <span>47 Embry Acres Dr, Leitchfield, KY</span>
              </div>
              <a
                href="https://maps.google.com/?q=47+Embry+Acres+Dr,+Leitchfield,+KY+42754"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-brand-accent hover:text-brand-accent-dark transition-colors"
                aria-label="Open directions to 47 Embry Acres Dr, Leitchfield, KY in Google Maps"
              >
                Get directions
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ministries Overview */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden" aria-labelledby="ministries-heading">
        <img
          src="/dove-logo.webp"
          alt=""
          aria-hidden="true"
          width={600}
          height={600}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:-left-20 md:bottom-8 w-[440px] md:w-[520px] h-auto opacity-[0.03] md:opacity-[0.04] pointer-events-none select-none"
          loading="lazy"
        />
        <div className="relative max-w-4xl mx-auto px-4">
          <motion.div
            {...slideUp()}
            className="flex items-end justify-between mb-8 md:mb-10 gap-6"
          >
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-primary/50 mb-2">
                Get Involved
              </p>
              <h2 id="ministries-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-tight">
                Our Ministries
              </h2>
            </div>
            <a
              href="/ministries"
              className="hidden md:inline-flex items-center gap-1.5 text-sm text-brand-primary/60 hover:text-brand-accent transition-colors shrink-0 pb-1"
            >
              View all
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 md:gap-y-16">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.title}
                {...slideUp(index * 0.12)}
                className={index % 2 === 1 ? "md:mt-10" : ""}
              >
                <Tilt max={5} scale={1.01}>
                  <a
                    href={ministry.href}
                    className="group block tap"
                  >
                    <span className="block h-px w-10 bg-brand-primary/15 mb-4 transition-all duration-500 group-hover:w-16 group-hover:bg-brand-accent" aria-hidden="true" />
                    <h3 className="font-serif italic text-3xl md:text-4xl lg:text-5xl font-bold text-brand-primary tracking-tight leading-[1.05] mb-4 group-hover:text-brand-accent transition-colors duration-500">
                      {ministry.title}
                    </h3>
                    <p className="text-sm md:text-base text-brand-primary/65 leading-relaxed mb-5">
                      {ministry.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-brand-primary/60 group-hover:text-brand-accent transition-colors duration-500">
                      <span className="link-underline">Learn more</span>
                      <ChevronRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </a>
                </Tilt>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden mt-6 text-center">
            <a
              href="/ministries"
              className="inline-flex items-center gap-1.5 text-sm text-brand-primary/60 hover:text-brand-accent transition-colors"
            >
              View all ministries
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* Baptism / Life at New Life */}
      <section className="relative py-16 md:py-24 grid-pattern overflow-hidden" aria-labelledby="life-heading">
        <span
          aria-hidden="true"
          className="absolute right-0 bottom-4 md:right-8 md:bottom-12 font-serif italic text-[10rem] md:text-[18rem] leading-none text-brand-primary/[0.04] select-none pointer-events-none z-0"
        >
          Faith.
        </span>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              {...slideLeft}
              className="order-1 lg:order-1 relative max-w-md mx-auto lg:mx-0"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-3 md:-top-4 md:-left-4 right-6 bottom-6 border-2 border-brand-accent/40 rounded-tl-[64px] rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl pointer-events-none"
              />
              <img
                src="/new-life-assembly-baptism-960.webp"
                srcSet="/new-life-assembly-baptism-480.webp 480w, /new-life-assembly-baptism-960.webp 960w"
                sizes="(min-width: 1024px) 448px, 100vw"
                alt="Outdoor baptism at New Life Assembly of God"
                width={600}
                height={550}
                className="relative w-full rounded-tl-[64px] rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl shadow-xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...slideRight()}
              className="order-2 lg:order-2 relative"
            >
              <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
              <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
                Life at New Life
              </p>
              <h2 id="life-heading" className="font-serif italic text-3xl md:text-5xl font-bold text-brand-primary mb-6 leading-[1.1]">
                Growing Together in Faith
              </h2>
              <p className="text-brand-primary/75 leading-relaxed mb-4">
                At New Life Assembly, we celebrate every step of your spiritual
                journey — from your first visit to water baptism and beyond. Our
                church is a place where real life change happens through the
                power of God.
              </p>
              <p className="text-brand-primary/75 leading-relaxed mb-6">
                Whether you&apos;re new to faith or have been walking with God
                for years, you&apos;ll find opportunities to grow, serve, and
                connect with others who share your journey.
              </p>
              <a
                href="/contact#get-in-touch"
                className="tap group relative btn-gold px-6 py-3 rounded-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
              >
                Get Connected
                <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life at New Life Gallery */}
      <section className="py-16 md:py-24 bg-white overflow-hidden" aria-labelledby="gallery-heading">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-px w-24 mx-auto bg-brand-primary/15 mb-12" aria-hidden="true" />
          <motion.div
            {...slideUp()}
            className="text-center mb-10"
          >
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
              Moments Together
            </p>
            <h2 id="gallery-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary">
              Events &amp; Activities
            </h2>
          </motion.div>

          {/* Christmas Play Banner */}
          <motion.div
            {...slideUp()}
            className="overflow-hidden rounded-xl mb-3 md:mb-4 cursor-pointer tap lift"
            role="button"
            tabIndex={0}
            aria-label="View enlarged: Christmas nativity play at New Life Assembly"
            onClick={(e) => openLightbox({ src: "/gallery-christmas-play-stage.webp", alt: "Christmas nativity play at New Life Assembly" }, e.currentTarget)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox({ src: "/gallery-christmas-play-stage.webp", alt: "Christmas nativity play at New Life Assembly" }, e.currentTarget); }}}
          >
            <img
              src="/gallery-christmas-play-stage.webp"
              alt="Christmas nativity play at New Life Assembly"
              width={1200}
              height={400}
              className="w-full h-40 md:h-64 object-cover hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              loading="lazy"
            />
          </motion.div>

          {/* Desktop: two play photos */}
          <div className="hidden md:grid grid-cols-2 gap-4 mb-4">
            <motion.div
              {...scaleIn()}
              className="overflow-hidden rounded-xl aspect-[4/3] cursor-pointer tap lift"
              role="button"
              tabIndex={0}
              aria-label="View enlarged: Children's Christmas play at New Life Assembly"
              onClick={(e) => openLightbox({ src: "/gallery-christmas-play-angels.webp", alt: "Children's Christmas play at New Life Assembly" }, e.currentTarget)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox({ src: "/gallery-christmas-play-angels.webp", alt: "Children's Christmas play at New Life Assembly" }, e.currentTarget); }}}
            >
              <img
                src="/gallery-christmas-play-angels.webp"
                alt="Children's Christmas play at New Life Assembly"
                width={600}
                height={450}
                className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...scaleIn(0.05)}
              className="overflow-hidden rounded-xl aspect-[4/3] cursor-pointer tap lift"
              role="button"
              tabIndex={0}
              aria-label="View enlarged: Kids performing in Christmas play at New Life Assembly"
              onClick={(e) => openLightbox({ src: "/gallery-christmas-play-kids.webp", alt: "Kids performing in Christmas play at New Life Assembly" }, e.currentTarget)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox({ src: "/gallery-christmas-play-kids.webp", alt: "Kids performing in Christmas play at New Life Assembly" }, e.currentTarget); }}}
            >
              <img
                src="/gallery-christmas-play-kids.webp"
                alt="Kids performing in Christmas play at New Life Assembly"
                width={300}
                height={400}
                className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                loading="lazy"
              />
            </motion.div>
          </div>
          <div className="hidden md:grid grid-cols-4 gap-4">
            {[
              { src: "/gallery-egg-hunt.webp", alt: "Easter egg hunt at New Life Assembly" },
              { src: "/gallery-egg-hunt-kid.webp", alt: "Child with Easter eggs at New Life Assembly" },
              { src: "/gallery-vbs-group.webp", alt: "VBS kids group photo at New Life Assembly" },
              { src: "/gallery-vbs-crafts.webp", alt: "VBS crafts and activities at New Life Assembly" },
            ].map((photo, index) => (
              <motion.div
                key={photo.src}
                {...scaleIn(index * 0.05)}
                className="overflow-hidden rounded-xl aspect-square cursor-pointer tap lift"
                role="button"
                tabIndex={0}
                aria-label={`View enlarged: ${photo.alt}`}
                onClick={(e) => openLightbox(photo, e.currentTarget)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(photo, e.currentTarget); }}}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile: editorial collage — vary sizes for visual rhythm */}
          <div className="grid grid-cols-3 grid-flow-dense auto-rows-[6rem] gap-3 md:hidden">
            {[
              { src: "/gallery-christmas-play-angels.webp", alt: "Children's Christmas play at New Life Assembly", span: "col-span-2 row-span-2" },
              { src: "/gallery-christmas-play-kids.webp", alt: "Kids performing in Christmas play at New Life Assembly", span: "row-span-2" },
              { src: "/gallery-egg-hunt.webp", alt: "Easter egg hunt at New Life Assembly", span: "" },
              { src: "/gallery-egg-hunt-kid.webp", alt: "Child with Easter eggs at New Life Assembly", span: "" },
              { src: "/gallery-vbs-group.webp", alt: "VBS kids group photo at New Life Assembly", span: "col-span-2" },
              { src: "/gallery-vbs-crafts.webp", alt: "VBS crafts and activities at New Life Assembly", span: "" },
            ].map((photo, index) => (
              <motion.div
                key={photo.src}
                {...scaleIn(index * 0.05)}
                className={`overflow-hidden rounded-xl cursor-pointer tap lift ${photo.span}`}
                role="button"
                tabIndex={0}
                aria-label={`View enlarged: ${photo.alt}`}
                onClick={(e) => openLightbox(photo, e.currentTarget)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLightbox(photo, e.currentTarget); }}}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-[1.04] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 md:py-32 bg-brand-primary overflow-hidden aurora" aria-labelledby="testimonials-heading">
        <span
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 font-serif text-[22rem] md:text-[30rem] leading-none text-white/[0.04] select-none pointer-events-none z-0"
        >
          &ldquo;
        </span>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.p
            {...slideUp()}
            className="text-[11px] font-medium tracking-[0.25em] uppercase text-brand-accent text-center mb-10"
          >
            <span id="testimonials-heading">From Our Church Family</span>
          </motion.p>

          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.author}
              {...slideUp(index * 0.1)}
              className="text-center"
            >
              <blockquote>
                <p className="font-serif italic text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight mb-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center gap-4 text-white/60">
                <span className="h-px w-10 bg-white/30" aria-hidden="true" />
                <span className="text-sm font-medium tracking-wider uppercase">
                  {testimonial.author}
                </span>
                <span className="h-px w-10 bg-white/30" aria-hidden="true" />
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="py-16 md:py-24" id="contact" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            {...slideUp()}
            className="relative bg-gradient-to-b from-white via-white to-brand-warm/40 rounded-3xl p-8 md:p-14 shadow-[0_2px_8px_rgba(27,42,74,0.04),0_24px_48px_-24px_rgba(27,42,74,0.12)] text-center overflow-hidden border border-brand-primary/[0.04]"
          >
            <img
              src="/dove-logo.webp"
              alt=""
              aria-hidden="true"
              width={120}
              height={120}
              className="hidden md:block absolute right-8 bottom-8 w-20 h-auto opacity-[0.08] pointer-events-none select-none"
              loading="lazy"
            />
            <span className="relative block h-px w-12 bg-brand-accent mx-auto mb-5" aria-hidden="true" />
            <p className="relative text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
              We&apos;d Love to Meet You
            </p>
            <h2 id="cta-heading" className="relative font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Plan Your Visit
            </h2>
            <p className="text-brand-primary/70 max-w-lg mx-auto mb-8">
              Have questions? Want to know what to expect on your first visit?
              We&apos;re here to help. Reach out or just show up — you&apos;re
              always welcome.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="/contact"
                className="tap group relative btn-gold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
              >
                Plan Your Visit
                <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="tel:+12702003422"
                className="tap border-2 border-brand-primary/20 hover:border-brand-accent text-brand-primary px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call Pastor Tony
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-brand-primary/65 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Leitchfield, Kentucky
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                Sundays at 10:00 AM & 11:00 AM
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
