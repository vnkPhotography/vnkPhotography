// Prepares every photo the website uses, from the full-size originals.
//
//   1. Put the full-size photos (VNK_1.jpg, VNK_3.jpg, …) in ./originals
//   2. npm run photos
//
// This script makes the gallery copies (public/photos, 2400 px) and the
// smaller copies (public/photos/sm, 1200 px) for every photo listed in
// src/photos.js — and nothing else, so removed photos disappear from the site.
// The full-size originals themselves are never published.
// (`npm run photos` then adds the copyright and makes the wallpapers.)
import { readdir, mkdir, unlink, access } from "node:fs/promises";
import sharp from "sharp";
import { photos, WALLPAPERS } from "../src/photos.js";

const SRC = "originals";
const OUT = "public/photos";
const SM = "public/photos/sm";

// Find a photo in originals/ whatever the spelling of its ending:
// VNK_1.jpg, VNK_1.JPG and VNK_1.jpeg all count as VNK_1.jpg.
const key = (f) => f.toLowerCase().replace(/\.jpeg$/, ".jpg");
let files;
try { files = await readdir(SRC); } catch {
  console.error(`Folder ${SRC}/ not found. Put the full-size photos in photo-portfolio/${SRC}/ and run again.`);
  process.exit(1);
}
const byKey = new Map(files.map((f) => [key(f), `${SRC}/${f}`]));
const original = (name) => byKey.get(key(name));

// 1. Check every photo the site needs (gallery + wallpapers) is there
const missing = [];
for (const p of [...photos, ...WALLPAPERS.filter((w) => !photos.some((p) => p.file === w.file))]) {
  if (!original(p.file)) missing.push(p.file);
}
if (missing.length) {
  console.error(`Missing in ${SRC}/: ${missing.join(", ")}`);
  process.exit(1);
}

// 2. Remove old copies so only the listed photos are published
for (const dir of [OUT, SM]) {
  await mkdir(dir, { recursive: true });
  for (const f of (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f))) await unlink(`${dir}/${f}`);
}

// 3. Make the copies
const mismatched = [];
for (const p of photos) {
  const img = sharp(original(p.file)).rotate();
  const info = await img.clone()
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${p.file}`);
  await img.clone()
    .resize({ width: 1200, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`${SM}/${p.file}`);
  if (info.width !== p.w || info.height !== p.h) {
    mismatched.push(`${p.file}: is ${info.width} × ${info.height}, photos.js says ${p.w} × ${p.h}`);
  }
  console.log(`ok  ${p.file}`);
}

// 4. About-page portrait, from originals/vnk.jpeg (kept out of public/ so the
//    full-size file is never published)
const portrait = original("vnk.jpg") ?? (await access("public/vnk.jpeg").then(() => "public/vnk.jpeg", () => null));
if (portrait) {
  await sharp(portrait).rotate()
    .resize({ width: 1200, height: 1500, fit: "inside" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile("public/about.jpg");
  console.log("ok  about.jpg");
} else {
  console.log("--  about.jpg kept as it is (no vnk.jpeg in originals/)");
}

if (mismatched.length) {
  console.warn("\nUpdate w and h in src/photos.js for these photos:\n  " + mismatched.join("\n  "));
}
