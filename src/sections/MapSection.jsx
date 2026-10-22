import { useLocale } from "../hooks.js";

const TN_DISTRICTS_SRC = "/images/tvkmaps.png"; // white districts, red borders, Thanjavur in yellow
const TVK_BANNER_SRC = "/images/tvkmapview.png"; // red/yellow flag banner with the leader

const THANJAVUR_PATH =
  "M34.4 110.8 32.8 107.8 33.5 86.6 30.3 83.0 44.4 78.4 48.6 73.7 60.6 72.7 66.1 74.1 72.3 71.9 74.8 67.0 87.8 63.3 103.9 62.1 117.6 48.3 121.7 47.6 130.9 41.2 139.1 37.7 145.5 26.6 150.9 20.7 164.5 14.0 169.7 25.4 165.1 39.9 161.4 42.7 165.4 49.0 162.3 57.3 159.4 63.0 156.4 77.7 150.4 78.7 137.2 72.2 131.1 71.4 117.8 63.8 113.8 71.6 114.2 76.9 118.4 78.7 119.7 85.9 130.1 92.9 128.1 103.9 121.0 108.6 123.0 119.9 130.9 123.1 128.7 133.7 131.6 136.5 139.2 136.8 147.1 147.6 153.0 150.1 155.8 154.6 153.6 165.9 150.1 165.9 154.3 178.4 159.4 179.0 154.5 182.6 153.6 189.8 135.3 189.8 132.6 194.2 119.5 200.0 112.8 207.3 115.1 210.1 108.7 215.7 104.9 226.0 100.0 221.7 89.8 221.3 91.6 214.2 89.6 209.9 82.7 206.3 86.1 200.0 83.3 195.2 86.1 191.1 83.8 185.3 90.0 182.9 86.0 167.8 91.3 157.8 87.6 149.9 91.2 145.7 96.4 144.8 94.9 135.1 87.8 134.6 85.5 125.2 79.7 126.2 72.7 122.4 72.8 118.0 65.4 115.7 58.3 107.5 57.1 116.2 43.5 117.9 34.4 110.8Z";

export default function MapSection() {
  const { text } = useLocale();

  return (
    <section
      id="thanjavur-map"
      className="relative scroll-mt-24 overflow-hidden py-8 text-white sm:py-12 lg:py-16"
      style={{
        backgroundImage:
          "linear-gradient(rgba(150, 9, 9, 0.91), rgba(110, 0, 0, 0.94)), url('/images/districts_bg-lap.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-5 lg:px-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <h2 className="font-display text-xl leading-tight tracking-wide text-white min-[400px]:text-2xl sm:text-4xl md:text-5xl">
            {text("மாவட்ட அமைப்பு", "District Map")}
          </h2>
          <a
            href="#contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-tvk-yellow px-3 py-2 text-xs font-bold text-tvk-red-night shadow-lg sm:gap-3 sm:px-4 sm:text-sm"
          >
            {text("மேலும் அறிக", "Know more")}
            <span className="grid h-5 w-5 place-items-center rounded bg-white/40 sm:h-6 sm:w-6">
              ↗
            </span>
          </a>
        </div>

        {/* Stack on mobile/tablet, two columns from lg */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:gap-6 lg:grid-cols-[1.35fr_0.95fr]">
          {/* LEFT: TN map + Thanjavur inset
              mobile/tablet: side by side in a row
              desktop (lg+): map left, inset absolutely positioned right */}
          <div className="map-panel relative flex h-[440px] items-center justify-between gap-3 rounded-2xl border-2 border-white/85 p-3 sm:h-[520px] sm:gap-5 sm:p-5 lg:h-auto lg:min-h-[600px] lg:justify-start lg:gap-0 lg:p-6">
            {/* TN map (enlarged) */}
            <div className="map-districts flex w-[62%] items-center justify-center lg:w-auto lg:justify-start">
              <img
                src={TN_DISTRICTS_SRC}
                alt="Tamil Nadu district map with Thanjavur highlighted"
                className="map-districts-image h-auto max-h-full w-full scale-125 object-contain drop-shadow-2xl sm:scale-110 lg:ml-[2%] lg:h-[560px] lg:max-h-none lg:w-auto lg:max-w-[68%] lg:origin-left lg:scale-125"
              />
            </div>

            {/* Thanjavur inset */}
            <div className="map-district-inset w-[38%] max-w-[230px] rounded-2xl border-2 border-white bg-black/20 p-2 backdrop-blur-sm sm:p-3 lg:absolute lg:right-[6%] lg:top-1/2 lg:w-56 lg:max-w-none lg:-translate-y-1/2">
              <p className="mb-1 text-center text-xs font-bold sm:text-sm">
                {text("தஞ்சாவூர்", "Thanjavur")}
              </p>
              <svg
                viewBox="20 5 160 235"
                className="mx-auto h-32 w-full sm:h-44"
                role="img"
                aria-label="Thanjavur district map"
              >
                <path
                  d={THANJAVUR_PATH}
                  fill="#FFC20E"
                  stroke="#B8860B"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* RIGHT: banner only */}
          <aside className="map-banner flex h-[440px] flex-col items-center justify-center rounded-2xl border-2 border-white/85 bg-white/10 p-3 shadow-2xl backdrop-blur-sm sm:h-[520px] sm:p-4 lg:h-auto">
            <img
              src={TVK_BANNER_SRC}
              alt="TVK"
              className="h-full w-full rounded-lg object-contain lg:min-h-[300px] lg:object-cover lg:object-top"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}