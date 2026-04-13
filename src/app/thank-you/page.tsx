import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, Home, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You",
  description:
    "Thank you for reaching out to New Life Assembly of God in Leitchfield, KY. We will get back to you soon.",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center py-24">
      <div className="max-w-lg mx-auto px-4 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" aria-hidden="true" />
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-primary mb-4">
          Thank You!
        </h1>
        <p className="text-brand-primary/70 leading-relaxed mb-8">
          Your message has been sent successfully. Someone from New Life
          Assembly of God will get back to you soon.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="bg-brand-accent hover:bg-brand-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            Back to Home
          </Link>
          <a
            href="tel:+12702003422"
            className="border-2 border-brand-primary/20 hover:border-brand-accent text-brand-primary px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Call Us
          </a>
        </div>
      </div>
    </section>
  );
}
