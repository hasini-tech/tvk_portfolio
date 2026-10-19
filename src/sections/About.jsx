import { useState } from "react";
import { ABOUT, ABOUT_TAMIL, PORTFOLIO_CONTENT, PORTFOLIO_CONTENT_TAMIL, PROFILE } from "../data.js";
import { Tilt, Icon } from "../components/ui.jsx";
import { useLocale } from "../hooks.js";

/* Second image shown under the portrait.
   Set PROFILE.fieldPhoto in data.js, or drop a file at /public/images/ward-work.jpg */
const FIELD_PHOTO = PROFILE.fieldPhoto || "/images/tvkgroup/tvkgroup2.jpeg";

export default function About() {
  const { isTamil, text } = useLocale();
  const [fieldPhotoFailed, setFieldPhotoFailed] = useState(false);

  const initials = PROFILE.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const content = isTamil ? PORTFOLIO_CONTENT_TAMIL : PORTFOLIO_CONTENT;
  const about = isTamil ? ABOUT_TAMIL : ABOUT;

  const profileDetails = isTamil
    ? [
        ["பிறந்த தேதி", "27 ஆகஸ்ட் 1996"],
        ["கல்வித் தகுதி", "டிப்ளமோ"],
        ["அரசியல் பொறுப்பு", PROFILE.roleTamil],
        ["தொகுதி", PROFILE.constituencyTamil],
        ["அனுபவம்", "10+ ஆண்டுகள்; TVK உடன் 3 ஆண்டுகள்"],
        ["கட்சி சின்னம்", "விசில்"],
      ]
    : [
        ["Date of birth", PROFILE.dateOfBirth],
        ["Qualification", PROFILE.qualification],
        ["Political position", PROFILE.politicalPosition],
        ["Constituency", PROFILE.constituency],
        ["Experience", PROFILE.experience],
        ["Party symbol", PROFILE.partySymbol],
      ];

  const commitments = [
    {
      icon: "checkCircle",
      title: text("வார்டு குறைதீர்ப்பு பதிவு", "Ward Grievance Register"),
      desc: text(
        "ஒவ்வொரு புகாரும் அதிகாரப்பூர்வ எண்ணுடன் பதிவு செய்யப்பட்டு 48 மணி நேரத்தில் தீர்வு காணப்படும்.",
        "Every complaint logged with an official ticket number and 48-hour resolution turnaround."
      ),
    },
    {
      icon: "users",
      title: text("மாதாந்திர திறந்த வார்டு சபைகள்", "Monthly Open Ward Sabhas"),
      desc: text(
        "அனைத்து குடியிருப்பாளர்களும் நிலுவைப் பணிகளை ஆய்வு செய்து நிதி ஒதுக்கீடுகளில் பங்கேற்கும் திறந்த மன்றங்கள்.",
        "Live open forums where all residents review pending works and vote on budget allocations."
      ),
    },
    {
      icon: "fileText",
      title: text("ஆண்டு மக்கள் அறிக்கை அட்டை", "Annual Public Report Card"),
      desc: text(
        "செலவிடப்படும் ஒவ்வொரு ரூபாயும் மற்றும் முடிக்கப்பட்ட ஒவ்வொரு பணியும் தணிக்கை செய்யப்படும்.",
        "Every rupee spent and every street work completed is audited and printed for every household."
      ),
    },
  ];

  return (
    <section id="about" className="sec sec-paper about-section" aria-labelledby="about-heading">
      <div className="wrap about-container">
        <div className="section-kicker-row">
          <span className="tvk-pill-accent">
            <span className="tvk-flag-dot" />
            {text("அறிமுகம்", "About the Councillor")}
          </span>
        </div>

        <div className="about-grid">
          {/* ───────── Left column: portrait + field photo ───────── */}
          <div className="about-portrait-wrap about-media-column">
            <Tilt className="portrait-tilt" max={5}>
              <div className="portrait-card-elite">
                <div className="portrait-flag-stripe" aria-hidden="true">
                  <span className="p-stripe-red" />
                  <span className="p-stripe-yellow" />
                  <span className="p-stripe-red" />
                </div>

                <div className="portrait-photo-container">
                  {PROFILE.photo ? (
                    <img
                      src={PROFILE.photo}
                      alt={PROFILE.name}
                      className="portrait-main-photo"
                      width="420"
                      height="525"
                      decoding="async"
                    />
                  ) : (
                    <div className="portrait-ph">
                      <span className="portrait-ph-monogram">{initials}</span>
                      <small>{text("TVK வார்டு பிரதிநிதி", "TVK Ward Representative")}</small>
                    </div>
                  )}

                  <div className="portrait-photo-overlay" />

                  <div className="portrait-ward-badge">
                    <span className="ward-badge-pill">{text(PROFILE.wardTamil, PROFILE.ward)}</span>
                    <span className="ward-badge-name">{text(PROFILE.corporationTamil, PROFILE.corporation)}</span>
                  </div>

                  <div className="portrait-leader-tag">
                    <img src="/images/tvklogo.png" alt="" className="portrait-mini-logo" />
                    <span>{text("TVK அதிகாரப்பூர்வம்", "TVK Official")}</span>
                  </div>
                </div>

                <div className="portrait-card-footer">
                  <div className="portrait-badge-metric">
                    <b>{PROFILE.experienceYears}+</b>
                    <span>{text("ஆண்டுகள் அனுபவம்", "Years of Experience")}</span>
                  </div>
                  <div className="portrait-divider" />
                  <div className="portrait-badge-metric">
                    <b>{PROFILE.tvkExperienceYears}</b>
                    <span>{text("TVK உடன் ஆண்டுகள்", "Years with TVK")}</span>
                  </div>
                </div>
              </div>
            </Tilt>

            {/* NEW: second image – on-the-ground work in the ward */}
            <figure className="about-field-figure">
              <div className="about-field-frame">
                {!fieldPhotoFailed ? (
                  <img
                    src={FIELD_PHOTO}
                    alt={text("வார்டு மக்களுடன் களப்பணியில்", "Out in the ward, meeting residents")}
                    className="about-field-photo"
                    width="420"
                    height="262"
                    loading="lazy"
                    decoding="async"
                    onError={() => setFieldPhotoFailed(true)}
                  />
                ) : (
                  <div className="about-field-ph" role="img" aria-label={text("களப்பணி புகைப்படம்", "Field work photo")}>
                    <Icon name="users" size={28} />
                    <span>{text("களப்பணி புகைப்படம் விரைவில்", "Field photo coming soon")}</span>
                  </div>
                )}
              </div>
              <figcaption className="about-field-caption">
                <strong>{text("களத்தில் மக்களுடன்", "In the ward, with the people")}</strong>
                <span>{text(PROFILE.wardTamil, PROFILE.ward)}</span>
              </figcaption>
            </figure>
          </div>

          {/* ───────── Right column: narrative ───────── */}
          <div className="about-copy-column">
            <header className="about-header-group">
              <blockquote className="about-ta-subtitle">
                {text("“இந்த வார்டில் வளர்ந்தவன், இந்த வார்டு மக்களுக்காகவே வாழ்பவன்”", "“Born in this ward, living for its people”")}
              </blockquote>
              <h2 id="about-heading" className="about-main-heading">
                {text("நான் தஞ்சாவூரைச் சேர்ந்தவன்; அதன் மக்களுக்காகப் பணியாற்றுகிறேன்.", "I am from Thanjavur, and I work for its people.")}
              </h2>
            </header>

            <div className="about-paragraphs">
              {about.map((p, i) => (
                <p className="about-lead-para" key={i}>{p}</p>
              ))}
            </div>

            <dl className="profile-details-grid" aria-label={text("தனிப்பட்ட விவரங்கள்", "Personal details")}>
              {profileDetails.map(([label, value]) => (
                <div className="profile-detail-item" key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <div className="portfolio-content-grid" aria-label={text("தொலைநோக்கு மற்றும் சாதனைகள்", "Vision, mission and achievements")}>
              <article className="portfolio-content-card">
                <h3 className="portfolio-content-label">{text("தொலைநோக்கு", "Vision")}</h3>
                <p>{content.vision}</p>
              </article>
              <article className="portfolio-content-card">
                <h3 className="portfolio-content-label">{text("நோக்கம்", "Mission")}</h3>
                <p>{content.mission}</p>
              </article>
              <article className="portfolio-content-card portfolio-content-card-wide">
                <h3 className="portfolio-content-label">{text("சாதனைகள்", "Achievements")}</h3>
                <p>{content.achievements}</p>
              </article>
            </div>

            <div className="welfare-activities-block">
              <div className="welfare-heading-row">
                <h3 className="about-commitments-title">{text("பொது நலச் செயல்பாடுகள்", "Public Welfare Activities")}</h3>
                <span className="welfare-heading-note">{text("மக்கள் முதலில் • செயல்பாடு எப்போதும்", "People first • Action always")}</span>
              </div>
              <ul className="welfare-activities-grid">
                {content.welfareActivities.map((activity) => (
                  <li className="welfare-activity-card" key={activity.title}>
                    <h4>{activity.title}</h4>
                    <p>{activity.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-commitments-block">
              <h3 className="about-commitments-title">{text("நமது வெளிப்படைத்தன்மை கட்டமைப்பு", "Our Transparency Framework")}</h3>
              <ul className="commitments-cards-row">
                {commitments.map((c) => (
                  <li className="commitment-card" key={c.icon}>
                    <div className="commitment-icon-box" aria-hidden="true">
                      <Icon name={c.icon} size={22} />
                    </div>
                    <div>
                      <h4 className="commitment-card-title">{c.title}</h4>
                      <p className="commitment-card-desc">{c.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-actions-row">
              <a className="btn btn-yellow" href="#contact">
                <span>{text("மாமன்ற உறுப்பினரை சந்திக்க", "Meet Councillor")}</span>
              </a>
              <a className="btn btn-outline" href="#journey">
                <span>{text("எங்கள் பயணத்தைப் பார்க்க", "View Journey Timeline")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}