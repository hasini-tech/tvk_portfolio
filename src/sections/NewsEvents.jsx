import { useState } from "react";
import { ANNOUNCEMENTS, EVENTS, PROFILE } from "../data.js";
import { Icon, Modal } from "../components/ui.jsx";
import { useLocale } from "../hooks.js";

const announcementSummaryEn = {
  "ann-1": "Detailed review of drinking-water and road restoration works, with a public feedback meeting for ward residents.",
  "ann-2": "A new free evening study centre will provide tuition, model papers, and learning materials for government-school students.",
  "ann-3": "A 24-hour rapid-response team has been formed to clear storm-water drains across every street before the monsoon.",
};

const eventDescriptionEn = {
  "evt-1": "Free blood pressure, sugar-level, and eye screening will be provided for senior citizens, along with complimentary spectacles.",
  "evt-2": "Residents can bring street concerns directly to the councillor for discussion and immediate follow-up.",
  "evt-3": "More than 200 native saplings were planted and a local volunteer team took responsibility for their care.",
};

export default function NewsEvents() {
  const { isTamil, text } = useLocale();
  const [tab, setTab] = useState("announcements");
  const [activeModal, setActiveModal] = useState(null);
  const [rsvpList, setRsvpList] = useState({});

  const handleRsvp = (id) => {
    setRsvpList((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="news" className="sec sec-news news-section">
      <div className="wrap">
        {/* Section Header */}
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot" />
            <span>{text("தகவல் & செய்திகள்", "Information Hub")}</span>
          </div>
          <h2 className="section-title-large">
            {text("அதிகாரப்பூர்வ அறிவிப்புகள் மற்றும் வார்டு நிகழ்வுகள்", "Official Announcements & Ward Events")}
          </h2>
          <p className="section-sub-text">
            {text("TVK சுற்றறிக்கைகள், வார்டு வளர்ச்சி அறிவிப்புகள் மற்றும் வரவிருக்கும் மக்கள் கூட்டங்களை அறிந்து கொள்ளுங்கள்.", "Stay updated with official TVK circulars, ward development notices, and upcoming public meetings.")}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        {/* Tab Switcher matching tvkvijay.com */}
        <div className="news-tabs-wrapper">
            <div className="news-tabs-pill" role="tablist" aria-label={text("செய்தி மற்றும் நிகழ்வு தாவல்கள்", "News and Events Tabs")}>
            <button
              className={`news-tab-btn ${tab === "announcements" ? "news-tab-active" : ""}`}
              onClick={() => setTab("announcements")}
              role="tab"
              aria-selected={tab === "announcements"}
              type="button"
            >
              <Icon name="fileText" size={18} />
              <span>{text("அறிவிப்புகள்", "Announcements")}</span>
              <span className="tab-count-badge">{ANNOUNCEMENTS.length}</span>
            </button>

            <button
              className={`news-tab-btn ${tab === "events" ? "news-tab-active" : ""}`}
              onClick={() => setTab("events")}
              role="tab"
              aria-selected={tab === "events"}
              type="button"
            >
              <Icon name="calendar" size={18} />
              <span>{text("நிகழ்ச்சிகள்", "Events")}</span>
              <span className="tab-count-badge">{EVENTS.length}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Official Announcements */}
        {tab === "announcements" && (
          <div className="announcements-grid" role="tabpanel">
            {ANNOUNCEMENTS.map((ann) => (
              <article key={ann.id} className="ann-card">
                <div className="ann-date-block">
                  <span className="ann-day">{ann.date}</span>
                  <span className="ann-month">{isTamil ? ann.monthYear : ann.dateEn}</span>
                </div>

                <div className="ann-content">
                  <div className="ann-meta-row">
                    <span className="ann-category-tag">{isTamil ? ann.category : ann.tag}</span>
                    <span className="ann-official-seal">✓ {text("TVK செய்தி சுற்றறிக்கை", "TVK Press Circular")}</span>
                  </div>

                  <h3 className="ann-title-ta">{isTamil ? ann.title : ann.titleEn}</h3>
                  <p className="ann-summary">{isTamil ? ann.summary : announcementSummaryEn[ann.id]}</p>

                  <div className="ann-action-row">
                    <button
                      className="btn btn-outline ann-btn"
                      onClick={() => setActiveModal(ann)}
                      type="button"
                    >
                      <Icon name="fileText" size={16} />
                      <span>{text("முழு அறிக்கை", "Read Press Release")}</span>
                    </button>
                    <a
                      href={`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(`${PROFILE.party} ${PROFILE.constituency}: ${ann.title} - ${ann.summary}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="ann-share-link"
                      title="Share on WhatsApp"
                    >
                      <span>{text("பகிர", "Share")}</span>
                      <Icon name="external" size={14} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Tab 2: Ward Events & Campaigns */}
        {tab === "events" && (
          <div className="events-grid" role="tabpanel">
            {EVENTS.map((evt) => {
              const hasRsvp = !!rsvpList[evt.id];
              return (
                <article key={evt.id} className="evt-card">
                  <div className="evt-header">
                    <div className="evt-date-badge">
                      <span className="evt-day">{evt.date}</span>
                    <span className="evt-month">{isTamil ? evt.monthYear : evt.dateEn}</span>
                    </div>
                    <span className="evt-tag">{evt.tag}</span>
                  </div>

                  <div className="evt-body">
                    <h3 className="evt-title-ta">{isTamil ? evt.title : evt.titleEn}</h3>

                    <div className="evt-info-list">
                      <div className="evt-info-item">
                        <Icon name="clock" size={16} />
                        <span>{evt.time}</span>
                      </div>
                      <div className="evt-info-item">
                        <Icon name="mapPin" size={16} />
                        <span>{isTamil ? evt.location : evt.locationEn}</span>
                      </div>
                      <div className="evt-info-item">
                        <Icon name="users" size={16} />
                        <span>{evt.attendees}</span>
                      </div>
                    </div>

                    <p className="evt-desc">{isTamil ? evt.desc : eventDescriptionEn[evt.id]}</p>
                  </div>

                  <div className="evt-footer">
                    <button
                      className={`btn ${hasRsvp ? "btn-yellow" : "btn-red"} w-full`}
                      onClick={() => handleRsvp(evt.id)}
                      type="button"
                    >
                      {hasRsvp ? `✓ ${text("பங்களிப்பு பதிவு செய்யப்பட்டது", "Registered")}` : text("பங்கேற்கிறேன்", "RSVP to Attend")}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Modal for viewing announcement details */}
        {activeModal && (
          <Modal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            title={isTamil ? activeModal.title : activeModal.titleEn}
            subtitle={`${isTamil ? activeModal.category : activeModal.tag} • ${activeModal.date} ${isTamil ? activeModal.monthYear : activeModal.dateEn}`}
          >
            <div className="modal-press-release">
              <div className="modal-press-header">
                <img src="/images/tvklogo.png" alt="TVK Logo" width="56" height="56" style={{ borderRadius: '50%' }} />
                <div>
                  <h4 className="modal-org-title">{isTamil ? PROFILE.partyTamil : PROFILE.party}</h4>
                  <p className="modal-org-sub">{isTamil ? PROFILE.wardTamil : PROFILE.ward} • {isTamil ? PROFILE.corporationTamil : PROFILE.corporation}</p>
                </div>
              </div>

              <div className="modal-divider-flag" />

              <div className="modal-press-body">
                <h3 className="modal-doc-title">{isTamil ? activeModal.title : activeModal.titleEn}</h3>
                <p className="modal-doc-lead">{isTamil ? activeModal.summary : announcementSummaryEn[activeModal.id]}</p>
                <div className="modal-doc-full">
                  {isTamil ? (
                    <>
                      <p>தமிழக வெற்றிக் கழகத் தலைவர் விஜய் அவர்களின் வழிகாட்டுதலின்படி, நமது வார்டில் நடைபெறும் அனைத்து மக்கள் நலப் பணிகளும் முழுமையான வெளிப்படைத்தன்மையுடன் செயல்படுத்தப்படுகின்றன.</p>
                      <p>பொதுமக்கள் தங்கள் கருத்துக்கள், புகார்கள் அல்லது ஆலோசனைகளை வார்டு அலுவலகத்திலோ அல்லது 24 மணி நேர WhatsApp உதவி எண்ணிலோ பதிவு செய்யலாம்.</p>
                    </>
                  ) : (
                    <>
                      <p>Under the guidance of TVK leader Vijay, all public-welfare work in our ward is being carried out with complete transparency.</p>
                      <p>Residents may share feedback, complaints, or suggestions directly with the ward office or through the 24-hour WhatsApp helpline.</p>
                    </>
                  )}
                </div>

                <div className="modal-signoff">
                  <p>{isTamil ? "இவண்," : "Regards,"}</p>
                  <b>{isTamil ? PROFILE.nameTamil : PROFILE.name}</b>
                  <span>{isTamil ? PROFILE.roleTamil : PROFILE.role}, {isTamil ? PROFILE.wardTamil : PROFILE.ward}</span>
                  <span>{isTamil ? PROFILE.partyTamil : PROFILE.party}</span>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
}
