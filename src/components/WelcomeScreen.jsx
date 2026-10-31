import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../hooks.js";

const VIDEO_SRC = "/video/tvkvideo.mp4";
const SLIDE_MS = 700;
const PORTRAIT_QUERY = "(max-aspect-ratio: 1/1)";

function useIsPortrait() {
  const [isPortrait, setIsPortrait] = useState(
    () => typeof window !== "undefined" && window.matchMedia(PORTRAIT_QUERY).matches
  );
  useEffect(() => {
    const mql = window.matchMedia(PORTRAIT_QUERY);
    const onChange = (e) => setIsPortrait(e.matches);
    setIsPortrait(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isPortrait;
}

export default function WelcomeScreen() {
  const { lang } = useLocale();
  const ta = lang === "ta";
  const isPortrait = useIsPortrait();

  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const [needsTap, setNeedsTap] = useState(false);

  const videoRef = useRef(null);
  const bgRef = useRef(null);
  const timerRef = useRef(null);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    timerRef.current = window.setTimeout(() => setVisible(false), SLIDE_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // Lock page scroll while visible
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const body = document.body;
    const prev = [html.style.overflow, body.style.overflow];
    window.scrollTo(0, 0);
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev[0];
      body.style.overflow = prev[1];
    };
  }, [visible]);

  const tryPlay = useCallback(() => {
    const main = videoRef.current;
    const bg = bgRef.current;
    if (bg) bg.play()?.catch(() => {});
    if (!main) return;
    main
      .play()
      ?.then(() => setNeedsTap(false))
      .catch(() => setNeedsTap(true));
  }, []);

  useEffect(() => {
    tryPlay();
  }, [isPortrait, tryPlay]);

  // Keep the blurred copy in sync with the main video
  const syncBg = () => {
    const main = videoRef.current;
    const bg = bgRef.current;
    if (main && bg && Math.abs(bg.currentTime - main.currentTime) > 0.3) {
      bg.currentTime = main.currentTime;
    }
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && finish();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [finish]);

  function toggleMute() {
    const next = !muted;
    if (videoRef.current) videoRef.current.muted = next;
    setMuted(next);
  }

  if (!visible) return null;

  const pillBtn =
    "min-h-11 min-w-11 cursor-pointer rounded-full border-0 bg-black/60 px-4 py-2 " +
    "text-[clamp(12px,3.4vw,15px)] text-white backdrop-blur-sm active:scale-95";

  return (
    <div
      className="fixed inset-0 z-300 select-none overflow-hidden overscroll-none bg-black will-change-transform"
      style={{
        height: "100dvh",
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        touchAction: "none",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={ta ? "TVK போர்ட்ஃபோலியோ வரவேற்பு வீடியோ" : "TVK portfolio welcome video"}
    >
      {/* Phone: blurred, enlarged copy fills the whole screen behind the video */}
      {isPortrait && (
        <video
          ref={bgRef}
          src={VIDEO_SRC}
          className="absolute inset-0 h-full w-full scale-150 object-cover opacity-70 blur-2xl"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Main video: full frame on phones (contain), full screen on desktop (cover) */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className={`absolute inset-0 block h-full w-full ${
          isPortrait ? "object-contain" : "object-cover"
        }`}
        autoPlay
        muted={muted}
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        controls={false}
        onTimeUpdate={isPortrait ? syncBg : undefined}
        onEnded={finish}
        onError={finish}
      />

      <div
        className="absolute z-2 flex items-center gap-2"
        style={{
          top: "max(12px, env(safe-area-inset-top))",
          right: "max(12px, env(safe-area-inset-right))",
        }}
      >
        <button type="button" className={pillBtn} onClick={toggleMute} aria-pressed={!muted}>
          {muted ? (ta ? "🔇 ஒலி இயக்கு" : "🔇 Unmute") : ta ? "🔊 ஒலி நிறுத்து" : "🔊 Mute"}
        </button>
        <button type="button" className={pillBtn} onClick={finish}>
          {ta ? "தவிர் ›" : "Skip ›"}
        </button>
      </div>

      {needsTap && (
        <button
          type="button"
          onClick={tryPlay}
          className="absolute inset-0 z-1 flex cursor-pointer items-center justify-center border-0 bg-black/40 text-white"
          aria-label={ta ? "வீடியோவை இயக்கு" : "Play video"}
        >
          <span className="rounded-full bg-black/70 px-6 py-3 text-lg backdrop-blur-sm">
            ▶ {ta ? "இயக்கு" : "Play"}
          </span>
        </button>
      )}
    </div>
  );
}