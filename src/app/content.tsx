"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Clock,
  MapPin,
  Phone,
  Heart,
  BookOpen,
  Users,
  Baby,
  Music,
  ChevronRight,
  Quote,
  X,
} from "lucide-react";

const serviceTimes = [
  {
    day: "Sunday",
    services: [
      { name: "Sunday School", time: "10:00 AM", icon: BookOpen },
      { name: "Sunday Morning Service", time: "11:00 AM", icon: Music },
      { name: "Children's Church", time: "11:30 AM", icon: Baby },
    ],
  },
  {
    day: "Wednesday",
    services: [
      { name: "Bible Study", time: "6:30 PM", icon: BookOpen },
    ],
  },
];

const ministries = [
  {
    title: "Sunday Worship",
    description:
      "Experience uplifting praise and worship with our church family every Sunday morning. All are welcome.",
    icon: Music,
  },
  {
    title: "Children's Church",
    description:
      "A fun, safe environment where kids learn about God's love through age-appropriate lessons and activities.",
    icon: Baby,
  },
  {
    title: "Bible Study",
    description:
      "Dive deeper into God's Word every Wednesday evening. Grow in faith through study, discussion, and prayer.",
    icon: BookOpen,
  },
  {
    title: "Community & Fellowship",
    description:
      "Build meaningful relationships with fellow believers through fellowship events, outreach, and service.",
    icon: Users,
  },
];

const testimonials = [
  {
    quote: "An amazing church with an amazing pastor.",
    author: "E Howe",
  },
];

const values = [
  {
    title: "Spirit-Filled Worship",
    description: "Passionate praise and worship that invites the presence of God into every service.",
    icon: Music,
  },
  {
    title: "Biblical Teaching",
    description: "Sound, practical teaching from God's Word that equips you for everyday life.",
    icon: BookOpen,
  },
  {
    title: "Welcoming Community",
    description: "A warm church family where everyone is valued, accepted, and loved.",
    icon: Heart,
  },
];

export default function HomePage() {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; alt: string } | null>(null);

  const openLightbox = useCallback((photo: { src: string; alt: string }) => {
    setLightboxImg(photo);
    window.history.pushState({ lightbox: true }, "");
  }, []);

  const closeLightbox = useCallback(() => {
    if (lightboxImg) {
      window.history.back();
    }
  }, [lightboxImg]);

  useEffect(() => {
    const handlePopState = () => {
      setLightboxImg(null);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
              aria-label="Close image"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={closeLightbox}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-16 md:pt-28 pb-8 md:pb-16 bg-gradient-to-br from-brand-primary via-brand-primary/90 to-brand-accent/30 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 items-center mt-4 md:mt-0">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center md:text-left order-2 md:order-1"
            >
              <p className="text-white/70 font-medium text-xs tracking-widest uppercase mb-2 hidden md:block">
                Assemblies of God &middot; Leitchfield, Kentucky
              </p>
              <h1 className="font-serif text-3xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-3 italic [text-shadow:0_4px_12px_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.4)]">
                Welcome to New Life Assembly of God
              </h1>
              <p className="text-white/80 text-sm md:text-xl max-w-lg mb-6 leading-relaxed md:mx-0 mx-auto">
                A welcoming church family in Leitchfield, KY where you can
                experience God&apos;s love, grow in faith, and find your purpose.
              </p>
              <div className="flex flex-row items-center md:items-start justify-center md:justify-start gap-3">
                <a
                  href="#service-times"
                  className="bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-medium text-sm md:text-lg transition-colors inline-flex items-center gap-2"
                >
                  Join Us Sunday
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
                </a>
                <a
                  href="/watch"
                  className="border-2 border-white/30 hover:border-white/60 text-white px-5 py-3 md:px-8 md:py-4 rounded-lg font-medium text-sm md:text-lg transition-colors"
                >
                  Watch a Service
                </a>
              </div>
            </motion.div>

            {/* Church Photo */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 md:order-2"
            >
              <img
                src="/church.webp"
                alt="New Life Assembly of God church building in Leitchfield, Kentucky"
                width={960}
                height={720}
                className="w-full h-auto rounded-2xl md:rounded-l-2xl md:rounded-r-none shadow-2xl"
                fetchPriority="high"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center px-4"
              >
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                </div>
                <h2 className="font-serif text-xl font-bold text-brand-primary mb-2">
                  {value.title}
                </h2>
                <p className="text-brand-primary/70 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section
        id="service-times"
        className="py-16 md:py-24 scroll-mt-20 grid-pattern"
      >
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              Join Us
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Service Times
            </h2>
            <p className="text-brand-primary/70 max-w-xl mx-auto">
              We&apos;d love to see you this week. All services are open to
              everyone — come as you are.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {serviceTimes.map((day, dayIndex) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <h3 className="font-serif text-2xl font-bold text-brand-primary mb-6 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                  {day.day}
                </h3>
                <ul className="space-y-4">
                  {day.services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li key={service.name} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-brand-accent" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-medium text-brand-primary">
                            {service.name}
                          </p>
                          <p className="text-brand-primary/65 text-sm">
                            {service.time}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About / Welcome Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
                About Us
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                A Place to Belong in Leitchfield, KY
              </h2>
              <p className="text-brand-primary/75 leading-relaxed mb-4">
                New Life Assembly of God is more than a church — it&apos;s a
                family. Led by Pastor Tony Redmon, we are an Assemblies of God
                church committed to sharing the love of Jesus Christ with
                Leitchfield and the surrounding Grayson County community.
              </p>
              <p className="text-brand-primary/75 leading-relaxed mb-6">
                Whether you&apos;re looking for a church home, seeking answers,
                or just curious about faith, you&apos;ll find a warm welcome
                here. We believe in the power of worship, the truth of God&apos;s
                Word, and the importance of community.
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-brand-accent font-medium hover:gap-3 transition-all underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent"
              >
                Learn more about us
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="/new-life-assembly-worship-service.webp"
                alt="Worship service at New Life Assembly of God with live band and congregation"
                width={800}
                height={600}
                className="rounded-2xl shadow-lg w-full"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ministries Overview */}
      <section className="py-16 md:py-24 grid-pattern">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              Get Involved
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary">
              Our Ministries
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {ministries.map((ministry, index) => {
              const Icon = ministry.icon;
              return (
                <motion.a
                  key={ministry.title}
                  href="/ministries"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-accent/20 transition-colors">
                    <Icon className="w-6 h-6 text-brand-accent" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-brand-primary">
                    {ministry.title}
                  </h3>
                </motion.a>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <a
              href="/ministries"
              className="inline-flex items-center gap-2 text-brand-accent font-medium hover:gap-3 transition-all underline underline-offset-4 decoration-brand-accent/30 hover:decoration-brand-accent"
            >
              View all ministries
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Baptism / Life at New Life */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <img
                src="/new-life-assembly-baptism.webp"
                alt="Outdoor baptism at New Life Assembly of God"
                width={600}
                height={550}
                className="rounded-2xl shadow-lg w-full max-w-md mx-auto"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
                Life at New Life
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                Growing Together in Faith
              </h2>
              <p className="text-brand-primary/75 leading-relaxed mb-4">
                At New Life Assembly, we celebrate every step of your spiritual
                journey — from your first visit to water baptism and beyond. Our
                church is a place where real life change happens through the
                power of God.
              </p>
              <p className="text-brand-primary/75 leading-relaxed mb-6">
                Whether you&apos;re new to faith or have been walking with God
                for years, you&apos;ll find opportunities to grow, serve, and
                connect with others who share your journey.
              </p>
              <a
                href="/contact"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                Get Connected
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Life at New Life Gallery */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              Life at New Life
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary">
              Events &amp; Activities
            </h2>
          </motion.div>

          {/* Christmas Play Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden rounded-xl mb-3 md:mb-4 cursor-pointer"
            onClick={() => openLightbox({ src: "/gallery-christmas-play-stage.webp", alt: "Christmas nativity play at New Life Assembly" })}
          >
            <img
              src="/gallery-christmas-play-stage.webp"
              alt="Christmas nativity play at New Life Assembly"
              width={1200}
              height={400}
              className="w-full h-40 md:h-64 object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </motion.div>

          {/* Desktop: play photos + logo in middle */}
          <div className="hidden md:flex justify-between items-center mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-xl w-[30%] aspect-[3/4] cursor-pointer"
              onClick={() => openLightbox({ src: "/gallery-christmas-play-angels.webp", alt: "Children's Christmas play at New Life Assembly" })}
            >
              <img
                src="/gallery-christmas-play-angels.webp"
                alt="Children's Christmas play at New Life Assembly"
                width={300}
                height={400}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center justify-center w-[25%]"
            >
              <img
                src="/new-life-assembly-logo.webp"
                alt="New Life Assembly of God logo"
                width={200}
                height={100}
                className="w-full opacity-15"
                loading="lazy"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="overflow-hidden rounded-xl w-[30%] aspect-[3/4] cursor-pointer"
              onClick={() => openLightbox({ src: "/gallery-christmas-play-kids.webp", alt: "Kids performing in Christmas play at New Life Assembly" })}
            >
              <img
                src="/gallery-christmas-play-kids.webp"
                alt="Kids performing in Christmas play at New Life Assembly"
                width={300}
                height={400}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          </div>
          <div className="hidden md:grid grid-cols-4 gap-4">
            {[
              { src: "/gallery-egg-hunt.webp", alt: "Easter egg hunt at New Life Assembly" },
              { src: "/gallery-egg-hunt-kid.webp", alt: "Child with Easter eggs at New Life Assembly" },
              { src: "/gallery-vbs-group.webp", alt: "VBS kids group photo at New Life Assembly" },
              { src: "/gallery-vbs-crafts.webp", alt: "VBS crafts and activities at New Life Assembly" },
            ].map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-xl aspect-square cursor-pointer"
                onClick={() => openLightbox(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile: simple grid */}
          <div className="grid grid-cols-3 gap-3 md:hidden">
            {[
              { src: "/gallery-christmas-play-angels.webp", alt: "Children's Christmas play at New Life Assembly" },
              { src: "/gallery-christmas-play-kids.webp", alt: "Kids performing in Christmas play at New Life Assembly" },
              { src: "/gallery-egg-hunt.webp", alt: "Easter egg hunt at New Life Assembly" },
              { src: "/gallery-egg-hunt-kid.webp", alt: "Child with Easter eggs at New Life Assembly" },
              { src: "/gallery-vbs-group.webp", alt: "VBS kids group photo at New Life Assembly" },
              { src: "/gallery-vbs-crafts.webp", alt: "VBS crafts and activities at New Life Assembly" },
            ].map((photo, index) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="overflow-hidden rounded-xl aspect-square cursor-pointer"
                onClick={() => openLightbox(photo)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-brand-primary">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              From Our Church Family
            </h2>
          </motion.div>

          <div className="flex justify-center">
            {testimonials.map((testimonial, index) => (
              <motion.article
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-lg w-full"
              >
                <Quote className="w-8 h-8 text-brand-accent mb-4" aria-hidden="true" />
                <p className="text-white/90 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="text-brand-accent font-medium">{testimonial.author}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA Section */}
      <section className="py-16 md:py-24" id="contact">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center"
          >
            <p className="text-brand-accent font-medium text-sm tracking-widest uppercase mb-2">
              We&apos;d Love to Meet You
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
              Plan Your Visit
            </h2>
            <p className="text-brand-primary/70 max-w-lg mx-auto mb-8">
              Have questions? Want to know what to expect on your first visit?
              We&apos;re here to help. Reach out or just show up — you&apos;re
              always welcome.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="/contact"
                className="bg-brand-accent hover:bg-brand-accent/90 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2"
              >
                Plan Your Visit
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="tel:+12702003422"
                className="border-2 border-brand-primary/20 hover:border-brand-accent text-brand-primary px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Call Pastor Tony
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-brand-primary/65 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Leitchfield, Kentucky
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" aria-hidden="true" />
                Sundays at 10:00 AM & 11:00 AM
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
