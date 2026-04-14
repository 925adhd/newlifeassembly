import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, "..", "public");

const sources = [
  "new-life-assembly-church-building.webp",
  "new-life-assembly-entrance.webp",
  "new-life-assembly-worship-service.webp",
  "new-life-assembly-baptism.webp",
  "churchfromroad.webp",
  "church-exterior.webp",
  "pastor-tony-redmon.webp",
];

const widths = [480, 960, 1600];

for (const file of sources) {
  const input = resolve(publicDir, file);
  if (!existsSync(input)) {
    console.warn(`[skip] ${file} not found`);
    continue;
  }
  const base = file.replace(/\.webp$/i, "");
  for (const w of widths) {
    const out = resolve(publicDir, `${base}-${w}.webp`);
    if (existsSync(out)) {
      console.log(`[keep] ${base}-${w}.webp`);
      continue;
    }
    const cmd = `npx sharp -i "${input}" -o "${out}" resize ${w} --withoutEnlargement`;
    console.log(`[gen ] ${base}-${w}.webp`);
    execSync(cmd, { stdio: "inherit" });
  }
}

console.log("Done.");
