import { useState } from "react";
import { useLocale } from "../hooks.js";

const BASE = "/images/tvkgroup";
const FALLBACK_IMAGE = `${BASE}/tvkgroup.jpeg`;
const CARD_W = 252;
const GAP = 14;
const COLUMN_H = 390;    // every column is exactly this tall
const LOOP_SECONDS = 60; // lower = faster
const COPIES = 4;        // must be an even number (animation moves exactly half)

const IMAGES = [
  { src: `${BASE}/tvkgroup1.jpeg`, title: "Gallery photo 1", titleTamil: "புகைப்படம் 1" },
  { src: `${BASE}/tvkgroup2.jpeg`, title: "Gallery photo 2", titleTamil: "புகைப்படம் 2" },
  { src: `${BASE}/tvkgroup3.jpeg`, title: "Gallery photo 3", titleTamil: "புகைப்படம் 3" },
  { src: `${BASE}/tvkgroup4.jpeg`, title: "Gallery photo 4", titleTamil: "புகைப்படம் 4" },
  { src: `${BASE}/tvkgroup5.jpeg`, title: "Gallery photo 5", titleTamil: "புகைப்படம் 5" },
  { src: `${BASE}/tvkgroup6.jpeg`, title: "Gallery photo 6", titleTamil: "புகைப்படம் 6" },
  { src: `${BASE}/tvkgroup7.jpeg`, title: "Gallery photo 7", titleTamil: "புகைப்படம் 7" },
];

// Each number is a tile's share of its column's height.
// One tile = fills the whole column. Two tiles = split by ratio.
const COLUMNS = [[1], [215, 160], [1], [143, 233], [1]];

const BG = "#f5efeb";

const keyframes = `
@keyframes galleryLoop {
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(-50%, 0, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .gallery-loop-track { animation: none !important; }
  .gallery-loop-viewport { overflow-x: auto !important; }
}
`;

const styles = {
  section: {
    position: "relative",
    padding: "70px 0 90px",
    overflow: "hidden",
    background: BG,
  },
  inner: { position: "relative", zIndex: 2 },
  heading: {
    textAlign: "center",
    margin: "0 0 22px",
    color: "#9e1515",
    fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
    fontWeight: 600,
    lineHeight: 1,
  },
  btnWrap: { display: "flex", justifyContent: "center", marginBottom: 36 },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 14,
    padding: "8px 8px 8px 20px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.35)",
    background: "linear-gradient(180deg, #9e1515, #6E0000)",
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: 700,
    textDecoration: "none",
    boxShadow: "0 0 0 6px rgba(160,0,0,0.12), 0 8px 20px rgba(90,6,11,0.3)",
    cursor: "pointer",
  },
  btnArrow: {
    display: "grid",
    placeItems: "center",
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "#fff",
    color: "#9e1515",
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  img: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

function Tile({ item, grow, isTamil }) {
  const [hover, setHover] = useState(false);
  const alt = isTamil ? item.titleTamil || item.title : item.title;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        flex: `${grow} 1 0`,
        minHeight: 0,
        overflow: "hidden",
        borderRadius: 6,
        border: "none",
        outline: "none",
        background: "transparent",
        boxShadow: hover
          ? "0 16px 34px rgba(0,0,0,0.25)"
          : "0 8px 20px rgba(0,0,0,0.14)",
        transform: hover ? "scale(1.04)" : "scale(1)",
        transition: "transform .3s ease, box-shadow .3s ease",
        position: "relative",
        zIndex: hover ? 3 : 1,
      }}
    >
      <img
        src={item.src}
        alt={alt}
        loading="lazy"
        draggable={false}
        style={styles.img}
        onError={(e) => {
          if (!e.currentTarget.src.endsWith(FALLBACK_IMAGE)) {
            e.currentTarget.src = FALLBACK_IMAGE;
          }
        }}
      />
    </div>
  );
}

// One full set of columns. Every set is identical so the loop is seamless.
function ColumnSet({ isTamil, hidden }) {
  let cursor = 0;
  return COLUMNS.map((grows, colIndex) => (
    <div
      key={colIndex}
      aria-hidden={hidden || undefined}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: GAP,
        height: COLUMN_H,
        flex: `0 0 ${CARD_W}px`,
        width: CARD_W,
        marginRight: GAP,
      }}
    >
      {grows.map((g) => {
        const item = IMAGES[cursor % IMAGES.length];
        const key = `${colIndex}-${cursor}`;
        cursor += 1;
        return <Tile key={key} item={item} grow={g} isTamil={isTamil} />;
      })}
    </div>
  ));
}

export default function Gallery() {
  const { isTamil, text } = useLocale();
  const [paused, setPaused] = useState(false);

  return (
    <section id="gallery" style={styles.section}>
      <style>{keyframes}</style>

      <div style={styles.inner}>
        <h2 style={styles.heading}>{text("காட்சியகம்", "Gallery")}</h2>

        <div style={styles.btnWrap}>
          <a href="/gallery" style={styles.btn}>
            {text("அனைத்தையும் பார்", "View All")}
            <span style={styles.btnArrow}>↗</span>
          </a>
        </div>

        <div
          className="gallery-loop-viewport"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          style={{
            overflow: "hidden",
            padding: "24px 0",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)",
          }}
        >
          <div
            className="gallery-loop-track"
            style={{
              display: "flex",
              alignItems: "flex-start",
              width: "max-content",
              animation: `galleryLoop ${LOOP_SECONDS}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
              willChange: "transform",
            }}
          >
            {Array.from({ length: COPIES }).map((_, i) => (
              <ColumnSet key={i} isTamil={isTamil} hidden={i > 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}