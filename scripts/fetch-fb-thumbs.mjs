import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "thumbs");

// Facebook video id -> descriptive file name (saved as thumbs/new-life-<name>.webp)
const VIDEOS = {
  "2647737832246553": "sermon-2025-07-27",
  "609702385121850": "sermon-2025-07-13",
  "1054167483483185": "sermon-2025-06-01",
  "1005841564835385": "sermon-resurrection-day-2025-04-20",
  "644015321627140": "worship-2025-08-17",
  "1282550930213215": "worship-2025-07-27",
  "598329929727976": "worship-2025-07-13",
  "1236258307523153": "worship-2025-06-22",
};

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

async function scrape(id) {
  const urls = [
    `https://www.facebook.com/reel/${id}`,
    `https://www.facebook.com/watch/?v=${id}`,
    `https://m.facebook.com/reel/${id}`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": UA,
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
        redirect: "follow",
      });
      if (!res.ok) continue;
      const html = await res.text();
      const match =
        html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
        html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (match) return match[1].replace(/&amp;/g, "&");
    } catch {
      // try next
    }
  }
  return null;
}

await mkdir(OUT, { recursive: true });

for (const [id, name] of Object.entries(VIDEOS)) {
  process.stdout.write(`${id} ... `);
  const imgUrl = await scrape(id);
  if (!imgUrl) {
    console.log("no og:image");
    continue;
  }
  try {
    const img = await fetch(imgUrl, { headers: { "User-Agent": UA } });
    if (!img.ok) {
      console.log(`image fetch ${img.status}`);
      continue;
    }
    const buf = Buffer.from(await img.arrayBuffer());
    const out = join(OUT, `new-life-${name}.webp`);
    await sharp(buf).webp({ quality: 82 }).toFile(out);
    console.log(`ok -> ${out}`);
  } catch (e) {
    console.log(`image fail: ${e.message}`);
  }
}
