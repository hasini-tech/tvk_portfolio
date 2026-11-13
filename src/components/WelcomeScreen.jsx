import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../hooks.js";

const VIDEO_SRC = "/video/tvkkk.mp4";
const AUDIO_SRC = "/audio/audio.mp3";
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

  const videoRef = useRef(null);
  const bgRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const fadeRef = useRef(null);
  const finishedRef = useRef(false);
  const audioOkRef = useRef(false); // true once the music is actually playing

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    window.clearInterval(fadeRef.current);
    if (!audio) return;
    // Quick fade-out so the music doesn't cut off abruptly
    const steps = 10;
    const stepMs = SLIDE_MS / steps;
    const startVol = audio.volume;
    let i = 0;
    fadeRef.current = window.setInterval(() => {
      i += 1;
      audio.volume = Math.max(0, startVol * (1 - i / steps));
      if (i >= steps) {
        window.clearInterval(fadeRef.current);
        audio.pause();
      }
    }, stepMs);
  }, []);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    stopAudio();
    timerRef.current = window.setTimeout(() => setVisible(false), SLIDE_MS);
  }, [stopAudio]);

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
      window.clearInterval(fadeRef.current);
      audioRef.current?.pause();
    },
    []
  );

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
    const audio = audioRef.current;
    if (bg) bg.play()?.catch(() => {});
    // Muted video autoplay is always allowed
    if (main) main.play()?.catch(() => {});

    // Music is handled on its own so a blocked audio never affects the video
    if (audio && !audioOkRef.current) {
      audio.muted = false;
      audio.volume = 1;
      Promise.resolve(audio.play())
        .then(() => {
          audioOkRef.current = true;
        })
        .catch(() => {
          audioOkRef.current = false;
        });
    }
  }, []);

  useEffect(() => {
    tryPlay();
  }, [isPortrait, tryPlay]);

  // Browsers only allow sound after a user gesture. Retry on the first real one.
  // (iOS Safari only counts click / touchend / keydown, not touchstart or pointerdown.)
  useEffect(() => {
    if (!visible) return;
    const onGesture = () => {
      if (!audioOkRef.current) tryPlay();
    };
    const events = ["click", "touchend", "pointerup", "keydown"];
    events.forEach((ev) => window.addEventListener(ev, onGesture, { passive: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, onGesture));
  }, [visible, tryPlay]);

  // Pause when the tab/app goes to background, resume when it returns (saves battery on phones)
  useEffect(() => {
    if (!visible) return;
    const onVisibility = () => {
      const main = videoRef.current;
      const bg = bgRef.current;
      const audio = audioRef.current;
      if (document.hidden) {
        main?.pause();
        bg?.pause();
        audio?.pause();
      } else if (!finishedRef.current) {
        tryPlay();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [visible, tryPlay]);

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

  if (!visible) return null;

  const pillBtn =
    "min-h-11 min-w-11 cursor-pointer rounded-full border-0 bg-black/60 px-4 py-2 " +
    "text-[clamp(12px,3.4vw,15px)] font-medium text-white backdrop-blur-sm " +
    "active:scale-95 focus-visible:outline-2 focus-visible:outline-white";

  return (
    <div
      className="fixed inset-0 z-300 select-none overflow-hidden overscroll-none bg-black will-change-transform"
      style={{
        // svh/dvh avoid the mobile browser address-bar jump
        height: "100dvh",
        minHeight: "-webkit-fill-available",
        width: "100vw",
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        touchAction: "none",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={ta ? "TVK போர்ட்ஃபோலியோ வரவேற்பு வீடியோ" : "TVK portfolio welcome video"}
    >
      {/* Background music: plays until the welcome screen closes */}
      <audio ref={audioRef} src={AUDIO_SRC} loop preload="auto" onCanPlay={tryPlay} />

      {/* Phone (portrait): blurred, enlarged copy fills the screen behind the video */}
      {isPortrait && (
        <video
          ref={bgRef}
          src={VIDEO_SRC}
          className="absolute inset-0 h-full w-full scale-125 object-cover opacity-70 blur-xl"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Main video: full frame on phones (contain), full screen on desktop/landscape (cover) */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className={`absolute inset-0 block h-full w-full ${
          isPortrait ? "object-contain" : "object-cover"
        }`}
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        controls={false}
        onTimeUpdate={isPortrait ? syncBg : undefined}
        onEnded={finish}
        onError={finish}
      />

      {/* Skip button: kept clear of notches and rounded corners */}
      <div
        className="absolute z-2 flex items-center gap-2"
        style={{
          top: "max(12px, env(safe-area-inset-top))",
          right: "max(12px, env(safe-area-inset-right))",
        }}
      >
        <button type="button" className={pillBtn} onClick={finish}>
          {ta ? "தவிர் ›" : "Skip ›"}
        </button>
      </div>
    </div>
  );
}