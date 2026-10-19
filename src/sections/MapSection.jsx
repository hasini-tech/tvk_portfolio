import { useLocale } from "../hooks.js";

const TVK_POSTER_SRC = "/images/tvk_map.jpeg";
const TAMIL_NADU_MAP_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Thanjavur_in_Tamil_Nadu_%28India%29.svg/1920px-Thanjavur_in_Tamil_Nadu_%28India%29.svg.png";
const THANJAVUR_TALUK_MAP_SRC =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/TN_Taluks_Thanjavur.png/960px-TN_Taluks_Thanjavur.png";

export default function MapSection() {
  const { text } = useLocale();

  return (
    <section
      id="thanjavur-map"
      className="relative overflow-hidden bg-[#980909] py-16 text-white md:py-20"
      style={{ backgroundImage: "linear-gradient(rgba(150, 9, 9, 0.91), rgba(110, 0, 0, 0.94)), url('/images/districts_bg-lap.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative mx-auto w-full max-w-7xl px-5">
        <h2 className="font-display text-4xl tracking-wide text-white md:text-5xl">
          {text("மாவட்ட அமைப்பு", "District Map")}
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_0.95fr]">
          <div className="relative min-h-[530px] rounded-2xl border-2 border-white/85 bg-black/15 p-5 md:p-8">
            <img
              src={TAMIL_NADU_MAP_SRC}
              alt="Tamil Nadu district map with Thanjavur highlighted"
              className="mx-auto h-[420px] max-w-full object-contain drop-shadow-2xl"
            />

            <div className="absolute right-4 bottom-4 w-48 rounded-2xl border-2 border-white bg-[#9d1717] p-3 shadow-2xl md:right-8 md:bottom-8 md:w-56">
              <p className="mb-2 text-center text-sm font-bold text-white">{text("தஞ்சாவூர்", "Thanjavur")}</p>
              <img
                src={THANJAVUR_TALUK_MAP_SRC}
                alt="Thanjavur taluk map"
                className="h-36 w-full rounded-lg bg-white object-contain"
              />
            </div>
          </div>

          <aside className="rounded-2xl border-2 border-white/85 bg-[#a30d0f]/90 p-4 shadow-2xl">
            <img
              src={TVK_POSTER_SRC}
              alt="TVK Thanjavur team"
              className="h-64 w-full rounded-xl border border-tvk-yellow object-cover object-top md:h-72"
            />
            <div className="mt-4 space-y-3">
              {["மக்கள் தொடர்பு", "வார்டு சேவை", "நலத்திட்ட உதவி", "புகார் பதிவு"].map((label, index) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 text-tvk-red shadow-sm">
                  <span className="grid size-6 place-items-center rounded-full bg-tvk-red text-xs font-black text-white">{index + 1}</span>
                  <span className="font-bold">{text(label, ["Public Contact", "Ward Service", "Welfare Support", "Complaint Registration"][index])}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
