import { useEffect, useRef } from "react";
import { useLocale } from "../hooks.js";

const MOMENTS = [
  {
    id: "m1",
    src: "/images/tvkgroup/IMG_2837.JPG",
    flip: "right",
    alt: "R. Vinoth, Minister for Agriculture and Farmers Welfare, meeting residents",
    tag: { en: "Agriculture", ta: "வேளாண்மை" },
    title: { en: "R. Vinoth", ta: "ஆர். வினோத்" },
    caption: {
      en: "R. Vinoth of the Tamilaga Vettri Kazhagam (TVK) is the Minister for Agriculture and Farmers Welfare in Tamil Nadu.",
      ta: "தமிழக வெற்றிக் கழகத்தைச் (தவெக) சேர்ந்த ஆர். வினோத், தமிழ்நாட்டின் வேளாண்மை மற்றும் உழவர் நலத்துறை அமைச்சராக உள்ளார்.",
    },
  },
  {
    id: "m2",
    src: "/images/tvkgroup/tvkgroup2.jpeg",
    flip: "left",
    alt: "Rajmohan Arumugam, Minister for School Education",
    tag: { en: "School Education", ta: "பள்ளிக் கல்வி" },
    title: { en: "Rajmohan Arumugam", ta: "ராஜ்மோகன் ஆறுமுகம்" },
    caption: {
      en: "Rajmohan Arumugam is the Minister for School Education in Tamil Nadu.",
      ta: "ராஜ்மோகன் ஆறுமுகம், தமிழ்நாட்டின் பள்ளிக் கல்வித் துறை அமைச்சராக உள்ளார்.",
    },
  },
  {
    id: "m3",
    src: "/images/tvkgroup/tvkgroup3.jpeg",
    flip: "right",
    alt: "Dr. T. K. Prabhu with party members",
    tag: { en: "Natural Resources", ta: "இயற்கை வளங்கள்" },
    title: { en: "Dr. T. K. Prabhu", ta: "டாக்டர் டி. கே. பிரபு" },
    caption: {
      en: "Dr. T. K. Prabhu is the Cabinet Minister for Natural Resources (Minerals and Mines) in the Government of Tamil Nadu.",
      ta: "டாக்டர் டி. கே. பிரபு, தமிழ்நாடு அரசின் இயற்கை வளங்கள் (கனிமங்கள் மற்றும் சுரங்கங்கள்) துறையின் அமைச்சரவை அமைச்சராக உள்ளார்.",
    },
  },
  {
    id: "m4",
    src: "/images/tvkgroup/tvkgroup8.png",
    flip: "left",
    alt: "Bussy Anand with a party member",
    tag: { en: "Rural Development", ta: "ஊரக வளர்ச்சி" },
    title: {
      en: "N. Anand (Bussy Anand)",
      ta: "என். ஆனந்த் (புஸ்ஸி ஆனந்த்)",
    },
    caption: {
      en: "Narayanasamy Anand, popularly known as Bussy Anand, serves as the Cabinet Minister for Rural Development and Water Resources in the Government of Tamil Nadu.",
      ta: "புஸ்ஸி ஆனந்த் என்று அனைவராலும் அறியப்படும் நாராயணசாமி ஆனந்த், தமிழ்நாடு அரசின் ஊரக வளர்ச்சி மற்றும் நீர்வளத் துறையின் அமைச்சரவை அமைச்சராக உள்ளார்.",
    },
  },
];

const CSS = `
.km-section{padding:90px 0;background:#FAF7F2;overflow:hidden}
.km-list{display:flex;flex-direction:column;gap:clamp(48px,7vw,96px)}

.km-row{display:grid;align-items:center;gap:clamp(28px,5vw,72px);perspective:1200px}
.km-from-right{grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);grid-template-areas:"side img"}
.km-from-left{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);grid-template-areas:"img side"}
.km-side{grid-area:side}
.km-flip{grid-area:img}

.km-side{opacity:0;transition:transform .9s cubic-bezier(.2,.8,.2,1) .25s,opacity .8s ease .25s}
.km-from-right .km-side{transform:translateX(-40px)}
.km-from-left .km-side{transform:translateX(40px)}
.km-in .km-side{opacity:1;transform:none}

.km-side-tag{display:inline-block;padding:4px 14px;border-radius:99px;background:#FFF8EB;border:1.5px solid #FFC20E;color:#9e1515;font-size:.82rem;font-weight:700}
.km-side-title{margin:14px 0 0;padding-left:14px;border-left:4px solid #FFC20E;color:#9e1515;font-size:clamp(1.8rem,3.4vw,2.8rem);font-weight:700;line-height:1.15}
.km-side-text{margin:16px 0 0;max-width:44ch;color:#5C4547;font-size:1.1rem;line-height:1.7}
.km-side-bar{display:block;width:120px;height:4px;margin-top:22px;border-radius:4px;background:linear-gradient(90deg,#9e1515 50%,#FFC20E 50%)}

.km-flip{width:100%;opacity:0;transition:transform 1s cubic-bezier(.2,.8,.2,1),opacity .8s ease;will-change:transform}
.km-from-right .km-flip{transform-origin:right center;transform:translateX(70px) rotateY(-75deg)}
.km-from-left .km-flip{transform-origin:left center;transform:translateX(-70px) rotateY(75deg)}
.km-in .km-flip{opacity:1;transform:translateX(0) rotateY(0)}

.km-card{--rx:0deg;--ry:0deg;--gx:50%;--gy:50%;position:relative;margin:0;transform-style:preserve-3d;transform:perspective(900px) rotateX(var(--rx)) rotateY(var(--ry));transition:transform .18s ease-out;touch-action:pan-y;border-radius:14px;background:#fff;border:1.5px solid rgba(160,0,0,.12);box-shadow:0 18px 44px rgba(90,6,11,.18);overflow:hidden}
.km-img-wrap{position:relative;aspect-ratio:4/3;background:linear-gradient(145deg,#7A0A10,#360408)}
.km-img-wrap img{display:block;width:100%;height:100%;object-fit:cover;object-position:center top;user-select:none;-webkit-user-drag:none}
.km-glare{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at var(--gx) var(--gy),rgba(255,255,255,.28),transparent 55%);opacity:0;transition:opacity .2s}
.km-card:hover .km-glare{opacity:1}
.km-tag{position:absolute;top:12px;left:12px;padding:3px 12px;border-radius:99px;background:rgba(20,1,3,.8);border:1px solid #FFC20E;color:#FFC20E;font-size:.78rem;font-weight:700}

@media (max-width:860px){
  .km-section{padding:56px 0}
  .km-row,.km-from-right,.km-from-left{grid-template-columns:minmax(0,1fr);grid-template-areas:"img" "side";gap:22px;perspective:800px}
  .km-from-right .km-flip{transform:translateX(28px) rotateY(-60deg)}
  .km-from-left .km-flip{transform:translateX(-28px) rotateY(60deg)}
  .km-in .km-flip{transform:none}
  .km-from-right .km-side,.km-from-left .km-side{transform:translateY(20px)}
  .km-in .km-side{transform:none}
  .km-side-text{font-size:1rem;max-width:none}
}

@media (prefers-reduced-motion:reduce){
  .km-flip,.km-side{opacity:1;transform:none!important;transition:none}
  .km-card{transform:none!important}
}
`;

export default function KeyMoments() {
  const { lang } = useLocale();
  const t = (o) => (lang === "ta" ? o.ta : o.en);
  const rowRefs = useRef([]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!("IntersectionObserver" in window)) {
      rows.forEach((r) => r.classList.add("km-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("km-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  const onMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${((0.5 - y) * 14).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((x - 0.5) * 18).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--gx", "50%");
    el.style.setProperty("--gy", "50%");
  };

  return (
    <section className="km-section" id="key-moments" aria-label="Key moments">
      <style>{CSS}</style>
      <div className="wrap">
        <div className="km-list">
          {MOMENTS.map((m, i) => (
            <div
              key={m.id}
              ref={(el) => (rowRefs.current[i] = el)}
              className={`km-row km-from-${m.flip}`}
            >
              <div className="km-side">
                <span className="km-side-tag">{t(m.tag)}</span>
                <h3 className="km-side-title">{t(m.title)}</h3>
                <p className="km-side-text">{t(m.caption)}</p>
                <span className="km-side-bar" aria-hidden="true" />
              </div>

              <div className="km-flip">
                <figure
                  className="km-card"
                  onPointerMove={onMove}
                  onPointerLeave={onLeave}
                  onPointerUp={onLeave}
                  onPointerCancel={onLeave}
                >
                  <div className="km-img-wrap">
                    <img src={m.src} alt={m.alt} loading="lazy" draggable="false" />
                    <span className="km-glare" aria-hidden="true" />
                    <span className="km-tag">{t(m.tag)}</span>
                  </div>
                </figure>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}