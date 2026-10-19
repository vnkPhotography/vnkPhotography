// Writes your name and copyright into every photo file on the site
// (the gallery copies). Runs automatically as part of `npm run photos`.
//
//   npm run copyright
//
// The metadata is written without re-compressing the image, so quality is untouched.
import { readdir } from "node:fs/promises";
import { exiftool } from "exiftool-vendored";
import { photos } from "../src/photos.js";

const NAME = "Nithin Kashyap Venkatesha";
const EMAIL = "vnithinkashyap@gmail.com";
const SITE = "https://vnkphotography.github.io/vnkPhotography/";
const NOTICE = `© ${NAME}. All rights reserved.`;
const TERMS = `Personal use only (e.g. as a wallpaper). No commercial use, printing for sale, editing or redistribution without written permission. Contact: ${EMAIL}`;

const tagsFor = (p) => ({
  // EXIF (read by cameras, Windows, macOS)
  Artist: NAME,
  Copyright: NOTICE,
  // IPTC / XMP (read by Lightroom, Photoshop, Google Images)
  "By-line": NAME,
  CopyrightNotice: NOTICE,
  Credit: NAME,
  Creator: NAME,
  Rights: NOTICE,
  Marked: true,
  UsageTerms: TERMS,
  WebStatement: SITE,
  ...(p && { Title: p.location, Description: p.caption, "Caption-Abstract": p.caption }),
});

const byFile = Object.fromEntries(photos.map((p) => [p.file, p]));

try {
  // 1. Every photo the website shows
  for (const dir of ["public/photos", "public/photos/sm"]) {
    for (const f of (await readdir(dir)).filter((f) => /\.jpe?g$/i.test(f))) {
      await exiftool.write(`${dir}/${f}`, tagsFor(byFile[f]), { writeArgs: ["-overwrite_original"] });
    }
    console.log(`copyright written: ${dir}`);
  }
  await exiftool.write("public/about.jpg", tagsFor(), { writeArgs: ["-overwrite_original"] });

} finally {
  await exiftool.end();
}
