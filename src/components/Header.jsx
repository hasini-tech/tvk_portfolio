import { useState, useEffect } from "react";
import { NAV_ITEMS, PROFILE } from "../data.js";
import { useScroll, useLocale } from "../hooks.js";

/* Header menu: Videos removed, Journey added after About, Contact shown. */
const JOURNEY_ITEM = { id: "journey", en: "Journey", ta: "பயணம்" };

const MENU_ITEMS = NAV_ITEMS
  .filter((item) => item.id !== "videos")
  .map((item) =>
    item.id === "petitions"
      ? { ...item, en: "Contact", ta: "தொடர்பு" } // opens the Contact page
      : item
  )
  .flatMap((item) => (item.id === "about" ? [item, JOURNEY_ITEM] : [item]));

export default function Header({ currentPage = "home", onNavigate }) {
  const [open, setOpen] = useState(false);
  const { solid, progress } = useScroll(60);
  const { lang, setLang, isTamil, text } = useLocale();

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goToPage = (event, hash) => {
    event.preventDefault();
    setOpen(false);

    // App owns page rendering. Always use its callback so every header item
    // switches the rendered page, even when the current URL hash is unchanged.
    if (onNavigate) {
      onNavigate(hash);
      return;
    }

    const targetHash = `#${hash}`;
    if (window.location.hash === targetHash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.location.hash = targetHash;
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 0);
  };

  return (
    <header className={`nav-bar-container ${solid ? "nav-bar-scrolled" : ""}`}>
      {/* Scroll reading progress line */}
      <div
        className="nav-scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      <div className="nav-bar-inner">
        <nav className="nav-pill-box" aria-label="Main Navigation">
          {/* 1. Brand / Logo */}
          <a href="#top" className="nav-brand-group" onClick={(event) => goToPage(event, "top")}>
            <img
              src="/images/tvklogo.png"
              alt="TVK Emblem"
              className="nav-brand-emblem"
            />
            <span className="nav-brand-wordmark">
              {isTamil ? `த.வெ.க ${PROFILE.constituency}` : `TVK ${PROFILE.constituency}`}
            </span>
          </a>

          <div className="nav-vert-divider" aria-hidden="true" />

          {/* 2. Desktop Navigation Links */}
          <div className="nav-links-row">
            {MENU_ITEMS.map((item) => {
              const isCurrent = currentPage === item.id;
              const label = isTamil ? item.ta : item.en;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-tab-link ${isCurrent ? "nav-tab-active" : ""}`}
                  aria-current={isCurrent ? "true" : undefined}
                  onClick={(event) => goToPage(event, item.id)}
                >
                  {label}
                </a>
              );
            })}
          </div>

          <div className="nav-vert-divider" aria-hidden="true" />

          {/* 3. Language Toggle */}
          <div className="nav-toggle-group">
            <div className="lang-toggle-pill" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`lang-option ${isTamil ? "lang-option-active" : ""}`}
                onClick={() => setLang("ta")}
                aria-pressed={isTamil}
              >
                தமிழ்
              </button>
              <span className="lang-option-sep">/</span>
              <button
                type="button"
                className={`lang-option ${!isTamil ? "lang-option-active" : ""}`}
                onClick={() => setLang("en")}
                aria-pressed={!isTamil}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className={`nav-mobile-burger ${open ? "burger-open" : ""}`}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            type="button"
          >
            <span className="b-bar" />
            <span className="b-bar" />
            <span className="b-bar" />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`nav-mobile-sheet ${open ? "sheet-visible" : ""}`} aria-hidden={!open}>
        <div className="sheet-backdrop" onClick={() => setOpen(false)} />
        <div className="sheet-panel">
          <div className="sheet-top-row">
            <div className="sheet-brand">
              <img src="/images/tvklogo.png" alt="TVK" className="sheet-logo" />
              <div>
                <b>{isTamil ? PROFILE.partyTamil : PROFILE.party}</b>
                <small>{isTamil ? PROFILE.nameTamil : PROFILE.name} • {isTamil ? PROFILE.wardTamil : PROFILE.ward}</small>
              </div>
            </div>
            <button className="sheet-close-btn" onClick={() => setOpen(false)} aria-label="Close menu">
              ✕
            </button>
          </div>

          {/* Mobile Language Switcher */}
          <div className="sheet-lang-switch">
            <span className="sheet-lang-label">
              {text("மொழியைத் தேர்வு செய்க:", "Choose language:")}
            </span>
            <div className="lang-toggle-pill" role="group" aria-label="Language selection">
              <button type="button" className={`lang-option ${isTamil ? "lang-option-active" : ""}`} onClick={() => setLang("ta")} aria-pressed={isTamil}>தமிழ்</button>
              <span className="lang-option-sep">/</span>
              <button type="button" className={`lang-option ${!isTamil ? "lang-option-active" : ""}`} onClick={() => setLang("en")} aria-pressed={!isTamil}>EN</button>
            </div>
          </div>

          <div className="sheet-links-list">
            {MENU_ITEMS.map((item) => {
              const isCurrent = currentPage === item.id;
              const label = isTamil ? item.ta : item.en;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`sheet-link-item ${isCurrent ? "sheet-link-active" : ""}`}
                  onClick={(event) => goToPage(event, item.id)}
                >
                  <span>{label}</span>
                  <span className="sheet-arrow">→</span>
                </a>
              );
            })}
          </div>

          <div className="sheet-footer">
            <a
              href="#contact"
              className="btn btn-yellow w-full"
              onClick={(event) => goToPage(event, "contact")}
            >
              {text("குறைதீர்ப்பு பதிவு", "Submit Public Grievance")}
            </a>
            <p className="sheet-helpline">📞 {PROFILE.phone}</p>
          </div>
        </div>
      </div>
    </header>
  );
}