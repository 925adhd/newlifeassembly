"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink, Play } from "lucide-react";

type Service = { id: string; date: string; label?: string };

const sermons: Service[] = [
  { id: "2647737832246553", date: "July 27, 2025" },
  { id: "609702385121850", date: "July 13, 2025" },
  { id: "1054167483483185", date: "June 1, 2025" },
  { id: "1005841564835385", date: "April 20, 2025", label: "Resurrection Day" },
];

const worship: Service[] = [
  { id: "644015321627140", date: "August 17, 2025" },
  { id: "1282550930213215", date: "July 27, 2025" },
  { id: "598329929727976", date: "July 13, 2025" },
  { id: "1236258307523153", date: "June 22, 2025" },
];

function FacebookVideo({ service, kind }: { service: Service; kind: "Sermon" | "Worship" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${service.id}`)}&show_text=false&width=500`;

  return (
    <div ref={containerRef} className="bg-white rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(27,42,74,0.04)] lift">
      <div className="aspect-video relative">
        {/* Placeholder spinner — sits behind iframe so iframe covers it naturally */}
        <div className="absolute inset-0 bg-brand-primary/5 flex items-center justify-center">
          <div className="text-center">
            <div className="relative w-14 h-14 mx-auto mb-3">
              <div className="absolute inset-0 rounded-full border-2 border-brand-accent/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-accent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Play className="w-6 h-6 text-brand-accent" aria-hidden="true" />
              </div>
            </div>
            <p className="text-brand-primary/65 text-sm">Loading video...</p>
          </div>
        </div>
        {visible && (
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full z-10"
            style={{ border: "none", overflow: "hidden" }}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            loading="lazy"
            title={`${kind} from New Life Assembly of God — ${service.date}`}
          />
        )}
      </div>
      <div className="px-5 py-4 md:px-6 md:py-5 border-t border-brand-primary/5">
        <p className="font-serif text-lg md:text-xl font-bold text-brand-primary tracking-tight">
          {service.label && <span className="text-brand-accent">{service.label} · </span>}
          {service.date}
        </p>
      </div>
    </div>
  );
}

export default function WatchPage() {
  const prefersReducedMotion = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const fadeIn = prefersReducedMotion ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, ease } };
  const slideUp = (delay = 0) => prefersReducedMotion ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { duration: 0.4, ease } } : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, delay, ease } };

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-32 bg-brand-primary overflow-hidden gradient-mesh">
        <div className="absolute inset-0 opacity-20 hidden md:block">
          <img
            src="/tony-preaching.webp"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[center_40%]"
            width={800}
            height={600}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-8">
          <motion.div
            {...fadeIn}
          >
            <p className="text-white/70 font-medium text-sm tracking-widest uppercase mb-4">
              Watch Online
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Past Services
            </h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Missed a Sunday? Catch up on past services from New Life Assembly
              of God.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Embedded Videos */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {/* Sermons */}
          <motion.h2
            {...slideUp()}
            className="font-serif text-2xl md:text-3xl font-bold text-brand-primary mb-6"
          >
            Sermons
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-20 md:mb-28">
            {sermons.map((service, i) => (
              <motion.div
                key={service.id}
                {...slideUp(i * 0.08)}
              >
                <FacebookVideo service={service} kind="Sermon" />
              </motion.div>
            ))}
          </div>

          {/* Worship */}
          <motion.h2
            {...slideUp()}
            className="font-serif text-2xl md:text-3xl font-bold text-brand-primary mb-6"
          >
            Worship
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
            {worship.map((service, i) => (
              <motion.div
                key={service.id}
                {...slideUp(i * 0.08)}
              >
                <FacebookVideo service={service} kind="Worship" />
              </motion.div>
            ))}
          </div>

          <motion.div
            {...slideUp()}
            className="text-center mt-12"
          >
            <p className="text-brand-primary/65 mb-4">
              Follow us on Facebook for live services and updates
            </p>
            <a
              href="https://www.facebook.com/newlifeagleitchfield"
              target="_blank"
              rel="noopener noreferrer"
              className="tap bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2 group"
            >
              Follow on Facebook
              <ExternalLink className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
