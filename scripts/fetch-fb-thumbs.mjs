import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "thumbs");

const IDS = [
  "2647737832246553",
  "609702385121850",
  "1054167483483185",
  "1005841564835385",
  "644015321627140",
  "1282550930213215",
  "598329929727976",
  "1236258307523153",
];

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

for (const id of IDS) {
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
    await writeFile(join(OUT, `${id}.jpg`), buf);
    console.log(`ok (${(buf.length / 1024).toFixed(0)} KB)`);
  } catch (e) {
    console.log(`image fail: ${e.message}`);
  }
}
