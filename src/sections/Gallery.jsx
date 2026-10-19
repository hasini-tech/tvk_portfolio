import { useRef, useState } from "react";
import { GALLERY, PROFILE } from "../data.js";
import { useLocale } from "../hooks.js";
import { Modal } from "../components/ui.jsx";

const n = GALLERY.length;
const step = 360 / n;
const radius = 340;

/* ---------- Auto-loop strip data ----------
   Images live in public/images/  ->  served as /images/<file>
   Each inner array is one column:
     1 image  = tall card
     2 images = two stacked cards
*/
const img = (file, title, titleTamil, category, date) => ({
  src: `/images/${file}`,
  title,
  titleTamil,
  category,
  date,
});

const STRIP_COLUMNS = [
  [img("tvkself.jpeg", "Meeting Residents", "மக்கள் சந்திப்பு", "Town Hall", "2026")],
  [
    img("tvkgroup/tvkgroup.jpeg", "Team Gathering", "குழு சந்திப்பு", "Leadership", "2026"),
    img("tvkgroup/tvkgroup1.jpeg", "Volunteers Meet", "தொண்டர்கள் சந்திப்பு", "Leadership", "2026"),
  ],
  [img("tvkmarketing.jpeg", "Campaign Vehicle", "பிரச்சார வாகனம்", "Town Hall", "2026")],
  [
    img("tvkgroup/tvkgroup2.jpeg", "Ward Rally", "வார்டு பேரணி", "Safety", "2026"),
    img("tvkgroup/tvkgroup3.jpeg", "Community Event", "சமூக நிகழ்வு", "Health", "2026"),
  ],
  [img("tvkselfimg.jpeg", "Citizen Gathering", "மக்கள் கூட்டம்", "Education", "2026")],
  [
    img("tvkimages.jpeg", "Field Visit", "களப் பார்வை", "Infrastructure", "2026"),
    img("tvkimages2.jpeg", "Ward Inspection", "வார்டு ஆய்வு", "Sanitation", "2026"),
  ],
];

export default function Gallery() {
  const { isTamil, text } = useLocale();
  const [idx, setIdx] = useState(0);
  const [viewMode, setViewMode] = useState("strip"); // 'strip' | 'ring'
  const [lightbox, setLightbox] = useState(null);
  const drag = useRef(null);

  const current = ((idx % n) + n) % n;
  const go = (d) => setIdx((i) => i + d);

  const pick = (i) => {
    let d = i - current;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    go(d);
  };

  const onUp = (e) => {
    if (drag.current === null) return;
    const dx = e.clientX - drag.current;
    if (Math.abs(dx) > 35) go(dx < 0 ? 1 : -1);
    drag.current = null;
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const categoryTamil = {
    All: "அனைத்தும்",
    Safety: "பாதுகாப்பு",
    Health: "சுகாதாரம்",
    "Town Hall": "மக்கள் சபை",
    Infrastructure: "கட்டமைப்பு",
    Education: "கல்வி",
    Sanitation: "தூய்மை",
    Leadership: "தலைமைத்துவம்",
  };

  return (
    <section id="gallery" className="sec bg-white text-tvk-ink gallery-section">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot dot-red" />
            <span>{text("காட்சியகம்", "Photo Gallery")}</span>
          </div>
          <h2 className="section-title-large text-tvk-red">
            {text("படங்கள் மற்றும் ஊடகங்களில் நமது வார்டு", "The Ward in Pictures & Media")}
          </h2>
          <p className="section-sub-text text-tvk-ink-muted">
            {text("வார்டு வளர்ச்சிப் பணிகள், நலத்திட்ட விநியோகங்கள் மற்றும் மக்கள் சந்திப்புகளின் காட்சிகள்.", "Glimpses of grassroots ward improvements, welfare distributions, and citizen gatherings.")}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        {/* View Mode & Filter Controls */}
        <div className="gallery-toolbar">
          <div className="gallery-mode-toggle" role="group" aria-label={text("காட்சியகப் பார்வை முறை", "Gallery View Mode")}>
            <button
              className={`mode-btn ${viewMode === "strip" ? "mode-btn-active" : ""}`}
              onClick={() => setViewMode("strip")}
              type="button"
            >
              {text("🎞 தொடர் காட்சி", "🎞 Auto Strip")}
            </button>
            <button
              className={`mode-btn ${viewMode === "ring" ? "mode-btn-active" : ""}`}
              onClick={() => setViewMode("ring")}
              type="button"
            >
              {text("🔄 3D வளையப் பார்வை", "🔄 3D Ring View")}
            </button>
          </div>

        </div>

        {/* Auto-looping Strip View */}
        {viewMode === "strip" && (
          <div
            className="strip-viewport"
            aria-label={text("தானியங்கி புகைப்பட வரிசை", "Auto-scrolling photo strip")}
          >
            <div className="strip-track">
              {/* rendered twice for a seamless infinite loop */}
              {[0, 1].map((copy) =>
                STRIP_COLUMNS.map((col, ci) => (
                  <div className="strip-col" key={`${copy}-${ci}`} aria-hidden={copy === 1}>
                    {col.map((item) => (
                      <button
                        key={item.src}
                        type="button"
                        className={`strip-item ${col.length === 1 ? "strip-tall" : "strip-short"}`}
                        onClick={() => setLightbox(item)}
                        tabIndex={copy === 1 ? -1 : 0}
                      >
                        <img
                          src={item.src}
                          alt={isTamil ? item.titleTamil || item.title : item.title}
                          loading="lazy"
                          draggable="false"
                        />
                      </button>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* 3D Ring View */}
        {viewMode === "ring" && (
          <div className="ring-container">
            <p className="gallery-hint">
              {text("இடது அல்லது வலதுபுறம் இழுக்கவும், அம்புக்குறி விசைகளைப் பயன்படுத்தவும் அல்லது அட்டையை கிளிக் செய்யவும்.", "Drag left or right, use arrow keys, or click any card to inspect.")}
            </p>

            <div
              className="ring-wrap"
              tabIndex={0}
              onKeyDown={onKey}
              aria-label={text("3D ஊடாடும் புகைப்பட வளையம்", "3D Interactive Photo Ring")}
              onPointerDown={(e) => (drag.current = e.clientX)}
              onPointerUp={onUp}
              onPointerLeave={() => (drag.current = null)}
            >
              <div
                className="ring"
                style={{ transform: `translateZ(-${radius}px) rotateY(${-idx * step}deg)` }}
              >
                {GALLERY.map((g, i) => {
                  const isFront = i === current;
                  return (
                    <figure
                      key={g.title + i}
                      className={`ring-card ${isFront ? "ring-front" : ""}`}
                      onClick={() => {
                        if (isFront) setLightbox(g);
                        else pick(i);
                      }}
                      style={{
                        transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                        backgroundImage: g.src ? `url(${g.src})` : undefined,
                      }}
                    >
                      <div className="ring-card-overlay" />
                      {!g.src && (
                        <div className="ring-ph">
                          <span className="ring-ph-mark">TVK</span>
                          <small>{text("வார்டு நிகழ்வு", "Ward Event")}</small>
                        </div>
                      )}
                      <figcaption className="ring-cap">
                        <span className="ring-cap-tag">{isTamil ? categoryTamil[g.category] || "வார்டு நிகழ்வு" : g.category || "Ward Event"}</span>
                        <b className="ring-cap-title">{isTamil ? g.titleTamil || g.title : g.title}</b>
                        <small className="ring-cap-date">{g.date} • {text("பெரிதாக்க கிளிக் செய்யவும்", "Click to enlarge")}</small>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Lightbox Modal */}
        {lightbox && (
          <Modal
            isOpen={true}
            onClose={() => setLightbox(null)}
            title={isTamil ? lightbox.titleTamil || lightbox.title : lightbox.title}
            subtitle={`${isTamil ? categoryTamil[lightbox.category] || "வார்டு" : lightbox.category || "Ward"} • ${lightbox.date}`}
          >
            <div className="lightbox-content">
              {lightbox.src ? (
                <div className="lightbox-img-wrap">
                  <img src={lightbox.src} alt={lightbox.title} className="lightbox-img" />
                </div>
              ) : (
                <div className="lightbox-ph-wrap">
                  <span className="lightbox-ph-mark">TVK</span>
                  <p>{text("வார்டு காப்பகத்திலிருந்து புகைப்படம்", "Photograph from ward archives")}</p>
                </div>
              )}
              <div className="lightbox-details">
                <h4 className="lightbox-ta">{isTamil ? lightbox.titleTamil || lightbox.title : lightbox.title}</h4>
                <p className="lightbox-desc">{isTamil ? "திட்டமிட்ட வார்டு ஆய்வின் போது பதிவு செய்யப்பட்ட மக்கள் நலச் செயல்பாடு." : lightbox.desc || "Field activity captured during our scheduled ward inspection."}</p>
                <div className="lightbox-badges">
                  <span className="badge-item">📍 {isTamil ? PROFILE.constituencyTamil : PROFILE.constituency}</span>
                  <span className="badge-item">🗓 {lightbox.date}</span>
                  <span className="badge-item">🚩 {isTamil ? PROFILE.partyTamil : PROFILE.party}</span>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
