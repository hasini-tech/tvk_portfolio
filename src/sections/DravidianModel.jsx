import { useEffect, useState } from "react";
import { IDEOLOGY_PILLARS } from "../data.js";
import { Icon } from "../components/ui.jsx";
import { useLocale } from "../hooks.js";

const modelImages = [
  {
    src: "/images/annadurai.png",
    name: "பேரறிஞர் அண்ணா",
    title: "Perarignar Anna",
    label: "Duty, Dignity, Discipline",
    labelTamil: "கடமை, கண்ணியம், கட்டுப்பாடு",
    desc: "Architect of Tamil pride, state rights, and democratic Dravidian governance.",
    descTamil: "தமிழர் பெருமை, மாநில உரிமைகள் மற்றும் ஜனநாயக திராவிட ஆட்சியின் முன்னோடி.",
  },
  {
    src: "/images/periyar.jpeg",
    name: "தந்தை பெரியார்",
    title: "Thanthai Periyar",
    label: "Self-Respect & Social Justice",
    labelTamil: "சுயமரியாதை மற்றும் சமூக நீதி",
    desc: "Champion of rationalism, gender equality, and eradication of social hierarchy.",
    descTamil: "பகுத்தறிவு, பாலின சமத்துவம் மற்றும் சமூகப் பாகுபாட்டை ஒழித்தலின் முன்னோடி.",
  },
  {
    src: "/images/tvkvijay.png",
    name: "வெற்றித் தலைவர் விஜய்",
    title: "TVK Leader Vijay",
    label: "People-First Politics",
    labelTamil: "மக்கள் முன்னுரிமை அரசியல்",
    desc: "Uniting the people of Tamil Nadu under secular social justice and progressive action.",
    descTamil: "மதச்சார்பற்ற சமூக நீதி மற்றும் முன்னேற்றச் செயல்பாட்டின் கீழ் தமிழக மக்களை ஒன்றிணைத்தல்.",
  },
  {
    src: "/images/tvkselfimg.jpeg",
    name: "சமூக நீதி களம்",
    title: "Social Justice in Action",
    label: "Universal Welfare",
    labelTamil: "அனைவருக்குமான நலன்",
    desc: "Ensuring every household receives equal opportunity, clean water, and civic dignity.",
    descTamil: "ஒவ்வொரு குடும்பத்திற்கும் சம வாய்ப்பு, தூய்மையான குடிநீர் மற்றும் குடிமை மரியாதை கிடைப்பதை உறுதி செய்தல்.",
  },
];

function LeaderCard({ item, slot, isActive, onSelect, isTamil }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={`model-card model-slot-${slot} ${isActive ? "model-card-active" : ""}`}
      style={{ "--slot": slot, zIndex: modelImages.length - slot }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect(); }}
      aria-label={isTamil ? `${item.name} பார்க்க` : `View ${item.title}`}
    >
      <div className="model-card-inner">
        {!failed ? (
          <img
            src={item.src}
            alt={isTamil ? item.name : item.title}
            onError={() => setFailed(true)}
            className="model-card-photo"
          />
        ) : (
          <div className="model-card-fallback" aria-label={`${item.title} placeholder`} role="img">
            <span className="model-card-fallback-mark">TVK</span>
            <small>{isTamil ? item.name : item.title}</small>
          </div>
        )}
        <div className="model-card-gloss" />
        <figcaption className="model-card-cap">
          <p className="model-card-name-ta">{isTamil ? item.name : item.title}</p>
          <span className="model-card-tag">{isTamil ? item.labelTamil : item.label}</span>
        </figcaption>
      </div>
    </figure>
  );
}

export default function DravidianModel() {
  const { isTamil, text } = useLocale();
  const [activeLeader, setActiveLeader] = useState(0);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveLeader((curr) => (curr + 1) % modelImages.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const currentPillar = IDEOLOGY_PILLARS[activePillar] || IDEOLOGY_PILLARS[0];

  return (
    <section id="model" className="model-sec">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot" />
            <span>{text("கொள்கை வழிகாட்டிகள் & அடிப்படை கோட்பாடுகள்", "Ideological Guides & Core Principles")}</span>
          </div>
          <h2 className="section-title-large">
            {text("அதன் மையத்தில் மதச்சார்பற்ற சமூக நீதி", "Secular Social Justice at its Core")}
          </h2>
          <p className="section-sub-text">
            {isTamil
              ? <>திருக்குறளின் காலத்தால் அழியாத <strong className="text-gold">“பிறப்பொக்கும் எல்லா உயிர்க்கும்”</strong> என்ற கொள்கையில் வேரூன்றி, வெளிப்படையான மக்கள் சேவை மற்றும் சமத்துவத்தின் மூலம் தமிழகத்தை முன்னேற்றுதல்.</>
              : <>Rooted in Thirukkural's timeless maxim <strong className="text-gold">“பிறப்பொக்கும் எல்லா உயிர்க்கும்”</strong>, advancing Tamil Nadu through transparent public service and equality.</>}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        {/* 4 Core Pillars Tabs inspired by tvkvijay.com */}
        <div className="pillars-grid">
          {IDEOLOGY_PILLARS.map((pillar, idx) => {
            const isSel = idx === activePillar;
            return (
              <button
                key={pillar.id}
                className={`pillar-tab-card ${isSel ? "pillar-tab-active" : ""}`}
                onClick={() => setActivePillar(idx)}
                type="button"
              >
                <div className="pillar-tab-header">
                  <div className="pillar-icon-box">
                    <Icon name={pillar.icon} size={24} />
                  </div>
                  <span className="pillar-num">0{idx + 1}</span>
                </div>
                <h3 className="pillar-tab-title">{isTamil ? pillar.title : pillar.titleEn}</h3>
                <p className="pillar-tab-tagline">{isTamil ? pillar.tagline : pillar.desc}</p>
              </button>
            );
          })}
        </div>

        {/* Split Details: Active Pillar Content & Fanned Leaders 3D Deck */}
        <div className="model-grid">
          {/* Active Pillar Deep Dive */}
          <div className="pillar-detail-card">
            <div className="pillar-detail-inner">
              <div className="pillar-badge-strip">
                <span className="pillar-current-index">{isTamil ? `கொள்கை ${activePillar + 1}` : `PILLAR 0${activePillar + 1}`}</span>
                <span className="pillar-current-name">{isTamil ? currentPillar.title : currentPillar.titleEn}</span>
              </div>

              <h3 className="pillar-display-title">
                {isTamil ? currentPillar.title : currentPillar.titleEn}
              </h3>

              <blockquote className="pillar-quote">
                “{currentPillar.quote}”
              </blockquote>

              <p className="model-text">
                {isTamil ? currentPillar.quote : currentPillar.desc}
              </p>

              <div className="pillar-cta-row">
                <a className="model-link" href="#about">
                  <span>{text("அறிமுகம்", "About Ward Councillor")}</span>
                  <span aria-hidden="true">→</span>
                </a>
                <a className="btn btn-outline" href="#plan">
                  <span>{text("100-நாள் திட்டம்", "100-Day Promises")}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Leaders 3D Carousel Stack */}
          <div className="model-leaders-column">
            <div className="leaders-deck-header">
              <span className="leaders-deck-title">{text("கொள்கை வழிகாட்டிகள்", "Ideological Guides")}</span>
              <span className="leaders-deck-counter">{activeLeader + 1} / {modelImages.length}</span>
            </div>

            <div className="model-gallery" aria-label="Movement leadership photographs" aria-live="polite">
              {modelImages.map((image, index) => {
                const slot = (index - activeLeader + modelImages.length) % modelImages.length;
                return (
                  <LeaderCard
                    key={image.src + index}
                    item={image}
                    isTamil={isTamil}
                    slot={slot}
                    isActive={slot === 0}
                    onSelect={() => setActiveLeader(index)}
                  />
                );
              })}
            </div>

            {/* Leader Navigation Dots */}
            <div className="model-gallery-controls">
              {modelImages.map((img, i) => (
                <button
                  key={i}
                  className={`model-dot ${i === activeLeader ? "model-dot-active" : ""}`}
                  onClick={() => setActiveLeader(i)}
                  aria-label={`View ${img.name}`}
                  type="button"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
