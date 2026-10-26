import { useEffect, useRef, useState } from "react";
import { useLocale } from "../hooks.js";

const VIDEO_SRC = "/video/welcomeflag.mp4";
const SLIDE_MS = 700;

export default function WelcomeScreen() {
  const { lang } = useLocale();
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);
  const bgRef = useRef(null);
  const finishTimerRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => () => window.clearTimeout(finishTimerRef.current), []);

  // Lock page scroll (and hide the side scrollbar) while the welcome video is showing
  useEffect(() => {
    if (!visible) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    window.scrollTo(0, 0);
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [visible]);

  // If the browser blocks autoplay, don't leave the user stuck on a frozen screen
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p && typeof p.catch === "function") p.catch(finish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    finishTimerRef.current = window.setTimeout(() => setVisible(false), SLIDE_MS);
  }

  function toggleMute() {
    const video = videoRef.current;
    const next = !muted;
    if (video) video.muted = next;
    setMuted(next);
  }

  function syncBackground() {
    const main = videoRef.current;
    const bg = bgRef.current;
    if (!main || !bg) return;
    if (Math.abs(bg.currentTime - main.currentTime) > 0.3) {
      bg.currentTime = main.currentTime;
    }
    if (bg.paused && !main.paused) bg.play().catch(() => {});
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-300 h-dvh min-h-screen w-full select-none overflow-hidden overscroll-none bg-black will-change-transform"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={lang === "ta" ? "TVK போர்ட்ஃபோலியோ வரவேற்பு வீடியோ" : "TVK portfolio welcome video"}
    >
      <video
        ref={bgRef}
        src={VIDEO_SRC}
        className="absolute inset-0 hidden size-full scale-125 object-cover object-center opacity-60 blur-2xl portrait:block"
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        controls={false}
        aria-hidden="true"
      />

      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 block size-full object-cover object-center portrait:object-contain"
        autoPlay
        muted={muted}
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        controls={false}
        onTimeUpdate={syncBackground}
        onEnded={finish}
        onError={finish}
      />

      <button
        type="button"
        className="absolute top-[max(12px,env(safe-area-inset-top))] right-[max(12px,env(safe-area-inset-right))] z-2 min-h-11 cursor-pointer rounded-full border-0 bg-black/60 px-4 py-2 text-[clamp(12px,3.4vw,15px)] text-white backdrop-blur-sm active:scale-95"
        onClick={toggleMute}
        aria-pressed={!muted}
      >
        {muted
          ? lang === "ta" ? "🔇 ஒலி இயக்கு" : "🔇 Unmute"
          : lang === "ta" ? "🔊 ஒலி நிறுத்து" : "🔊 Mute"}
      </button>
    </div>
  );
}