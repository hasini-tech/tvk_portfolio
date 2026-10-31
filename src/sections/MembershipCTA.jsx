import { useState } from "react";
import { PROFILE } from "../data.js";
import { Modal, Icon } from "../components/ui.jsx";
import { useStored } from "../hooks.js";
import { useLocale } from "../hooks.js";

export default function MembershipCTA() {
  const { text } = useLocale();
  const [openModal, setOpenModal] = useState(false);
  const [members, setMembers] = useStored("tvk-ward-members", []);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    wing: "General Volunteer",
  });
  const [joinedTicket, setJoinedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMember = {
      id: "TVK-M-" + Math.floor(100000 + Math.random() * 900000),
      ...formData,
      joinedAt: new Date().toLocaleDateString("en-IN"),
    };
    setMembers([newMember, ...members]);
    setJoinedTicket(newMember);
  };

  return (
    <section id="join" className="membership-section">
      <div className="wrap">
        <div className="membership-banner">
          <div className="membership-bg-glow" aria-hidden="true" />

          <div className="membership-content">
            <div className="membership-badge">
              <span className="star-icon">★</span>
              <span>{text("கழக உறுப்பினராக உறுதிபூணுங்கள்", "Volunteer With Us")}</span>
            </div>

            <h2 className="membership-title">
              {text("முன்னேற்றமான வார்டு மற்றும் தமிழகத்திற்கான மக்கள் முன்னுரிமை இயக்கத்தில் இணையுங்கள்", "Join the People-First Movement for a Progressive Ward & Tamil Nadu")}
            </h2>

            <p className="membership-desc">
              {text("அரசியல் பார்வையாளர்களுக்கான விளையாட்டு அல்ல. எங்கள் களப்பணி அணியில் இணைந்து, உள்ளூர் குடிமைத் தணிக்கைகளை வழிநடத்தி, ஒவ்வொரு பகுதியிலும் சமூக நீதியை முன்னெடுங்கள்.", "Politics is not a spectator sport. Be a part of our grassroots team, lead local civic audits, and champion social justice in every neighborhood.")}
            </p>

            <div className="membership-benefits-row">
              <div className="benefit-item">
                <Icon name="shield" size={20} />
                <span>{text("ஊழல் எதிர்ப்பு குடிமைத் தணிக்கைகள்", "Anti-Corruption Civic Audits")}</span>
              </div>
              <div className="benefit-item">
                <Icon name="school" size={20} />
                <span>{text("மாலை கல்வி மைய வழிகாட்டுதல்", "Evening Study Center Mentorship")}</span>
              </div>
              <div className="benefit-item">
                <Icon name="health" size={20} />
                <span>{text("அவசர இரத்தம் மற்றும் நிவாரணப் பிரிவு", "Emergency Blood & Relief Cell")}</span>
              </div>
            </div>

            <div className="membership-cta-row">
              <button
                className="btn btn-yellow membership-btn"
                onClick={() => setOpenModal(true)}
                type="button"
              >
                <span>{text("வார்டு தன்னார்வலராக இணைய", "Join as Ward Volunteer")}</span>
                <span aria-hidden="true">→</span>
              </button>
              <a
                href={`https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(`வணக்கம், TVK ${PROFILE.ward} வார்டு தன்னார்வலராக இணைய விரும்புகிறேன்:`)}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost"
              >
                <span>{text("WhatsApp குழுவில் இணைய", "Join WhatsApp Cell")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Volunteer Registration Modal */}
      {openModal && (
        <Modal
          isOpen={true}
          onClose={() => {
            setOpenModal(false);
            setJoinedTicket(null);
          }}
          title={joinedTicket ? text("உறுப்பினர் சேர்க்கை வெற்றி", "Welcome to TVK!") : text("கழக உறுப்பினராக இணையுங்கள்", "Join the Movement")}
          subtitle={`${text("தன்னார்வலர் பதிவு", "Volunteer Registration")} • ${PROFILE.constituency}`}
        >
          {joinedTicket ? (
            <div className="membership-success-card">
              <div className="membership-card-top">
                <img src="/images/tvklogo.png" alt="TVK Logo" width="60" height="60" style={{ borderRadius: '50%' }} />
                <div>
                  <h4 className="card-party-name">{text(PROFILE.partyTamil, PROFILE.party)}</h4>
                  <p className="card-party-sub">{text("அதிகாரப்பூர்வ வார்டு தன்னார்வலர் சான்றிதழ்", "Official Ward Volunteer Certificate")}</p>
                </div>
              </div>

              <div className="membership-card-body">
                <div className="card-member-row">
                <span>{text("உறுப்பினர் பெயர்", "Member Name")}:</span>
                  <b>{joinedTicket.name}</b>
                </div>
                <div className="card-member-row">
                <span>{text("தன்னார்வலர் எண்", "Volunteer ID")}:</span>
                  <b className="text-gold">{joinedTicket.id}</b>
                </div>
                <div className="card-member-row">
                <span>{text("பிரிவு", "Wing")}:</span>
                  <b>{joinedTicket.wing}</b>
                </div>
                <div className="card-member-row">
                <span>{text("வார்டு", "Ward")}:</span>
                  <b>{joinedTicket.area || PROFILE.ward}</b>
                </div>
                <div className="card-member-row">
                <span>{text("வழங்கிய தேதி", "Issued Date")}:</span>
                  <b>{joinedTicket.joinedAt}</b>
                </div>
              </div>

              <p className="card-congrats-text">
                {text(`நல்வரவு, ${joinedTicket.name}! நீங்கள் தமிழக வெற்றிக் கழகத்தின் வார்டு தன்னார்வலராக இணைந்துள்ளீர்கள்.`, `Welcome, ${joinedTicket.name}! You have joined the TVK ward volunteer team.`)}
              </p>

              <button
                className="btn btn-yellow w-full"
                onClick={() => {
                  setOpenModal(false);
                  setJoinedTicket(null);
                }}
                type="button"
              >
                {text("நன்றி", "Done")}
              </button>
            </div>
          ) : (
            <form className="membership-form" onSubmit={handleSubmit}>
              <p className="form-info-note">
                {text("எங்கள் வார்டு குடிமைப் பணிக் குழுவில் இணைய கீழே உங்கள் விவரங்களை நிரப்புங்கள். அனைத்து தகவல்களும் ரகசியமானவை.", "Fill in your details below to join our ward civic action group. All fields are confidential.")}
              </p>

              <label className="form-field">
                <span>{text("உங்கள் பெயர்", "Full Name")} *</span>
                <input
                  required
                  placeholder="e.g. Anand Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>{text("தொலைபேசி எண்", "Mobile Number")} *</span>
                <input
                  required
                  inputMode="tel"
                  pattern="[0-9+\s]{10,15}"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>{text("மின்னஞ்சல்", "Email Address")}</span>
                <input
                  type="email"
                  placeholder="e.g. anand@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>{text("தெரு அல்லது பகுதி", "Street or Area")} *</span>
                <input
                  required
                  placeholder="e.g. 4th Street, Anna Nagar"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>{text("விருப்பமுள்ள பிரிவு", "Volunteer Wing")}</span>
                <select
                  value={formData.wing}
                  onChange={(e) => setFormData({ ...formData, wing: e.target.value })}
                >
                  <option value="General Volunteer">{text("பொது களப்பணி", "General Ward Volunteer")}</option>
                  <option value="Youth Wing">{text("இளைஞரணி", "Youth Wing")}</option>
                  <option value="Women's Empowerment">{text("மகளிர் அணி", "Women's Empowerment")}</option>
                  <option value="Education Tutor">{text("கல்விப் பணி", "Education & Study Center Tutor")}</option>
                  <option value="Emergency Medical">{text("அவசர உதவி", "Emergency Medical & Blood Bank")}</option>
                  <option value="Media Cell">{text("ஊடக அணி", "Social Media & Media Cell")}</option>
                </select>
              </label>

              <div className="form-actions-row">
                <button type="submit" className="btn btn-red w-full">
                  {text("உறுப்பினராக இணைய", "Submit Registration")}
                </button>
              </div>
            </form>
          )}
        </Modal>
      )}
    </section>
  );
}
