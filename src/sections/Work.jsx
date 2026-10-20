import { useState } from "react";
import { WORKS, PROFILE } from "../data.js";
import { Icon, Tilt } from "../components/ui.jsx";
import { useLocale } from "../hooks.js";

const TAGS = ["All", ...new Set(WORKS.map((w) => w.tag))];

export default function Work() {
  const [tag, setTag] = useState("All");
  const { isTamil, text } = useLocale();
  const tagTamil = {
    All: "அனைத்தும்",
    Healthcare: "சுகாதாரம்",
    "Government Services": "அரசு சேவைகள்",
    Water: "குடிநீர்",
    Infrastructure: "கட்டமைப்பு",
    "Civic Works": "குடிமைப் பணிகள்",
    Community: "சமூகம்",
  };
  const workTamil = {
    "Annual Medical Camps": ["ஆண்டு மருத்துவ முகாம்கள்", "மருத்துவ உதவியும் சிரமமற்ற சுகாதார சேவைகளும் வழங்குதல்."],
    "Essential Certificates & Government Services": ["அத்தியாவசிய சான்றிதழ்கள் மற்றும் அரசு சேவைகள்", "அத்தியாவசிய சான்றிதழ்களைப் பெறவும் அரசு சேவைகளை அணுகவும் உதவுதல்."],
    "Drinking Water Solutions": ["குடிநீர் தீர்வுகள்", "குடிநீர் பிரச்சினைகளுக்கு நிரந்தரத் தீர்வுகளை கண்டறிதல்."],
    "Underground Drainage & Waste Management": ["கழிவுநீர் வடிகால் மற்றும் கழிவு மேலாண்மை", "நிலத்தடி வடிகால் மற்றும் கழிவு மேலாண்மை வசதிகளை மேம்படுத்துதல்."],
    "Civic Works": ["குடிமைப் பணிகள்", "தூய்மையான, பாதுகாப்பான சிறந்த சமூகத்திற்கான அடிப்படை கட்டமைப்பை மேம்படுத்துதல்."],
    "Community Service": ["சமூக சேவை", "மக்களின் தேவைகளைப் புரிந்து கொண்டு அவர்களின் நலனுக்காகப் பணியாற்றுதல்."],
  };
  const shown = WORKS.filter((w) => tag === "All" || w.tag === tag);

  return (
    <section id="work" className="sec work-section">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot" />
            <span>{text("செயல்திட்டம் & களப்பணிகள்", "Public Works")}</span>
          </div>
          <h2 className="section-title-large">
            {text("பொது நலச் செயல்பாடுகள்", "Public Welfare Activities")}
          </h2>
          <p className="section-sub-text">
            {text("சுகாதாரம், அத்தியாவசிய சேவைகள், கட்டமைப்பு மற்றும் சமூக நலனை மையமாகக் கொண்ட நடைமுறை முயற்சிகள்.", "Practical initiatives focused on healthcare, essential services, infrastructure, and community welfare.")}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        {/* Filter Chips */}
        <div className="filters-container">
          <div className="filters-label">{text("துறை வாரியாக வடிகட்ட", "Filter by Sector")}</div>
          <div className="filters" role="group" aria-label={text("பணிகளை தலைப்பின்படி வடிகட்ட", "Filter work by topic")}>
            {TAGS.map((t) => (
              <button
                key={t}
                className={`chip ${t === tag ? "chip-on" : ""}`}
                aria-pressed={t === tag}
                onClick={() => setTag(t)}
                type="button"
              >
                {isTamil ? tagTamil[t] : t}
              </button>
            ))}
          </div>
        </div>

        {/* Works Grid */}
        <div className="works-grid">
          {shown.map((w) => {
            const reportUrl = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(`வணக்கம் ${PROFILE.name}, ${w.tag} சம்பந்தமான வார்டு பணி குறித்து:`)}`;
            return (
              <Tilt key={w.title} className="work-card" max={8}>
                <div className="work-card-inner">
                  <div className="work-card-top">
                    <div className="work-icon lift3">
                      <Icon name={w.icon} size={28} />
                    </div>
                    <div className="work-status-tags">
                      <span className="work-tag-category">{isTamil ? tagTamil[w.tag] : w.tag}</span>
                      {w.status && <span className="work-tag-status">{isTamil ? "பொது நலன்" : w.status}</span>}
                    </div>
                  </div>

                  <h3 className="work-card-title lift">{isTamil ? workTamil[w.title][0] : w.title}</h3>
                  <p className="work-card-text lift">{isTamil ? workTamil[w.title][1] : w.text}</p>

                  <div className="work-card-footer">
                    {w.impact && (
                      <div className="work-impact-badge">
                        <span className="impact-dot" />
                        <span>{w.impact}</span>
                      </div>
                    )}
                    <a
                      href={reportUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="work-card-action"
                      title={text("இந்தப் பிரிவுக்கான புகாரைத் தெரிவிக்க", "Report an issue for this category")}
                    >
                      <span>{text("தகவல் தெரிவிக்க", "Report Issue")}</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </Tilt>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="works-bottom-cta">
          <div className="works-cta-box">
            <div>
              <h4 className="works-cta-title">{text("உங்கள் தெருவில் தீர்க்கப்படாத பிரச்சினை உள்ளதா?", "Is there an unresolved issue in your street?")}</h4>
              <p className="works-cta-desc">{text("அலுவலக நேரத்திற்காக காத்திருக்க வேண்டாம். உடனடி நடவடிக்கைக்காக இப்போது புகார் அளிக்கவும்.", "Do not wait for office hours. Submit a grievance right now for quick action.")}</p>
            </div>
            <a href="#contact" className="btn btn-yellow">
              {text("தெரு புகாரைப் பதிவு செய்யுங்கள்", "Report Street Issue")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
