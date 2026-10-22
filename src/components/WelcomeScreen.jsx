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
  const finishTimerRef = useRef(null);
  const finishedRef = useRef(false);
  const hint = lang === "ta" ? "தவிர்க்க எங்கு வேண்டுமானாலும் தட்டவும்" : "Tap anywhere to skip";

  useEffect(() => () => window.clearTimeout(finishTimerRef.current), []);

  function finish() {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    finishTimerRef.current = window.setTimeout(() => setVisible(false), SLIDE_MS);
  }

  function toggleMute() {
    setMuted((currentMuted) => !currentMuted);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-300 h-dvh min-h-screen w-full cursor-pointer touch-none select-none overflow-hidden bg-black will-change-transform"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={lang === "ta" ? "TVK போர்ட்ஃபோலியோ வரவேற்பு வீடியோ" : "TVK portfolio welcome video"}
      onClick={finish}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 block size-full bg-black object-cover object-center max-md:portrait:object-contain"
        autoPlay
        muted={muted}
        playsInline
        webkit-playsinline="true"
        preload="metadata"
        fetchPriority="high"
        disablePictureInPicture
        controls={false}
        onEnded={finish}
        onError={finish}
      />

      <button
        type="button"
        className="absolute top-[max(12px,env(safe-area-inset-top))] right-[max(12px,env(safe-area-inset-right))] z-2 min-h-11 cursor-pointer rounded-full border-0 bg-black/60 px-4 py-2 text-[clamp(12px,3.4vw,15px)] text-white backdrop-blur-sm active:scale-95"
        onClick={(event) => {
          event.stopPropagation();
          toggleMute();
        }}
        aria-pressed={!muted}
      >
        {muted
          ? lang === "ta" ? "🔇 ஒலி இயக்கு" : "🔇 Unmute"
          : lang === "ta" ? "🔊 ஒலி நிறுத்து" : "🔊 Mute"}
      </button>

      <span
        className="pointer-events-none absolute right-0 bottom-[max(16px,env(safe-area-inset-bottom))] left-0 z-2 px-4 text-center text-[clamp(11px,3vw,14px)] text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]"
        aria-hidden="true"
      >
        {hint}
      </span>
    </div>
  );
}
