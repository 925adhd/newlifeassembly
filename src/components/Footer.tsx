import { Phone, MapPin, Clock, Heart } from "lucide-react";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-xl font-bold mb-4 text-white">
              New Life Assembly of God
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              A welcoming Assemblies of God church in Leitchfield, Kentucky.
              Join our church family for worship, fellowship, and spiritual
              growth.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
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
            <h3 className="font-serif text-lg font-bold mb-4 text-white">Service Times</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white/90 font-medium">Sunday School</p>
                  <p className="text-white/65">10:00 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white/90 font-medium">Sunday Morning Service</p>
                  <p className="text-white/65">11:00 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white/90 font-medium">Children&apos;s Church</p>
                  <p className="text-white/65">Sunday 11:30 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-white/90 font-medium">Wednesday Bible Study</p>
                  <p className="text-white/65">6:30 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-bold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <a
                    href="tel:+12702003422"
                    className="text-white/70 hover:text-brand-accent transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-brand-accent"
                  >
                    (270) 200-3422
                  </a>
                  <p className="text-white/65 text-xs">Pastor Tony Redmon</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <a
                    href="tel:+12708680369"
                    className="text-white/70 hover:text-brand-accent transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-brand-accent"
                  >
                    (270) 868-0369
                  </a>
                  <p className="text-white/65 text-xs">Church Office</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
                <span className="text-white/70">47 Embry Acres Dr<br />Leitchfield, KY 42754</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social + Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <a
              href="https://www.facebook.com/newlifeagleitchfield"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-brand-accent/80 flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/65 text-sm flex items-center gap-1">
            &copy; {new Date().getFullYear()} New Life Assembly of God. All
            rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/65 hover:text-white/80 text-xs transition-colors underline underline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-white/40 text-xs">
            Website by{" "}
            <a
              href="https://studio925.design"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/70 transition-colors underline underline-offset-2"
            >
              Studio 925
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
