# Website update brief: vnkPhotography (version 7, FINAL)

**This replaces every earlier version (v1–v6). Please delete those and use only this one.**

Hand this file to Claude, or follow it yourself. It updates the portfolio at
https://vnkphotography.github.io/vnkPhotography/ to the design Nithin has
approved. **All the code is finished and tested.** The job is to copy it in,
add the photos, run one command, check, and publish. Please don't redesign
anything: the approved look is exactly what this code produces.

> **Already applied an earlier version?** Do steps 2–6 again: copy this package
> over, delete the listed old files, put all 32 photos and `vnk.jpeg` in
> `originals/`, run `npm run photos`, check, publish.
>
> Changes since v6: a small location line under every gallery photo; "‹ 3 / 25 ›"
> in the large view; the About portrait moved out of `public/` (it was published
> full-size); leftover template files removed; photo names ending in `.JPG` or
> `.jpeg` now work; text pages slightly wider on computers; "Vnk" site icon, also for phone home screens; Calendar page now says the calendar arrives in December.

---

## What the site does

- **Homepage:** one full-screen photograph (VNK_34) with Nithin's name and one sentence: *"Exploring places, celebrating cultures, and sharing the stories that make each one unique."* Nothing else.
- **Menu:** Gallery · Calendar · Downloads · About · Contact. On phones it collapses into "Menu".
- **Gallery:** one curated sequence of 25 photos, **no category filters**. Full-width landscapes alternate with pairs side by side; nothing is cropped. Photos fade in gently. A small grey location line sits under every photo, so visitors see where it was taken and know there is more to tap.
- **Opening a photo:** only the image, its location, a one-line caption and a small "‹ 3 / 25 ›" underneath. The arrows, arrow keys, swiping or clicking either side moves on; Esc or × closes.
- **Calendar:** shows "coming soon" until December (see "The calendar").
- **Downloads:** wallpapers only: 9 desktop (2560 × 1440) and 6 mobile (1290 × 2796), shown in even rows of three. They are mostly photos that are **not** in the gallery, so the two pages don't repeat each other. No portraits of people, no full-resolution originals.
- **About:** short text and a photo.
- **Contact:** no form. Nithin's email (with a Copy button) and his Instagram (@vnithinkashyap).
- **Privacy:** a short page, linked in the footer.
- **Footer:** © year · name · All rights reserved · Instagram · Email · Privacy.
- **No personal data is collected (GDPR):** no forms, no cookies, no tracking, no email sign-ups. Fonts are hosted on the site itself (nothing loads from Google). Formspree is no longer used.
- **Copyright:** Nithin's name and copyright are written into every published photo and wallpaper file automatically.

## The calendar (final format, the same every year)

- **14 sheets**, printed **single-sided** (never back-to-back): cover · January … December · back.
- Each sheet is **A3 portrait** (297 × 420 mm), made of two halves:
  - **top half:** the month's landscape photo, uncropped
  - **bottom half:** that month's dates
- **Cover sheet:** cover photo on top; year, name and tagline below.
- **Back sheet:** small overview of all 12 photos on top; thank-you note, QR code to the website, Instagram and copyright below.
- It can also be printed on A4 (scale to fit).
- Nithin makes the calendar himself with his own calendar maker. **You don't need to build anything for it.** The website only displays the finished sheets (see "In December").
- On the website, the 14 sheets show as small portrait thumbnails (7 per row on a computer, 2 per row on a phone). Tapping one opens it large; arrows/swipe go to the next sheet. Above them: a **Download calendar** button and a smaller **Print quality** link.

---

## What's in this package

Copy everything over the existing `photo-portfolio/` folder, replacing files:

```
BRIEF-FOR-CLAUDE.md              this file
index.html                       title, share preview, icons, local font preload
package.json, package-lock.json  "npm run photos" command + exiftool-vendored
README.md
src/App.jsx                      the site
src/index.css                    the styles (incl. local fonts)
src/photos.js                    the 25 gallery photos + the wallpaper list (WALLPAPERS)
src/calendar.js                  the Calendar page: coming soon / ready, 14 sheets
src/main.jsx
scripts/prepare-photos.mjs       makes gallery copies from the originals
scripts/add-copyright.mjs        writes the copyright into each file
scripts/make-wallpapers.mjs      makes desktop/mobile wallpapers
public/favicon.svg, public/apple-touch-icon.png   site icons
public/fonts/                    Fraunces + Work Sans (woff2) and their licences
vite.config.js                   tidied (old tunnel setting removed)
eslint.config.js, .gitignore
```

No photos are included. They come from Nithin's Google Drive (step 3).

---

## Steps

### 1. Start from the current repository
Pull the latest `main` of `github.com/vnkPhotography/vnkPhotography`.

### 2. Copy the package in, then delete the files it replaces
Copy everything above into `photo-portfolio/`. Then delete, if they still exist:
```
photo-portfolio/src/App.css
photo-portfolio/src/assets/                 (hero.png, react.svg, vite.svg are unused)
photo-portfolio/scripts/resize-photos.mjs   (replaced by prepare-photos.mjs)
photo-portfolio/scripts/make-sizes.mjs      (replaced by prepare-photos.mjs)
photo-portfolio/public/index.html           (left over from an old template)
photo-portfolio/public/manifest.json        (left over from an old template)
photo-portfolio/public/logo192.png          (left over from an old template)
photo-portfolio/public/logo512.png          (left over from an old template)
photo-portfolio/public/favicon.ico          (replaced by favicon.svg + apple-touch-icon.png)
```

**Move** (don't delete) `photo-portfolio/public/vnk.jpeg`, Nithin's About-page
portrait, into `photo-portfolio/originals/` (create the folder if needed). In
`public/` the full-size 2.7 MB file was published for anyone to download; from
`originals/` it is only used to make the small About photo.

### 3. Add the full-size photos from Google Drive
Download Nithin's shared photos into **`photo-portfolio/originals/`**, all in
that one folder (no sub-folders). These 32 are needed:

```
Gallery (25):
VNK_1  VNK_3  VNK_4  VNK_7  VNK_9  VNK_10 VNK_11 VNK_12 VNK_13
VNK_14 VNK_16 VNK_17 VNK_19 VNK_20 VNK_22 VNK_23 VNK_24 VNK_26
VNK_27 VNK_28 VNK_29 VNK_30 VNK_32 VNK_33 VNK_34

Wallpapers only (7):
VNK_15 VNK_18 VNK_25 VNK_31 VNK_36 VNK_38 VNK_41

Plus vnk.jpeg (the About portrait, moved there in step 2)
```

The ending can be `.jpg`, `.JPG` or `.jpeg`; all work. Extra files are fine;
they're ignored. `originals/` is in `.gitignore`: **never commit or publish the
originals.** If a name has extra text (e.g. "VNK_1 - Copy.JPG"), rename it to
the plain name (`VNK_1.JPG` is fine).

### 4. Install and prepare the photos
```
cd photo-portfolio
npm install
npm run photos
```
Expect an `ok` line per gallery photo, `ok  about.jpg`, then the 15 wallpaper files, and no errors.

- **"Missing in originals/: …"**: get those files (or fix their names) and run again.
- **"Update w and h in src/photos.js …"**: a re-exported photo has a different size than before. Put the printed numbers into that photo's `w:` and `h:` in `src/photos.js`, then run `npm run photos` again.

### 5. Check it
```
npm run lint        # should print nothing
npm run dev         # open the address it shows
```
- [ ] Homepage: full-screen archway photo, name, one sentence; the menu floats over it in white
- [ ] Scrolling starts the gallery: no filter buttons, 25 photos, a small location line under each
- [ ] Clicking a photo shows location + caption + "‹ 1 / 25 ›"; the arrows, arrow keys and Esc work
- [ ] Calendar: "The 2027 calendar arrives in December. Free to download and print."
- [ ] Downloads: Desktop tab 9 wallpapers (3 rows of 3), Mobile tab 6 (2 rows of 3); Download saves e.g. `vnk-obersee-bavaria-23-desktop.jpg`
- [ ] About: the portrait shows next to the text
- [ ] Contact: email address with a Copy button, and an Instagram link; no form
- [ ] Footer: © year · name · All rights reserved · Instagram · Email · Privacy; the Privacy page opens
- [ ] In the browser's developer tools (Network tab), nothing loads from fonts.googleapis.com or formspree.io
- [ ] On a phone-width window the menu collapses into "Menu"

### 6. Commit and publish
```
git add -A
git status          # make sure nothing from originals/ is listed
git commit -m "New design: curated gallery, wallpapers, calendar page, no forms"
# (old wallpaper files, public/vnk.jpeg and the old template files showing
#  as deleted is expected)
git push
npm run deploy      # builds and publishes to GitHub Pages
```

### 7. Remove the old full-resolution download (ask Nithin first)
The GitHub Release named **"originals"** holds the full-resolution files and
anyone can download them. The new site doesn't use it. Once the new site is
live **and Nithin confirms**, delete that release and its `originals` tag
(GitHub → Releases → originals → Delete).

### 8. Formspree (optional tidy-up)
The site no longer uses the Formspree form. It can be deleted in the Formspree
account so it stops accepting submissions.

---

## In December: switching on the calendar (5 minutes)

Nithin will send a folder called **`website`** (made by his calendar maker)
with exactly these 16 files:
```
cover.jpg
01.jpg  02.jpg  …  12.jpg
back.jpg
VNK_Calendar_2027.pdf          (light version, for phones and screens)
VNK_Calendar_2027_print.pdf    (print quality)
```
1. Create the folder `photo-portfolio/public/calendar/` and put all 16 files in it.
2. In `src/calendar.js`: set `ready: true`, and set `pdfSize` / `printSize` to the two sizes Nithin gives you (e.g. "5 MB" and "21 MB").
3. `npm run dev` and check the Calendar page:
   - [ ] 14 portrait thumbnails: Cover, January … December, The photographs
   - [ ] tapping one opens it large; arrows/swipe go through all 14
   - [ ] "Download calendar" and "Print quality" both download the right PDF
4. Commit, push, `npm run deploy`.

**Next year:** the same 4 steps with the new files; also change `const YEAR = 2027;` at the top of `src/calendar.js` to the new year.

---

## Good to know

- **Editing later:** gallery photos (order, locations, captions) and the wallpaper list (`WALLPAPERS`) live in `src/photos.js`; name, sentence, email and Instagram are at the top of `src/App.jsx`; the calendar settings in `src/calendar.js`.
- **Adding a photo:** put it in `originals/`, add an entry to `photos` (gallery) or `WALLPAPERS` (downloads) in `src/photos.js`, run `npm run photos`.
- **Domain:** none needed; the site stays on the free GitHub Pages address.
