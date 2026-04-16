"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";

const beliefs = [
  {
    title: "The Bible",
    description:
      "We believe the Bible is the inspired, infallible Word of God — the authority for all faith and conduct.",
  },
  {
    title: "Salvation",
    description:
      "We believe salvation is available to all through faith in Jesus Christ — His death, burial, and resurrection.",
  },
  {
    title: "The Holy Spirit",
    description:
      "We believe in the baptism of the Holy Spirit, empowering believers for service and daily living.",
  },
  {
    title: "The Trinity",
    description:
      "We believe in one God, eternally existing in three persons — Father, Son, and Holy Spirit — equal in power and glory.",
  },
];

export default function AboutPage() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const fadeIn = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } };
  const slideUp = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, delay, ease } };
  const slideLeft = prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, x: -32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.9, ease } };
  const slideRight = prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, x: 32 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.9, ease } };

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
            width={800}
            height={600}
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
              Rooted in Faith
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              New Life Assembly of God has been serving the Leitchfield,
              Kentucky community with the love of Christ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pastor Section */}
      <section className="relative py-12 md:py-24 bg-brand-warm overflow-hidden">
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              {...slideLeft}
              className="relative max-w-md mx-auto lg:mx-0 w-full"
            >
              <span
                aria-hidden="true"
                className="absolute -top-3 -left-3 md:-top-4 md:-left-4 right-6 bottom-6 border-2 border-brand-accent/40 rounded-tl-[64px] rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl pointer-events-none"
              />
              <img
                src="/pastor-tony-redmon-960.webp"
                srcSet="/pastor-tony-redmon-480.webp 480w, /pastor-tony-redmon-960.webp 960w, /pastor-tony-redmon-1600.webp 1600w"
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt="Pastor Tony Redmon preaching at New Life Assembly of God in Leitchfield, Kentucky"
                width={1920}
                height={1440}
                className="relative w-full rounded-tl-[64px] rounded-br-[64px] rounded-tr-2xl rounded-bl-2xl shadow-xl"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              {...slideRight}
              className="relative"
            >
              <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
              <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
                Our Pastor
              </p>
              <h2 className="font-serif italic text-3xl md:text-5xl font-bold text-brand-primary tracking-tight leading-[1.1] mb-6">
                Pastor Tony Redmon
              </h2>
              <p className="text-brand-primary/75 leading-relaxed mb-6">
                Pastor Tony Redmon leads New Life Assembly of God with a heart
                for people and a passion for God&apos;s Word. His dedication to
                biblical teaching and genuine care for the congregation has made
                New Life a place where people feel truly at home.
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
              <p className="text-brand-primary/75 leading-relaxed mb-4">
                Under his leadership, New Life Assembly has become known as a
                welcoming, Spirit-filled church where lives are being
                transformed through the power of the Gospel.
              </p>
              <p className="text-brand-primary/75 leading-relaxed">
                Whether through Sunday morning worship, Wednesday evening Bible
                study, or personal ministry, Pastor Tony is committed to helping
                people grow in their faith and discover God&apos;s purpose for
                their lives.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Church — editorial spread */}
      <section
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ backgroundColor: "var(--color-brand-cream-deep)" }}
      >
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

        {/* Word watermark */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute md:right-8 md:top-12 font-serif italic md:text-[15rem] leading-none text-brand-primary/[0.05] select-none pointer-events-none z-0"
        >
          Family.
        </span>

        <div className="relative max-w-5xl mx-auto px-4">
          <motion.div {...slideUp()} className="mb-12 md:mb-16 max-w-2xl">
            <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-brand-primary tracking-tight leading-[1.05]">
              A church that<br className="hidden md:block" /> feels like{" "}
              <span className="italic">family.</span>
            </h2>
          </motion.div>

          {/* Lede — large italic serif setting the tone */}
          <motion.p
            {...slideUp(0.05)}
            className="relative font-serif italic text-xl md:text-2xl lg:text-[1.75rem] text-brand-primary/85 leading-[1.45] max-w-3xl mb-14 md:mb-20 pl-6 md:pl-8 border-l-2 border-brand-gold"
          >
            New Life Assembly of God is part of the Assemblies of God
            fellowship — one of the largest Pentecostal denominations in the
            world. In the heart of Grayson County, we are a community of
            believers passionate about worship, prayer, and sharing the
            Gospel.
          </motion.p>

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

      {/* What We Believe */}
      <section className="py-16 md:py-24 bg-brand-warm">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            {...slideUp()}
            className="text-center mb-12"
          >
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
              Our Beliefs
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-tight mb-4">
              What We Believe
            </h2>
            <p className="text-brand-primary/70 max-w-xl mx-auto">
              As an Assemblies of God church, we hold to the core tenets of the
              Christian faith.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-16 max-w-4xl mx-auto">
            {beliefs.map((belief, index) => (
              <motion.div
                key={belief.title}
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
                    {belief.title}
                  </h3>
                  <p className="text-brand-primary/70 text-sm md:text-base leading-relaxed">
                    {belief.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
