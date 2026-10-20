/**
 * THE PHOTO LIST — the only file you need to edit to manage the gallery.
 *
 *   file       → filename in public/photos/ (and public/photos/sm/)
 *   w, h       → pixel size of the web copy (keeps the layout steady while loading)
 *   location   → shown under the photo when opened. Always "Town, State" in
 *                Germany, or "Town, Country" abroad. Landmark names go in the caption.
 *   caption    → one short line, shown under the location
 *   feature    → true = full-width row in the gallery (landscape photos only)
 *
 * The ORDER of this list is the order of the gallery.
 * This is a curated edit of 24 photos; the other image files stay in the
 * repo — add them back here any time.
 */

export const photos = [
  { file: "VNK_23.jpg", w: 2400, h: 1600, feature: true,
    location: "Obersee, Bavaria",
    caption: "The boathouse at the end of the lake." },

  { file: "VNK_1.jpg", w: 1600, h: 2400,
    location: "Annaberg-Buchholz, Saxony",
    caption: "A lantern at the Große Bergparade, carried as it has been for centuries." },

  { file: "VNK_13.jpg", w: 1600, h: 2400,
    location: "Rothenburg ob der Tauber, Bavaria",
    caption: "The Gerlachschmiede, seen from the old town wall." },

  { file: "VNK_26.jpg", w: 2400, h: 1600, feature: true,
    location: "Budapest, Hungary",
    caption: "The Parliament at blue hour, mirrored in the Danube." },

  { file: "VNK_28.jpg", w: 1600, h: 2400,
    location: "Chemnitz, Saxony",
    caption: "Holding on to autumn." },

  { file: "VNK_22.jpg", w: 2400, h: 1600,
    location: "Königssee, Bavaria",
    caption: "Emerald water between the mountains." },

  { file: "VNK_33.jpg", w: 2400, h: 1600, feature: true,
    location: "Schrecksee, Bavaria",
    caption: "A mountain lake worth every step of the climb." },

  { file: "VNK_12.jpg", w: 1600, h: 2400,
    location: "Rabenstein, Saxony",
    caption: "A scribe at the medieval market, keeping the old letters alive." },

  { file: "VNK_30.jpg", w: 1600, h: 2400,
    location: "Wolkenstein, Saxony",
    caption: "Two walkers, one path." },

  { file: "VNK_20.jpg", w: 2400, h: 1600, feature: true,
    location: "Strasbourg, France",
    caption: "Petite France: half-timbered houses along the River Ill." },

  { file: "VNK_27.jpg", w: 1600, h: 2400,
    location: "Dresden, Saxony",
    caption: "The Frauenkirche, through spring blossom." },

  { file: "VNK_29.jpg", w: 1600, h: 2400,
    location: "Dresden, Saxony",
    caption: "The Stollenfest parade, in full baroque costume." },

  { file: "VNK_17.jpg", w: 2400, h: 1600, feature: true,
    location: "Schwangau, Bavaria",
    caption: "Neuschwanstein, a fairytale castle set into the mountainside." },

  { file: "VNK_4.jpg", w: 1600, h: 2400,
    location: "Hallstatt, Austria",
    caption: "A village, doubled in still water." },

  { file: "VNK_16.jpg", w: 2400, h: 1600,
    location: "Hallstatt, Austria",
    caption: "Low clouds drifting through the valley." },

  { file: "VNK_9.jpg", w: 1600, h: 2400,
    location: "Dresden, Saxony",
    caption: "The Saxon colours, thrown high above the crowd." },

  { file: "VNK_32.jpg", w: 2400, h: 1600,
    location: "Bautzen, Saxony",
    caption: "Easter riders in top hats, a Sorbian tradition." },

  { file: "VNK_19.jpg", w: 2400, h: 1616, feature: true,
    location: "Schwangau, Bavaria",
    caption: "St. Coloman, a lone church in the spring meadows." },

  { file: "VNK_3.jpg", w: 1724, h: 2400,
    location: "Kriebstein, Saxony",
    caption: "Burg Kriebstein, a castle growing out of the rock." },

  { file: "VNK_10.jpg", w: 1600, h: 2400,
    location: "Wolkenstein, Saxony",
    caption: "Autumn, lit from behind." },

  { file: "VNK_34.jpg", w: 2400, h: 1600, feature: true,
    location: "Budapest, Hungary",
    caption: "Fisherman's Bastion, an archway opening onto the morning." },

  { file: "VNK_14.jpg", w: 1600, h: 2400,
    location: "Budapest, Hungary",
    caption: "Morning settling over the Danube." },

  { file: "VNK_11.jpg", w: 1600, h: 2400,
    location: "Garmisch-Partenkirchen, Bavaria",
    caption: "The Partnachklamm, meltwater cutting through the gorge." },

  { file: "VNK_24.jpg", w: 2400, h: 1600, feature: true,
    location: "Grimma, Saxony",
    caption: "The suspension bridge over the Mulde in autumn." },
];

/**
 * THE DOWNLOADS PAGE: wallpapers, in page order.
 * Mostly photos that are NOT in the gallery, so the two pages don't repeat each other.
 * Their full-size originals go in originals/ like the gallery photos.
 *
 *   wallpaper → "desktop" (2560 × 1440) or "mobile" (1290 × 2796)
 *   focus     → optional, 0–1: where to centre the crop (0.5 = middle).
 *               Desktop: 0 = keep the top, 1 = keep the bottom.
 *               Mobile:  0 = keep the left, 1 = keep the right.
 *   caption   → used only as the image description for screen readers
 */
export const WALLPAPERS = [
  // desktop
  { file: "VNK_23.jpg", wallpaper: "desktop", location: "Obersee, Bavaria", caption: "The boathouse at the end of the lake." },
  { file: "VNK_18.jpg", wallpaper: "desktop", focus: 0, location: "Schwangau, Bavaria", caption: "Neuschwanstein, small beneath the mountains." },
  { file: "VNK_25.jpg", wallpaper: "desktop", location: "Budapest, Hungary", caption: "The Chain Bridge at night." },
  { file: "VNK_22.jpg", wallpaper: "desktop", location: "Königssee, Bavaria", caption: "Emerald water between the mountains." },
  { file: "VNK_15.jpg", wallpaper: "desktop", location: "Hallstatt, Austria", caption: "A boat crossing the lake under low clouds." },
  { file: "VNK_36.jpg", wallpaper: "desktop", location: "Budapest, Hungary", caption: "Fisherman's Bastion at sunset." },
  { file: "VNK_31.jpg", wallpaper: "desktop", location: "Wolkenstein, Saxony", caption: "Late light in the forest." },
  { file: "VNK_38.jpg", wallpaper: "desktop", location: "Budapest, Hungary", caption: "The Parliament and the Danube by day." },
  { file: "VNK_33.jpg", wallpaper: "desktop", location: "Schrecksee, Bavaria", caption: "A mountain lake worth every step of the climb." },
  // mobile
  { file: "VNK_13.jpg", wallpaper: "mobile", location: "Rothenburg ob der Tauber, Bavaria", caption: "The Gerlachschmiede, seen from the old town wall." },
  { file: "VNK_4.jpg", wallpaper: "mobile", focus: 0.58, location: "Hallstatt, Austria", caption: "A village, doubled in still water." },
  { file: "VNK_41.jpg", wallpaper: "mobile", location: "Chemnitz, Saxony", caption: "Spring blossom on a bare branch." },
  { file: "VNK_3.jpg", wallpaper: "mobile", location: "Kriebstein, Saxony", caption: "Burg Kriebstein, a castle growing out of the rock." },
  { file: "VNK_11.jpg", wallpaper: "mobile", location: "Garmisch-Partenkirchen, Bavaria", caption: "The Partnachklamm, meltwater cutting through the gorge." },
  { file: "VNK_10.jpg", wallpaper: "mobile", location: "Wolkenstein, Saxony", caption: "Autumn, lit from behind." },
];

/** The photo used full-screen on the homepage. */
export const HERO = "VNK_34.jpg";

const slug = (s) =>
  s.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/ß/g, "ss").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const WALLPAPER_SIZE = { desktop: [2560, 1440], mobile: [1290, 2796] };

/** Wallpaper file name, e.g. vnk-obersee-berchtesgaden-23-desktop.jpg */
export const wallpaperName = (p) =>
  `vnk-${slug(p.location)}-${p.file.match(/\d+/)[0]}-${p.wallpaper}.jpg`;