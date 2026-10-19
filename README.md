# Nithin Kashyap Venkatesha · Photography

Minimal, photography-first portfolio. React + Vite, published on GitHub Pages.

## Everyday edits

| What | Where |
|---|---|
| Photos, order, locations, captions, full-width rows; wallpapers (`WALLPAPERS`) | `src/photos.js` |
| Homepage photo | `HERO` in `src/photos.js` |
| Name, sentence, email, Instagram | top of `src/App.jsx` |
| Calendar page (coming soon / ready, PDFs) | `src/calendar.js` + files in `public/calendar/` |

## Photos

Full-size photos and the About portrait (`vnk.jpeg`) go in `originals/` (never committed or published; see `.gitignore`). File endings can be `.jpg`, `.JPG` or `.jpeg`.

```
npm run photos
```

makes, for every photo listed in `src/photos.js`:
- `public/photos/` gallery copies (2400 px) and `public/photos/sm/` (1200 px)
- `public/about.jpg` from `originals/vnk.jpeg`
- the copyright inside every file
- `public/wallpapers/` desktop (2560 × 1440) and mobile (1290 × 2796) wallpapers

To add a photo: put it in `originals/`, add an entry to `photos` (gallery) or `WALLPAPERS` (downloads) in `src/photos.js`, run `npm run photos`.

## Commands

```
npm install
npm run dev      # local preview at http://localhost:5173/vnkPhotography/
npm run deploy   # build + publish to GitHub Pages
```
