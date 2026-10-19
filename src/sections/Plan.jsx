import { useState } from "react";
import { COMMITMENTS, PROFILE } from "../data.js";
import { useInView, useLocale } from "../hooks.js";
import { Icon } from "../components/ui.jsx";

export default function Plan() {
  const [ref, seen] = useInView(0.25);
  const [open, setOpen] = useState(null);
  const { isTamil, text } = useLocale();
  const commitmentTamil = {
    "Annual Medical Camps": ["ஆண்டு மருத்துவ முகாம்கள்", "மருத்துவ உதவியும் சிரமமற்ற சுகாதார சேவைகளும் வழங்குதல்."],
    "Essential Certificates & Government Services": ["அத்தியாவசிய சான்றிதழ்கள் மற்றும் அரசு சேவைகள்", "அத்தியாவசிய சான்றிதழ்களையும் அரசு சேவைகளையும் எளிதாக அணுக உதவுதல்."],
    "Drinking Water Solutions": ["குடிநீர் தீர்வுகள்", "குடிநீர் பிரச்சினைகளுக்கு நிரந்தரத் தீர்வுகளை கண்டறிதல்."],
    "Underground Drainage & Waste Management": ["கழிவுநீர் வடிகால் மற்றும் கழிவு மேலாண்மை", "நிலத்தடி வடிகால் மற்றும் கழிவு மேலாண்மை வசதிகளை மேம்படுத்துதல்."],
    "Civic Works": ["குடிமைப் பணிகள்", "தூய்மையான மற்றும் பாதுகாப்பான சமூகத்திற்கான அடிப்படை வசதிகளை மேம்படுத்துதல்."],
    "Community Service": ["சமூக சேவை", "மக்களின் தேவைகளைப் புரிந்து கொண்டு அவர்களின் நலனுக்காகப் பணியாற்றுதல்."],
  };

  const focusAreas = COMMITMENTS.length;

  return (
    <section id="plan" className="sec sec-paper plan-section" ref={ref}>
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot" />
            <span>{text("பொது நலன் & வெளிப்படைத்தன்மை", "Public Welfare & Transparency")}</span>
          </div>
          <h2 className="section-title-large">
            {text("பொது நல முன்னுரிமைப் பகுதிகள்", "Public Welfare Focus Areas")}
          </h2>
          <p className="section-sub-text">
            {text("சுகாதாரம், அத்தியாவசிய சேவைகள், குடிநீர், கட்டமைப்பு, குடிமைப் பணிகள் மற்றும் சமூக சேவை ஆகிய ஆறு முன்னுரிமைப் பகுதிகள்.", "Six focus areas supplied for the portfolio: healthcare, essential services, water, infrastructure, civic works, and community service.")}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        <div className="plan-dashboard-grid">
          {/* Left Column: Progress Dial & Accountability Pledge */}
          <div className="plan-summary-card">
            <div className="plan-summary-inner">
              <span className="summary-card-kicker">{text("பொது நலச் சுயவிவரம்", "PUBLIC WELFARE PROFILE")}</span>

              {/* Progress Dial Circle */}
              <div className="progress-dial-box">
                <div className="progress-dial-circle">
                  <span className="progress-dial-val">{seen ? focusAreas : 0}</span>
                  <span className="progress-dial-lbl">{text("முன்னுரிமைகள்", "FOCUS AREAS")}</span>
                </div>
              </div>

              <h3 className="plan-summary-heading">
                {COMMITMENTS.length} {text("பொது நலச் செயல்பாட்டு பகுதிகள்", "Public Welfare Activity Areas")}
              </h3>
              <p className="plan-summary-desc">
                {text("இந்தப் பகுதிகள் போர்ட்ஃபோலியோவிற்காக வழங்கப்பட்ட பொது நல முன்னுரிமைகள். பணிகள் பதிவு செய்யப்படும்போது முன்னேற்றத் தகவல்கள் சேர்க்கப்படும்.", "These are the public welfare priorities provided for the portfolio. Progress updates can be added as work is documented.")}
              </p>

              <div className="plan-metrics-list">
                <div className="plan-metric-pill">
                  <Icon name="checkCircle" size={18} />
                  <span>{text("சுகாதாரம் மற்றும் சமூக ஆதரவு", "Healthcare and community support")}</span>
                </div>
                <div className="plan-metric-pill">
                  <Icon name="clock" size={18} />
                  <span>{text("கட்டமைப்பு மற்றும் அத்தியாவசிய சேவைகள்", "Infrastructure and essential services")}</span>
                </div>
              </div>

              <div className="plan-summary-cta">
                <a
                  href={`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(`Hello, I have a query regarding a public welfare activity:`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-yellow w-full"
                >
                  {text("பொது நலன் குறித்து வினவ", "Ask About Welfare")}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Commitment Progress Bars */}
          <div className="plan-commitments-column">
            <div className="commitments-header-row">
              <span>{text("முக்கிய பொது நலன்", "Welfare Focus Areas")}</span>
              <span className="commitments-tap-hint">{text("விவரத்தைப் பார்க்க எந்த அட்டையையும் கிளிக் செய்யவும்", "Click any card to view the supplied activity detail")}</span>
            </div>

            <div className="bars-list">
              {COMMITMENTS.map((c) => {
                const isOpen = open === c.t;
                const isFullyDone = false;
                return (
                  <div
                    key={c.t}
                    className={`bar-card ${isOpen ? "bar-card-open" : ""}`}
                    onClick={() => setOpen(isOpen ? null : c.t)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setOpen(isOpen ? null : c.t); }}
                    aria-expanded={isOpen}
                  >
                    <div className="bar-card-header">
                      <div className="bar-card-title-group">
                        <span className="bar-category-tag">{isTamil ? "வார்டு நலன்" : c.category || "Ward Civic"}</span>
                        <h4 className="bar-card-title">{isTamil ? commitmentTamil[c.t][0] : c.t}</h4>
                      </div>
                      <div className="bar-card-percent-badge">
                          <b>{c.p === null ? text("முன்னுரிமை", "Focus") : `${c.p}%`}</b>
                        <span className="bar-status-chip">
                          {text("வழங்கப்பட்ட முன்னுரிமை", "Provided in brief")}
                        </span>
                      </div>
                    </div>

                    {/* Visual Meter */}
                    {c.p !== null && (
                      <div
                        className="bar-track"
                        role="progressbar"
                        aria-valuenow={c.p}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`bar-fill ${isFullyDone ? "bar-fill-done" : ""}`}
                          style={{ width: seen ? `${c.p}%` : "0%" }}
                        />
                      </div>
                    )}

                    {/* Expandable Field Inspection Report */}
                    {isOpen && (
                      <div className="bar-expand-note">
                        <div className="expand-note-badge">
                          <Icon name="checkCircle" size={16} />
                          <span>{text("செயல்பாட்டு விவரம்:", "Activity detail:")}</span>
                        </div>
                        <p className="expand-note-text">{isTamil ? commitmentTamil[c.t][1] : c.note}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
