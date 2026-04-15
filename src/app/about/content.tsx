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
      <section className="relative py-12 md:py-24 bg-white overflow-hidden">
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

      {/* Our Church */}
      <section className="py-16 md:py-24 grid-pattern">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            {...slideUp()}
            className="text-center mb-12"
          >
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
              Who We Are
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-tight mb-6">
              A Church That Feels Like Family
            </h2>
          </motion.div>

          <motion.div
            {...slideUp()}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <p className="text-brand-primary/75 leading-relaxed mb-4 first-letter:font-serif first-letter:text-5xl md:first-letter:text-6xl first-letter:font-bold first-letter:text-brand-accent first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.9]">
              New Life Assembly of God is part of the Assemblies of God
              fellowship — one of the largest Pentecostal denominations in the
              world. Located in Leitchfield, Kentucky, in the heart of Grayson
              County, we are a community of believers who are passionate about
              worship, prayer, and sharing the Gospel.
            </p>
            <p className="text-brand-primary/75 leading-relaxed mb-4">
              Our church is known for warm, Spirit-filled worship services that
              blend contemporary praise with timeless hymns. We believe that
              church should be a place where people from all walks of life can
              come together, experience God&apos;s presence, and grow in their
              relationship with Him.
            </p>
            <p
              aria-hidden="true"
              className="font-serif italic text-2xl md:text-3xl text-brand-primary/85 my-10 md:my-14 text-center leading-snug max-w-xl mx-auto"
            >
              Where people from all walks of life come together.
            </p>
            <p className="text-brand-primary/75 leading-relaxed mb-4">
              From Sunday School to midweek Bible study, from children&apos;s
              ministry to community outreach, every ministry at New Life is
              designed to help people take their next step in faith. We
              celebrate baptisms, pray for healing, and believe in the
              life-changing power of the Holy Spirit.
            </p>
            <p className="text-brand-primary/75 leading-relaxed">
              No matter where you are on your spiritual journey, there&apos;s a
              place for you at New Life Assembly of God. Come as you are —
              you&apos;ll leave transformed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="py-16 md:py-24 bg-white">
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
