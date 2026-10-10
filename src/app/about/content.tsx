"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useReveal } from "@/lib/useReveal";

export default function AboutPage() {
  const { fadeIn, slideUp, slideLeft, slideRight } = useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative py-8 md:py-24 bg-brand-primary overflow-hidden gradient-mesh">
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src="/new-life-assembly-entrance-1600.webp"
            srcSet="/new-life-assembly-entrance-960.webp 960w, /new-life-assembly-entrance-1600.webp 1600w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_31%]"
            width={1200}
            height={676}
          />
        </div>
        <div className="absolute inset-0 bg-black/35 hidden md:block" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center md:pt-8">
          <motion.div
            {...fadeIn}
          >
            <p className="text-white/70 md:text-white/90 font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3 md:mb-4">
              About Us
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15] mb-3 md:mb-6">
              A church that feels like <span className="italic">family.</span>
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              New Life Assembly of God has been serving the Leitchfield,
              Kentucky community with the love of Christ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Church: editorial spread (the hero H1 introduces it, so no second heading) */}
      <section className="relative py-14 md:py-24 overflow-hidden bg-brand-warm" aria-label="Who we are">
        {/* Warm atmospheric glows */}
        <span
          aria-hidden="true"
          className="orb orb-float absolute w-[420px] h-[420px] -top-24 -right-32 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(232,184,108,0.28) 0%, rgba(232,184,108,0) 70%)",
          }}
        />
        <span
          aria-hidden="true"
          className="orb orb-float absolute w-[360px] h-[360px] -bottom-32 -left-24 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,99,171,0.12) 0%, rgba(37,99,171,0) 70%)",
            animationDelay: "-6s",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4">
          {/* Lede: italic opener, roman body */}
          <motion.p
            {...slideUp(0.05)}
            className="relative font-serif text-xl md:text-2xl lg:text-[1.75rem] text-brand-primary/85 leading-[1.45] max-w-3xl mb-5 pl-6 md:pl-8 border-l-2 border-brand-gold"
          >
            <span className="italic">
              New Life Assembly of God is part of the Assemblies of God
              fellowship, one of the largest Pentecostal denominations in
              the world.
            </span>{" "}
            In the heart of Grayson County, we are a community of believers
            passionate about worship, prayer, and sharing the Gospel.
          </motion.p>
          <motion.div {...slideUp(0.08)} className="pl-6 md:pl-8 mb-14 md:mb-20 flex items-center gap-5 md:gap-6">
            {/* Official AG mark, shown unaltered to signal affiliation */}
            <a
              href="https://ag.org"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 opacity-90 hover:opacity-100 transition-opacity"
            >
              <img
                src="/assemblies-of-god-logo-120.webp"
                srcSet="/assemblies-of-god-logo-120.webp 1x, /assemblies-of-god-logo-240.webp 2x"
                alt="Assemblies of God (opens ag.org in a new tab)"
                width={120}
                height={73}
                className="h-9 md:h-11 w-auto"
                loading="lazy"
              />
            </a>
            <span className="h-8 w-px bg-brand-primary/15" aria-hidden="true" />
            <a
              href="/beliefs"
              className="group inline-flex items-center gap-1.5 py-1 text-brand-accent font-medium text-sm md:text-base hover:text-brand-accent-dark transition-colors"
            >
              Read what we believe
              <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>

          {/* Body in two editorial columns on desktop */}
          <motion.div
            {...slideUp(0.1)}
            className="max-w-3xl md:columns-2 md:gap-12 md:[column-rule:1px_solid_rgba(27,42,74,0.08)]"
          >
            <p className="text-brand-primary/75 leading-relaxed mb-5 break-inside-avoid">
              Our church is known for warm, Spirit-filled worship services
              that blend contemporary praise with timeless hymns. Church
              should be a place where people from all walks of life can come
              together, experience God&apos;s presence, and grow in their
              relationship with Him.
            </p>
            <p className="text-brand-primary/75 leading-relaxed mb-5 break-inside-avoid">
              From Sunday School to midweek Bible study, from children&apos;s
              ministry to community outreach, every ministry is designed to
              help people take their next step in faith. We celebrate
              baptisms, pray for healing, and believe in the life-changing
              power of the Holy Spirit.
            </p>
            <p className="text-brand-primary/75 leading-relaxed break-inside-avoid">
              No matter where you are on your spiritual journey, there&apos;s
              a place for you at New Life Assembly of God. Come as you are —
              you&apos;ll leave transformed.
            </p>
          </motion.div>

          {/* Centered editorial pullquote with gold rules on both sides */}
          <motion.figure
            {...slideUp(0.15)}
            className="mt-16 md:mt-24 max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center gap-5 mb-6" aria-hidden="true">
              <span className="h-px w-16 md:w-24 bg-brand-gold" />
              <span className="text-brand-gold text-xs tracking-[0.4em] uppercase">
                ✦
              </span>
              <span className="h-px w-16 md:w-24 bg-brand-gold" />
            </div>
            <blockquote>
              <p className="font-serif italic text-2xl md:text-4xl text-brand-primary/90 leading-[1.2] tracking-tight">
                &ldquo;Where people from all walks of life come together.&rdquo;
              </p>
            </blockquote>
          </motion.figure>
        </div>
      </section>

      {/* Pastor Section */}
      <section
        className="relative py-12 md:py-24 overflow-hidden"
        style={{ backgroundColor: "var(--color-brand-cream-deep)" }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              {...slideLeft()}
              className="relative max-w-md mx-auto lg:mx-0 w-full"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-3 md:-top-4 md:-left-4 right-6 bottom-6 border-2 border-brand-accent/40 rounded-tl-[64px] rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl pointer-events-none"
              />
              <img
                src="/pastor-tony-portrait.webp"
                alt="Pastor Tony Redmon preaching at New Life Assembly of God in Leitchfield, Kentucky"
                width={785}
                height={751}
                className="relative w-full rounded-tl-[64px] rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl shadow-xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...slideRight()}
              className="relative"
            >
              <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
              <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
                Our Pastor
              </p>
              <h2 className="font-serif italic text-3xl md:text-5xl font-bold text-brand-primary tracking-tight leading-[1.1] mb-6">
                Pastor Tony Redmon
              </h2>
              {/* From Pastor Tony's church directory bio; keep it factual to that */}
              <p className="text-brand-primary/75 leading-relaxed mb-4">
                Pastor Tony grew up in a ministry family. He was born in
                Taylorsville, Kentucky, to Eugene and Geneva Redmon. His
                father was a minister and evangelist, and the family traveled
                to 22 states in just four years. Tony accepted the call to
                ministry at 16.
              </p>
              <p className="text-brand-primary/75 leading-relaxed mb-4">
                Eugene went on to pastor New Life Assembly of God, driving from
                Taylorsville to Leitchfield every week for services. When he
                retired, Tony became pastor in 1998. He kept up that weekly
                drive until moving his family to Leitchfield in 2000.
              </p>
              <p className="text-brand-primary/75 leading-relaxed">
                In his down time, he enjoys hunting and shooting and loves
                working with his seven horses. One of them, Generators
                Champion, won the 1999 World Championship. Most of all, Pastor
                Tony loves reading and studying God&apos;s Word, and he&apos;s
                excited to see the church continue to grow.
              </p>
              <div className="my-8 pl-5 border-l-2 border-brand-accent/40">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-brand-accent mb-2">
                  His vision
                </p>
                <p className="font-serif italic text-xl md:text-2xl text-brand-primary/85 leading-snug">
                  That every person in Leitchfield would experience the new life
                  that comes through a relationship with Jesus Christ.
                </p>
              </div>
              <a
                href="/leadership"
                className="tap group inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-brand-primary/20 text-brand-primary font-medium hover:border-brand-accent hover:text-brand-accent transition-colors"
              >
                Meet our leadership
                <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 bg-brand-primary overflow-hidden aurora">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            {...slideUp()}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Come Experience New Life
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              We&apos;d love to welcome you and your family. Visit us this
              Sunday and see what God is doing at New Life Assembly.
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
