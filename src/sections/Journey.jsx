import { useEffect, useRef, useState } from "react";
import { useLocale } from "../hooks.js";
import { Icon } from "../components/ui.jsx";

const JOURNEY_TIMELINE = [
  {
    year: 2014,
    title: "The public-service journey begins",
    text: "A people-first approach takes shape through direct community outreach and a commitment to solving everyday civic needs.",
    image: "/images/tvkself.jpeg",
  },
  {
    year: 2015,
    title: "Listening to every neighbourhood",
    text: "Residents' concerns become the starting point for practical support, local coordination, and dependable follow-through.",
    image: "/images/tvkvoice.jpeg",
  },
  {
    year: 2016,
    title: "More hands for community work",
    text: "The service network grows through volunteers and focused assistance for families across Thanjavur.",
    image: "/images/tvkimages.jpeg",
  },
  {
    year: 2017,
    title: "Civic needs, practical action",
    text: "Work stays grounded in the issues people experience every day, from basic facilities to access to public services.",
    image: "/images/tvkimages2.jpeg",
  },
  {
    year: 2018,
    title: "A stronger field presence",
    text: "Regular neighbourhood visits help turn public feedback into clearer priorities and faster local action.",
    image: "/images/tvkmarketing.jpeg",
  },
  {
    year: 2019,
    title: "Serving with consistency",
    text: "Community service expands with a steady focus on dignity, access, and support for those who need it most.",
    image: "/images/tvksaravan.jpeg",
  },
  {
    year: 2020,
    title: "Standing together through change",
    text: "The priority remains being present for families and helping connect residents with essential support.",
    image: "/images/tvkvoice1.jpeg",
  },
  {
    year: 2021,
    title: "Building trust on the ground",
    text: "Closer conversations with residents shape a more responsive and accountable style of public service.",
    image: "/images/tvkvoices.jpeg",
  },
  {
    year: 2022,
    title: "A new chapter with TVK",
    text: "The journey joins Tamilaga Vettri Kazhagam with a clear belief in secular social justice and people-first politics.",
    image: "/images/tvkai.jpeg",
  },
  {
    year: 2023,
    title: "Turning principles into service",
    text: "Health, welfare, civic support, and equal opportunity remain at the centre of every public-facing effort.",
    image: "/images/tvkselfimg.jpeg",
  },
  {
    year: 2024,
    title: "Growing a constituency-wide team",
    text: "A wider team works to understand local priorities and make public service more visible, accessible, and reliable.",
    image: "/images/tvk_map.jpeg",
  },
  {
    year: 2025,
    title: "People-first public leadership",
    text: "The journey continues with a commitment to clean, safe, developed, and prosperous community life in Thanjavur.",
    image: "/images/tvkvijay.png",
  },
];

const JOURNEY_CSS = `
/* All selectors are prefixed with #journey so they beat any older
   .journey-* rules in your global stylesheet. */

#journey.journey-section {
  --j-red: var(--color-tvk-red, #a31515);
  --j-gold: #f2b705;
  --j-ink: var(--color-tvk-ink, #1c1917);
  --j-muted: var(--color-tvk-ink-muted, #57534e);
  --j-line: #e4dcd8;
  --j-tint: #fff4f3;
  background: #fff;
  color: var(--j-ink);
  padding: 4rem 0;
  scroll-margin-top: 6rem; /* clears the fixed navbar when jumping to #journey */
}
#journey .journey-container {
  width: 100%;
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.25rem;
}

/* ---------- Header ---------- */
#journey .journey-header { max-width: 44rem; margin: 0 auto; text-align: center; }
#journey .journey-badge {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .4rem 1rem; border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--j-red) 18%, transparent);
  background: var(--j-tint); color: var(--j-red);
  font-size: .95rem; font-weight: 700;
}
#journey .journey-heading {
  margin: 1.25rem 0 0; color: var(--j-red);
  font-size: clamp(2rem, 5vw, 3.25rem); line-height: 1.15;
}
#journey .journey-subheading {
  margin: 1rem auto 0; max-width: 36rem;
  color: var(--j-muted); font-size: 1.0625rem; line-height: 1.7;
}

#journey .journey-timeline-shell { margin-top: 2.5rem; }

/* ---------- Year rail (plain, not sticky, nothing to clip the ring) ---------- */
#journey .journey-year-track {
  position: static; top: auto;
  overflow-x: auto; overflow-y: hidden;
  scroll-snap-type: x proximity;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  margin: 0; padding: 1rem .5rem .75rem;
  background: none; border: 0; border-radius: 0; box-shadow: none;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent);
}
#journey .journey-year-track::-webkit-scrollbar { display: none; }

#journey .journey-year-list {
  display: flex; width: 100%; min-width: max-content;
  margin: 0; padding: 0 .75rem; list-style: none;
}
#journey .journey-year-item {
  position: relative; flex: 1 0 4.75rem;
  display: flex; justify-content: center; align-items: flex-start;
  margin: 0; padding: 0; scroll-snap-align: center;
}
#journey .journey-year-item::before {
  content: ""; position: absolute; top: 1.1rem; left: 0; right: 0;
  height: 3px; border-radius: 3px; background: var(--j-line);
}
#journey .journey-year-item:first-child::before { left: 50%; }
#journey .journey-year-item:last-child::before { right: 50%; }
#journey .journey-year-item.is-reached::before { background: var(--j-red); }
#journey .journey-year-item.is-active::before {
  background: linear-gradient(90deg, var(--j-red) 50%, var(--j-line) 50%);
}
#journey .journey-year-item.is-active:first-child::before { background: var(--j-line); }
#journey .journey-year-item.is-active:last-child::before { background: var(--j-red); }

#journey .journey-year-button {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; align-items: center; gap: .6rem;
  width: auto; height: auto; min-width: 0; margin: 0; padding: 0;
  border: 0; background: none; box-shadow: none; transform: none;
  color: var(--j-muted); cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
#journey .journey-year-dot {
  display: grid; place-items: center; position: static;
  width: 2.25rem; height: 2.25rem; margin: 0;
  border: 2px solid var(--j-line); border-radius: 50%;
  background: #fff; color: #a8a29e; box-shadow: none;
  transition: background-color .2s, border-color .2s, color .2s, transform .2s, box-shadow .2s;
}
#journey .journey-year-label {
  font-size: .95rem; font-weight: 600; line-height: 1;
  letter-spacing: 0; text-transform: none; font-variant-numeric: tabular-nums;
  transition: color .2s;
}
#journey .journey-year-item.is-reached .journey-year-dot,
#journey .journey-year-button:hover .journey-year-dot { border-color: var(--j-red); color: var(--j-red); }

#journey .journey-year-button-active .journey-year-dot {
  border-color: var(--j-red); background: var(--j-red); color: #fff;
  transform: scale(1.1);
  box-shadow: 0 0 0 3px #fff, 0 0 0 6px var(--j-gold);
}
#journey .journey-year-button-active .journey-year-label { color: var(--j-red); font-weight: 800; }

#journey .journey-year-button:focus-visible,
#journey .journey-nav-button:focus-visible {
  outline: 3px solid var(--j-gold); outline-offset: 4px; border-radius: 12px;
}

/* ---------- Detail card ---------- */
#journey .journey-milestone-detail {
  display: grid; grid-template-columns: 1fr;
  margin: 1.5rem 0 0; padding: 0; overflow: hidden;
  border: 1px solid var(--j-line); border-radius: 1.5rem;
  background: #fff; box-shadow: 0 18px 40px -24px rgba(60,20,20,.35);
}
#journey .journey-milestone-image-wrap {
  position: relative; width: 100%; aspect-ratio: 4 / 3;
  margin: 0; padding: 0; overflow: hidden; background: var(--j-tint);
}
#journey .journey-milestone-image {
  position: absolute; inset: 0;
  width: 100%; height: 100%; max-width: none; aspect-ratio: auto;
  object-fit: cover; object-position: center 20%;
  border-radius: 0; box-shadow: none;
  animation: journey-fade .45s ease both;
}
/* small pill, bottom-left (was stretching full width) */
#journey .journey-milestone-image-year {
  position: absolute; left: 1rem; bottom: 1rem; right: auto; top: auto;
  width: auto; height: auto; display: inline-block;
  padding: .3rem .9rem; border-radius: 999px;
  background: var(--j-red); color: #fff;
  font-size: 1.125rem; font-weight: 800; line-height: 1.3;
  font-variant-numeric: tabular-nums;
  box-shadow: 0 6px 16px -6px rgba(0,0,0,.5);
}

#journey .journey-milestone-content {
  display: flex; flex-direction: column; align-items: flex-start;
  margin: 0; padding: 1.5rem 1.25rem 1.25rem;
  animation: journey-fade .45s ease both;
}
#journey .journey-milestone-kicker {
  color: var(--j-red); font-size: 1rem; font-weight: 700;
  text-transform: none; letter-spacing: 0;
}
#journey .journey-milestone-content h3 {
  margin: .5rem 0 0; color: var(--j-red);
  font-size: clamp(1.625rem, 4.5vw, 2.25rem); font-weight: 700;
  line-height: 1.15; text-wrap: balance;
}
#journey .journey-milestone-content p {
  margin: .9rem 0 0; max-width: 34rem;
  color: var(--j-muted); font-size: 1.125rem; line-height: 1.7;
}
#journey .journey-milestone-bar {
  width: 3.5rem; height: 4px; margin: 1.25rem 0 0; border-radius: 4px;
  background: linear-gradient(90deg, var(--j-red), var(--j-gold));
}

/* ---------- Prev / next ---------- */
#journey .journey-controls {
  display: flex; align-items: center; gap: .85rem;
  width: 100%; margin-top: auto; padding-top: 1.5rem;
}
#journey .journey-nav-button {
  display: grid; place-items: center; flex: none;
  width: 2.75rem; height: 2.75rem; padding: 0;
  border: 1.5px solid var(--j-line); border-radius: 50%;
  background: #fff; color: var(--j-red); cursor: pointer;
  transition: background-color .2s, color .2s, border-color .2s;
}
#journey .journey-nav-button:hover:not(:disabled) {
  border-color: var(--j-red); background: var(--j-red); color: #fff;
}
#journey .journey-nav-button:disabled { color: #d6d3d1; cursor: not-allowed; }
#journey .journey-counter {
  min-width: 3.5rem; text-align: center;
  color: var(--j-muted); font-size: 1rem; font-weight: 600;
  font-variant-numeric: tabular-nums;
}

@keyframes journey-fade {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: none; }
}

/* ---------- Tablet ---------- */
@media (min-width: 640px) {
  #journey .journey-container { padding: 0 2rem; }
  #journey .journey-milestone-content { padding: 2rem 2rem 1.75rem; }
}

/* ---------- Desktop ---------- */
@media (min-width: 1024px) {
  #journey.journey-section { padding: 7rem 0; }
  #journey .journey-timeline-shell { margin-top: 3rem; }
  #journey .journey-year-track {
    overflow: visible;
    -webkit-mask-image: none; mask-image: none;
    padding: 1rem 0 .75rem;
  }
  #journey .journey-year-list { min-width: 0; padding: 0; }
  #journey .journey-year-item { flex: 1 1 0; }

  /* fixed height so the card doesn't jump between years */
  #journey .journey-milestone-detail {
    grid-template-columns: 1fr 1fr;
    height: 30rem; margin-top: 1.5rem;
  }
  #journey .journey-milestone-image-wrap { aspect-ratio: auto; height: 100%; }
  #journey .journey-milestone-content {
    justify-content: center; height: 100%; padding: 2.5rem 3rem;
  }
  #journey .journey-controls { margin-top: 2rem; padding-top: 0; }
}

@media (max-width: 380px) {
  #journey .journey-year-item { flex-basis: 4.25rem; }
  #journey .journey-milestone-content p { font-size: 1rem; }
}

@media (prefers-reduced-motion: reduce) {
  #journey .journey-milestone-image,
  #journey .journey-milestone-content { animation: none; }
  #journey .journey-year-dot,
  #journey .journey-year-label,
  #journey .journey-nav-button { transition: none; }
}
`;

const LAST_INDEX = JOURNEY_TIMELINE.length - 1;

function Chevron({ direction }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: direction === "left" ? "none" : "rotate(180deg)" }}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export default function Journey() {
  const { text } = useLocale();
  const [activeIndex, setActiveIndex] = useState(LAST_INDEX);
  const trackRef = useRef(null);
  const buttonRefs = useRef([]);

  const active = JOURNEY_TIMELINE[activeIndex];

  // Keep the selected year centred inside the horizontal rail
  // (scrolls only the rail, never the whole page).
  useEffect(() => {
    const track = trackRef.current;
    const btn = buttonRefs.current[activeIndex];
    if (!track || !btn) return;
    const target = btn.offsetLeft - track.clientWidth / 2 + btn.offsetWidth / 2;
    track.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeIndex]);

  const goPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const goNext = () => setActiveIndex((i) => Math.min(LAST_INDEX, i + 1));

  const onRailKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
      buttonRefs.current[Math.min(LAST_INDEX, activeIndex + 1)]?.focus();
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
      buttonRefs.current[Math.max(0, activeIndex - 1)]?.focus();
    }
  };

  return (
    <section id="journey" className="journey-section">
      <style>{JOURNEY_CSS}</style>
      <div className="journey-container">
        <header className="journey-header">
          <div className="journey-badge">
            <Icon name="flag" size={15} className="journey-flag-icon" />
            {text("பயணம்", "Journey")}
          </div>
          <h2 className="journey-heading">
            {text("தஞ்சாவூருடன் எங்கள் பயணம்", "Our Journey with Thanjavur")}
          </h2>
          <p className="journey-subheading">
            {text(
              "சேவை, வளர்ச்சி மற்றும் மக்கள் நம்பிக்கையின் முக்கிய ஆண்டுகள்.",
              "Key years of service, progress, and public trust."
            )}
          </p>
        </header>

        <div className="journey-timeline-shell">
          {/* Year rail */}
          <div className="journey-year-track" ref={trackRef}>
            <ol className="journey-year-list" onKeyDown={onRailKeyDown}>
              {JOURNEY_TIMELINE.map((milestone, index) => {
                const isActive = index === activeIndex;
                const isReached = index < activeIndex;
                return (
                  <li
                    key={milestone.year}
                    className={`journey-year-item ${isReached ? "is-reached" : ""} ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <button
                      ref={(el) => (buttonRefs.current[index] = el)}
                      className={`journey-year-button ${isActive ? "journey-year-button-active" : ""}`}
                      type="button"
                      aria-label={`View ${milestone.year} journey milestone`}
                      aria-pressed={isActive}
                      aria-controls="journey-milestone-detail"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                    >
                      <span className="journey-year-dot" aria-hidden="true">
                        <Icon name="flag" size={15} />
                      </span>
                      <span className="journey-year-label">{milestone.year}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Milestone detail */}
          <article
            id="journey-milestone-detail"
            className="journey-milestone-detail"
            aria-live="polite"
          >
            <div className="journey-milestone-image-wrap">
              <img
                key={active.image}
                className="journey-milestone-image"
                src={active.image}
                alt={`${active.year}: ${active.title}`}
                loading="lazy"
                decoding="async"
              />
              <span className="journey-milestone-image-year">{active.year}</span>
            </div>

            <div className="journey-milestone-content" key={active.year}>
              <span className="journey-milestone-kicker">
                {text("பயணத்தின் முக்கிய ஆண்டு", "Journey milestone")}
              </span>
              <h3>{active.title}</h3>
              <p>{active.text}</p>
              <div className="journey-milestone-bar" aria-hidden="true" />

              <div className="journey-controls">
                <button
                  type="button"
                  className="journey-nav-button"
                  onClick={goPrev}
                  disabled={activeIndex === 0}
                  aria-label={text("முந்தைய ஆண்டு", "Previous year")}
                >
                  <Chevron direction="left" />
                </button>
                <span className="journey-counter" aria-hidden="true">
                  {activeIndex + 1} / {JOURNEY_TIMELINE.length}
                </span>
                <button
                  type="button"
                  className="journey-nav-button"
                  onClick={goNext}
                  disabled={activeIndex === LAST_INDEX}
                  aria-label={text("அடுத்த ஆண்டு", "Next year")}
                >
                  <Chevron direction="right" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}