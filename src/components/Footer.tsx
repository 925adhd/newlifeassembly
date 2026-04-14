import { Phone, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Ministries", href: "/ministries" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-primary text-white" role="contentinfo">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-28 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* About + Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-3 text-white">
              New Life Assembly of God
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              A welcoming Assemblies of God church in Leitchfield, Kentucky.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 hover:text-brand-accent text-sm transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-brand-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-3 text-white">Service Times</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-hidden="true" />
                <span className="text-white/90">Sunday School — <span className="text-white/65">10:00 AM</span></span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-hidden="true" />
                <span className="text-white/90">Sunday Service — <span className="text-white/65">11:00 AM</span></span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-hidden="true" />
                <span className="text-white/90">Children&apos;s Church — <span className="text-white/65">11:30 AM</span></span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-hidden="true" />
                <span className="text-white/90">Wed Bible Study — <span className="text-white/65">6:30 PM</span></span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-3 text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-hidden="true" />
                <a
                  href="tel:+12702003422"
                  className="text-white/70 hover:text-brand-accent transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-brand-accent"
                >
                  (270) 200-3422
                </a>
                <span className="text-white/50 text-xs">Pastor Tony</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-hidden="true" />
                <a
                  href="tel:+12708680369"
                  className="text-white/70 hover:text-brand-accent transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-brand-accent"
                >
                  (270) 868-0369
                </a>
                <span className="text-white/50 text-xs">Office</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-accent shrink-0" aria-hidden="true" />
                <span className="text-white/70">47 Embry Acres Dr, Leitchfield, KY 42754</span>
              </li>
            </ul>
            <a
              href="https://www.facebook.com/newlifeagleitchfield"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="inline-flex items-center gap-2 mt-4 text-white/60 hover:text-brand-accent text-sm transition-colors"
            >
              <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/55 text-xs">
            &copy; {new Date().getFullYear()} New Life Assembly of God
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/55 hover:text-white/75 text-xs transition-colors underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
            <span className="text-white/40 text-xs">
              Website by{" "}
              <a
                href="https://studio925.design"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white/70 transition-colors underline underline-offset-2"
              >
                Studio 925
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
