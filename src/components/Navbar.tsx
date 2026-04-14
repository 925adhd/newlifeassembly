"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Watch", href: "/watch" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
    <div aria-hidden="true" className="h-16 md:h-20" />
    <nav
      className={`fixed top-0 left-0 right-0 z-[9999] bg-white transform-gpu will-change-transform transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo / Church Name */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/dove-logo.webp"
              alt="New Life Assembly of God dove logo"
              width={48}
              height={48}
              className="h-10 md:h-12 w-auto object-contain shrink-0"
            />
            <div>
              <p className="font-sans font-bold text-brand-primary text-lg leading-tight tracking-tight">
                New Life Assembly of God
              </p>
              <p className="text-xs text-brand-primary/60 leading-tight">
                Leitchfield, KY
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-brand-primary/80 hover:text-brand-accent font-medium text-sm transition-colors duration-500 link-underline"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="tap bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Visit Us
            </a>

          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="tap md:hidden p-2.5 rounded-lg text-brand-primary hover:bg-brand-primary/5 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white border-t border-brand-primary/10 animate-[fadeSlideDown_400ms_cubic-bezier(0.16,1,0.3,1)]">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ animation: `fadeSlideDown 500ms ${i * 60}ms cubic-bezier(0.16, 1, 0.3, 1) backwards` }}
                className="tap block px-4 py-3 rounded-lg text-brand-primary/80 hover:bg-brand-accent/5 hover:text-brand-accent font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              style={{ animation: `fadeSlideDown 500ms ${navLinks.length * 60}ms cubic-bezier(0.16, 1, 0.3, 1) backwards` }}
              className="tap block text-center bg-brand-accent text-white px-4 py-3 rounded-lg font-medium mt-2 transition-colors hover:bg-brand-accent/90"
            >
              Visit Us
            </a>
          </div>
        </div>
      )}

    </nav>

    {/* Sticky mobile CTA — appears after scrolling past hero */}
    <a
      href="tel:+12702003422"
      className={`tap md:hidden fixed bottom-6 right-6 z-50 bg-brand-accent text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(37,99,171,0.5)] hover:bg-brand-accent/90 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        pastHero ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-75 translate-y-2 pointer-events-none"
      }`}
      aria-label="Call Pastor Tony Redmon"
      aria-hidden={!pastHero}
      tabIndex={pastHero ? 0 : -1}
    >
      <Phone className="w-6 h-6" />
    </a>
    </>
  );
}
