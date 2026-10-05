"use client";

import { motion } from "motion/react";
import { ChevronRight, Clock } from "lucide-react";
import { leaders, boardMembers, worshipTeam } from "./leaders";
import { useReveal } from "@/lib/useReveal";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function LeadershipPage() {
  const { fadeIn, slideUp } = useReveal();

  return (
    <>
      {/* Hero */}
      <section className="relative py-8 md:py-24 bg-brand-primary overflow-hidden gradient-mesh">
        <div className="absolute inset-0 opacity-40 hidden md:block">
          <img
            src="/new-life-assembly-worship-service-1600.webp"
            srcSet="/new-life-assembly-worship-service-960.webp 960w, /new-life-assembly-worship-service-1600.webp 1600w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
            width={800}
            height={600}
          />
        </div>
        <div className="absolute inset-0 bg-black/35 hidden md:block" aria-hidden="true" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center md:pt-8">
          <motion.div {...fadeIn}>
            <p className="text-white/70 md:text-white/90 font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3 md:mb-4">
              Our Leadership
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] md:leading-[1.15] mb-3 md:mb-6">
              Serving Together
            </h1>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              Meet the people who give their time and hearts to lead the
              ministries of New Life Assembly of God.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Senior Pastor */}
      <section className="relative py-12 md:py-24 bg-brand-warm overflow-hidden" aria-labelledby="pastor-heading">
        <div className="max-w-5xl mx-auto px-4">
          <motion.article
            {...slideUp()}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(27,42,74,0.04),0_24px_48px_-32px_rgba(27,42,74,0.12)] md:grid md:grid-cols-[2fr_3fr]"
          >
            <img
              src="/pastor-tony-closeup.webp"
              alt="Pastor Tony Redmon of New Life Assembly of God"
              width={1247}
              height={851}
              className="w-full h-64 md:h-full object-cover object-top"
              loading="lazy"
            />
            <div className="relative p-6 md:p-10">
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold md:hidden"
              />
              <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
                Senior Pastor · Since 1998
              </p>
              <h2 id="pastor-heading" className="font-serif italic text-3xl md:text-4xl font-bold text-brand-primary tracking-tight leading-[1.1] mb-4">
                Pastor Tony Redmon
              </h2>
              <p className="text-brand-accent font-medium text-xs tracking-[0.2em] uppercase inline-flex items-center gap-1.5 mb-5">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                Sunday preaching · Wednesday Bible study
              </p>
              <p className="text-brand-primary/75 leading-relaxed mb-4">
                As senior pastor, Pastor Tony brings the message each Sunday
                morning and teaches our Wednesday night Bible study. He serves
                alongside our church board and ministry leaders to care for the
                congregation and help every ministry of New Life thrive.
              </p>
              <p className="text-brand-primary/75 leading-relaxed">
                Under his leadership, New Life has become known as a welcoming,
                Spirit-filled church where lives are being changed through the
                power of the Gospel.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Ministry leaders */}
      <section
        className="relative py-12 md:py-24 overflow-hidden"
        style={{ backgroundColor: "var(--color-brand-cream-deep)" }}
        aria-labelledby="ministry-leaders-heading"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div {...slideUp()} className="mb-10 md:mb-14 max-w-2xl">
            <span className="block h-px w-12 bg-brand-accent mb-5" aria-hidden="true" />
            <h2 id="ministry-leaders-heading" className="font-serif italic text-3xl md:text-5xl font-bold text-brand-primary tracking-tight leading-[1.05]">
              Ministry leaders.
            </h2>
          </motion.div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {leaders.map((leader, index) => (
              <motion.li
                key={leader.name + leader.role}
                {...slideUp((index % 3) * 0.08)}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(27,42,74,0.04),0_24px_48px_-32px_rgba(27,42,74,0.12)] flex flex-col"
              >
                <span
                  aria-hidden="true"
                  className="block h-[3px] w-full bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold"
                />
                <article className="p-6 md:p-8 flex-1">
                  <div className="flex items-center gap-4 mb-5">
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={`${leader.name}, ${leader.role} at New Life Assembly of God`}
                        width={128}
                        height={128}
                        className="w-16 h-16 rounded-full object-cover shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center bg-brand-primary text-brand-gold font-serif text-xl font-bold"
                      >
                        {initials(leader.name)}
                      </span>
                    )}
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-primary tracking-tight leading-[1.15]">
                        {leader.name}
                      </h3>
                      <p className="text-brand-primary/70 text-sm">
                        {leader.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-brand-accent font-medium text-[11px] tracking-[0.15em] uppercase mb-3">
                    {leader.leads}
                  </p>
                  <p className="text-brand-primary/75 text-sm md:text-base leading-relaxed">
                    {leader.bio}
                  </p>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Teams: simple roster cards, matching the leader cards above */}
      <section className="py-12 md:py-20 bg-brand-warm" aria-labelledby="teams-heading">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...slideUp()} className="text-center mb-8 md:mb-12">
            <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-3">
              Our Teams
            </p>
            <h2 id="teams-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-tight">
              Board &amp; Worship Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            {[
              { title: "Church Board", members: boardMembers },
              { title: "Praise & Worship Team", members: worshipTeam },
            ].map((team, index) => (
              <motion.div
                key={team.title}
                {...slideUp(index * 0.08)}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(27,42,74,0.04),0_24px_48px_-32px_rgba(27,42,74,0.12)]"
              >
                <span
                  aria-hidden="true"
                  className="block h-[3px] w-full bg-gradient-to-r from-brand-gold via-brand-gold-hover to-brand-gold"
                />
                <div className="px-5 md:px-8 pt-6 md:pt-8 pb-4 md:pb-6">
                  <h3 className="font-sans text-brand-accent font-medium text-xs md:text-sm tracking-[0.2em] uppercase mb-3">
                    {team.title}
                  </h3>
                  <ul className="grid grid-cols-2 gap-x-5">
                    {team.members.map((member) => (
                      <li
                        key={member}
                        className="py-2.5 border-t border-brand-primary/10 font-serif text-base md:text-lg font-bold text-brand-primary tracking-tight leading-snug"
                      >
                        {member}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-24 bg-brand-primary overflow-hidden aurora">
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div {...slideUp()}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              Find Your Place to Serve
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              Every ministry here is led by people who said yes to serving.
              We&apos;d love to help you find where you fit.
            </p>
            <a
              href="/ministries"
              className="tap group btn-gold px-8 py-4 rounded-lg text-lg inline-flex items-center gap-2 hover:-translate-y-0.5"
            >
              Explore Ministries
              <ChevronRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
