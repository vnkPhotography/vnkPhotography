import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { photos, HERO, WALLPAPERS, wallpaperName, WALLPAPER_SIZE } from "./photos.js";
import { CALENDAR } from "./calendar.js";

/* ------------------------------------------------------------------
 * SETTINGS — everything personal lives here.
 * ---------------------------------------------------------------- */
const NAME = "Nithin Kashyap Venkatesha";
const TAGLINE =
  "Exploring places, celebrating cultures, and sharing the stories that make each one unique.";
// Email is stored in two parts so spam robots scanning the site can't easily read it.
const EMAIL_USER = "vnithinkashyap";
const EMAIL_DOMAIN = "gmail.com";
const INSTAGRAM_URL = "https://www.instagram.com/vnithinkashyap"; // "" = link hidden

const BASE = import.meta.env.BASE_URL;
const full = (f) => `${BASE}photos/${f}`;
const small = (f) => `${BASE}photos/sm/${f}`;
const srcSet = (f) => `${small(f)} 1200w, ${full(f)} 2400w`;

const PAGES = ["calendar", "downloads", "about", "contact", "privacy"];
const email = () => `${EMAIL_USER}@${EMAIL_DOMAIN}`;
const calSrc = (f) => `${BASE}calendar/${f}`;
const NAV = [
  ["gallery", "Gallery"],
  ["calendar", "Calendar"],
  ["downloads", "Downloads"],
  ["about", "About"],
  ["contact", "Contact"],
];

/* ------------------------------------------------------------------
 * Routing — tiny hash router (works on GitHub Pages, no server needed)
 * ---------------------------------------------------------------- */
function readHash() {
  return window.location.hash.replace(/^#\/?/, "");
}

function useHash() {
  const [hash, setHash] = useState(readHash);
  useEffect(() => {
    const onChange = () => setHash(readHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

/* ------------------------------------------------------------------
 * An image that fades in gently once it has loaded. No spinners.
 * ---------------------------------------------------------------- */
function FadeImg({ className = "", ...props }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useCallback((node) => {
    if (node && node.complete && node.naturalWidth) setLoaded(true);
  }, []);
  const block = (e) => e.preventDefault();
  return (
    <img
      ref={ref}
      {...props}
      className={`fade ${loaded ? "is-loaded" : ""} ${className}`}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      draggable={false}
      onDragStart={block}
      onContextMenu={block}
    />
  );
}

/* ------------------------------------------------------------------
 * Header
 * ---------------------------------------------------------------- */
function Header({ page, overHero, onGallery }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
  }, [open]);

  const handle = (id) => (e) => {
    setOpen(false);
    if (id === "gallery") onGallery(e);
  };

  return (
    <header className={`header ${overHero && !open ? "on-hero" : ""}`}>
      <a href="#top" className="brand" onClick={() => setOpen(false)}>
        {NAME}
      </a>
      <button
        className="menu-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav className={`nav ${open ? "is-open" : ""}`}>
        {NAV.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={handle(id)}
            className={page === id ? "is-active" : ""}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------
 * Home: full-screen photograph → gallery
 * ---------------------------------------------------------------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <FadeImg
        className="hero-img"
        src={full(HERO)}
        srcSet={srcSet(HERO)}
        sizes="100vw"
        alt=""
        fetchPriority="high"
      />
      <div className="hero-text">
        <h1>{NAME}</h1>
        <p>{TAGLINE}</p>
      </div>
    </section>
  );
}

/** Groups photos into editorial rows: featured landscapes run full width,
 *  everything else is paired side by side at matching heights. */
function buildRows(list) {
  const rows = [];
  let pending = null;
  for (const p of list) {
    if (p.feature) {
      rows.push([p]);
    } else if (pending) {
      rows.push([pending, p]);
      pending = null;
    } else {
      pending = p;
    }
  }
  if (pending) rows.push([pending]);
  return rows;
}

function Gallery({ onOpen, list }) {
  const rows = useMemo(() => buildRows(list), [list]);

  return (
    <section className="gallery" id="gallery">
      {rows.map((row) => {
        const sum = row.reduce((s, p) => s + p.w / p.h, 0);
        const kind = row.length === 2 ? "pair" : row[0].feature ? "wide" : "single";
        return (
          <div
            key={row.map((p) => p.file).join("+")}
            className={`row ${kind}`}
            style={{ "--ar": sum }}
          >
            {row.map((p) => (
              <button
                key={p.file}
                className="cell"
                style={{ "--a": p.w / p.h }}
                onClick={() => onOpen(list.indexOf(p))}
                aria-label={`${p.location}. ${p.caption}`}
              >
                <FadeImg
                  src={small(p.file)}
                  srcSet={srcSet(p.file)}
                  sizes={kind === "pair" ? "(max-width: 760px) 100vw, 50vw" : "100vw"}
                  width={p.w}
                  height={p.h}
                  alt={p.caption}
                  loading="lazy"
                  decoding="async"
                />
                <span className="cell-loc">{p.location}</span>
              </button>
            ))}
          </div>
        );
      })}
    </section>
  );
}

/* ------------------------------------------------------------------
 * Lightbox — only the image, its location and one line.
 * ---------------------------------------------------------------- */
const photoView = {
  src: (p) => full(p.file),
  title: (p) => p.location,
  text: (p) => p.caption,
};

const Chevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    <path d={dir < 0 ? "M15 4 7 12l8 8" : "M9 4l8 8-8 8"} />
  </svg>
);

function Lightbox({ list, index, setIndex, onClose, view = photoView }) {
  const p = list[index];
  const touchX = useRef(null);

  const go = useCallback(
    (d) => setIndex((i) => (i + d + list.length) % list.length),
    [list.length, setIndex]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [go, onClose]);

  // Quietly preload the neighbours so moving between photos feels instant.
  useEffect(() => {
    [1, -1].forEach((d) => {
      const n = list[(index + d + list.length) % list.length];
      new Image().src = view.src(n);
    });
  }, [index, list, view]);

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={view.title(p)}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button
        className="lb-zone prev"
        aria-label="Previous photograph"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
      />
      <button
        className="lb-zone next"
        aria-label="Next photograph"
        onClick={(e) => { e.stopPropagation(); go(1); }}
      />
      <figure onClick={(e) => e.stopPropagation()}>
        <FadeImg key={p.file} src={view.src(p)} alt={view.text(p) || view.title(p)} />
        <figcaption>
          <span className="lb-loc">{view.title(p)}</span>
          {view.text(p) && <span className="lb-cap">{view.text(p)}</span>}
        </figcaption>
        <div className="lb-nav">
          <button onClick={() => go(-1)} aria-label="Previous"><Chevron dir={-1} /></button>
          <span>{index + 1} / {list.length}</span>
          <button onClick={() => go(1)} aria-label="Next"><Chevron dir={1} /></button>
        </div>
      </figure>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        ×
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Pages
 * ---------------------------------------------------------------- */
const calendarView = { src: (p) => calSrc(p.file), title: (p) => p.label, text: () => "" };

function CalendarPage() {
  const [open, setOpen] = useState(null);
  const c = CALENDAR;

  if (!c.ready) {
    return (
      <main className="page narrow cal-soon">
        <h1>Calendar {c.year}</h1>
        <p>The {c.year} calendar arrives in December. Free to download and print.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="page-head">
        <h1>Calendar {c.year}</h1>
        <p>Twelve months, twelve photographs. Tap any page to view it larger.</p>
      </div>
      <div className="cal-actions">
        <a className="btn" href={calSrc(c.pdf)} download={c.pdf}>
          Download calendar <span>PDF · {c.pdfSize}</span>
        </a>
        {c.printPdf && (
          <a className="cal-print" href={calSrc(c.printPdf)} download={c.printPdf}>
            Print quality <span>PDF · {c.printSize}</span>
          </a>
        )}
      </div>
      <div className="cal-grid">
        {c.pages.map((p, i) => (
          <button key={p.file} className="cal-page" onClick={() => setOpen(i)} aria-label={`View ${p.label}`}>
            <FadeImg src={calSrc(p.file)} width={1240} height={1754} alt="" loading="lazy" />
            <span>{p.label}</span>
          </button>
        ))}
      </div>
      {open !== null && (
        <Lightbox list={c.pages} index={open} setIndex={setOpen} onClose={() => setOpen(null)} view={calendarView} />
      )}
    </main>
  );
}

function DownloadsPage() {
  const [kind, setKind] = useState("desktop");
  const list = WALLPAPERS.filter((p) => p.wallpaper === kind);
  const [w, h] = WALLPAPER_SIZE[kind];
  const wp = (folder, p) => `${BASE}wallpapers/${folder}/${wallpaperName(p)}`;
  return (
    <main className="page">
      <div className="page-head">
        <h1>Downloads</h1>
        <p>
          Wallpapers for your screen, sized and cropped for each device. Free for personal use, not
          for printing, editing or commercial use.
        </p>
      </div>
      <div className="wp-tabs" role="tablist" aria-label="Wallpaper type">
        {["desktop", "mobile"].map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={kind === k}
            className={kind === k ? "is-active" : ""}
            onClick={() => setKind(k)}
          >
            {k}
          </button>
        ))}
        <span className="wp-size">{w} × {h}</span>
      </div>
      <div className={`wp-grid ${kind}`}>
        {list.map((p) => (
          <figure key={p.file} className="wp-item">
            <a href={wp(kind, p)} download={wallpaperName(p)} aria-label={`Download ${p.location}`}>
              <FadeImg src={wp("thumbs", p)} width={w} height={h} alt={p.caption} loading="lazy" />
            </a>
            <figcaption>
              <span>{p.location}</span>
              <a href={wp(kind, p)} download={wallpaperName(p)}>Download</a>
            </figcaption>
          </figure>
        ))}
      </div>
      {kind === "desktop" && (
        <p className="wp-note">
          Tip: put the desktop wallpapers in one folder and choose it as your screen saver
          for a quiet slideshow.
        </p>
      )}
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page split about">
      <div className="page-img-wrap">
        <FadeImg className="page-img" src={`${BASE}about.jpg`} width={1125} height={1500} alt={NAME} />
      </div>
      <div className="page-text prose">
        <h1>About</h1>
        <p>
          Based in Germany, I explore the world through photography with a deep appreciation for
          people, culture, places, and the moments that make each one unique.
        </p>
        <p>
          My work brings together travel, street, landscape, portrait, and documentary photography.
          I'm drawn to authentic experiences, whether it's a local festival, a quiet street, a
          beautiful landscape, or a simple moment that many people would walk past. I believe every
          place has its own character, and every person has a story worth remembering.
        </p>
        <p>
          For me, photography is more than capturing what something looks like. It's about
          preserving the feeling of being there. A photograph has the ability to bring back
          emotions, memories, and moments that words often cannot describe.
        </p>
        <p>
          Every journey teaches me to see the world a little differently. Exploring new places,
          learning about different cultures, and meeting people along the way continue to shape the
          way I photograph and the way I experience life.
        </p>
        <p>I believe every place has something worth discovering. Photography is simply my way of sharing it.</p>
      </div>
    </main>
  );
}

function ContactPage() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the address is still visible to select */
    }
  };
  return (
    <main className="page narrow contact">
      <h1>Contact</h1>
      <p>Say hello, ask about a photograph, or just share a thought. I'd love to hear from you.</p>
      <div className="contact-mail">
        <a href={`mailto:${email()}`}>{email()}</a>
        <button type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</button>
      </div>
      {INSTAGRAM_URL && (
        <p className="contact-ig">
          Or find me on <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>.
        </p>
      )}
    </main>
  );
}

function PrivacyPage() {
  return (
    <main className="page narrow prose privacy">
      <h1>Privacy <span>Datenschutz</span></h1>
      <p>
        This is a personal, non-commercial photography website by {NAME}, Germany.
        Contact: <a href={`mailto:${email()}`}>{email()}</a>.
      </p>
      <h2>What this website does not do</h2>
      <p>
        No forms, no newsletter, no cookies, no analytics or tracking and no advertising.
        Fonts and images are stored on this website itself; nothing is loaded from Google or
        other third parties.
      </p>
      <h2>Hosting</h2>
      <p>
        The website is hosted by GitHub Pages (GitHub, Inc., USA). To deliver the pages and keep
        them secure, GitHub's servers process technical data such as your IP address. See the{" "}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">GitHub Privacy Statement</a>.
        Legal basis: legitimate interest in operating the website securely (Art. 6(1)(f) GDPR).
      </p>
      <h2>If you write to me</h2>
      <p>
        Your email address and message are used only to reply to you and are not shared.
        You can ask me to delete them at any time.
      </p>
      <h2>Links</h2>
      <p>
        The Instagram link takes you to Instagram, where Instagram's own privacy policy applies.
        Nothing is sent to Instagram unless you click it.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask what data about you I hold, and have it corrected or deleted. You also have the
        right to complain to a data protection supervisory authority.
      </p>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {NAME}. All rights reserved.</span>
      {INSTAGRAM_URL && (
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
      )}
      <a href="#contact">Email</a>
      <a href="#privacy">Privacy</a>
    </footer>
  );
}

/* ------------------------------------------------------------------
 * App
 * ---------------------------------------------------------------- */
export default function App() {
  const hash = useHash();
  const page = PAGES.includes(hash) ? hash : hash === "gallery" ? "gallery" : "home";
  const isHome = page === "home" || page === "gallery";

  const [open, setOpen] = useState(null);
  const [heroInView, setHeroInView] = useState(true);
  const overHero = isHome && heroInView;

  const list = photos;

  const scrollToGallery = () =>
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });

  // Scroll to the right place whenever the address changes.
  useEffect(() => {
    if (hash === "gallery") requestAnimationFrame(scrollToGallery);
    else window.scrollTo(0, 0);
  }, [hash]);

  // Header sits transparently over the hero, then settles once you scroll past it.
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setHeroInView(window.scrollY < window.innerHeight - 80);
    requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const onGallery = (e) => {
    if (hash === "gallery") {
      e.preventDefault();
      scrollToGallery();
    }
  };

  return (
    <>
      <Header page={page} overHero={overHero} onGallery={onGallery} />
      {isHome ? (
        <>
          <Hero />
          <Gallery list={list} onOpen={setOpen} />
        </>
      ) : page === "calendar" ? (
        <CalendarPage />
      ) : page === "downloads" ? (
        <DownloadsPage />
      ) : page === "about" ? (
        <AboutPage />
      ) : page === "privacy" ? (
        <PrivacyPage />
      ) : (
        <ContactPage />
      )}
      <Footer />
      {open !== null && (
        <Lightbox list={list} index={open} setIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
}
