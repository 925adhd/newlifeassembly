"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronRight, FileText, Heart } from "lucide-react";
import { beliefs, showMarriage } from "./beliefs";
import { useReveal } from "@/lib/useReveal";

export default function BeliefsPage() {
  const { fadeIn, slideUp } = useReveal();

  // Mobile only: beliefs collapse to their titles. Text stays in the HTML
  // (hidden via CSS) so it's still indexed; desktop always shows it.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Marriage shares the accordion on mobile so it reads as one more belief
  const marriageIndex = beliefs.length;
  const marriageOpen = openIndex === marriageIndex;

  return (
    <>
      {/* Hero */}
      <section className="relative py-14 md:py-24 bg-brand-primary overflow-hidden gradient-mesh">
        {/* Photo by Pexels (free license) */}
        <div className="absolute inset-0 opacity-45">
          <img
            src="/open-bible-960.webp"
            srcSet="/open-bible-480.webp 480w, /open-bible-960.webp 960w, /open-bible-1600.webp 1600w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            width={1600}
            height={1200}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/60 via-black/30 to-brand-primary/70" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center md:pt-8">
          <motion.div {...fadeIn}>
            <p className="text-white/70 md:text-white/90 font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3 md:mb-4">
              Our Beliefs
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15] mb-3 md:mb-6">
              What We Believe
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              As an Assemblies of God church, we stand on the truth of God&apos;s
              Word. Here are the core beliefs that shape who we are.
            </p>
            <figure className="mt-6 md:mt-8">
              <div className="flex items-center justify-center gap-3 mb-3" aria-hidden="true">
                <span className="h-px w-10 bg-brand-gold/70" />
                <span className="text-brand-gold text-[10px]">✦</span>
                <span className="h-px w-10 bg-brand-gold/70" />
              </div>
              <blockquote>
                <p className="font-serif italic text-lg md:text-2xl text-white/90 leading-snug max-w-xl mx-auto">
                  &ldquo;Your word is a lamp to guide my feet and a light for my
                  path.&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-2 text-brand-gold text-xs md:text-sm tracking-wide">
                Psalm 119:105 (NLT)
              </figcaption>
            </figure>
          </motion.div>
        </div>
      </section>

      {/* Core beliefs */}
      <section className={`pt-12 md:pt-24 bg-brand-warm ${showMarriage ? "pb-3 md:pb-0" : "pb-12 md:pb-24"}`} aria-labelledby="core-beliefs-heading">
        <div className="max-w-6xl mx-auto px-4">
          <h2 id="core-beliefs-heading" className="sr-only">
            Our core beliefs
          </h2>
          <p className="md:hidden text-brand-primary/70 text-sm text-center mb-6">
            Tap a belief to read more.
          </p>

          {/* Mobile: tap-to-open cards. Desktop: numbered rows with hairline rules, like a printed statement of faith */}
          <ol className="grid grid-cols-1 gap-3 md:gap-0 max-w-4xl mx-auto">
            {beliefs.map((belief, index) => {
              const isOpen = openIndex === index;
              const panelId = `belief-${index + 1}`;
              const Icon = belief.icon;
              return (
                <motion.li
                  key={belief.title}
                  {...slideUp((index % 2) * 0.1)}
                  className={`bg-white rounded-xl border transition-colors duration-300 shadow-[0_1px_2px_rgba(27,42,74,0.04)] md:grid md:grid-cols-[3rem_14rem_1fr] md:gap-x-10 md:py-9 md:bg-transparent md:rounded-none md:shadow-none md:border-0 md:border-t md:border-brand-primary/15 ${!showMarriage && index === beliefs.length - 1 ? "md:border-b" : ""} ${isOpen ? "border-brand-gold/60" : "border-brand-primary/10"}`}
                >
                  <span aria-hidden="true" className="hidden md:block font-serif italic text-2xl text-brand-gold leading-[1.2] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl md:text-[1.375rem] font-bold text-brand-primary tracking-tight leading-[1.2]">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center gap-3.5 px-4 py-3.5 md:p-0 text-left md:pointer-events-none"
                    >
                      <span
                        className={`md:hidden shrink-0 flex items-center justify-center transition-colors duration-300 ${isOpen ? "text-brand-primary" : "text-brand-accent"}`}
                        aria-hidden="true"
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </span>
                      <span className="flex-1">{belief.title}</span>
                      <ChevronDown
                        className={`md:hidden w-5 h-5 shrink-0 text-brand-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div id={panelId} className={`${isOpen ? "block" : "hidden"} md:block px-4 pb-5 md:p-0`}>
                    <p className="text-brand-primary/75 text-sm md:text-base leading-relaxed mb-2">
                      {belief.description}
                    </p>
                    <p className="text-brand-accent text-xs md:text-sm italic">
                      {belief.scripture}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Marriage: styled like the beliefs above so it reads as one more belief, not a feature */}
      {showMarriage && (
      <section className="pb-12 md:pb-24 bg-brand-warm" aria-labelledby="marriage-heading">
        <div className="max-w-6xl mx-auto px-4">
        <motion.div
          {...slideUp()}
          className={`max-w-4xl mx-auto bg-white rounded-xl border transition-colors duration-300 shadow-[0_1px_2px_rgba(27,42,74,0.04)] md:grid md:grid-cols-[3rem_14rem_1fr] md:gap-x-10 md:py-9 md:bg-transparent md:rounded-none md:shadow-none md:border-0 md:border-t md:border-brand-primary/15 md:border-b ${marriageOpen ? "border-brand-gold/60" : "border-brand-primary/10"}`}
        >
          {/* Desktop only: two interlocking wedding bands in place of a number */}
          <svg
            aria-hidden="true"
            viewBox="0 0 40 28"
            width={40}
            height={28}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="hidden md:block text-brand-gold -mt-0.5"
          >
            <circle cx="14" cy="15" r="9.5" />
            <circle cx="26" cy="15" r="9.5" />
            <path d="M23.5 3.5 26 1l2.5 2.5L26 6z" fill="currentColor" strokeWidth={1} strokeLinejoin="round" />
          </svg>
          <h2 id="marriage-heading" className="font-serif text-xl md:text-[1.375rem] font-bold text-brand-primary tracking-tight leading-[1.2]">
            <button
              type="button"
              aria-expanded={marriageOpen}
              aria-controls="marriage-panel"
              onClick={() => setOpenIndex(marriageOpen ? null : marriageIndex)}
              className="w-full flex items-center gap-3.5 px-4 py-3.5 md:p-0 text-left md:pointer-events-none"
            >
              <span
                className={`md:hidden shrink-0 flex items-center justify-center transition-colors duration-300 ${marriageOpen ? "text-brand-primary" : "text-brand-accent"}`}
                aria-hidden="true"
              >
                <Heart className="w-5 h-5" strokeWidth={1.75} />
              </span>
              <span className="flex-1">Marriage</span>
              <ChevronDown
                className={`md:hidden w-5 h-5 shrink-0 text-brand-accent transition-transform duration-300 ${marriageOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
          </h2>
          <div id="marriage-panel" className={`${marriageOpen ? "block" : "hidden"} md:block px-4 pb-5 md:p-0`}>
            <p className="text-brand-primary/75 text-sm md:text-base leading-relaxed mb-4">
              We believe marriage is a sacred covenant designed by God, joining
              one man and one woman for life. From the very beginning, God
              created us male and female and established marriage as a picture
              of Christ&apos;s love for His Church.
            </p>
            <blockquote className="pl-4 border-l-2 border-brand-gold mb-4">
              {/* Red letters for Jesus' words; narration stays in body color */}
              <p className="font-serif italic text-base md:text-lg text-brand-primary/80 leading-snug">
                <span className="text-brand-red">
                  &ldquo;Haven&apos;t you read the Scriptures?&rdquo;
                </span>{" "}
                Jesus replied.{" "}
                <span className="text-brand-red">
                  &ldquo;They record that from the beginning &lsquo;God made
                  them male and female.&rsquo;
                </span>{" "}
                And he said,{" "}
                <span className="text-brand-red">
                  &lsquo;This explains why a man leaves his father and mother
                  and is joined to his wife, and the two are united into
                  one.&rsquo;&rdquo;
                </span>
              </p>
              <footer className="mt-2 text-brand-accent text-xs md:text-sm">
                Matthew 19:4-5 (NLT)
              </footer>
            </blockquote>
            <p className="text-brand-accent text-xs md:text-sm italic">
              Genesis 1:27; Genesis 2:24; Genesis 5:2; Mark 10:6-9; Ephesians 5:31-32; Hebrews 13:4
            </p>
          </div>
        </motion.div>
        </div>
      </section>
      )}

      {/* Full statement */}
      <section className="py-12 md:py-20 bg-brand-warm" aria-labelledby="full-statement-heading">
        <motion.div {...slideUp()} className="max-w-2xl mx-auto px-4 text-center">
          <h2 id="full-statement-heading" className="font-serif text-2xl md:text-3xl font-bold text-brand-primary tracking-tight mb-4">
            The Full Statement
          </h2>
          <p className="text-brand-primary/75 leading-relaxed mb-6">
            These beliefs summarize the Assemblies of God&apos;s 16 Fundamental
            Truths, which we hold to as a church. You&apos;re welcome to read
            the full statement with every Scripture reference.
          </p>
          <a
            href="/statement-of-fundamental-truths.pdf"
            target="_blank"
            rel="noopener"
            className="tap inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-primary/20 text-brand-primary font-medium hover:border-brand-accent hover:text-brand-accent transition-colors"
          >
            <FileText className="w-5 h-5 shrink-0" aria-hidden="true" />
            Read the Full Statement
            <span className="sr-only">of Fundamental Truths (PDF, opens in a new tab)</span>
          </a>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 bg-brand-primary overflow-hidden aurora">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div {...slideUp()}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Have Questions?
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              We&apos;d be glad to talk about faith with you. Reach out anytime,
              or come visit us this Sunday.
            </p>
            <a
              href="/contact"
              className="tap group btn-gold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              Plan Your Visit
              <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
