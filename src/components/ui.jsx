import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "../hooks.js";

/* Sound generator for TVK Whistle using Web Audio API */
export function playWhistleSound() {
  if (reducedMotion()) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const masterGain = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(2450, now);
    osc1.frequency.exponentialRampToValueAtTime(2680, now + 0.08);
    osc1.frequency.exponentialRampToValueAtTime(2520, now + 0.38);

    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(2880, now);
    osc2.frequency.exponentialRampToValueAtTime(3050, now + 0.08);
    osc2.frequency.exponentialRampToValueAtTime(2940, now + 0.38);

    // Rattling pea effect
    lfo.frequency.setValueAtTime(38, now);
    lfoGain.gain.setValueAtTime(140, now);
    lfo.connect(osc1.frequency);
    lfo.connect(osc2.frequency);

    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.22, now + 0.03);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);

    osc1.connect(masterGain);
    osc2.connect(masterGain);
    masterGain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    lfo.start(now);
    osc1.stop(now + 0.5);
    osc2.stop(now + 0.5);
    lfo.stop(now + 0.5);
  } catch (err) {
    // Audio context may be restricted by autoplay policy
  }
}

/* =========================================================================
   PROFESSIONAL FILLED SVG ICONS (Lucide-inspired, solid fill style)
   ========================================================================= */

function WaterIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />
    </svg>
  );
}

function RoadIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 3.5a1 1 0 0 1 .97.76L9.5 20.5a1 1 0 0 1-1.93.5L3.53 4.76A1 1 0 0 1 4.5 3.5zm15 0a1 1 0 0 1 .97 1.26L16.43 21a1 1 0 0 1-1.93-.5l4.03-16.24a1 1 0 0 1 .97-.76zM11 6a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0V6zm0 6a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm0 6a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2z" />
    </svg>
  );
}

function LightIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2z" />
      <rect x="9" y="19" width="6" height="1.5" rx="0.75" />
      <rect x="10" y="21.5" width="4" height="1.5" rx="0.75" />
    </svg>
  );
}

function SchoolIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3z" />
      <path d="M5 13.18v4L12 20.5l7-3.32v-4L12 16.5 5 13.18z" opacity="0.7" />
    </svg>
  );
}

function HealthIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function WasteIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z" />
    </svg>
  );
}

function ShieldIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
  );
}

function TorchIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C10.5 4 8.5 5 8.5 7.5a3.5 3.5 0 0 0 7 0C15.5 5 13.5 4 12 2z" />
      <path d="M6 12h12l-2 9H8l-2-9z" opacity="0.85" />
      <rect x="6" y="11" width="12" height="2" rx="1" />
    </svg>
  );
}

function TargetIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="12" r="10" opacity="0.2" />
      <circle cx="12" cy="12" r="7" opacity="0.4" />
      <circle cx="12" cy="12" r="4" opacity="0.7" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

function AwardIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" opacity="0.85" />
    </svg>
  );
}

function CalendarIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
    </svg>
  );
}

function MapPinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function ClockIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z" />
    </svg>
  );
}

function FileTextIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
  );
}

function CheckCircleIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  );
}

function CertificateIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" opacity="0.85" />
      <circle cx="12" cy="10" r="3" />
      <rect x="8" y="18" width="8" height="2" rx="1" />
      <rect x="11" y="16" width="2" height="4" />
    </svg>
  );
}

function ExternalIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
  );
}

function UsersIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
    </svg>
  );
}

function PhoneIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 2.5 9.2 2l2.1 5.1-1.8 1.6a16.1 16.1 0 0 0 5.8 5.8l1.6-1.8 5.1 2.1-.5 2.6a2.5 2.5 0 0 1-2.8 2C10.6 18.3 5.7 13.4 4.5 5.3a2.5 2.5 0 0 1 2.1-2.8Z" />
    </svg>
  );
}

function MailIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 3.2v.4l9 5.6 9-5.6v-.4H3Zm18 2.8-9 5.6-9-5.6V17h18v-6Z" />
    </svg>
  );
}

function FlagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 2h2v20H5V2Zm2 2h12l-3.2 4L19 12H7V4Z" />
    </svg>
  );
}

/* Live / real-time update symbol: a status dot with broadcast waves. */
function LiveIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M7.76 7.76a6 6 0 0 0 0 8.48M16.24 7.76a6 6 0 0 1 0 8.48M4.93 4.93a10 10 0 0 0 0 14.14M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

const ICON_MAP = {
  water: WaterIcon,
  road: RoadIcon,
  light: LightIcon,
  school: SchoolIcon,
  health: HealthIcon,
  waste: WasteIcon,
  shield: ShieldIcon,
  torch: TorchIcon,
  target: TargetIcon,
  award: AwardIcon,
  calendar: CalendarIcon,
  mapPin: MapPinIcon,
  clock: ClockIcon,
  fileText: FileTextIcon,
  checkCircle: CheckCircleIcon,
  certificate: CertificateIcon,
  external: ExternalIcon,
  users: UsersIcon,
  phone: PhoneIcon,
  mail: MailIcon,
  flag: FlagIcon,
  live: LiveIcon,
};

export function Icon({ name, size = 24, className = "" }) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return (
    <span
      className={`ui-icon ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Comp size={size} />
    </span>
  );
}

export function CountUp({ to, suffix = "", start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reducedMotion()) {
      setVal(to);
      return;
    }
    let raf;
    const t0 = performance.now();
    const duration = 1600;
    const tick = (now) => {
      const k = Math.min((now - t0) / duration, 1);
      // smooth cubic ease-out
      const ease = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(to * ease));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return <>{val.toLocaleString("en-IN")}{suffix}</>;
}

/* Card that tilts toward the pointer with a moving glare */
export function Tilt({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const move = (e) => {
    if (reducedMotion()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
    el.style.setProperty("--gx", `${x * 100}%`);
    el.style.setProperty("--gy", `${y * 100}%`);
  };
  const leave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };
  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </div>
  );
}

/* Mobile card rows use native horizontal scrolling. These dots mirror the
   visible card and provide an accessible way to move through the carousel. */
export function CarouselDots({ trackRef, count, label = "Carousel pages" }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return undefined;

    const updateActive = () => {
      const cards = Array.from(track.children);
      if (!cards.length) return;
      const origin = track.getBoundingClientRect().left;
      let nearest = 0;
      let distance = Infinity;

      cards.forEach((card, index) => {
        const cardLeft = card.getBoundingClientRect().left - origin;
        const nextDistance = Math.abs(cardLeft);
        if (nextDistance < distance) {
          distance = nextDistance;
          nearest = index;
        }
      });
      setActive(nearest);
    };

    updateActive();
    track.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      track.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [trackRef, count]);

  if (count < 2) return null;

  const goTo = (index) => {
    const track = trackRef.current;
    const card = track?.children[index];
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  };

  return (
    <div className="mobile-carousel-dots" role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          className={`mobile-carousel-dot ${index === active ? "mobile-carousel-dot-active" : ""}`}
          type="button"
          role="tab"
          aria-label={`Go to slide ${index + 1}`}
          aria-selected={index === active}
          onClick={() => goTo(index)}
        />
      ))}
    </div>
  );
}

/* Accessible Modal Component */
export function Modal({ isOpen, onClose, title, subtitle, children }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            {subtitle && <p className="modal-sub">{subtitle}</p>}
            <h3 id="modal-title" className="modal-heading">{title}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close dialog">×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
