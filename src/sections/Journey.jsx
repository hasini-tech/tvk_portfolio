import { useLocale } from "../hooks.js";

const JOURNEY_YEARS = Array.from({ length: 12 }, (_, index) => 2014 + index);

export default function Journey() {
  const { text } = useLocale();

  return (
    <section id="journey" className="bg-white py-20 text-tvk-ink md:py-28">
      <div className="mx-auto w-full max-w-6xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-tvk-red/15 bg-red-50 px-4 py-2 text-sm font-bold text-tvk-red">
            <span className="text-tvk-yellow">★</span>
            {text("பயணம்", "Journey")}
          </div>
          <h2 className="mt-5 font-display text-4xl leading-tight text-tvk-red md:text-5xl">
            {text("தஞ்சாவூருடன் எங்கள் பயணம்", "Our Journey with Thanjavur")}
          </h2>
          <p className="mt-4 text-base leading-7 text-tvk-ink-muted md:text-lg">
            {text("சேவை, வளர்ச்சி மற்றும் மக்கள் நம்பிக்கையின் முக்கிய ஆண்டுகள்.", "Key years of service, progress, and public trust.")}
          </p>
        </div>

        <div className="relative mt-12 rounded-3xl border border-tvk-red/15 bg-[#fffaf4] px-5 py-10 shadow-[0_18px_50px_rgba(90,6,11,0.10)] md:px-10">
          <div className="absolute top-[4.45rem] right-[8%] left-[8%] hidden h-px bg-tvk-red/25 md:block" aria-hidden="true" />
          <ol className="relative grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
            {JOURNEY_YEARS.map((year) => (
              <li key={year} className="relative z-10 flex flex-col items-center gap-2 text-center">
                <span
                  className={`grid size-10 place-items-center rounded-full border-2 border-white text-lg shadow-md ${
                    year === 2025 ? "bg-tvk-red text-tvk-yellow" : "bg-tvk-yellow text-tvk-red-night"
                  }`}
                  aria-hidden="true"
                >
                  ★
                </span>
                <span className={`text-sm font-extrabold ${year === 2025 ? "text-tvk-red" : "text-tvk-ink-muted"}`}>{year}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
