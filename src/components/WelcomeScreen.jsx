import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../hooks.js";

const VIDEO_SRC = "/video/welcomeflag.mp4";
const VIDEO_FALLBACK_MS = 60000;      // safety close if the video never ends
const SLIDE_MS = 1600;                // slow-motion slide-up duration
const SWIPE_THRESHOLD = 30;           // px of upward swipe to trigger
const SCROLL_SKIPS_VIDEO = false;     // false = manual scroll/swipe works only after the video finishes
const AUTO_SCROLL_AFTER_VIDEO = true; // page scrolls down by itself once the video ends
const AUTO_SCROLL_TARGET = null;      // e.g. "#about"; null = one screen down
const AUTO_SCROLL_MS = 1400;          // how long the auto scroll takes

const MOUSE_MOVE_CLOSES = true;       // moving the cursor slides the splash up
const MOUSE_MOVE_THRESHOLD = 12;      // px of cursor movement before it triggers
const MOUSE_MOVE_SKIPS_VIDEO = true;  // false = only works after the video finishes

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(pointer: coarse)").matches;

// Find the element that actually scrolls (window or an inner wrapper)
const findScroller = () => {
  const root = document.scrollingElement || document.documentElement;
  if (root.scrollHeight > root.clientHeight + 1) return root;

  const app = document.getElementById("root") || document.getElementById("__next");
  const candidates = [document.body, app, ...(app ? Array.from(app.children) : [])];
  for (const el of candidates) {
    if (!el) continue;
    const oy = getComputedStyle(el).overflowY;
    if ((oy === "auto" || oy === "scroll") && el.scrollHeight > el.clientHeight + 1) {
      return el;
    }
  }
  return root;
};

const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

const smoothScrollTo = (scroller, to, duration) => {
  const html = document.documentElement;
  const prevSnap = html.style.scrollSnapType;
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollSnapType = "none";   // snap can fight the animation
  html.style.scrollBehavior = "auto";   // we animate manually

  const start = scroller.scrollTop;
  const distance = to - start;
  const t0 = performance.now();

  const step = (now) => {
    const p = Math.min(1, (now - t0) / duration);
    scroller.scrollTop = start + distance * easeInOut(p);
    if (p < 1) {
      requestAnimationFrame(step);
    } else {
      html.style.scrollSnapType = prevSnap;
      html.style.scrollBehavior = prevBehavior;
    }
  };
  requestAnimationFrame(step);
};

const runAutoScroll = () => {
  const scroller = findScroller();
  const isRoot = scroller === (document.scrollingElement || document.documentElement);
  const maxScroll = scroller.scrollHeight - scroller.clientHeight;

  if (maxScroll <= 0) {
    console.warn("[WelcomeScreen] Nothing to scroll: page is not taller than the screen.");
    return;
  }

  let to = scroller.clientHeight; // default: one screen down
  if (AUTO_SCROLL_TARGET) {
    const target = document.querySelector(AUTO_SCROLL_TARGET);
    if (target) {
      const top = target.getBoundingClientRect().top;
      const base = isRoot ? 0 : scroller.getBoundingClientRect().top;
      to = scroller.scrollTop + top - base;
    } else {
      console.warn(`[WelcomeScreen] AUTO_SCROLL_TARGET "${AUTO_SCROLL_TARGET}" not found.`);
    }
  }

  smoothScrollTo(scroller, Math.min(to, maxScroll), AUTO_SCROLL_MS);
};

export default function WelcomeScreen() {
  const { lang } = useLocale();
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const [muted, setMuted] = useState(true);
  const [touch] = useState(isTouchDevice);
  const videoRef = useRef(null);
  const leavingRef = useRef(false);
  const finishedRef = useRef(false);
  const unlockRef = useRef(null);

  // Slide the splash up (bottom -> top), unmount, unlock, then auto scroll
  const close = useCallback((shouldAutoScroll = false) => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);

    window.setTimeout(() => {
      unlockRef.current?.();   // release scroll lock right now
      setVisible(false);
      if (shouldAutoScroll === true && AUTO_SCROLL_AFTER_VIDEO) {
        // two frames so layout is settled after the splash is removed
        requestAnimationFrame(() => requestAnimationFrame(runAutoScroll));
      }
    }, SLIDE_MS);
  }, []);

  const skip = useCallback(() => close(false), [close]);        // user skip: no auto scroll
  const finish = useCallback(() => {                            // video done (or can't play): auto scroll
    finishedRef.current = true;
    close(true);
  }, [close]);

  const tryScrollClose = useCallback(() => {
    if (SCROLL_SKIPS_VIDEO || finishedRef.current) close(false);
  }, [close]);

  // Start playback + safety fallback
  useEffect(() => {
    if (!visible) return undefined;
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.play().catch(finish); // autoplay blocked -> continue to the page
    }
    const fallback = window.setTimeout(finish, VIDEO_FALLBACK_MS);
    return () => window.clearTimeout(fallback);
  }, [visible, finish]);

  // Keys / wheel / touch / mouse; lock page scroll
  useEffect(() => {
    if (!visible) return undefined;

    let touchStartY = null;
    let lastX = null;
    let lastY = null;
    let moved = 0;
    const html = document.documentElement;
    const body = document.body;

    const onKeyDown = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        skip();
        return;
      }
      if ([" ", "ArrowDown", "PageDown"].includes(e.key)) {
        e.preventDefault();
        tryScrollClose();
      }
    };
    const onWheel = (e) => {
      if (e.deltaY > 0) tryScrollClose();
    };
    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      if (touchStartY === null) return;
      if (touchStartY - e.touches[0].clientY > SWIPE_THRESHOLD) {
        touchStartY = null;
        tryScrollClose();
      }
    };
    const onMouseMove = (e) => {
      if (!MOUSE_MOVE_CLOSES || touch) return;

      // ignore the first event (browsers fire one on page load)
      if (lastX === null) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }

      moved += Math.hypot(e.clientX - lastX, e.clientY - lastY);
      lastX = e.clientX;
      lastY = e.clientY;

      if (moved < MOUSE_MOVE_THRESHOLD) return;

      if (MOUSE_MOVE_SKIPS_VIDEO || finishedRef.current) {
        close(false);
      }
    };

    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    const unlock = () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.overscrollBehavior = prev.bodyOverscroll;
    };
    unlockRef.current = unlock;

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      unlock();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [visible, skip, tryScrollClose, close, touch]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  if (!visible) return null;

  const hint = touch
    ? lang === "ta" ? "தவிர்க்க தட்டவும்" : "Tap to skip"
    : MOUSE_MOVE_CLOSES
      ? lang === "ta"
        ? "கர்சரை நகர்த்தவும் அல்லது Enter அழுத்தவும்"
        : "Move the mouse or press Enter to skip"
      : lang === "ta"
        ? "தவிர்க்க கிளிக் செய்யவும் அல்லது Enter அழுத்தவும்"
        : "Click or press Enter to skip";

  return (
    <div
      className="fixed inset-0 z-[300] h-dvh min-h-screen w-full cursor-pointer touch-none select-none overflow-hidden bg-black will-change-transform"
      style={{
        transform: leaving ? "translateY(-100%)" : "translateY(0)",
        transition: `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)`,
      }}
      role="dialog"
      aria-modal="true"
      aria-label={lang === "ta" ? "TVK போர்ட்ஃபோலியோ வரவேற்பு வீடியோ" : "TVK portfolio welcome video"}
      onClick={skip}
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 block size-full bg-black object-cover object-center max-md:portrait:object-contain"
        autoPlay
        muted
        playsInline
        webkit-playsinline="true"
        preload="auto"
        disablePictureInPicture
        controls={false}
        onEnded={finish}
        onError={finish}
      />

      <button
        type="button"
        className="absolute top-[max(12px,env(safe-area-inset-top))] right-[max(12px,env(safe-area-inset-right))] z-[2] min-h-11 cursor-pointer rounded-full border-0 bg-black/60 px-4 py-2 text-[clamp(12px,3.4vw,15px)] text-white backdrop-blur-sm active:scale-95"
        onClick={toggleMute}
        aria-pressed={!muted}
      >
        {muted
          ? lang === "ta" ? "🔇 ஒலி இயக்கு" : "🔇 Unmute"
          : lang === "ta" ? "🔊 ஒலி நிறுத்து" : "🔊 Mute"}
      </button>

      <span
        className="pointer-events-none absolute right-0 bottom-[max(16px,env(safe-area-inset-bottom))] left-0 z-[2] px-4 text-center text-[clamp(11px,3vw,14px)] text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.8)]"
        aria-hidden="true"
      >
        {hint}
      </span>
    </div>
  );
}