import type { Metadata } from "next";
import Link from "next/link";
import { Home, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for does not exist or has been moved. Visit New Life Assembly of God in Leitchfield, KY.",
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24">
      <div className="max-w-lg mx-auto px-4 text-center">
        <p className="text-brand-accent font-bold text-7xl md:text-8xl mb-4">404</p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-brand-primary/70 leading-relaxed mb-8">
          Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
          moved. Let us help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Go Home
          </Link>
          <Link
            href="/contact"
            className="border-2 border-brand-primary/20 hover:border-brand-accent text-brand-primary px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Contact Us
          </Link>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/about"
            className="text-brand-accent underline underline-offset-2 hover:text-brand-accent/80"
          >
            About Us
          </Link>
          <Link
            href="/ministries"
            className="text-brand-accent underline underline-offset-2 hover:text-brand-accent/80"
          >
            Ministries
          </Link>
          <Link
            href="/contact"
            className="text-brand-accent underline underline-offset-2 hover:text-brand-accent/80"
          >
            Plan Your Visit
          </Link>
        </div>
      </div>
    </section>
  );
}
