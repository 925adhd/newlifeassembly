"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const serviceTimes = [
  { name: "Sunday School", time: "10:00 AM" },
  { name: "Sunday Morning Service", time: "11:00 AM" },
  { name: "Children's Church", time: "11:30 AM" },
  { name: "Wednesday Bible Study", time: "6:30 PM" },
];

const whatToExpect = [
  {
    title: "Warm Welcome",
    description:
      "Our greeters will welcome you at the door and help you find your way around.",
  },
  {
    title: "Come As You Are",
    description:
      "There's no dress code here. Wear whatever makes you comfortable.",
  },
  {
    title: "Great Music",
    description:
      "Enjoy uplifting worship with our live praise band during the service.",
  },
  {
    title: "Biblical Teaching",
    description:
      "Pastor Tony delivers practical, encouraging messages rooted in Scripture.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const fadeIn = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } };
  const slideUp = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, delay, ease } };
  const slideLeft = prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, x: -32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.9, ease } };
  const slideRight = prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, x: 32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.9, ease } };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-8 md:py-24 bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src="/churchfromroad-1600.webp"
            srcSet="/churchfromroad-960.webp 960w, /churchfromroad-1600.webp 1600w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_calc(45%+5px)]"
            width={800}
            height={500}
          />
        </div>
        <div className="absolute inset-0 bg-black/35 hidden md:block" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center md:pt-8">
          <motion.div
            {...fadeIn}
          >
            <span className="block h-px w-12 bg-white/40 mx-auto mb-5" aria-hidden="true" />
            <p className="text-white/70 md:text-white/90 font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3 md:mb-4">
              We&apos;d Love to Meet You
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15] mb-3 md:mb-6">
              Plan Your Visit
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Whether it&apos;s your first Sunday or you&apos;re coming back,
              you&apos;re always welcome at New Life Assembly. Come as you are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            {...slideUp()}
            className="text-center mb-12 md:mb-16"
          >
            <span className="block h-px w-12 bg-brand-accent mx-auto mb-5" aria-hidden="true" />
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
              First Time?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-tight mb-4">
              What to Expect
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16 max-w-4xl mx-auto">
            {whatToExpect.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideUp(index * 0.1)}
                className="grid grid-cols-[auto_1fr] gap-5 md:gap-6 items-start"
              >
                <span
                  aria-hidden="true"
                  className="font-serif italic text-5xl md:text-6xl text-brand-accent/35 leading-none tabular-nums select-none"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="block h-px w-8 bg-brand-accent/50 mb-3" aria-hidden="true" />
                  <h3 className="font-serif italic text-2xl md:text-3xl font-bold text-brand-primary tracking-tight leading-[1.1] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-brand-primary/70 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section id="get-in-touch" className="py-16 md:py-24 grid-pattern scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 md:mb-20">
            {/* Left Column - Info */}
            <motion.div
              {...slideLeft}
            >
              {/* Church from Road - mobile only above content */}
              <div className="md:hidden rounded-2xl overflow-hidden shadow-sm mb-8">
                <img
                  src="/church-exterior-960.webp"
                  srcSet="/church-exterior-480.webp 480w, /church-exterior-960.webp 960w"
                  sizes="100vw"
                  alt="New Life Assembly of God church building and sign from the road in Leitchfield, Kentucky"
                  width={800}
                  height={500}
                  className="w-full rounded-2xl"
                  loading="lazy"
                />
              </div>

              <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
              <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
                Reach Out
              </p>
              <h2 className="font-serif italic text-3xl md:text-4xl font-bold text-brand-primary tracking-tight leading-[1.1] mb-8">
                Get in Touch
              </h2>

              {/* Church from Road - desktop after service times */}
              <div className="hidden md:block rounded-2xl overflow-hidden shadow-sm mb-10">
                <img
                  src="/church-exterior-960.webp"
                  srcSet="/church-exterior-480.webp 480w, /church-exterior-960.webp 960w, /church-exterior-1600.webp 1600w"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  alt="New Life Assembly of God church building and sign from the road in Leitchfield, Kentucky"
                  width={800}
                  height={500}
                  className="w-full rounded-2xl"
                  loading="lazy"
                />
              </div>

              {/* Contact Details — editorial list */}
              <div className="divide-y divide-brand-primary/10 border-y border-brand-primary/10 mb-10">
                <div className="py-5 grid grid-cols-[auto_1fr] gap-4 items-center">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0" aria-hidden="true" strokeWidth={1.75} />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary/50 mb-0.5">
                        Pastor
                      </p>
                      <p className="font-serif text-lg font-bold text-brand-primary leading-tight">
                        Pastor Tony Redmon
                      </p>
                    </div>
                    <a
                      href="tel:+12702003422"
                      className="text-brand-accent font-medium hover:text-brand-accent-dark transition-colors tabular-nums tracking-tight"
                    >
                      (270) 200-3422
                    </a>
                  </div>
                </div>

                <div className="py-5 grid grid-cols-[auto_1fr] gap-4 items-center">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0" aria-hidden="true" strokeWidth={1.75} />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary/50 mb-0.5">
                        Office
                      </p>
                      <p className="font-serif text-lg font-bold text-brand-primary leading-tight">
                        Church Office
                      </p>
                    </div>
                    <a
                      href="tel:+12708680369"
                      className="text-brand-accent font-medium hover:text-brand-accent-dark transition-colors tabular-nums tracking-tight"
                    >
                      (270) 868-0369
                    </a>
                  </div>
                </div>

                <div className="py-5 grid grid-cols-[auto_1fr] gap-4 items-start">
                  <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-1" aria-hidden="true" strokeWidth={1.75} />
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-brand-primary/50 mb-0.5">
                      Visit
                    </p>
                    <p className="font-serif text-lg font-bold text-brand-primary leading-tight mb-2">
                      47 Embry Acres Dr<br />Leitchfield, KY 42754
                    </p>
                    <a
                      href="https://maps.google.com/?q=47+Embry+Acres+Dr,+Leitchfield,+KY+42754"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase text-brand-accent hover:text-brand-accent-dark transition-colors"
                    >
                      Get directions
                      <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                    </a>
                  </div>
                </div>
              </div>


            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              {...slideRight}
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-brand-primary/5">
                <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
                <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
                  Drop Us a Line
                </p>
                <h2 className="font-serif italic text-2xl md:text-3xl font-bold text-brand-primary tracking-tight leading-[1.1] mb-3">
                  Send Us a Message
                </h2>
                <p className="text-brand-primary/70 text-sm mb-8">
                  Have a question or want more info? Fill out the form below and
                  we&apos;ll get back to you.
                </p>

                {submitted ? (
                  <div className="text-center py-12" role="status" aria-live="polite">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" aria-hidden="true" />
                    <h3 className="font-serif text-2xl font-bold text-brand-primary mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-brand-primary/70">
                      Thank you for reaching out. We&apos;ll get back to you
                      soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="hidden"
                      name="access_key"
                      value="3fed5e9f-7550-4979-b5f7-535e075deff6"
                    />
                    <input
                      type="hidden"
                      name="subject"
                      value="New message from New Life Assembly website"
                    />
                    {/* Honeypot — real users leave this empty; bots fill it */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                    />

                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-brand-primary mb-2"
                      >
                        Your Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        aria-required="true"
                        autoComplete="name"
                        className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-brand-primary mb-2"
                      >
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        aria-required="true"
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-brand-primary mb-2"
                      >
                        Phone Number{" "}
                        <span className="text-brand-primary/65">(optional)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        autoComplete="tel"
                        className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors"
                        placeholder="(270) 555-0123"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-brand-primary mb-2"
                      >
                        Message <span className="text-brand-red">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        aria-required="true"
                        rows={5}
                        className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-2 text-red-600 text-sm" role="alert">
                        <AlertCircle className="w-4 h-4" aria-hidden="true" />
                        Something went wrong. Please try again or call us
                        directly.
                      </div>
                    )}

                    <div aria-live="polite">
                      <button
                        type="submit"
                        disabled={loading}
                        className="tap btn-gold w-full px-6 py-4 rounded-lg text-lg inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          "Sending..."
                        ) : (
                          <>
                            Send Message
                            <Send className="w-5 h-5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Service Times — horizontal full width */}
          <motion.div
            {...slideUp()}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-brand-primary/5 mb-8 md:mb-10"
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 md:mb-8">
              <div>
                <span className="block h-px w-10 bg-brand-accent mb-3" aria-hidden="true" />
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-primary tracking-tight flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-accent" aria-hidden="true" strokeWidth={1.75} />
                  Service Times
                </h3>
              </div>
              <p className="text-[10px] tracking-[0.2em] uppercase text-brand-primary/45">
                All services open to everyone
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6">
              {serviceTimes.map((service, i) => (
                <div
                  key={service.name}
                  className={`md:px-6 md:first:pl-0 md:last:pr-0 ${i > 0 ? "md:border-l md:border-brand-primary/10" : ""}`}
                >
                  <p className="font-serif text-base md:text-lg font-bold text-brand-primary leading-tight mb-1">
                    {service.name}
                  </p>
                  <p className="text-brand-accent text-sm tabular-nums tracking-tight">
                    {service.time}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Google Maps — full width below the grid */}
          <motion.div
            {...slideUp()}
            className="rounded-2xl overflow-hidden shadow-sm border border-brand-primary/5 mb-16 md:mb-20"
          >
            <iframe
              title="New Life Assembly of God location on Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.0!2d-86.2883226!3d37.5088931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886f4b96e2b5d627%3A0x7068670081ffda4c!2sNew%20Life%20Assembly%20of%20God!5e0!3m2!1sen!2sus!4v1700000000000"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 md:h-[420px] w-full"
            />
          </motion.div>

          {/* Warm closing sign-off */}
          <motion.div
            {...slideUp(0.1)}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="block h-px w-12 bg-brand-accent mx-auto mb-6" aria-hidden="true" />
            <p className="font-serif italic text-2xl md:text-3xl text-brand-primary/85 leading-snug mb-3">
              We can&apos;t wait to meet you.
            </p>
            <p className="text-brand-primary/55 text-[11px] tracking-[0.2em] uppercase">
              — Pastor Tony &amp; the New Life family
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
