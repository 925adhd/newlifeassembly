// Google Analytics 4. The measurement ID is public (it ships in every page),
// so it lives here rather than in an env var. Leave it empty to turn GA off.
export const GA_MEASUREMENT_ID = "G-S3GKRZ8RSF";

// Only the live site reports, so localhost and Vercel previews don't skew the numbers
export const GA_HOSTNAME = "www.newlifeaogleitchfield.com";

type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

// Sends a GA4 event if analytics loaded. Never pass names, emails, or message text.
export function trackEvent(name: string, params?: Record<string, string | number>) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", name, params);
}
