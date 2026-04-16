"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  HandHeart,
  ShieldCheck,
  Flame,
  Send,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";

const categories = [
  { value: "Healing", label: "Healing" },
  { value: "Family", label: "Family" },
  { value: "Guidance", label: "Guidance" },
  { value: "Salvation", label: "Salvation" },
  { value: "Thanksgiving", label: "Thanksgiving" },
  { value: "Other", label: "Something else" },
] as const;

const pillars = [
  {
    icon: ShieldCheck,
    eyebrow: "Held in confidence",
    title: "Between you and the pastor",
    body:
      "Mark your request confidential and it stays with Pastor Tony. Otherwise it joins our church prayer circle — names and details always handled with care.",
  },
  {
    icon: Flame,
    eyebrow: "Brought to the altar",
    title: "Lifted up Wednesday nights",
    body:
      "Every request is read aloud and prayed over during our Wednesday evening service. You don't have to be here — we carry you with us.",
  },
  {
    icon: HandHeart,
    eyebrow: "Personally read",
    title: "Pastor Tony reads each one",
    body:
      "No auto-reply, no form letter. Pastor Tony reads every note that comes in and will reach out personally if you ask him to.",
  },
];

export default function PrayerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<string>("Healing");
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  const fadeIn = prefersReducedMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } };

  const slideUp = (delay = 0) =>
    prefersReducedMotion
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } }
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, delay, ease } };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const confidential = formData.get("confidential") === "on";
    const tag = confidential ? "[CONFIDENTIAL]" : "[PRAYER WALL]";
    formData.set(
      "subject",
      `🙏 Prayer Request — ${category} ${tag} — New Life Assembly`,
    );
    formData.set("from_name", "New Life Prayer Wall");
    formData.set("_category", category);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setCategory("Healing");
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
      {/* Hero — sanctuary night sky */}
      <section className="relative pt-10 md:pt-16 pb-24 md:pb-32 -mb-px bg-brand-primary overflow-hidden aurora">
        <img
          src="/dove-logo.webp"
          alt=""
          aria-hidden="true"
          width={600}
          height={600}
          className="hidden md:block absolute top-[20px] right-10 w-[260px] h-auto opacity-[0.1] pointer-events-none select-none"
          loading="lazy"
        />
        <span
          aria-hidden="true"
          className="orb orb-float absolute w-[380px] h-[380px] -bottom-32 -left-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(232,184,108,0.22) 0%, rgba(232,184,108,0) 70%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div {...fadeIn}>
            <span className="block h-px w-12 bg-brand-gold/70 mx-auto mb-4" aria-hidden="true" />
            <p className="text-brand-gold font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.25em] uppercase mb-2 md:mb-3">
              Bring it to the altar
            </p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.15] mb-3 md:mb-4">
              We&apos;ll pray with you.
            </h1>
            <p className="text-white/75 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
              Whatever you&apos;re carrying — share it. Our church family will
              stand with you in prayer, quietly and without condition.
            </p>

            {/* Compact trust strip */}
            <ul className="mt-6 md:mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-white/80">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <li
                    key={pillar.eyebrow}
                    className="inline-flex items-center gap-2 text-[11px] md:text-xs font-medium tracking-[0.15em] uppercase"
                  >
                    <Icon
                      className="w-4 h-4 text-brand-gold shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                    {pillar.eyebrow}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>

        {/* Bottom fade into next section — smooth ease curve */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-40 md:h-64 z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(248,246,241,0) 0%, rgba(248,246,241,0.015) 12%, rgba(248,246,241,0.05) 22%, rgba(248,246,241,0.1) 32%, rgba(248,246,241,0.18) 42%, rgba(248,246,241,0.3) 52%, rgba(248,246,241,0.44) 62%, rgba(248,246,241,0.6) 72%, rgba(248,246,241,0.76) 82%, rgba(248,246,241,0.9) 90%, rgba(248,246,241,0.98) 96%, rgba(248,246,241,1) 100%)",
          }}
        />
      </section>

      {/* The form — prayer wall */}
      <section
        id="prayer-form"
        className="py-16 md:py-24 grid-pattern scroll-mt-20"
      >
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...slideUp()} className="text-center mb-10 md:mb-12">
            <span className="block h-px w-12 bg-brand-gold mx-auto mb-5" aria-hidden="true" />
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
              The prayer wall
            </p>
            <h2 className="font-serif italic text-3xl md:text-5xl font-bold text-brand-primary tracking-tight leading-[1.1]">
              Leave your request
            </h2>
          </motion.div>

          <motion.div {...slideUp(0.1)}>
            <div className="relative bg-white rounded-2xl shadow-sm border border-brand-primary/5 overflow-hidden">
              {/* Gold signature stripe */}
              <span
                aria-hidden="true"
                className="block h-1 w-full bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold"
              />

              <div className="p-7 md:p-12">
                {submitted ? (
                  <div className="text-center py-10" role="status" aria-live="polite">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-gold/20 mb-5">
                      <CheckCircle
                        className="w-8 h-8 text-brand-accent"
                        aria-hidden="true"
                        strokeWidth={1.75}
                      />
                    </div>
                    <h3 className="font-serif italic text-2xl md:text-3xl font-bold text-brand-primary mb-3">
                      Your prayer has been received.
                    </h3>
                    <p className="text-brand-primary/70 leading-relaxed max-w-md mx-auto">
                      Pastor Tony will see it shortly, and the church family
                      will lift it up on Wednesday evening. You are not
                      carrying this alone.
                    </p>
                    <p className="mt-6 text-[11px] tracking-[0.2em] uppercase text-brand-primary/50">
                      — With love, the New Life family
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <input
                      type="hidden"
                      name="access_key"
                      value="3fed5e9f-7550-4979-b5f7-535e075deff6"
                    />
                    <input
                      type="hidden"
                      name="subject"
                      value="🙏 Prayer Request — New Life Assembly"
                    />
                    <input type="hidden" name="from_name" value="New Life Prayer Wall" />
                    {/* Honeypot */}
                    <input
                      type="checkbox"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", opacity: 0 }}
                    />

                    {/* Category chips */}
                    <fieldset>
                      <legend className="block text-sm font-medium text-brand-primary mb-3">
                        This prayer is for…
                      </legend>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((c) => {
                          const active = category === c.value;
                          return (
                            <label
                              key={c.value}
                              className={`tap cursor-pointer select-none rounded-full px-4 py-2 text-sm font-medium tracking-tight transition-all duration-300 border ${
                                active
                                  ? "bg-brand-primary text-white border-brand-primary shadow-[0_6px_16px_-6px_rgba(27,42,74,0.4)]"
                                  : "bg-white text-brand-primary/75 border-brand-primary/15 hover:border-brand-accent hover:text-brand-accent"
                              }`}
                            >
                              <input
                                type="radio"
                                name="category"
                                value={c.value}
                                checked={active}
                                onChange={() => setCategory(c.value)}
                                className="sr-only"
                              />
                              {c.label}
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>

                    <div>
                      <label
                        htmlFor="prayer-name"
                        className="block text-sm font-medium text-brand-primary mb-2"
                      >
                        Your Name{" "}
                        <span className="text-brand-primary/60 font-normal">
                          (leave blank to stay anonymous)
                        </span>
                      </label>
                      <input
                        type="text"
                        id="prayer-name"
                        name="name"
                        autoComplete="name"
                        className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors"
                        placeholder="A friend in Christ"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="prayer-email"
                          className="block text-sm font-medium text-brand-primary mb-2"
                        >
                          Email{" "}
                          <span className="text-brand-primary/60 font-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="email"
                          id="prayer-email"
                          name="email"
                          autoComplete="email"
                          className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors"
                          placeholder="If you'd like a reply"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="prayer-phone"
                          className="block text-sm font-medium text-brand-primary mb-2"
                        >
                          Phone{" "}
                          <span className="text-brand-primary/60 font-normal">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="tel"
                          id="prayer-phone"
                          name="phone"
                          autoComplete="tel"
                          className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors"
                          placeholder="For a pastoral call"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="prayer-message"
                        className="block text-sm font-medium text-brand-primary mb-2"
                      >
                        What would you like us to pray for?{" "}
                        <span className="text-brand-red">*</span>
                      </label>
                      <textarea
                        id="prayer-message"
                        name="message"
                        required
                        aria-required="true"
                        rows={7}
                        className="w-full px-4 py-3 rounded-lg border border-brand-primary/20 bg-brand-warm focus:border-brand-accent focus:ring-1 focus:ring-brand-accent text-brand-primary transition-colors resize-none leading-relaxed"
                        placeholder="Share as much or as little as feels right. Nothing is too small — and nothing is too heavy."
                      />
                    </div>

                    {/* Confidential toggle */}
                    <label
                      htmlFor="prayer-confidential"
                      className="flex items-start gap-3 cursor-pointer group rounded-lg border border-brand-primary/10 bg-brand-warm/60 px-4 py-4 hover:border-brand-accent/40 transition-colors"
                    >
                      <input
                        type="checkbox"
                        id="prayer-confidential"
                        name="confidential"
                        className="mt-0.5 w-4 h-4 rounded border-brand-primary/30 text-brand-accent focus:ring-brand-accent accent-brand-accent"
                      />
                      <span className="flex-1">
                        <span className="flex items-center gap-2 text-sm font-medium text-brand-primary mb-0.5">
                          <Lock
                            className="w-3.5 h-3.5 text-brand-accent"
                            aria-hidden="true"
                            strokeWidth={2}
                          />
                          Keep this between Pastor Tony and me
                        </span>
                        <span className="block text-xs text-brand-primary/60 leading-relaxed">
                          Check this and your request won&apos;t be shared with
                          the church prayer circle — only Pastor Tony will
                          read it.
                        </span>
                      </span>
                    </label>

                    {error && (
                      <div className="flex items-center gap-2 text-brand-red text-sm" role="alert">
                        <AlertCircle className="w-4 h-4" aria-hidden="true" />
                        Something went wrong. Please try again, or call Pastor
                        Tony directly at (270) 200-3422.
                      </div>
                    )}

                    <div aria-live="polite">
                      <button
                        type="submit"
                        disabled={loading}
                        className="tap btn-gold w-full px-6 py-4 rounded-lg text-lg inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {loading ? (
                          "Sending with care…"
                        ) : (
                          <>
                            Send Prayer Request
                            <Send className="w-5 h-5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                      <p className="text-center text-[11px] tracking-[0.15em] uppercase text-brand-primary/45 mt-4">
                        Your request is sent securely to our pastoral team
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Closing — "You are carried" */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <motion.div {...slideUp()}>
            <span className="block h-px w-12 bg-brand-gold mx-auto mb-6" aria-hidden="true" />
            <p className="font-serif italic text-2xl md:text-4xl text-brand-primary/90 leading-[1.25] mb-6">
              &ldquo;Cast all your anxiety on him because he cares for you.&rdquo;
            </p>
            <p className="text-[10px] md:text-xs font-medium tracking-[0.25em] uppercase text-brand-accent mb-10">
              1 Peter 5:7
            </p>
            <p className="text-brand-primary/70 text-sm md:text-base leading-relaxed max-w-lg mx-auto">
              If what you&apos;re walking through feels too heavy for a form,
              call Pastor Tony directly. He&apos;d rather pray with you on the
              phone than have you wait.
            </p>
            <a
              href="tel:+12702003422"
              className="tap btn-gold mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg text-base"
            >
              Call Pastor Tony — (270) 200-3422
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
