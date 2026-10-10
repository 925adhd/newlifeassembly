"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { CalendarDays, ChevronDown, ChevronRight } from "lucide-react";
import { events, type ChurchEvent } from "@/app/events";
import { useReveal } from "@/lib/useReveal";

// Today's date as YYYY-MM-DD in the visitor's time zone. The static build has
// no "today", so the server snapshot is null and every event renders; the
// browser then hides anything already past.
const subscribe = () => () => {};
const getToday = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const getServerToday = () => null;

function isUpcoming(event: ChurchEvent, today: string | null) {
  if (!today) return true;
  if (event.date) return event.date >= today;
  if (event.month) return event.month >= today.slice(0, 7);
  return true;
}

function toDate(key: string) {
  const [y, m, d = "1"] = key.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d));
}

export default function UpcomingEvents() {
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  // Mobile only: cards show title + date, tap to read more. Desktop shows everything.
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { slideUp } = useReveal();

  // Dated events first (soonest first), then month-only ones
  const upcoming = events
    .filter((event) => isUpcoming(event, today))
    .sort((a, b) => (a.date ?? `${a.month}-99`).localeCompare(b.date ?? `${b.month}-99`));

  if (upcoming.length === 0) return null;

  return (
    <section className="py-12 md:py-24 bg-brand-warm" aria-labelledby="events-heading">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div {...slideUp()} className="text-center mb-8 md:mb-12">
          <p className="text-brand-accent font-medium text-[10px] md:text-sm tracking-[0.2em] md:tracking-widest uppercase mb-2">
            Coming Up
          </p>
          <h2 id="events-heading" className="font-serif text-3xl md:text-4xl font-bold text-brand-primary tracking-tight">
            Upcoming Events
          </h2>
        </motion.div>

        <ul className="space-y-3 md:space-y-5">
          {upcoming.map((event, index) => {
            const when = toDate(event.date ?? `${event.month}-01`);
            const monthShort = when.toLocaleDateString("en-US", { month: "short" });
            const dateLine = event.date
              ? when.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
              : `${when.toLocaleDateString("en-US", { month: "long" })} · Date coming soon`;
            const isOpen = openIndex === index;
            const panelId = `event-${index + 1}`;
            return (
              <motion.li
                key={event.title}
                {...slideUp(index * 0.08)}
                className="bg-white rounded-2xl border border-brand-primary/10 shadow-[0_1px_2px_rgba(27,42,74,0.04),0_24px_48px_-32px_rgba(27,42,74,0.12)] p-4 md:p-7 flex gap-4 md:gap-6"
              >
                {/* Calendar tile */}
                <div
                  className="w-14 md:w-20 shrink-0 self-start rounded-xl bg-brand-primary text-center py-2 md:py-3"
                  aria-hidden="true"
                >
                  <p className="text-brand-gold text-[11px] md:text-xs font-medium tracking-[0.2em] uppercase">
                    {monthShort}
                  </p>
                  {event.date ? (
                    <p className="font-serif text-3xl md:text-4xl font-bold text-white leading-none mt-1">
                      {when.getDate()}
                    </p>
                  ) : (
                    <CalendarDays className="w-6 h-6 md:w-7 md:h-7 text-white mx-auto mt-1.5" strokeWidth={1.5} />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-primary tracking-tight leading-tight">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-start justify-between gap-3 text-left md:pointer-events-none"
                    >
                      <span>
                        <span className="block mb-1">
                          {event.title}
                          {event.canceled && (
                            <span className="ml-2 inline-block align-middle rounded-full bg-red-50 border border-red-200 px-2 py-0.5 font-sans text-[11px] md:text-xs font-semibold tracking-wide uppercase text-red-700">
                              Canceled
                            </span>
                          )}
                        </span>
                        <span className="block font-sans text-brand-accent font-medium text-xs md:text-sm tracking-normal">
                          {dateLine}
                          {event.time && ` · ${event.time}`}
                        </span>
                      </span>
                      <ChevronDown
                        className={`md:hidden w-5 h-5 shrink-0 mt-1 text-brand-accent transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div id={panelId} className={`${isOpen ? "block" : "hidden"} md:block mt-3`}>
                  <p className="text-brand-primary/75 text-sm md:text-base leading-relaxed">
                    {event.description}
                  </p>
                  {event.link && (
                    <a
                      href={event.link.href}
                      className="group inline-flex items-center gap-1.5 mt-3 text-brand-accent font-medium text-sm hover:text-brand-accent-dark transition-colors"
                    >
                      {event.link.label}
                      <ChevronRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
