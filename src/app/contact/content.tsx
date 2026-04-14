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
      <section className="relative py-12 md:py-20 bg-brand-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 hidden md:block">
          <img
            src="/churchfromroad.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_calc(45%+5px)]"
            width={800}
            height={500}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-8">
          <motion.div
            {...fadeIn}
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-4">
              We&apos;d Love to Meet You
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Plan Your Visit
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Whether it&apos;s your first time or you&apos;re coming back, you
              are always welcome at New Life Assembly of God.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            {...slideUp()}
            className="text-center mb-12"
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              First Time?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              What to Expect
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatToExpect.map((item, index) => (
              <motion.div
                key={item.title}
                {...slideUp(index * 0.1)}
                className="text-center p-6"
              >
                <div className="w-10 h-10 rounded-full bg-brand-accent text-white flex items-center justify-center mx-auto mb-4 font-bold">
                  {index + 1}
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-brand-primary/70 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section id="get-in-touch" className="py-16 md:py-24 grid-pattern scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Info */}
            <motion.div
              {...slideLeft}
            >
              {/* Church from Road - mobile only above content */}
              <div className="md:hidden rounded-2xl overflow-hidden shadow-sm mb-8">
                <img
                  src="/churchfromroad.webp"
                  alt="New Life Assembly of God church building and sign from the road in Leitchfield, Kentucky"
                  width={800}
                  height={500}
                  className="w-full rounded-2xl"
                  loading="lazy"
                />
              </div>

              <h2 className="font-serif text-3xl font-bold text-brand-primary mb-8">
                Get in Touch
              </h2>

              {/* Church from Road - desktop after service times */}
              <div className="hidden md:block rounded-2xl overflow-hidden shadow-sm mb-8">
                <img
                  src="/churchfromroad.webp"
                  alt="New Life Assembly of God church building and sign from the road in Leitchfield, Kentucky"
                  width={800}
                  height={500}
                  className="w-full rounded-2xl"
                  loading="lazy"
                />
              </div>

              {/* Contact Details */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-primary">
                      Pastor Tony Redmon
                    </h3>
                    <a
                      href="tel:+12702003422"
                      className="text-brand-accent underline underline-offset-2"
                    >
                      (270) 200-3422
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-primary">
                      Church Office
                    </h3>
                    <a
                      href="tel:+12708680369"
                      className="text-brand-accent underline underline-offset-2"
                    >
                      (270) 868-0369
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-primary">
                      Location
                    </h3>
                    <p className="text-brand-primary/70">
                      47 Embry Acres Dr<br />Leitchfield, KY 42754
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Times */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-brand-primary mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                  Service Times
                </h3>
                <ul className="space-y-4">
                  {serviceTimes.map((service) => (
                    <li
                      key={service.name}
                      className="flex items-center justify-between border-b border-brand-primary/5 pb-3 last:border-0 last:pb-0"
                    >
                      <span className="font-medium text-brand-primary">
                        {service.name}
                      </span>
                      <span className="text-brand-accent font-medium">
                        {service.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Google Maps Embed */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-sm">
                <iframe
                  title="New Life Assembly of God location on Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.0!2d-86.2883226!3d37.5088931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886f4b96e2b5d627%3A0x7068670081ffda4c!2sNew%20Life%20Assembly%20of%20God!5e0!3m2!1sen!2sus!4v1700000000000"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              {...slideRight}
            >
              <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-brand-primary mb-2">
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
                    {/* TODO: Replace with real Web3Forms access key */}
                    <input
                      type="hidden"
                      name="access_key"
                      value="YOUR_WEB3FORMS_KEY"
                    />
                    <input
                      type="hidden"
                      name="subject"
                      value="New message from New Life Assembly website"
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
                        className="tap w-full bg-brand-accent hover:bg-brand-accent/90 disabled:bg-brand-accent/50 disabled:cursor-not-allowed text-white px-6 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center justify-center gap-2"
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
        </div>
      </section>
    </>
  );
}
