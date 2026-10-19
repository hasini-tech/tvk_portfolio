import { useEffect, useRef, useState } from "react";
import { useLocale } from "../hooks.js";

const VIDEO_SRC = "/video/welcomevedio.mp4";
const VIDEO_FALLBACK_MS = 60000; // safety close if the video never ends

export default function WelcomeScreen() {
  const { lang } = useLocale();
  const [visible, setVisible] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const close = () => setVisible(false);

  // Start playback + safety fallback
  useEffect(() => {
    if (!visible) return undefined;
    const v = videoRef.current;
    if (v) {
      v.muted = true; // browsers only allow autoplay when muted
      v.play().catch(close);
    }
    const fallback = window.setTimeout(close, VIDEO_FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [visible]);

  // Close on Enter / Escape; lock page scroll
  useEffect(() => {
    if (!visible) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "Escape") close();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [visible]);

  const toggleMute = (e) => {
    e.stopPropagation(); // don't close the splash
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[300] h-dvh w-screen cursor-pointer overflow-hidden bg-black"
      role="dialog"
      aria-modal="true"
      aria-label={lang === "ta" ? "TVK போர்ட்ஃபோலியோ வரவேற்பு வீடியோ" : "TVK portfolio welcome video"}
      onClick={close}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute top-0 left-0 block size-full bg-black object-cover object-center"
        autoPlay
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onEnded={close}
        onError={close}
      />

      <button
        type="button"
        className="absolute top-[max(12px,env(safe-area-inset-top))] right-[max(12px,env(safe-area-inset-right))] z-[2] cursor-pointer rounded-full border-0 bg-black/60 px-3.5 py-2 text-[clamp(12px,3.4vw,15px)] text-white"
        onClick={toggleMute}
      >
        {muted
          ? lang === "ta" ? "🔇 ஒலி இயக்கு" : "🔇 Unmute"
          : lang === "ta" ? "🔊 ஒலி நிறுத்து" : "🔊 Mute"}
      </button>

      <span
        className="pointer-events-none absolute right-0 bottom-[max(12px,env(safe-area-inset-bottom))] left-0 z-[2] text-center text-[clamp(11px,3vw,14px)] text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]"
        aria-hidden="true"
      >
        {lang === "ta" ? "தவிர்க்க தட்டவும் அல்லது Enter அழுத்தவும்" : "Tap or press Enter to skip"}
      </span>
    </div>
  );
}
