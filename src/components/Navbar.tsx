"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, ChevronDown } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Who We Are", href: "/about" },
      { label: "What We Believe", href: "/beliefs" },
      { label: "Leadership", href: "/leadership" },
    ],
  },
  { label: "Ministries", href: "/ministries" },
  { label: "Watch", href: "/watch" },
  { label: "Prayer", href: "/prayer" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Normalize "/prayer.html" or "/prayer/" to "/prayer" so page checks work on any host
  const rawPathname = usePathname();
  const pathname = rawPathname.replace(/\.html$/, "").replace(/(.)\/$/, "$1").replace(/^\/index$/, "/");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // A parent link counts as active on any of its child pages
  const isSectionActive = (link: NavLink) =>
    pathname === link.href || !!link.children?.some((c) => c.href === pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const handleScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Mobile menu is a dialog: move focus into it, keep Tab inside it (plus the
  // close button), and send focus back to the menu button on Escape
  useEffect(() => {
    if (!isOpen) return;
    const focusables = () => [
      menuButtonRef.current,
      ...Array.from(mobileMenuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
    ].filter((el): el is HTMLElement => !!el);
    const frame = requestAnimationFrame(() => focusables()[1]?.focus());
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (!items.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen]);

  // Escape closes the About submenu, even while the pointer is hovering it
  useEffect(() => {
    if (!aboutOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [aboutOpen]);

  return (
    <>
    <div aria-hidden="true" className="h-16 md:h-20" />
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
        isOpen
          ? "bg-[rgba(255,253,248,0.72)]"
          : scrolled
            ? "bg-[rgba(255,255,255,0.7)] shadow-[0_1px_0_rgba(27,42,74,0.06)]"
            : "bg-[rgba(255,255,255,0.55)]"
      }`}
      style={{
        backdropFilter: "blur(24px) saturate(110%) brightness(106%)",
        WebkitBackdropFilter: "blur(24px) saturate(110%) brightness(106%)",
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Church Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <img
              src="/dove-logo.webp"
              alt="New Life Assembly of God dove logo"
              width={143}
              height={175}
              className="h-10 md:h-12 w-auto object-contain shrink-0"
            />
            <div>
              <p className="font-sans font-bold text-brand-primary text-lg leading-tight tracking-tight">
                New Life Assembly of God
              </p>
              <p className="text-xs text-brand-primary/65 leading-tight">
                Leitchfield, KY
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isSectionActive(link);
              const linkClass = `${active ? "text-brand-accent" : "text-brand-primary/80"} hover:text-brand-accent font-medium text-sm py-1 transition-colors duration-500 link-underline`;
              if (!link.children) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setAboutOpen(true)}
                  onMouseLeave={() => setAboutOpen(false)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) setAboutOpen(false);
                  }}
                >
                  <div className="flex items-center gap-0.5">
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                    <button
                      type="button"
                      onClick={() => setAboutOpen((v) => !v)}
                      aria-expanded={aboutOpen}
                      aria-controls="about-submenu"
                      aria-label={`${link.label} pages`}
                      className="p-1.5 -mr-1.5 rounded text-brand-primary/65 hover:text-brand-accent transition-colors"
                    >
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  {/* Submenu: opens on hover, or via the chevron button for keyboard and touch; Escape closes it */}
                  <div
                    id="about-submenu"
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-300 ${
                      aboutOpen ? "visible opacity-100 translate-y-0" : "invisible opacity-0 -translate-y-1"
                    }`}
                  >
                    <ul className="min-w-[200px] bg-white rounded-xl p-2 shadow-[0_1px_2px_rgba(27,42,74,0.06),0_16px_40px_-12px_rgba(27,42,74,0.2)] border border-brand-primary/5">
                      {link.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              aria-current={childActive ? "page" : undefined}
                              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                childActive
                                  ? "text-brand-accent bg-brand-accent/5"
                                  : "text-brand-primary/80 hover:text-brand-accent hover:bg-brand-primary/[0.03]"
                              }`}
                            >
                              {child.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
            <a
              href="/contact"
              className="tap btn-gold px-5 py-2.5 rounded-lg text-sm hover:-translate-y-0.5"
            >
              Visit Us
            </a>

          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            onClick={() => {
              // Each time the menu opens, the About group starts collapsed
              setMobileAboutOpen(false);
              setIsOpen(!isOpen);
            }}
            className="tap md:hidden p-2.5 rounded-lg text-brand-primary hover:bg-brand-primary/5 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

    </nav>

    {/* Mobile Navigation: full-screen glass overlay */}
    {isOpen && (
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="md:hidden fixed inset-0 top-16 z-[9998] bg-[rgba(255,253,248,0.72)] flex flex-col animate-[fadeIn_300ms_cubic-bezier(0.16,1,0.3,1)]"
        style={{
          backdropFilter: "blur(40px) saturate(110%) brightness(108%)",
          WebkitBackdropFilter: "blur(40px) saturate(110%) brightness(108%)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        {/* Dove watermark */}
        <img
          src="/dove-logo.webp"
          alt=""
          aria-hidden="true"
          width={143}
          height={175}
          className="absolute bottom-48 right-6 w-[180px] h-auto opacity-[0.06] pointer-events-none select-none"
          loading="lazy"
        />

        {/* Decorative orbs */}
        <span
          aria-hidden="true"
          className="orb orb-float w-[320px] h-[320px] -top-20 -right-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(37,99,171,0.18) 0%, rgba(37,99,171,0) 70%)" }}
        />
        <span
          aria-hidden="true"
          className="orb orb-float w-[280px] h-[280px] bottom-40 -left-16 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(125,148,173,0.22) 0%, rgba(125,148,173,0) 70%)", animationDelay: "-5s" }}
        />

        {/* Nav links: big serif italic, centered */}
        <div className="relative flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col justify-center px-8 py-6 gap-1">
            {navLinks.map((link, i) => {
              const isActive = isSectionActive(link);
              return (
                <div
                  key={link.href}
                  style={{ animation: `fadeSlideRight 600ms ${120 + i * 80}ms cubic-bezier(0.16, 1, 0.3, 1) backwards` }}
                >
                  {link.children ? (
                    // Collapsed by default; "Who We Are" in the list covers /about
                    <button
                      type="button"
                      onClick={() => setMobileAboutOpen((v) => !v)}
                      aria-expanded={mobileAboutOpen}
                      aria-controls="mobile-about-submenu"
                      className="tap group w-full flex items-center gap-3 text-left font-serif italic font-bold text-brand-primary leading-none pt-3 pb-[25px] text-4xl sm:text-5xl"
                    >
                      <span className={`inline-block transition-transform duration-500 group-hover:translate-x-2 group-active:translate-x-2 ${isActive ? "translate-x-2" : ""}`}>
                        {link.label}
                      </span>
                      <ChevronDown
                        className={`w-6 h-6 mt-1 text-brand-accent transition-transform duration-300 ${mobileAboutOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className="tap group block font-serif italic font-bold text-brand-primary leading-none py-3 text-4xl sm:text-5xl"
                    >
                      <span className={`inline-block transition-transform duration-500 group-hover:translate-x-2 group-active:translate-x-2 ${isActive ? "translate-x-2" : ""}`}>
                        {link.label}
                      </span>
                      <span className={`block h-px bg-brand-accent/50 mt-3 transition-all duration-500 group-hover:w-20 group-active:w-20 ${isActive ? "w-20" : "w-0"}`} />
                    </a>
                  )}
                  {link.children && mobileAboutOpen && (
                    <ul id="mobile-about-submenu" className="flex flex-col pl-3 ml-2 -mt-2 mb-3 border-l border-brand-accent/30 animate-[fadeIn_300ms_cubic-bezier(0.16,1,0.3,1)]">
                      {link.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              onClick={() => setIsOpen(false)}
                              aria-current={childActive ? "page" : undefined}
                              className={`tap block py-1.5 text-base font-medium transition-colors ${
                                childActive ? "text-brand-accent" : "text-brand-primary/75 hover:text-brand-accent"
                              }`}
                            >
                              {child.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact block at bottom */}
        <div
          className="relative border-t border-white/40 bg-[rgba(255,255,255,0.25)] px-8 py-6"
          style={{ animation: `fadeSlideUp 600ms ${180 + navLinks.length * 80 + 80}ms cubic-bezier(0.16, 1, 0.3, 1) backwards` }}
        >
          <a
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="tap group block btn-gold text-center py-4 rounded-lg inline-flex items-center justify-center gap-2 w-full mb-5"
          >
            Plan Your Visit
            <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
          </a>
          <div className="space-y-2.5 text-sm">
            <a
              href="tel:+12702003422"
              className="flex items-center gap-3 text-brand-accent hover:text-brand-accent/80 transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="font-medium">(270) 200-3422 <span className="text-brand-primary/65 font-normal text-xs ml-1">· Pastor Tony</span></span>
            </a>
            <a
              href="https://maps.google.com/?q=47+Embry+Acres+Dr,+Leitchfield,+KY+42754"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-brand-primary/75 hover:text-brand-accent transition-colors"
              aria-label="Open directions to 47 Embry Acres Dr, Leitchfield, KY in Google Maps"
            >
              <MapPin className="w-4 h-4 text-brand-accent shrink-0" aria-hidden="true" />
              <span className="whitespace-nowrap">
                47 Embry Acres Dr
                <span className="text-brand-accent text-xs ml-1.5">
                  Directions <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </span>
            </a>
          </div>
        </div>
      </div>
    )}

    {/* Sticky mobile CTA: directions everywhere, a call button on /prayer. Appears after
        scrolling past the hero; hidden when the menu is open or on /watch */}
    {pathname !== "/watch" && (() => {
      const isPrayer = pathname === "/prayer";
      const visible = pastHero && !isOpen;
      return (
        <a
          href={isPrayer ? "tel:+12702003422" : "https://maps.google.com/?q=47+Embry+Acres+Dr,+Leitchfield,+KY+42754"}
          {...(isPrayer ? {} : { target: "_blank", rel: "noopener noreferrer" })}
          className={`tap md:hidden fixed bottom-6 right-6 z-50 bg-brand-gold hover:bg-brand-gold-hover text-brand-primary w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-75 translate-y-2 pointer-events-none"
          }`}
          aria-label={isPrayer ? "Call Pastor Tony Redmon" : "Get directions to New Life Assembly of God (opens Google Maps)"}
          aria-hidden={!visible}
          tabIndex={visible ? 0 : -1}
        >
          {isPrayer ? <Phone className="w-6 h-6" /> : <MapPin className="w-6 h-6" />}
        </a>
      );
    })()}
    </>
  );
}
