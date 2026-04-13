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

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white/90 backdrop-blur-md"
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
                className="text-brand-primary/80 hover:text-brand-accent font-medium text-sm transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-brand-accent after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              className="bg-brand-accent hover:bg-brand-accent/90 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              Visit Us
            </a>

          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 rounded-lg text-brand-primary hover:bg-brand-primary/5 transition-colors"
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
        <div id="mobile-menu" className="md:hidden bg-white border-t border-brand-primary/10">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-lg text-brand-primary/80 hover:bg-brand-accent/5 hover:text-brand-accent font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-brand-accent text-white px-4 py-3 rounded-lg font-medium mt-2 transition-colors hover:bg-brand-accent/90"
            >
              Visit Us
            </a>
          </div>
        </div>
      )}

    </nav>

    {/* Sticky mobile CTA */}
    <a
      href="tel:+12702003422"
      className="md:hidden fixed bottom-6 right-6 z-50 bg-brand-accent text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-accent/90 transition-colors"
      aria-label="Call Pastor Tony Redmon"
    >
      <Phone className="w-6 h-6" />
    </a>
    </>
  );
}
