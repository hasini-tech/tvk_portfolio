import { PROFILE, NAV_ITEMS } from "../data.js";
import { useLocale } from "../hooks.js";

export default function Footer() {
  const { isTamil, text } = useLocale();
  return (
    <footer className="tvk-footer !bg-white !text-tvk-ink [&_*]:!text-tvk-ink" style={{ background: "#fff" }}>
      {/* Official Party Flag Ribbon */}
      <div className="footer-flag-banner" aria-hidden="true">
        <span className="ff-stripe-red" />
        <span className="ff-stripe-yellow" />
        <span className="ff-stripe-red" />
      </div>

      <div className="wrap footer-content">
        <div className="footer-columns-grid">
          {/* Column 1: TVK Emblem & Ideology */}
          <div className="footer-col-brand">
            <div className="footer-logo-row">
              <img
                src="/images/tvklogo.png"
                alt="TVK Official Logo"
                className="footer-logo-img"
              />
              <div>
        <h3 className="footer-party-title">{isTamil ? PROFILE.partyTamil : PROFILE.party}</h3>
        <p className="footer-party-en">{isTamil ? PROFILE.constituencyTamil : PROFILE.constituency}</p>
              </div>
            </div>

            <p className="footer-motto-callout">
              “{isTamil ? PROFILE.mottoTamil : PROFILE.motto}”
            </p>

            <p className="footer-brand-desc">
              {text("மதச்சார்பற்ற சமூக நீதி, பெண்கள் முன்னேற்றம், தூய்மையான நிர்வாகம் மற்றும் தமிழகத்தின் ஒவ்வொரு பகுதியிலும் அளவிடக்கூடிய முன்னேற்றத்திற்காக அர்ப்பணிப்பு.", "Dedicated to secular social justice, women empowerment, clean governance, and measurable progress across every neighborhood of Tamil Nadu.")}
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col-nav">
            <h4 className="footer-col-heading">{text("பிரிவுகள்", "Quick Links")}</h4>
            <ul className="footer-nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="footer-nav-link">
                    <span className="footer-link-dot">›</span>
                    <span>{isTamil ? item.ta : item.en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Ward Office & Party HQ */}
          <div className="footer-col-contact">
            <h4 className="footer-col-heading">{text("தொடர்பு", "Official Headquarters")}</h4>
            <div className="footer-office-block">
              <p className="footer-office-title">🏛 {text("தலைமை நிலையம்", "Party Central HQ")}:</p>
              <p className="footer-office-text">{PROFILE.hq}</p>
            </div>

            <div className="footer-office-block">
              <p className="footer-office-title">📍 {text("வார்டு அலுவலகம்", "Ward Office")}:</p>
              <p className="footer-office-text">{PROFILE.office}</p>
            </div>

            <div className="footer-office-block">
              <p className="footer-office-title">📞 {text("அவசர உதவி எண்", "Helpline")}:</p>
              <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="footer-helpline-link">
                {PROFILE.phone}
              </a>
            </div>
          </div>

          {/* Column 4: Official Social Channels from tvkvijay.com */}
          <div className="footer-col-social">
            <h4 className="footer-col-heading">{text("சமூக ஊடகம்", "Social Media")}</h4>
            <p className="footer-social-desc">
              {text("அதிகாரப்பூர்வ சமூக ஊடக இணைப்புகள் வழங்கப்படும் போது இங்கே சேர்க்கப்படும்.", "Official social media links will be added here when provided.")}
            </p>

            <div className="footer-social-buttons">
              {PROFILE.social.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-social-pill"
                >
                  <span className="social-pill-star">★</span>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>

            <div className="footer-sabha-reminder">
              <span className="sabha-bell">🔔</span>
              <span>
                {isTamil ? <><strong>மாதாந்திர மக்கள் சபை:</strong> ஒவ்வொரு மாதமும் முதல் சனிக்கிழமை மாலை 4 மணி.</> : <><strong>Monthly People’s Sabha:</strong> First Saturday of every month at 4 PM.</>}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="footer-bottom-left">
            <p>
              © {new Date().getFullYear()} {isTamil ? PROFILE.partyTamil : PROFILE.party} • {isTamil ? PROFILE.nameTamil : PROFILE.name} ({isTamil ? PROFILE.wardTamil : PROFILE.ward}, {isTamil ? PROFILE.corporationTamil : PROFILE.corporation}).
            </p>
            <p className="footer-sub-text">
              {text("மக்கள் பணியே என் பணி • தமிழக மக்களுக்கு பெருமையுடனும் வெளிப்படைத்தன்மையுடனும் சேவை.", "Public service is my duty • Serving the citizens of Tamil Nadu with pride and transparency.")}
            </p>
          </div>

          <div className="footer-bottom-right">
            <a href="#top" className="footer-back-top">
              <span>{text("மேலே செல்க", "Back to Top")}</span>
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
