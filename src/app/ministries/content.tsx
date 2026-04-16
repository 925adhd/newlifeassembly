"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ChevronRight,
  Clock,
} from "lucide-react";

type Ministry = {
  title: string;
  time: string;
  image?: string;
  images?: string[];
  description: string;
  details: string[];
};

const ministryGroups: { title: string; ministries: Ministry[] }[] = [
  {
    title: "Sundays",
    ministries: [
      {
        title: "Sunday Worship",
        time: "Sundays at 11:00 AM",
        image: "/pastor-tony-portrait.jpg",
        description:
          "Our Sunday morning worship service is the heartbeat of New Life Assembly. Experience Spirit-filled praise and worship, heartfelt prayer, and powerful teaching from God's Word. Whether you prefer contemporary worship or traditional hymns, you'll find a blend that speaks to your heart.",
        details: [
          "Live worship with our praise band",
          "Teaching from Pastor Tony Redmon",
          "Prayer ministry and altar time",
        ],
      },
      {
        title: "Sunday School",
        time: "Sundays at 10:00 AM",
        image: "/sunday-school.webp",
        description:
          "Start your Sunday with in-depth Bible study in a small group setting. Our Sunday School classes are designed for adults and provide an opportunity to dig deeper into Scripture, ask questions, and build relationships with fellow believers.",
        details: [
          "In-depth Bible study and discussion",
          "Adult small-group setting",
        ],
      },
      {
        title: "Children's Church",
        time: "Sundays at 11:30 AM",
        image: "/childrens-church.webp",
        description:
          "We believe in investing in the next generation. Children's Church at New Life Assembly provides a fun, safe, and engaging environment where kids can learn about God's love through age-appropriate lessons, crafts, games, and worship.",
        details: [
          "Safe, supervised environment",
          "Age-appropriate Bible lessons",
          "Crafts, games, and worship",
        ],
      },
    ],
  },
  {
    title: "Midweek",
    ministries: [
      {
        title: "Bible Study",
        time: "Wednesdays at 6:30 PM",
        image: "/bible-study.webp",
        description:
          "Our midweek Bible study is a time to go deeper into God's Word in a more intimate setting. Led by Pastor Tony, these sessions focus on practical application of Scripture for everyday life. It's a great way to recharge and refocus during the week.",
        details: [
          "Verse-by-verse Bible study",
          "Practical life application",
          "Open to all ages",
        ],
      },
    ],
  },
  {
    title: "In the Community",
    ministries: [
      {
        title: "Outreach",
        time: "Year-round",
        image: "/new-life-assembly-community-outreach.webp",
        description:
          "New Life Assembly is committed to serving the Leitchfield and Grayson County community. From serving free hot chocolate on the town square at Christmas to service projects throughout the year, we strive to be the hands and feet of Jesus in our neighborhood.",
        details: [
          "Christmas town square outreach",
          "Year-round service projects",
        ],
      },
      {
        title: "Fellowship",
        time: "Various times",
        images: ["/new-life-assembly-community-dinner.webp", "/new-life-assembly-community-dinner-2.webp"],
        description:
          "Building meaningful relationships is at the core of who we are. From community dinners to fellowship events, we create opportunities for people to connect, share life together, and grow in faith outside of Sunday services.",
        details: [
          "Community dinners",
          "Fellowship events throughout the year",
        ],
      },
    ],
  },
];

export default function MinistriesPage() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const fadeIn = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } };
  const slideUp = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, delay, ease } };

  return (
    <>
      {/* Hero */}
      <section className="relative py-8 md:py-24 bg-brand-primary overflow-hidden gradient-mesh">
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src="/new-life-assembly-baptism-1600.webp"
            srcSet="/new-life-assembly-baptism-960.webp 960w, /new-life-assembly-baptism-1600.webp 1600w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_45%]"
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
              Get Involved
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15] mb-3 md:mb-6">
              Our Ministries
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              There&apos;s a place for everyone at New Life Assembly of God.
              Discover how you can grow, serve, and connect.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries List — grouped into editorial chapters */}
      {ministryGroups.map((group, groupIndex) => {
        const groupTones: { bg: string; accent: string; ornament: string }[] = [
          {
            bg: "var(--color-brand-warm)",
            accent: "rgba(37,99,171,0.12)",
            ornament: "rgba(232,184,108,0.22)",
          },
          {
            bg: "var(--color-brand-cream-deep)",
            accent: "rgba(232,184,108,0.28)",
            ornament: "rgba(37,99,171,0.12)",
          },
          {
            bg: "var(--color-brand-warm)",
            accent: "rgba(125,148,173,0.18)",
            ornament: "rgba(232,184,108,0.22)",
          },
        ];
        const tone = groupTones[groupIndex % groupTones.length];
        return (
          <section
            key={group.title}
            className="relative py-16 md:py-24 overflow-hidden"
            style={{ backgroundColor: tone.bg }}
          >
            <span
              aria-hidden="true"
              className="orb orb-float absolute w-[420px] h-[420px] -top-24 -right-28 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${tone.ornament} 0%, transparent 70%)`,
              }}
            />
            <span
              aria-hidden="true"
              className="orb orb-float absolute w-[360px] h-[360px] -bottom-32 -left-24 pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${tone.accent} 0%, transparent 70%)`,
                animationDelay: "-6s",
              }}
            />

            <div className="relative max-w-6xl mx-auto px-4">
              <motion.div {...slideUp()} className="mb-12 md:mb-16 max-w-2xl">
                <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
                <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
                  {group.title}
                </p>
                <h2 className="font-serif italic text-3xl md:text-5xl lg:text-[3.5rem] font-bold text-brand-primary tracking-tight leading-[1.05]">
                  {group.title === "Sundays"
                    ? "On the Lord's Day."
                    : group.title === "Midweek"
                    ? "Gathered mid-week."
                    : "Out in the community."}
                </h2>
              </motion.div>

              <div className="space-y-10 md:space-y-12">
                {group.ministries.map((ministry, ministryIndex) => {
                  const slug = ministry.title
                    .toLowerCase()
                    .replace(/['&]/g, "")
                    .replace(/\s+/g, "-");
                  const reversed = ministryIndex % 2 === 1;
                  return (
                    <motion.article
                      key={ministry.title}
                      id={slug}
                      {...slideUp(ministryIndex * 0.05)}
                      className="relative bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(27,42,74,0.04),0_24px_48px_-32px_rgba(27,42,74,0.12)] scroll-mt-24"
                    >
                      <span
                        aria-hidden="true"
                        className="block h-[3px] w-full bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold"
                      />
                      <div className="p-8 md:p-10">
                      <div className="mb-8">
                        <span className="block h-px w-10 bg-brand-accent/60 mb-5" aria-hidden="true" />
                        <h3 className="font-serif italic text-3xl md:text-5xl font-bold text-brand-primary tracking-tight leading-[1.1] md:leading-[1.05] mb-4">
                          {ministry.title}
                        </h3>
                        <p className="text-brand-accent font-medium text-xs tracking-[0.2em] uppercase inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {ministry.time}
                        </p>
                      </div>

                      {ministry.images ? (
                        <>
                          {/* Mobile: show first image on top */}
                          <img
                            src={ministry.images[0]}
                            alt={`${ministry.title} at New Life Assembly of God`}
                            width={400}
                            height={300}
                            className="w-full rounded-xl object-cover mb-4 md:hidden"
                            loading="lazy"
                          />

                          <p className="text-brand-primary/75 leading-relaxed mb-4">
                            {ministry.description}
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                            {ministry.details.map((detail) => (
                              <li
                                key={detail}
                                className="text-brand-primary/70 text-sm leading-relaxed before:content-['—'] before:mr-2 before:text-brand-accent/60"
                              >
                                {detail}
                              </li>
                            ))}
                          </ul>

                          {/* Desktop: show both images */}
                          <div className="hidden md:grid grid-cols-2 gap-4">
                            {ministry.images.map((img) => (
                              <img
                                key={img}
                                src={img}
                                alt={`${ministry.title} at New Life Assembly of God`}
                                width={400}
                                height={300}
                                className="w-full rounded-xl object-cover"
                                loading="lazy"
                              />
                            ))}
                          </div>
                        </>
                      ) : ministry.image ? (
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                          <img
                            src={ministry.image}
                            alt={`${ministry.title} at New Life Assembly of God`}
                            width={400}
                            height={300}
                            className={`w-full md:w-96 rounded-xl shrink-0 object-cover order-1 ${reversed ? "md:order-1" : "md:order-2"}`}
                            loading="lazy"
                          />
                          <div className={`flex-1 order-2 ${reversed ? "md:order-2" : "md:order-1"}`}>
                            <p className="text-brand-primary/75 leading-relaxed mb-8">
                              {ministry.description}
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto">
                              {ministry.details.map((detail) => (
                                <li
                                  key={detail}
                                  className="text-brand-primary/70 text-sm leading-relaxed before:content-['—'] before:mr-2 before:text-brand-accent/60"
                                >
                                  {detail}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-brand-primary/75 leading-relaxed mb-6">
                            {ministry.description}
                          </p>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {ministry.details.map((detail) => (
                              <li
                                key={detail}
                                className="text-brand-primary/70 text-sm leading-relaxed before:content-['—'] before:mr-2 before:text-brand-accent/60"
                              >
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="relative py-16 md:py-24 bg-brand-primary overflow-hidden aurora">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            {...slideUp()}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Ready to Get Connected?
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              The best way to experience New Life Assembly is to visit us in
              person. We&apos;d love to meet you and help you find your place.
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
