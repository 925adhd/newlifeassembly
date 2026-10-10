# New Life Assembly of God Website

## Stack
- Next.js 16 (App Router, static export)
- TypeScript (strict)
- Tailwind CSS v4
- motion/react for animations
- lucide-react for icons
- Web3Forms for contact and prayer forms
- Deployed on Vercel at https://www.newlifeaogleitchfield.com (DNS on Cloudflare)

## Structure
- src/app/: pages and layouts (each page: page.tsx for metadata, content.tsx for UI)
- src/components/: reusable UI components
- public/: only files the live site uses (images, sitemap, robots.txt, llms.txt, .well-known/)
- assets/: full-size master photos; `node scripts/generate-responsive-images.mjs` writes their -480/-960/-1600 copies to public/ (gitignored)
- client-info/, _unused/: original client files and retired photos (gitignored, never deployed)
- scripts/: image helpers (responsive sizes, Facebook video thumbnails)

## Git Rules
- Do NOT commit or push without asking
- Do NOT amend existing commits
- Keep commits focused and descriptive

## Conventions
- Mobile-first (default styles = mobile, md: = desktop)
- All images WebP with alt, width, height
- Image file names: lowercase, hyphenated, descriptive (`new-life-assembly-<subject>[-<width>].webp`, people as `first-last.webp`); nothing unused stays in public/
- Text contrast minimum: 65% opacity
- Semantic HTML: main, section, article, nav, footer
- One H1 per page, never skip heading levels

## Quality Rules (from the SEO, security and ADA audit guides)
Every change must keep these true. Check them before calling work done.

### SEO
- Every page's metadata sets a unique title (under 60 chars with the " | New Life Assembly of God" suffix), a unique description of 120-160 chars, `alternates.canonical`, and a full `openGraph` block that includes `images: ["/new-life-assembly-og-v2.png"]`. A page's `openGraph` replaces the layout's, so the image must be repeated on every page.
- Do not set `twitter.title`/`twitter.description` in the layout; Next fills them from each page.
- Pages not meant for search (thank-you, etc.) get `robots: { index: false }`, their own canonical, and stay out of the sitemap.
- New or removed pages: update public/sitemap.xml (and its `<lastmod>` when content changes).
- Structured data must match visible content. Never add Review/AggregateRating markup (self-published ratings are ineligible and flagged by Google).
- Image filenames are lowercase, hyphenated and descriptive (no IDs or IMG_1234). Alt text describes the image; decorative images use `alt="" aria-hidden="true"`.
- Use descriptive link text, never a bare "Learn more" or "click here".
- Keep the warm, community voice; SEO is for being found, not for sounding like a business.

### Accessibility (WCAG 2.2 AA)
- Text contrast at least 4.5:1 (3:1 for 24px+ or bold 19px+). That means `text-brand-primary/65` or darker on white/warm, and `text-white/65` or brighter on navy. Blue `text-brand-accent` is fine on light backgrounds but fails on navy; use `text-brand-gold` there.
- Text over photos or gradients must be measured, not eyeballed.
- Decorative text (big numerals, watermark words) is drawn with CSS `::before` (e.g. `before:content-[attr(data-num)]`), not DOM text.
- Tap targets at least 24x24px (44px preferred on mobile); pad small standalone links with `py-1`/`py-1.5`.
- Every interactive element is keyboard reachable with a visible focus style. Visually hidden inputs (sr-only radios) need a focus ring on their label (`has-[:focus-visible]:ring-2`).
- Dialogs and menus: move focus in on open, trap Tab, close on Escape, return focus to the trigger.
- Forms: visible labels, `autocomplete`, `aria-required`, a "Fields marked * are required" note, and `role="status"`/`role="alert"` for results.
- Decorative motion stops within 5 seconds and respects `prefers-reduced-motion`.
- `<figcaption>` only inside `<figure>`; no duplicate IDs.

### Security and privacy
- Static export only: no secrets in client code. The Web3Forms access key is the only key and is public by design.
- JSON-LD via `dangerouslySetInnerHTML` only with hard-coded data, never user input.
- Keep the security headers in vercel.json; if adding a third-party embed or script, update the CSP.
- Run `npm audit --omit=dev` when touching dependencies; production must stay at 0 vulnerabilities.
- The privacy policy must describe every form and third-party service the site uses (Web3Forms, Google Analytics, Facebook video, Google Maps). Update it when that changes.
- Google Analytics 4 (`G-S3GKRZ8RSF`, set in src/lib/analytics.ts) loads only on www.newlifeaogleitchfield.com. Events: `generate_lead` (contact form), `prayer_request_submit`, `phone_call_click`. Never send names, emails, or message/prayer text to GA.

### Agentic browsing (Lighthouse)
- public/llms.txt: Markdown with a `# H1`, real `[text](url)` links; update it when pages, times, or contacts change.
- public/.well-known/ard.json and ai-catalog.json (identical): must validate against the ARD schema (`specVersion: "1.0"`, entry `updatedAt` as full date-time, standard media types). The entry points to public/.well-known/skills/new-life-assembly.md; keep that skill file's facts current.
- Forms carry WebMCP `toolname` + `tooldescription`; every required field has a `name`, every optional field a label or `toolparamdescription`. Never add `toolautosubmit` (people should confirm before sending).
- `<img>` width/height must match the file's real aspect ratio (Lighthouse Best Practices).

### Verifying
- `npx tsc --noEmit`, `npx eslint src` (0 errors) and `npx next build` must pass.
- For UI changes, run axe-core (WCAG 2.2 AA tags) on affected pages at 375px and 1280px and fix every violation.
- Lighthouse (Chrome 150+) target on every page: Accessibility, Best Practices and SEO 100, Agentic Browsing all passing.
