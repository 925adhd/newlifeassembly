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
  Sun,
  ChevronRight,
  X,
} from "lucide-react";
import { OliveBranchDivider } from "@/components/Decorations";

const serviceTimes = [
  {
    day: "Sunday",
    services: [
      { name: "Sunday School", time: "10:00 AM", icon: Church },
      { name: "Sunday Morning Service", time: "11:00 AM", icon: Sun },
      { name: "Children's Church", time: "11:30 AM", icon: Baby },
    ],
  },
  {
    day: "Wednesday",
    services: [
      { name: "Bible Study", time: "6:30 PM", icon: BookOpen },
    ],
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
    author: "E Howe",
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

  const fade = prefersReducedMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } };
  const fadeScale = prefersReducedMotion ? {} : { initial: { scale: 0.9, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.9, opacity: 0 }, transition: { duration: 0.2 } };
  const slideUp = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.3 } } : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay } };
  const slideLeft = prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.3 } } : { initial: { opacity: 0, x: -30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };
  const slideRight = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.3 } } : { initial: { opacity: 0, x: 30 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.6, delay } };
  const heroLeft = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } } : { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6 } };
  const heroRight = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } } : { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay: 0.2 } };
  const scaleIn = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.3 } } : { initial: { opacity: 0, scale: 0.95 }, whileInView: { opacity: 1, scale: 1 }, viewport: { once: true }, transition: { duration: 0.4, delay } };

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
      <section className="pt-4 md:pt-12 pb-16 md:pb-16 bg-gradient-to-r from-brand-primary via-[#3d5575] to-[#7e94ad] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center mt-4 md:mt-0">
            {/* Text */}
            <motion.div
              {...heroLeft}
              className="text-center md:text-left order-2 md:order-1 -mt-[55px] md:mt-0 relative z-10"
            >
              <p className="text-white/70 font-medium text-xs tracking-widest uppercase mb-2 hidden md:block">
                Assemblies of God &middot; Leitchfield, Kentucky
              </p>
              <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-3 italic [text-shadow:0_4px_12px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.4)]">
                Welcome to New Life Assembly of God
              </h1>
              <p className="text-white/80 text-sm md:text-xl max-w-lg mb-6 leading-relaxed md:mx-0 mx-auto">
                A welcoming church family in Leitchfield, KY where you can
                experience God&apos;s love, grow in faith, and find your purpose.
              </p>
              <div className="flex flex-row items-center md:items-start justify-center md:justify-start gap-3">
                <a
                  href="/contact"
                  className="bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-medium text-sm md:text-lg transition-colors inline-flex items-center gap-2"
                >
                  Plan Your Visit
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                </a>
                <a
                  href="/watch"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-medium text-sm md:text-lg transition-colors"
                >
                  Watch a Service
                </a>
              </div>
            </motion.div>

            {/* Church Photo */}
            <motion.div
              {...heroRight}
              className="relative order-1 md:order-2 md:-mr-16 lg:-mr-24"
            >
              <img
                src="/new-life-assembly-church-building.webp"
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
          <OliveBranchDivider className="text-brand-primary/10 mb-12" />
          <motion.div
            {...slideUp()}
            className="text-center mb-12"
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              Join Us
            </p>
            <h2 id="service-times-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Service Times
            </h2>
            <p className="text-brand-primary/70 max-w-xl mx-auto">
              We&apos;d love to see you this week. All services are open to
              everyone — come as you are.
            </p>
          </motion.div>

          <motion.div
            {...slideUp()}
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-brand-primary/5 shadow-[0_1px_2px_rgba(27,42,74,0.04)] overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-primary/10">
              {serviceTimes.map((day) => (
                <div key={day.day} className="p-8 md:p-10">
                  <div className="flex items-baseline justify-between mb-6">
                    <h3 className="font-serif text-xl font-bold text-brand-primary tracking-tight">
                      {day.day}
                    </h3>
                    <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-brand-primary/40">
                      Weekly
                    </span>
                  </div>
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
                </div>
              ))}
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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:top-auto md:translate-x-0 md:translate-y-0 md:-left-20 md:bottom-8 w-[440px] md:w-[520px] h-auto opacity-[0.04] md:opacity-[0.06] pointer-events-none select-none"
          loading="lazy"
        />
        <div className="relative max-w-2xl mx-auto px-4">
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

          <motion.div
            {...slideUp(0.1)}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16"
          >
            {ministries.map((ministry, index) => (
              <a
                key={ministry.title}
                href={ministry.href}
                className={`group block ${index % 2 === 1 ? "md:mt-10" : ""}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-brand-primary/40">
                    Ministry
                  </span>
                  <span className="h-px flex-1 bg-brand-primary/10" aria-hidden="true" />
                </div>
                <h3 className="font-serif italic text-3xl md:text-4xl lg:text-5xl font-bold text-brand-primary tracking-tight leading-[1.05] mb-4 group-hover:text-brand-accent transition-colors">
                  {ministry.title}
                </h3>
                <p className="text-sm md:text-base text-brand-primary/65 leading-relaxed mb-5">
                  {ministry.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-brand-primary/60 group-hover:text-brand-accent transition-colors">
                  <span className="relative">
                    Learn more
                    <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </span>
              </a>
            ))}
          </motion.div>

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
      <section className="py-16 md:py-24 grid-pattern" aria-labelledby="life-heading">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...slideLeft}
              className="order-1 lg:order-1"
            >
              <img
                src="/new-life-assembly-baptism.webp"
                alt="Outdoor baptism at New Life Assembly of God"
                width={600}
                height={550}
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...slideRight()}
              className="order-2 lg:order-2"
            >
              <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
                Life at New Life
              </p>
              <h2 id="life-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-6">
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
                href="/contact"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                Get Connected
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life at New Life Gallery */}
      <section className="py-16 md:py-24 bg-white overflow-hidden" aria-labelledby="gallery-heading">
        <div className="max-w-6xl mx-auto px-4">
          <OliveBranchDivider className="text-brand-primary/10 mb-12" />
          <motion.div
            {...slideUp()}
            className="text-center mb-10"
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              Life at New Life
            </p>
            <h2 id="gallery-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary">
              Events &amp; Activities
            </h2>
          </motion.div>

          {/* Christmas Play Banner */}
          <motion.div
            {...slideUp()}
            className="overflow-hidden rounded-xl mb-3 md:mb-4 cursor-pointer"
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
              className="w-full h-40 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </motion.div>

          {/* Desktop: two play photos */}
          <div className="hidden md:grid grid-cols-2 gap-4 mb-4">
            <motion.div
              {...scaleIn()}
              className="overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
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
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...scaleIn(0.05)}
              className="overflow-hidden rounded-xl aspect-[4/3] cursor-pointer"
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
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                className="overflow-hidden rounded-xl aspect-square cursor-pointer"
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile: simple grid */}
          <div className="grid grid-cols-3 gap-3 md:hidden">
            {[
              { src: "/gallery-christmas-play-angels.webp", alt: "Children's Christmas play at New Life Assembly" },
              { src: "/gallery-christmas-play-kids.webp", alt: "Kids performing in Christmas play at New Life Assembly" },
              { src: "/gallery-egg-hunt.webp", alt: "Easter egg hunt at New Life Assembly" },
              { src: "/gallery-egg-hunt-kid.webp", alt: "Child with Easter eggs at New Life Assembly" },
              { src: "/gallery-vbs-group.webp", alt: "VBS kids group photo at New Life Assembly" },
              { src: "/gallery-vbs-crafts.webp", alt: "VBS crafts and activities at New Life Assembly" },
            ].map((photo, index) => (
              <motion.div
                key={photo.src}
                {...scaleIn(index * 0.05)}
                className="overflow-hidden rounded-xl aspect-square cursor-pointer"
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
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 md:py-32 bg-brand-primary overflow-hidden" aria-labelledby="testimonials-heading">
        <span
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 font-serif text-[22rem] md:text-[30rem] leading-none text-white/[0.04] select-none pointer-events-none"
        >
          &ldquo;
        </span>
        <div className="relative max-w-4xl mx-auto px-6">
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
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center"
          >
            <img src="/dove-logo.webp" alt="" aria-hidden="true" width={48} height={48} className="w-12 h-12 opacity-15 mx-auto mb-4" />
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              We&apos;d Love to Meet You
            </p>
            <h2 id="cta-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
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
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2"
              >
                Plan Your Visit
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="tel:+12702003422"
                className="border-2 border-brand-primary/20 hover:border-brand-accent text-brand-primary px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2"
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
