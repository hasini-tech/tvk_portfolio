import { useState } from "react";
import { ISSUE_TYPES, PROFILE } from "../data.js";
import { useStored, useLocale } from "../hooks.js";
import { Tilt, Icon } from "../components/ui.jsx";

const ticketId = () =>
  "TH-" +
  Math.random().toString(36).slice(2, 7).toUpperCase();

export default function Contact() {
  const { isTamil, text } = useLocale();
  const issueTamil = {
    "Water supply & pipelines": "குடிநீர் வழங்கல் மற்றும் குழாய்கள்",
    "Road potholes or damaged pavement": "சாலை பள்ளங்கள் அல்லது சேதமடைந்த பாதை",
    "Street light not working": "தெருவிளக்கு வேலை செய்யவில்லை",
    "Storm water drain / flooding": "மழைநீர் வடிகால் / வெள்ளம்",
    "Garbage clearance & sanitation": "குப்பை அகற்றுதல் மற்றும் தூய்மை",
    "Pensions, schemes & certificate help": "ஓய்வூதியம், திட்டங்கள் மற்றும் சான்றிதழ் உதவி",
    "Tree trimming / public safety": "மரக்கிளை வெட்டுதல் / பொது பாதுகாப்பு",
    "Other ward assistance": "பிற வார்டு உதவி",
  };
  const empty = { name: "", phone: "", type: ISSUE_TYPES[0], msg: "" };
  const [form, setForm] = useState(empty);
  const [last, setLast] = useState(null);
  const [tickets, setTickets] = useStored("ward-tickets", []);
  const [q, setQ] = useState("");
  const [found, setFound] = useState(undefined);
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const newId = ticketId();
    const ticket = {
      id: newId,
      ...form,
      date: new Date().toLocaleDateString("en-IN"),
      status: "Received",
      timeline: [
        { label: "Grievance Logged", time: "Just now", done: true },
        { label: "Verification by Ward Team", time: "Within 12h", done: false },
        { label: "Field Officer Assigned", time: "Within 24h", done: false },
        { label: "Problem Resolved", time: "Within 48h SLA", done: false },
      ],
    };
    setTickets([ticket, ...tickets].slice(0, 25));
    setLast(ticket);
    setForm(empty);
  };

  const track = (e) => {
    e.preventDefault();
    const query = q.trim().toUpperCase();
    if (!query) return;
    setFound(tickets.find((t) => t.id === query) || null);
  };

  const copyTicket = (id) => {
    navigator.clipboard?.writeText?.(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wa = `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
    `வணக்கம் ${PROFILE.name}, எனது வார்டு புகார்:\nபிரிவு: ${form.type}\nவிவரம்: ${form.msg}\nபெயர்: ${form.name || "பொதுமகன்"}`
  )}`;

  return (
    <section id="contact" className="sec !bg-white !text-tvk-ink contact-section" style={{ background: "#fff" }}>
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot dot-red" />
            <span>{text("குறைதீர்ப்பு & தொடர்பு", "Grievance Redressal")}</span>
          </div>
          <h2 className="section-title-large !text-tvk-red">
            {text("உங்கள் தெருவில் சரிசெய்ய வேண்டியது என்ன?", "Tell Me What Needs Fixing in Your Street")}
          </h2>
          <p className="section-sub-text !text-tvk-ink-muted">
            {text("ஒவ்வொரு குடிமக்கள் மனுவும் வார்டு பதிவேட்டில் பதிவு செய்யப்பட்டு, கண்காணிப்பு எண்ணுடன் நிறைவேறும் வரை ஆய்வு செய்யப்படும்.", "Every citizen petition is directly recorded in our ward register, assigned a tracking number, and audited until completed.")}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        <div className="contact-grid-main">
          {/* Left Column: Office Contacts & Complaint Tracking */}
          <div className="contact-info-column">
            <div className="office-card !bg-white !text-tvk-ink [&_*]:!text-tvk-ink">
              <h3 className="office-card-title">{text("வார்டு அலுவலகத் தொடர்பு", "Ward Office Coordinates")}</h3>
              <p className="office-card-sub">{text("நேரடியாக வந்து சந்திக்கலாம் அல்லது தொடர்பு கொள்ளலாம்", "Visit us directly or contact the office")}</p>

              <ul className="contact-info-list">
                <li className="contact-info-row">
                  <div className="info-icon-box">
                    <Icon name="phone" size={18} />
                  </div>
                  <div>
                    <b>{text("ஹெல்ப்லைன்", "Phone")}</b>
                    <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>{PROFILE.phone}</a>
                    {PROFILE.alternatePhone && (
                      <a href={`tel:${PROFILE.alternatePhone.replace(/\s/g, "")}`}>
                        {PROFILE.alternatePhone}
                      </a>
                    )}
                  </div>
                </li>

                <li className="contact-info-row">
                  <div className="info-icon-box">
                    <Icon name="mail" size={18} />
                  </div>
                  <div>
                    <b>{text("மின்னஞ்சல்", "Email")}</b>
                    <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                  </div>
                </li>

                <li className="contact-info-row">
                  <div className="info-icon-box">
                    <Icon name="mapPin" size={18} />
                  </div>
                  <div>
                    <b>{text("அலுவலக முகவரி", "Office")}</b>
                    <span>{PROFILE.office}</span>
                  </div>
                </li>

                <li className="contact-info-row">
                  <div className="info-icon-box">
                    <Icon name="clock" size={18} />
                  </div>
                  <div>
                    <b>{text("செயல்படும் நேரம்", "Working Hours")}</b>
                    <span>{PROFILE.hours}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Ticket Tracking Dashboard */}
            <div className="ticket-tracker-box !bg-white !text-tvk-ink [&_*]:!text-tvk-ink">
              <h4 className="tracker-heading">
                <Icon name="checkCircle" size={18} />
                <span>{text("புகார் நிலையை அறிய", "Track Ticket Status")}</span>
              </h4>
              <p className="tracker-sub">{text("இந்த சாதனத்தில் உருவாக்கப்பட்ட புகார் எண்ணை உள்ளிட்டு முன்னேற்றத்தைப் பார்க்கவும்.", "Enter the ticket number generated on this device to check live progress.")}</p>

              <form className="track-form-row" onSubmit={track}>
                <input
                  id="trk"
                  placeholder="e.g. TH-ABC12"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="tracker-input"
                  aria-label="Enter Ticket number"
                />
                <button className="btn btn-yellow track-btn" type="submit">
                  {text("சரிபார்க்க", "Check")}
                </button>
              </form>

              {found && (
                <div className="track-result-card">
                  <div className="result-top">
                    <span className="result-id">{found.id}</span>
                    <span className="result-status-badge">{found.status || "Received"}</span>
                  </div>
                  <p className="result-meta">
                    <b>பிரிவு:</b> {found.type} • <b>தேதி:</b> {found.date}
                  </p>
                  {found.msg && <p className="result-msg">“{found.msg}”</p>}

                  {/* Status Timeline */}
                  <div className="result-timeline">
                    <div className="res-tl-item tl-done">
                      <span className="res-tl-dot">✓</span>
                    <span>{text("பெறப்பட்டு பதிவு செய்யப்பட்டது", "Received & Logged")}</span>
                    </div>
                    <div className="res-tl-item tl-active">
                      <span className="res-tl-dot">⏳</span>
                    <span>{text("களப்பணிக் குழுவிடம் ஒப்படைக்கப்பட்டது", "Assigned to Field Team")}</span>
                    </div>
                    <div className="res-tl-item">
                      <span className="res-tl-dot">○</span>
                    <span>{text("தீர்வு மற்றும் குடிமக்கள் சரிபார்ப்பு", "Resolution & Citizen Verification")}</span>
                    </div>
                  </div>
                </div>
              )}

              {found === null && (
                <div className="track-not-found">
                    <span>{text(`⚠️ "${q}" என்ற புகார் எண் கிடைக்கவில்லை. எண்ணைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.`, `⚠️ No ticket found with ID "${q}". Please check the number and try again.`)}</span>
                </div>
              )}

              {/* Recent tickets list */}
              {tickets.length > 0 && !found && (
                <div className="recent-tickets-tray">
                    <span className="recent-tickets-label">{text("இந்த சாதனத்தில் சமீபத்தில் பதிவு செய்யப்பட்ட புகார்கள்:", "Recently logged tickets on this device:")}</span>
                  <div className="recent-chips-list">
                    {tickets.slice(0, 4).map((t) => (
                      <button
                        key={t.id}
                        className="recent-chip"
                        onClick={() => {
                          setQ(t.id);
                          setFound(t);
                        }}
                        type="button"
                      >
                        {t.id} ({t.type})
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Complaint Registration Form */}
          <div className="contact-form-column">
            <Tilt className="form-tilt" max={4}>
              {last ? (
                <div className="form-card form-done-card">
                  <div className="done-badge-icon">✓</div>
                  <h3 className="done-heading">{text("நன்றி", "Thank You")}, {last.name}!</h3>
                  <p className="done-lead">
                    {text("உங்கள் புகார் அதிகாரப்பூர்வ மக்கள் சேவை பதிவேட்டில் பதிவு செய்யப்பட்டது. எங்கள் கள ஆய்வாளர் உங்கள் தெருவை விரைவில் ஆய்வு செய்வார்.", <>Your <b>{last.type}</b> grievance has been logged into the official public-service register. Our municipal field inspector will inspect your street promptly.</>)}
                  </p>

                  <div className="ticket-box-elite">
                    <div className="ticket-box-header">
                      <span>{text("அதிகாரப்பூர்வ குடிமக்கள் புகார் சீட்டு", "OFFICIAL CITIZEN COMPLAINT TICKET")}</span>
                      <small>{text("SLA: 48 மணி நேரத் தீர்வு", "SLA: 48 Hours Resolution")}</small>
                    </div>
                    <div className="ticket-number-row">
                      <b className="ticket-number-val">{last.id}</b>
                      <button
                        className="btn-copy"
                        onClick={() => copyTicket(last.id)}
                        type="button"
                      >
                        {copied ? "✓ Copied!" : "📋 Copy ID"}
                      </button>
                    </div>
                    <p className="ticket-box-note">
                      {text("இந்த எண்ணை சேமிக்கவும். புதுப்பிப்பு SMS அனுப்பப்படும்:", "Save this number. An update SMS will be sent to")} <strong>{last.phone}</strong>.
                    </p>
                  </div>

                  <div className="done-action-buttons">
                    <button className="btn btn-yellow" onClick={() => setLast(null)} type="button">
                      + {text("மற்றொரு புகார் பதிவு செய்ய", "Log Another")}
                    </button>
                    <a
                      className="btn btn-outline-white"
                      href={`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(
                        `வணக்கம், எனது புகார் எண்: ${last.id} (${last.type}). அவசரமாக கவனிக்கக் கோருகிறேன்.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp நேரடி தகவல்
                    </a>
                  </div>
                </div>
              ) : (
                <form className="form-card" onSubmit={submit}>
                  <div className="form-heading-row">
                <h3 className="form-title">{text("மனு பதிவு", "Register a Complaint")}</h3>
                    <span className="form-privacy-badge">🔒 100% Confidential</span>
                  </div>

                  <label className="form-label">
                    <span>{text("உங்கள் பெயர்", "Your Full Name")} *</span>
                    <input
                      required
                      placeholder="e.g. S. Muthuvel"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </label>

                  <label className="form-label">
                    <span>{text("தொலைபேசி எண்", "Phone Number")} *</span>
                    <input
                      required
                      inputMode="tel"
                      pattern="[0-9+\s]{10,15}"
                      title="Enter a valid 10-digit phone number"
                      placeholder="e.g. 98401 23456"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </label>

                  <label className="form-label">
                    <span>{text("புகார் வகை", "Type of Issue")} *</span>
                    <select value={form.type} onChange={set("type")}>
                      {ISSUE_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {isTamil ? issueTamil[t] : t}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="form-label">
                    <span>{text("தெரு பெயர் மற்றும் விவரங்கள்", "Street Name & Details")} *</span>
                    <textarea
                      required
                      rows={4}
                      maxLength={400}
                      placeholder={text("தெரு பெயர், கதவு எண், அடையாளம் மற்றும் பிரச்சினையின் தன்மையை குறிப்பிடவும்...", "Please specify street name, door number landmark, and the nature of the issue...")}
                      value={form.msg}
                      onChange={set("msg")}
                    />
                    <small className="form-char-count">{form.msg.length}/400</small>
                  </label>

                  <div className="form-submit-row">
                    <button type="submit" className="btn btn-yellow form-submit-btn">
                      <span>{text("மனு அனுப்புக", "Submit Grievance")}</span>
                      <span aria-hidden="true">→</span>
                    </button>
                    <a
                      className="btn btn-outline-white form-wa-btn"
                      href={wa}
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp மூலம் அனுப்ப
                    </a>
                  </div>
                </form>
              )}
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
