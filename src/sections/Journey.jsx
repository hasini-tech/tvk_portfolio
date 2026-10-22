import { useState } from "react";
import { useLocale } from "../hooks.js";
import { Icon } from "../components/ui.jsx";

const JOURNEY_TIMELINE = [
  {
    year: 2014,
    title: "The public-service journey begins",
    text: "A people-first approach takes shape through direct community outreach and a commitment to solving everyday civic needs.",
    image: "/images/tvkself.jpeg",
  },
  {
    year: 2015,
    title: "Listening to every neighbourhood",
    text: "Residents' concerns become the starting point for practical support, local coordination, and dependable follow-through.",
    image: "/images/tvkvoice.jpeg",
  },
  {
    year: 2016,
    title: "More hands for community work",
    text: "The service network grows through volunteers and focused assistance for families across Thanjavur.",
    image: "/images/tvkimages.jpeg",
  },
  {
    year: 2017,
    title: "Civic needs, practical action",
    text: "Work stays grounded in the issues people experience every day, from basic facilities to access to public services.",
    image: "/images/tvkimages2.jpeg",
  },
  {
    year: 2018,
    title: "A stronger field presence",
    text: "Regular neighbourhood visits help turn public feedback into clearer priorities and faster local action.",
    image: "/images/tvkmarketing.jpeg",
  },
  {
    year: 2019,
    title: "Serving with consistency",
    text: "Community service expands with a steady focus on dignity, access, and support for those who need it most.",
    image: "/images/tvksaravan.jpeg",
  },
  {
    year: 2020,
    title: "Standing together through change",
    text: "The priority remains being present for families and helping connect residents with essential support.",
    image: "/images/tvkvoice1.jpeg",
  },
  {
    year: 2021,
    title: "Building trust on the ground",
    text: "Closer conversations with residents shape a more responsive and accountable style of public service.",
    image: "/images/tvkvoices.jpeg",
  },
  {
    year: 2022,
    title: "A new chapter with TVK",
    text: "The journey joins Tamilaga Vettri Kazhagam with a clear belief in secular social justice and people-first politics.",
    image: "/images/tvkai.jpeg",
  },
  {
    year: 2023,
    title: "Turning principles into service",
    text: "Health, welfare, civic support, and equal opportunity remain at the centre of every public-facing effort.",
    image: "/images/tvkselfimg.jpeg",
  },
  {
    year: 2024,
    title: "Growing a constituency-wide team",
    text: "A wider team works to understand local priorities and make public service more visible, accessible, and reliable.",
    image: "/images/tvk_map.jpeg",
  },
  {
    year: 2025,
    title: "People-first public leadership",
    text: "The journey continues with a commitment to clean, safe, developed, and prosperous community life in Thanjavur.",
    image: "/images/tvkvijay.png",
  },
];

export default function Journey() {
  const { text } = useLocale();
  const [activeYear, setActiveYear] = useState(2025);
  const activeMilestone = JOURNEY_TIMELINE.find((milestone) => milestone.year === activeYear) || JOURNEY_TIMELINE[JOURNEY_TIMELINE.length - 1];

  return (
    <section id="journey" className="bg-white py-20 text-tvk-ink md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tvk-red/15 bg-red-50 px-4 py-2 text-sm font-bold text-tvk-red">
            <Icon name="flag" size={15} className="journey-flag-icon" />
            {text("பயணம்", "Journey")}
          </div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-tvk-red md:text-5xl">
            {text("தஞ்சாவூருடன் எங்கள் பயணம்", "Our Journey with Thanjavur")}
          </h2>
          <p className="mt-4 text-base leading-7 text-tvk-ink-muted md:text-lg">
            {text("சேவை, வளர்ச்சி மற்றும் மக்கள் நம்பிக்கையின் முக்கிய ஆண்டுகள்.", "Key years of service, progress, and public trust.")}
          </p>
        </div>

        <div className="journey-timeline-shell">
          <div className="journey-year-track">
            <div className="journey-year-line" aria-hidden="true" />
            <ol className="journey-year-list">
              {JOURNEY_TIMELINE.map((milestone) => {
                const isActive = milestone.year === activeYear;
                return (
                  <li key={milestone.year} className="journey-year-item">
                    <button
                      className={`journey-year-button ${isActive ? "journey-year-button-active" : ""}`}
                      type="button"
                      aria-label={`View ${milestone.year} journey milestone`}
                      aria-pressed={isActive}
                      aria-controls="journey-milestone-detail"
                      onClick={() => setActiveYear(milestone.year)}
                    >
                      <span className="journey-year-dot" aria-hidden="true">
                        <Icon name="flag" size={15} />
                      </span>
                      <span className="journey-year-label">{milestone.year}</span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <article id="journey-milestone-detail" className="journey-milestone-detail" aria-live="polite">
            <div className="journey-milestone-image-wrap">
              <img
                key={activeMilestone.image}
                className="journey-milestone-image"
                src={activeMilestone.image}
                alt={`${activeMilestone.year}: ${activeMilestone.title}`}
              />
              <span className="journey-milestone-image-year">{activeMilestone.year}</span>
            </div>
            <div className="journey-milestone-content">
              <span className="journey-milestone-kicker">{text("பயணத்தின் முக்கிய ஆண்டு", "Journey milestone")}</span>
              <h3>{activeMilestone.title}</h3>
              <p>{activeMilestone.text}</p>
              <div className="journey-milestone-bar" aria-hidden="true" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
