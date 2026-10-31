import { PROFILE, NAV_ITEMS } from "../data.js";
import { useLocale } from "../hooks.js";

/* ---------- Change these two if needed ---------- */
const WATERMARK_TEXT = "Thanjavur";          // big faded text under the yellow bar
const DEVELOPER = {
  name: "Techvaseegrah",
  href: "https://techvaseegrah.com",         // replace with the real site
};

const RED = "#9e1515";
const YELLOW = "#FFCC00";
const CREAM = "#F6F4F1";

const css = `
.ft-wrap { background:${CREAM}; position:relative; overflow:hidden; }

/* ---------- Top block (image left, CTA + red panel right) ---------- */
.ft-top {
  max-width: 1365px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  align-items: end; min-height: 470px;
  padding-top: 60px;
}
.ft-leader { align-self: end; line-height: 0; }
.ft-leader img {
  width: 100%; max-width: 640px; height: auto; display: block;
  margin-left: 0; object-fit: contain; object-position: bottom left;
}
.ft-right { display:flex; flex-direction:column; }
.ft-title {
  font-family: var(--font-heading);
  font-weight: 500; color:${RED}; line-height:1.1;
  font-size: clamp(2rem, 4vw, 3.1rem); margin: 0 0 18px;
}
.ft-actions { display:flex; gap:28px; flex-wrap:wrap; margin-bottom:22px; }

.ft-btn {
  display:inline-flex; align-items:center; gap:14px;
  padding: 10px 16px; border-radius: 12px; font-weight:600;
  font-size: .98rem; text-decoration:none; cursor:pointer;
  transition: transform .2s, box-shadow .2s;
}
.ft-btn:hover { transform: translateY(-2px); }
.ft-btn:focus-visible { outline:3px solid #1a1a1a; outline-offset:3px; }
.ft-btn-primary {
  background: linear-gradient(180deg,#8E1B1B,#6E0B0B); color:#fff;
  border:2px solid #C98A8A; box-shadow: 0 0 0 8px rgba(160,0,0,.07), 0 10px 18px rgba(160,0,0,.25);
}
.ft-btn-primary .ft-arrow {
  width:36px; height:36px; border-radius:9px; background:#fff; color:${RED};
  display:inline-flex; align-items:center; justify-content:center; font-size:1.1rem;
}
.ft-btn-secondary {
  background: linear-gradient(180deg,#FFD83A,#F5B800); color:${RED};
  border:2px solid #FFE27A; padding:12px 18px;
  box-shadow: 0 0 0 8px rgba(255,194,14,.12), 0 10px 18px rgba(229,168,0,.28);
}

/* ---------- Red nav panel ---------- */
.ft-nav {
  background:${RED}; color:#fff; position:relative;
  border-top-left-radius: 26px; border-top-right-radius: 26px;
  padding: 52px 48px 60px; min-height: 270px;
}
.ft-cols { display:flex; gap: 120px; flex-wrap:wrap; }
.ft-col h4 {
  margin:0 0 22px; font-size:.95rem; font-weight:500; letter-spacing:.02em;
  text-transform:uppercase; color: rgba(255,255,255,.65);
}
.ft-col ul { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:26px; }
.ft-col a { color:#fff; text-decoration:none; font-size:1rem; transition:opacity .2s; }
.ft-col a:hover { opacity:.75; }
.ft-col a:focus-visible { outline:2px solid #fff; outline-offset:3px; }

.ft-top-btn {
  position:absolute; right:42px; bottom:22px;
  width:50px; height:50px; background:${CREAM}; color:#1a1a1a;
  border-radius:12px; transform: rotate(45deg);
  display:flex; align-items:center; justify-content:center;
  text-decoration:none; box-shadow:0 6px 16px rgba(0,0,0,.25);
}
.ft-top-btn span { transform: rotate(-45deg); font-size:1.3rem; font-weight:700; }

/* ---------- Yellow bar ---------- */
.ft-bar { background:${YELLOW}; color:${RED}; }
.ft-bar-inner {
  max-width:1365px; margin:0 auto; padding: 20px 36px;
  display:flex; justify-content:space-between; align-items:center;
  gap:16px; flex-wrap:wrap; font-size:1rem;
}
.ft-bar a { color:${RED}; text-decoration:none; }
.ft-bar a:hover { text-decoration:underline; }
.ft-dev { display:flex; align-items:center; gap:12px; }
.ft-dev-logo {
  border:1px solid ${RED}; padding: 8px 12px; font-family: ui-monospace, Menlo, monospace;
  font-size:.78rem; font-weight:700; letter-spacing:.02em; line-height:1;
}

/* ---------- Watermark ---------- */
.ft-watermark {
  max-width:1365px; margin:0 auto; text-align:center; user-select:none;
  font-family: var(--font-heading);
  font-size: clamp(5rem, 19vw, 17rem); line-height:.9; white-space:nowrap;
  color: rgba(160,0,0,.07); pointer-events:none;
  height: clamp(110px, 17vw, 250px); overflow:hidden; padding-top:6px;
}

/* ---------- Responsive ---------- */
@media (max-width: 860px) {
  .ft-top { grid-template-columns: 1fr; padding-top: 36px; }
  .ft-right { order: 1; padding: 0 20px; }
  .ft-leader { order: 2; max-width: 420px; margin: 0 auto; }
  .ft-nav { border-radius: 22px 22px 0 0; padding: 36px 24px 90px; }
  .ft-cols { gap: 56px; }
  .ft-bar-inner { padding: 18px 20px; font-size:.9rem; }
}
@media (prefers-reduced-motion: reduce) {
  .ft-btn, .ft-col a { transition: none; }
  .ft-btn:hover { transform: none; }
}
`;

export default function Footer() {
  const { isTamil, text } = useLocale();

  const homeLinks = NAV_ITEMS.filter((i) => ["home", "about"].includes(i.id));
  const mediaLinks = NAV_ITEMS.filter((i) =>
    ["videos", "articles"].includes(i.id)
  );

  const homeLabel = (item) =>
    isTamil
      ? item.ta
      : item.en === "Home"
      ? `About ${PROFILE.constituency}`
      : item.en;

  return (
    <footer className="ft-wrap" id="footer">
      <style>{css}</style>

      {/* ===== Layout 1: leader + CTA + red nav panel ===== */}
      <div className="ft-top">
        <div className="ft-leader">
          <img
            src="/images/tvkselfvoices.png"
            alt={`${PROFILE.name} — TVK Leader`}
          />
        </div>

        <div className="ft-right">
          <h2 className="ft-title">
            {text(
              `${PROFILE.constituencyTamil}க்காக ஒன்றிணைவோம்.`,
              `Together for ${PROFILE.constituency}.`
            )}
          </h2>

          <div className="ft-actions">
            <a href="#contact" className="ft-btn ft-btn-primary">
              {text("மனு சமர்ப்பிக்க", "Submit Petition")}
              <span className="ft-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="ft-nav">
            <div className="ft-cols">
              <div className="ft-col">
                <h4>{text("முகப்பு", "Home")}</h4>
                <ul>
                  {homeLinks.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{homeLabel(item)}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ft-col">
                <h4>{text("ஊடகம்", "Media")}</h4>
                <ul>
                  {mediaLinks.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>{isTamil ? item.ta : item.en}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <a href="#top" className="ft-top-btn" aria-label={text("மேலே செல்க", "Back to top")}>
              <span>↑</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== Layout 2: yellow copyright bar + watermark ===== */}
      <div className="ft-bar">
        <div className="ft-bar-inner">
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} {isTamil ? PROFILE.nameTamil : PROFILE.name}, MLA –{" "}
            {isTamil ? PROFILE.constituencyTamil : PROFILE.constituency} Assembly Constituency.
            Official platform. All rights reserved.{" "}
            <a href="#privacy">{text("தனியுரிமைக் கொள்கை", "Privacy Policy")}</a>
          </p>

          <div className="ft-dev">
            <span>{text("உருவாக்கியவர்", "Developed by")}</span>
            <a
              href={DEVELOPER.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ft-dev-logo"
              aria-label={DEVELOPER.name}
            >
              {DEVELOPER.name}
            </a>
          </div>
        </div>
      </div>

      <div className="ft-watermark" aria-hidden="true">
        {WATERMARK_TEXT}
      </div>
    </footer>
  );
}
