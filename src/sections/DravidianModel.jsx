import { useCallback, useEffect, useRef, useState } from "react";
import { IDEOLOGY_PILLARS } from "../data.js";
import { CarouselDots, Icon } from "../components/ui.jsx";
import { useLocale } from "../hooks.js";

// Carousel CSS is inlined here, so no separate leader-carousel.css file is needed
const LEADER_CAROUSEL_CSS = `
/* ---------- Coverflow leaders carousel ---------- */
.lc {
  --lc-w: 300px;
  --lc-h: 380px;
  --lc-step: 215px;
  width: 100%;
}

.lc-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
  padding: 0 4px;
}
.lc-head-title { font-weight: 700; }
.lc-head-count { font-size: 0.85rem; opacity: 0.7; }

.lc-stage {
  position: relative;
  height: calc(var(--lc-h) + 40px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lc-card {
  --abs: 0;
  --offset: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--lc-w);
  height: var(--lc-h);
  margin: 0;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  background: #111;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  transform:
    translate(-50%, -50%)
    translateX(calc(var(--offset) * var(--lc-step)))
    scale(calc(1 - var(--abs) * 0.2));
  z-index: calc(10 - var(--abs));
  filter: brightness(calc(1 - var(--abs) * 0.12));
  opacity: 1;
  transition: transform 0.55s cubic-bezier(0.22, 0.8, 0.25, 1),
              filter 0.55s ease, opacity 0.55s ease, box-shadow 0.55s ease;
  will-change: transform;
}
.lc-card-active {
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  cursor: default;
}
.lc-card[style*="--abs: 3"],
.lc-card[style*="--abs:3"] { opacity: 0; pointer-events: none; }

.lc-card:focus-visible { outline: 3px solid #ffd54a; outline-offset: 3px; }

.lc-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
}

.lc-fallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #7a0c13, #c8102e);
  color: #ffd54a;
  font-weight: 800;
  font-size: 2rem;
  letter-spacing: 0.1em;
}

.lc-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  max-width: calc(100% - 24px);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: #fff;
  background: rgba(60, 60, 60, 0.7);
  backdrop-filter: blur(6px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.lc-cap {
  position: absolute;
  inset: auto 0 0 0;
  padding: 18px 18px 20px;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.35));
  backdrop-filter: blur(4px);
}
.lc-name {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}

.lc-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #fff;
  color: #111;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: transform 0.2s ease;
}
.lc-arrow:hover { transform: translateY(-50%) scale(1.1); }
.lc-arrow:focus-visible { outline: 3px solid #ffd54a; outline-offset: 2px; }
.lc-arrow-prev { left: 8px; }
.lc-arrow-next { right: 8px; }

.lc-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
}
.lc-dot {
  width: 9px;
  height: 9px;
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgba(128, 128, 128, 0.45);
  cursor: pointer;
  transition: width 0.3s ease, background 0.3s ease;
}
.lc-dot-active { width: 26px; background: #c8102e; }

@media (max-width: 900px) {
  .lc { --lc-w: 240px; --lc-h: 320px; --lc-step: 165px; }
}
@media (max-width: 520px) {
  .lc { --lc-w: 210px; --lc-h: 290px; --lc-step: 120px; }
  .lc-arrow { width: 32px; height: 32px; }
}

@media (prefers-reduced-motion: reduce) {
  .lc-card, .lc-dot, .lc-arrow { transition: none; }
}
`;

const modelImages = [
  {
    src: "/images/periyarimg.png",
    name: "தந்தை பெரியார்",
    title: "Thanthai Periyar",
    label: "Self-Respect & Social Justice",
    labelTamil: "சுயமரியாதை மற்றும் சமூக நீதி",
  },
  {
    src: "/images/annadurai.png",
    name: "பேரறிஞர் அண்ணா",
    title: "Perarignar Anna",
    label: "Duty, Dignity, Discipline",
    labelTamil: "கடமை, கண்ணியம், கட்டுப்பாடு",
  },
  {
    src: "/images/tvkvijay.png",
    name: "வெற்றித் தலைவர் விஜய்",
    title: "TVK Leader Vijay",
    label: "People-First Politics",
    labelTamil: "மக்கள் முன்னுரிமை அரசியல்",
  },
  {
    src: "/images/tvkselfimg.jpeg",
    name: "சமூக நீதி களம்",
    title: "Social Justice in Action",
    label: "Universal Welfare",
    labelTamil: "அனைவருக்குமான நலன்",
  },
];

// Positive modulo (works for negative numbers)
const mod = (n, m) => ((n % m) + m) % m;

// Cards rendered on each side of the active one. Offsets ±3 are invisible
// (CSS fades them out) so cards slide in and out instead of jumping across.
const SIDE = 3;
const OFFSETS = Array.from({ length: SIDE * 2 + 1 }, (_, i) => i - SIDE);

function LeaderCard({ item, offset, isTamil, onSelect }) {
  const [failed, setFailed] = useState(false);
  const isActive = offset === 0;
  const name = isTamil ? item.name : item.title;

  return (
    <figure
      className={`lc-card ${isActive ? "lc-card-active" : ""}`}
      style={{ "--offset": offset, "--abs": Math.abs(offset) }}
      onClick={onSelect}
      role="button"
      tabIndex={isActive ? 0 : -1}
      aria-label={isTamil ? `${item.name} பார்க்க` : `View ${item.title}`}
      aria-current={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      {!failed ? (
        <img src={item.src} alt={name} className="lc-photo" onError={() => setFailed(true)} draggable="false" />
      ) : (
        <div className="lc-fallback" role="img" aria-label={`${item.title} placeholder`}>
          <span>TVK</span>
        </div>
      )}

      <span className="lc-badge">{isTamil ? item.labelTamil : item.label}</span>

      <figcaption className="lc-cap">
        <p className="lc-name">{name}</p>
      </figcaption>
    </figure>
  );
}

export default function DravidianModel() {
  const { isTamil, text } = useLocale();
  // `pos` is an ever-growing counter (never wraps), so the last card slides
  // smoothly into the first one instead of flying across the stage.
  const [pos, setPos] = useState(0);
  const [paused, setPaused] = useState(false);
  const [activePillar, setActivePillar] = useState(0);
  const pillarsRef = useRef(null);
  const total = modelImages.length;
  const activeLeader = mod(pos, total);

  const goLeader = useCallback((dir) => setPos((p) => p + dir), []);

  // Jump to image `i` by the shortest way round
  const selectLeader = (i) =>
    setPos((p) => {
      let diff = mod(i - p, total);
      if (diff > total / 2) diff -= total;
      return p + diff;
    });

  // Autoplay: off for reduced-motion users, paused while hovering/focusing the carousel
  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion || paused) return undefined;
    const timer = window.setInterval(() => goLeader(1), 4000);
    return () => window.clearInterval(timer);
  }, [paused, goLeader]);

  const currentPillar = IDEOLOGY_PILLARS[activePillar] || IDEOLOGY_PILLARS[0];

  return (
    <section id="model" className="model-sec">
      <style>{LEADER_CAROUSEL_CSS}</style>

      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot" />
            <span>{text("கொள்கை வழிகாட்டிகள் & அடிப்படை கோட்பாடுகள்", "Ideological Guides & Core Principles")}</span>
          </div>
          <h2 className="section-title-large">
            {text("அதன் மையத்தில் மதச்சார்பற்ற சமூக நீதி", "Secular Social Justice at its Core")}
          </h2>
          <p className="section-sub-text">
            {isTamil
              ? <>திருக்குறளின் காலத்தால் அழியாத <strong className="text-gold">“பிறப்பொக்கும் எல்லா உயிர்க்கும்”</strong> என்ற கொள்கையில் வேரூன்றி, வெளிப்படையான மக்கள் சேவை மற்றும் சமத்துவத்தின் மூலம் தமிழகத்தை முன்னேற்றுதல்.</>
              : <>Rooted in Thirukkural's timeless maxim <strong className="text-gold">“பிறப்பொக்கும் எல்லா உயிர்க்கும்”</strong>, advancing Tamil Nadu through transparent public service and equality.</>}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        {/* 4 Core Pillars Tabs */}
        <div className="pillars-grid" ref={pillarsRef}>
          {IDEOLOGY_PILLARS.map((pillar, idx) => {
            const isSel = idx === activePillar;
            return (
              <button
                key={pillar.id}
                className={`pillar-tab-card ${isSel ? "pillar-tab-active" : ""}`}
                onClick={() => setActivePillar(idx)}
                type="button"
              >
                <div className="pillar-tab-header">
                  <div className="pillar-icon-box">
                    <Icon name={pillar.icon} size={24} />
                  </div>
                  <span className="pillar-num">0{idx + 1}</span>
                </div>
                <h3 className="pillar-tab-title">{isTamil ? pillar.title : pillar.titleEn}</h3>
                <p className="pillar-tab-tagline">{isTamil ? pillar.tagline : pillar.desc}</p>
              </button>
            );
          })}
        </div>
        <CarouselDots
          trackRef={pillarsRef}
          count={IDEOLOGY_PILLARS.length}
          label={text("கொள்கை முன்னுரிமைகள்", "Core principle slides")}
        />

        {/* Active pillar details */}
        <div className="pillar-detail-card">
          <div className="pillar-detail-inner">
            <div className="pillar-badge-strip">
              <span className="pillar-current-index">{isTamil ? `கொள்கை ${activePillar + 1}` : `PILLAR 0${activePillar + 1}`}</span>
              <span className="pillar-current-name">{isTamil ? currentPillar.title : currentPillar.titleEn}</span>
            </div>

            <h3 className="pillar-display-title">
              {isTamil ? currentPillar.title : currentPillar.titleEn}
            </h3>

            <blockquote className="pillar-quote">“{currentPillar.quote}”</blockquote>

            <p className="model-text">{isTamil ? currentPillar.quote : currentPillar.desc}</p>

            <div className="pillar-cta-row">
              <a className="model-link" href="#about">
                <span>{text("அறிமுகம்", "About Ward Councillor")}</span>
                <span aria-hidden="true">→</span>
              </a>
              <a className="btn btn-outline" href="#plan">
                <span>{text("100-நாள் திட்டம்", "100-Day Promises")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Leaders coverflow carousel */}
        <div
          className="lc"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="lc-head">
            <span className="lc-head-title">{text("கொள்கை வழிகாட்டிகள்", "Ideological Guides")}</span>
            <span className="lc-head-count">{activeLeader + 1} / {total}</span>
          </div>

          <div className="lc-stage" aria-live="polite" aria-label="Movement leadership photographs">
            {OFFSETS.map((offset) => {
              const v = pos + offset; // virtual index; key stays with the card as it moves
              return (
                <LeaderCard
                  key={v}
                  item={modelImages[mod(v, total)]}
                  isTamil={isTamil}
                  offset={offset}
                  onSelect={() => setPos(v)}
                />
              );
            })}

            <button type="button" className="lc-arrow lc-arrow-prev" onClick={() => goLeader(-1)} aria-label={text("முந்தையது", "Previous")}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" className="lc-arrow lc-arrow-next" onClick={() => goLeader(1)} aria-label={text("அடுத்தது", "Next")}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          <div className="lc-dots">
            {modelImages.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`lc-dot ${i === activeLeader ? "lc-dot-active" : ""}`}
                onClick={() => selectLeader(i)}
                aria-label={`View ${img.title}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}