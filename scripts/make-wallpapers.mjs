// Makes the Downloads-page wallpapers from the full-size originals:
//   desktop → 2560 × 1440, mobile → 1290 × 2796, plus small preview thumbnails,
// and writes your copyright into each file.
//
//   npm run wallpapers             (reads full-size photos from ./originals)
//   npm run wallpapers -- <folder> (or from another folder)
//
import { mkdir, rm, readdir } from "node:fs/promises";
import sharp from "sharp";
import { exiftool } from "exiftool-vendored";
import { WALLPAPERS, wallpaperName, WALLPAPER_SIZE } from "../src/photos.js";

const SRC = process.argv[2] || "originals";
const OUT = "public/wallpapers";
const NAME = "Nithin Kashyap Venkatesha";
const NOTICE = `© ${NAME}. All rights reserved.`;
const TERMS = "Personal use only, as a wallpaper or screen saver. No printing, editing, redistribution or commercial use without written permission. Contact: vnithinkashyap@gmail.com";

// Same lookup as prepare-photos: VNK_1.jpg, .JPG and .jpeg all match.
const key = (f) => f.toLowerCase().replace(/\.jpeg$/, ".jpg");
const byKey = new Map((await readdir(SRC)).map((f) => [key(f), `${SRC}/${f}`]));
const missing = WALLPAPERS.filter((p) => !byKey.has(key(p.file))).map((p) => p.file);
if (missing.length) {
  console.error(`Missing in ${SRC}/: ${missing.join(", ")}`);
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
for (const d of ["desktop", "mobile", "thumbs"]) await mkdir(`${OUT}/${d}`, { recursive: true });

try {
  for (const p of WALLPAPERS) {
    const [tw, th] = WALLPAPER_SIZE[p.wallpaper];
    const { data, info } = await sharp(byKey.get(key(p.file))).rotate().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, target = tw / th;
    let cw = W, ch = H, left = 0, top = 0;
    const f = p.focus ?? 0.5;
    if (W / H > target) { cw = Math.round(H * target); left = Math.round(Math.min(Math.max(f * W - cw / 2, 0), W - cw)); }
    else { ch = Math.round(W / target); top = Math.round(Math.min(Math.max(f * H - ch / 2, 0), H - ch)); }
    const cropped = sharp(data).extract({ left, top, width: cw, height: ch });
    const out = `${OUT}/${p.wallpaper}/${wallpaperName(p)}`;
    await cropped.clone().resize(tw, th).jpeg({ quality: 88, mozjpeg: true }).toFile(out);
    await cropped.clone().resize(p.wallpaper === "desktop" ? 640 : 300).jpeg({ quality: 78, mozjpeg: true })
      .toFile(`${OUT}/thumbs/${wallpaperName(p)}`);
    await exiftool.write(out, {
      Artist: NAME, Copyright: NOTICE, Creator: NAME, Rights: NOTICE, "By-line": NAME,
      CopyrightNotice: NOTICE, Credit: NAME, UsageTerms: TERMS, Marked: true,
      Title: p.location, Description: p.caption,
    }, { writeArgs: ["-overwrite_original"] });
    console.log(out);
  }
} finally {
  await exiftool.end();
}
