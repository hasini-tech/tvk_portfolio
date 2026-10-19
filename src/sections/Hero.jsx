import { PROFILE } from "../data.js";
import { useLocale } from "../hooks.js";

export default function Hero() {
  const { isTamil, text } = useLocale();
  const tickerItems = isTamil
    ? [
        "🚩 தமிழக வெற்றிக் கழகம்",
        "பிறப்பொக்கும் எல்லா உயிர்க்கும்",
        "மக்களரசியல் இயக்கம் - மக்கள் பணியே என் பணி",
        `24/7 வார்டு உதவி எண்: ${PROFILE.phone}`,
        "மாதாந்திர மக்கள் குறைதீர்ப்பு சபை",
      ]
    : [
        "🚩 Tamilaga Vettri Kazhagam",
        "All people are born equal",
        "People-first politics - Public service is my duty",
        `24/7 Ward Helpline: ${PROFILE.phone}`,
        "Monthly People’s Grievance Sabha",
      ];

  return (
    <section id="top" className="hero-section">
      {/* Cinematic Video Background */}
      <div className="hero-video-wrap">
        <video
          className="hero-video"
          src="/video/Flag_flying_and_human_moving_20261012212428.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-video-overlay" />
        <div className="hero-pattern-mesh" aria-hidden="true" />
      </div>

      <div className="wrap hero-container">
        <div className="hero-grid">
          {/* Left Column: Hero Content & Political Identity */}
          <div className="hero-content">
            {/* TVK Official Party Pill */}
            <div className="hero-party-badge">
              <span className="party-flag-indicator" aria-hidden="true">
                <span className="flag-stripe-red" />
                <span className="flag-stripe-yellow" />
                <span className="flag-stripe-red" />
              </span>
              <span className="party-badge-text">{text(PROFILE.partyTamil, PROFILE.party)}</span>
              <span className="party-badge-sep">•</span>
              <span className="party-badge-en">{isTamil ? PROFILE.constituencyTamil : PROFILE.constituency}</span>
            </div>

            {/* Ideological Slogan */}
            <div className="hero-motto-wrap">
              <span className="hero-motto-quote">“{text(PROFILE.mottoTamil, PROFILE.motto)}”</span>
            </div>

            {/* Candidate / Councillor Title */}
            <div className="hero-title-block">
              <p className="hero-role-tag">
                {text(`${PROFILE.roleTamil} • ${PROFILE.wardTamil}`, `${PROFILE.role} • ${PROFILE.ward}`)}
                <span className="hero-corp-label">({text(PROFILE.corporationTamil, PROFILE.corporation)})</span>
              </p>
              <h1 className="hero-name-title">{text(PROFILE.nameTamil, PROFILE.name)}</h1>
            </div>

            {/* Tagline / Mission */}
            <p className="hero-tagline-text">{text(PROFILE.taglineTamil, PROFILE.tagline)}</p>

            {/* Call To Action Buttons */}
            <div className="hero-cta-group">
              <a className="btn btn-yellow hero-btn-main" href="#contact">
                <span className="btn-icon">⚡</span>
                <span>{text("குறைதீர்ப்பு", "Report Ward Issue")}</span>
              </a>
              <a className="btn btn-ghost" href="#plan">
                <span>{text("100-நாள் திட்டம்", "100-Day Action Plan")}</span>
              </a>
              <a className="btn btn-outline-white" href="#work">
                <span>{text("பணிகள்", "Public Works")}</span>
              </a>
            </div>

            {/* Fast Stats Row */}
            <div className="hero-quick-facts">
              <div className="fact-item">
                <span className="fact-num">10+</span>
                <span className="fact-txt">{text("ஆண்டுகள் அனுபவம்", "Years of Experience")}</span>
              </div>
              <div className="fact-item-divider" />
              <div className="fact-item">
                <span className="fact-num">3</span>
                <span className="fact-txt">{text("TVK உடன் ஆண்டுகள்", "Years with TVK")}</span>
              </div>
              <div className="fact-item-divider" />
              <div className="fact-item">
                <span className="fact-num">6</span>
                <span className="fact-txt">{text("நலத்திட்ட முன்னுரிமைகள்", "Welfare Priorities")}</span>
              </div>
            </div>
          </div>

          {/* Right Column: standalone TVK leader image */}
          <div className="hero-image-column">
            <img
              src="/images/tvkai.jpeg"
              alt={`${PROFILE.name} — TVK Political Representative`}
              className="hero-leader-image"
            />
          </div>
        </div>
      </div>

      {/* Hero Bottom Live Ticker */}
      <div className="hero-bottom-ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span key={`${item}-${index}`}>
              <span className="ticker-item">{item}</span>
              <span className="ticker-star">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
