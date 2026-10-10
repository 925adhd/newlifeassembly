import Script from "next/script";
import { GA_HOSTNAME, GA_MEASUREMENT_ID } from "@/lib/analytics";

// Loads GA4 on the live domain only, and records taps on phone numbers.
// Page views, scrolls and outbound clicks (like directions) come from GA4's
// enhanced measurement.
export default function Analytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <Script id="ga4" strategy="afterInteractive">
      {`
        if (location.hostname === ${JSON.stringify(GA_HOSTNAME)}) {
          var s = document.createElement("script");
          s.async = true;
          s.src = "https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}";
          document.head.appendChild(s);
          window.dataLayer = window.dataLayer || [];
          window.gtag = function () { dataLayer.push(arguments); };
          gtag("js", new Date());
          gtag("config", ${JSON.stringify(GA_MEASUREMENT_ID)});
          document.addEventListener("click", function (e) {
            var link = e.target.closest && e.target.closest('a[href^="tel:"]');
            if (link) gtag("event", "phone_call_click", { link_url: link.getAttribute("href") });
          });
        }
      `}
    </Script>
  );
}
