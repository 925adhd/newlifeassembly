# New Life Assembly of God

Website for New Life Assembly of God, an Assemblies of God church in Leitchfield, Kentucky.

Live site: https://www.newlifeaogleitchfield.com

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
npm run lint
```

Built with Next.js (App Router, static export), TypeScript, Tailwind CSS v4 and motion. Contact and prayer forms are delivered by Web3Forms. Google Analytics 4 runs on the live domain only (`src/lib/analytics.ts`). Hosted on Vercel; DNS on Cloudflare.

## Project layout

- `src/app/` pages (each has `page.tsx` for metadata and `content.tsx` for the page itself)
- `src/components/` shared UI (navbar, footer, events, video player)
- `public/` files served by the site, including `sitemap.xml`, `robots.txt`, `llms.txt` and `.well-known/` agent discovery files
- `scripts/` image helpers: `generate-responsive-images.mjs` (resizes masters from `assets/`) and `fetch-fb-thumbs.mjs` (video thumbnails)

## Common updates

- **Events:** edit `src/app/events.ts`. Past events hide themselves.
- **Leaders:** edit `src/app/leadership/leaders.ts`.
- **Videos:** add the Facebook video to `src/app/watch/content.tsx` and `src/app/watch/page.tsx`, then add it to `scripts/fetch-fb-thumbs.mjs` and run it for the thumbnail.
- **Service times or contact details:** they appear in several places (home, contact, footer, layout structured data, `llms.txt`, the skill in `public/.well-known/skills/`). Update them all together.

See `CLAUDE.md` for the SEO, accessibility, security and agent-readiness rules every change must follow.
