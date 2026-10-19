import { STATS, HIGHLIGHTS } from "../data.js";
import { useInView, useLocale } from "../hooks.js";
import { CountUp, Tilt, Icon } from "../components/ui.jsx";

export default function Impact() {
  const [ref, seen] = useInView(0.2);
  const { isTamil, text } = useLocale();
  const statLabelsTamil = ["ஆண்டுகள் அனுபவம்", "TVK உடன் ஆண்டுகள்", "பொது நலச் செயல்பாடுகள்", "தஞ்சாவூர் தொகுதி"];
  const highlightTamil = [
    ["தூய்மை மற்றும் பாதுகாப்பு", "வளர்ச்சியடைந்த வளமான சமூகம்"],
    ["எதிர்கால வளர்ச்சி", "புதிய வணிக மற்றும் வருமான வாய்ப்புகள்"],
    ["கட்சி சின்னம்", "தமிழக வெற்றிக் கழகம்"],
    ["கட்சி நிறங்கள்", "மெரூன் மற்றும் மஞ்சள்"],
  ];

  return (
    <section id="impact" className="sec !bg-white !text-tvk-ink sec-impact" style={{ background: "#fff" }} ref={ref}>
      <div className="impact-pattern-backdrop hidden" aria-hidden="true" />
      <div className="wrap impact-container">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot dot-red" />
            <span>{text("களப்பணி மற்றும் சாதனைகள்", "Field Results")}</span>
          </div>
          <h2 className="section-title-large !text-tvk-red">
            {text("அனுபவம் மற்றும் பொது நல முன்னுரிமைகள்", "Experience & Public Welfare Priorities")}
          </h2>
          <p className="section-sub-text !text-tvk-ink-muted">
            {text("அனுபவம், கட்சி அடையாளம் மற்றும் மக்கள் நல முன்னுரிமைகளின் தெளிவான சுயவிவரம்.", "A clear profile of experience, party identity, and the priorities shared in the client brief.")}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        {/* 4 Main Interactive Counter Cards */}
        <div className="stats-grid">
          {STATS.map((s, idx) => (
            <Tilt key={s.label} className="stat-card" max={12}>
              <div className="stat-card-inner !bg-white !text-tvk-ink [&_*]:!text-tvk-ink">
                <div className="stat-header">
                  <div className="stat-icon-wrapper">
                    <Icon name={s.icon || "award"} size={26} />
                  </div>
                  <span className="stat-rank-tag !text-tvk-ink/50">0{idx + 1}</span>
                </div>

                <div className="stat-num lift">
                  <CountUp to={s.n} suffix={s.suffix} start={seen} />
                </div>

                <p className="stat-label lift2 !text-tvk-ink">{isTamil ? statLabelsTamil[idx] : s.label}</p>

                <div className="stat-card-bar" aria-hidden="true">
                  <span className="stat-bar-fill" style={{ width: seen ? "100%" : "0%" }} />
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        {/* Accountability Highlights Strip */}
        <div className="impact-highlights-strip">
          <div className="highlights-header">
            <span className="highlights-title-badge">{text("பொறுப்புணர்வு மற்றும் விரைவு சேவை", "ACCOUNTABILITY & SPEED OF SERVICE")}</span>
          </div>
          <div className="highlights-grid">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="highlight-item">
                <span className="highlight-val">{isTamil ? highlightTamil[idx][0] : h.value}</span>
                <b className="highlight-lbl">{isTamil ? highlightTamil[idx][0] : h.label}</b>
                <small className="highlight-desc">{isTamil ? highlightTamil[idx][1] : h.desc}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
