import { useRef, useState } from "react";
import { reducedMotion } from "../hooks.js";
import { playWhistleSound } from "./ui.jsx";

export const SILHOUETTE = (
  <>
    <circle cx="112" cy="124" r="80" />
    <path d="M150 66 L262 30 Q290 24 294 42 L294 54 Q294 62 284 65 L190 98 Z" />
    <circle cx="30" cy="160" r="12" />
  </>
);

const LAYERS = 16, STEP = 4;

/* Move pointer to rotate. Press the whistle to spin it and rattle the ball. */
export default function Whistle3D() {
  const rot = useRef(null);
  const [blow, setBlow] = useState(0);

  const move = (e) => {
    if (reducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    if (rot.current) {
      rot.current.style.transform = `rotateY(${x * 65 - 8}deg) rotateX(${-y * 40 + 6}deg)`;
    }
  };
  const leave = () => {
    if (rot.current) {
      rot.current.style.transform = "rotateY(-22deg) rotateX(8deg)";
    }
  };

  const handleBlow = () => {
    playWhistleSound();
    setBlow((b) => b + 1);
  };

  const layers = [];
  for (let i = LAYERS - 1; i >= 0; i--) {
    const light = 26 + (1 - i / LAYERS) * 16;
    layers.push(
      <svg
        key={i}
        className="wh-layer"
        viewBox="0 0 320 220"
        aria-hidden="true"
        style={{ transform: `translateZ(${-i * STEP + 30}px)`, fill: `hsl(41 100% ${light}%)` }}
      >
        {SILHOUETTE}
      </svg>
    );
  }

  return (
    <button
      className="wh-stage"
      onPointerMove={move}
      onPointerLeave={leave}
      onClick={handleBlow}
      aria-label="TVK whistle. Press to spin and blow it."
      type="button"
    >
      <div className="wh-float">
        <div className="wh-rot" ref={rot} style={{ transform: "rotateY(-22deg) rotateX(8deg)" }}>
          <div key={blow} className={`wh-spin ${blow ? "spin" : ""}`}>
            {layers}
            <svg className="wh-layer" viewBox="0 0 320 220" style={{ transform: "translateZ(31px)" }} aria-hidden="true">
              <defs>
                <linearGradient id="whFace" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFE27A" />
                  <stop offset=".5" stopColor="#FFC20E" />
                  <stop offset="1" stopColor="#E09A00" />
                </linearGradient>
                <radialGradient id="whWell" cx=".4" cy=".35" r=".8">
                  <stop offset="0" stopColor="#D8242C" />
                  <stop offset="1" stopColor="#4A050A" />
                </radialGradient>
                <radialGradient id="whBall" cx=".35" cy=".3" r=".8">
                  <stop offset="0" stopColor="#FFF3C2" />
                  <stop offset="1" stopColor="#F0A800" />
                </radialGradient>
              </defs>
              <g fill="url(#whFace)" stroke="#3A0206" strokeWidth="4" strokeLinejoin="round">{SILHOUETTE}</g>
              <circle cx="30" cy="160" r="5" fill="#5A060B" />
              <circle cx="112" cy="124" r="58" fill="url(#whWell)" stroke="#3A0206" strokeWidth="4" />
              <circle cx="106" cy="130" r="27" fill="url(#whBall)" stroke="#3A0206" strokeWidth="3" className={blow ? "ball-rattle" : ""} />
              <ellipse cx="97" cy="120" rx="8" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 97 120)" />
              <path d="M178 72 L270 42" stroke="#3A0206" strokeWidth="3" strokeLinecap="round" />
              <path d="M170 82 L258 52" stroke="#fff" strokeWidth="2" opacity=".45" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      {blow > 0 && (
        <span key={"w" + blow} className="wh-wave" aria-hidden="true">
          🔔 விசில் சத்தம்! Sound the TVK Whistle!
        </span>
      )}
      <div className="wh-shadow" />
    </button>
  );
}
