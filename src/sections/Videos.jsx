import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../hooks.js";

/* Put each .mp4 in /public/video/ and add one object here. */
const VIDEOS = [
  { src: "/video/Flag_flying_and_human_moving_20261012212428.mp4", title: "TVK Public Service" },
  { src: "/video/video-2.mp4", title: "Field Work Highlights" },
  { src: "/video/video-3.mp4", title: "Welfare Activities" },
  { src: "/video/video-4.mp4", title: "Public Meeting" },
  { src: "/video/video-5.mp4", title: "Our Journey" },
];

const GAP = 20;
const AUTO_MS = 4000;

function usePerView() {
  const calc = () => {
    const w = typeof window === "undefined" ? 1200 : window.innerWidth;
    return w >= 980 ? 4 : w >= 600 ? 2 : 1;
  };
  const [n, setN] = useState(calc);
  useEffect(() => {
    const onResize = () => setN(calc());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return n;
}

export default function Videos() {
  const { text } = useLocale();
  const perView = usePerView();
  const trackRef = useRef(null);
  const pausedRef = useRef(false);
  const rafRef = useRef(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateEdges = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 4);
    setCanNext(t.scrollLeft + t.clientWidth < t.scrollWidth - 4);
  }, []);

  const handleScroll = () => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateEdges);
  };

  const scrollByCard = useCallback((dir) => {
    const t = trackRef.current;
    if (!t || !t.children[0]) return;
    const card = t.children[0];
    t.scrollBy({ left: dir * (card.offsetWidth + GAP), behavior: "smooth" });
  }, []);

  // Auto-slide carousel (loops back to the start at the end)
  useEffect(() => {
    updateEdges();
    const id = setInterval(() => {
      const t = trackRef.current;
      if (!t || pausedRef.current) return;
      const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
      if (atEnd) t.scrollTo({ left: 0, behavior: "smooth" });
      else scrollByCard(1);
    }, AUTO_MS);
    window.addEventListener("resize", updateEdges);
    return () => {
      clearInterval(id);
      window.removeEventListener("resize", updateEdges);
      cancelAnimationFrame(rafRef.current);
    };
  }, [updateEdges, scrollByCard, perView]);

  const pause = () => (pausedRef.current = true);
  const resume = () => (pausedRef.current = false);

  const cardBasis =
    perView === 1
      ? "72%"
      : `calc((100% - ${GAP * (perView - 1)}px) / ${perView})`;

  const arrow = (side, disabled) => ({
    position: "absolute",
    top: "50%",
    [side]: 8,
    transform: "translateY(-50%)",
    zIndex: 5,
    width: 44,
    height: 44,
    borderRadius: "50%",
    border: "2px solid #A00000",
    background: "#fff",
    color: "#A00000",
    fontSize: 26,
    lineHeight: 1,
    paddingBottom: 4,
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0 : 1,
    pointerEvents: disabled ? "none" : "auto",
    boxShadow: "0 4px 14px rgba(0,0,0,0.18)",
    transition: "opacity .2s ease",
  });

  return (
    <section
      id="videos"
      style={{
        background: "#fff",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "110px 0 70px",
      }}
    >
      {/* only used to hide the scrollbar (cannot be done inline) */}
      <style>{`.vc-hide::-webkit-scrollbar{display:none}`}</style>

      <div style={{ width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={text("காணொளிகள்", "Videos")}
          style={{ position: "relative" }}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onTouchStart={pause}
          onTouchEnd={resume}
        >
          <div
            ref={trackRef}
            className="vc-hide"
            onScroll={handleScroll}
            style={{
              display: "flex",
              gap: GAP,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
              /* extra room so card shadows are not clipped */
              padding: "16px 6px 36px",
            }}
          >
            {VIDEOS.map((video) => (
              <article
                key={video.src}
                style={{
                  flex: `0 0 ${cardBasis}`,
                  aspectRatio: "9 / 16",
                  maxHeight: "78vh",
                  scrollSnapAlign: "start",
                  position: "relative",
                  overflow: "hidden",
                  borderRadius: 18,
                  background: "#f2f2f2",
                  boxShadow: "0 10px 28px rgba(0,0,0,0.18)",
                }}
              >
                <video
                  aria-label={video.title}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", /* video fills the whole card */
                    display: "block",
                  }}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label={text("முந்தையது", "Previous")}
            style={arrow("left", !canPrev)}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label={text("அடுத்தது", "Next")}
            style={arrow("right", !canNext)}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}