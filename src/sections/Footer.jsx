import { PROFILE, NAV_ITEMS } from "../data.js";
import { useLocale } from "../hooks.js";

export default function Footer() {
  const { isTamil, text } = useLocale();

  const homeLinks = NAV_ITEMS.filter((item) =>
    ["home", "about"].includes(item.id)
  );
  const mediaLinks = NAV_ITEMS.filter((item) =>
    ["gallery", "videos", "articles", "testimonials"].includes(item.id)
  );

  return (
    <footer style={{ background: "#f5f0eb" }}>
      {/* Top Section: Image + CTA */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "stretch",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        {/* Left: Leader Image */}
        <div
          style={{
            flex: "1 1 420px",
            minHeight: 340,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <img
            src="/images/tvkvoice.jpeg"
            alt={`${PROFILE.name} — TVK Leader`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        </div>

        {/* Right: CTA + Tagline */}
        <div
          style={{
            flex: "1 1 420px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 40px",
            background: "#f5f0eb",
          }}
        >
          <h2
            style={{
              fontFamily: "'Anton', 'Outfit', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#1a1a1a",
              lineHeight: 1.15,
              marginBottom: 8,
            }}
          >
            {text(
              `${PROFILE.constituencyTamil}க்காக ஒன்றிணைவோம்.`,
              `Together for ${PROFILE.constituency}.`
            )}
          </h2>

          <div style={{ display: "flex", gap: 14, marginTop: 24, flexWrap: "wrap" }}>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "linear-gradient(135deg, #FFC20E, #E5A800)",
                color: "#1a1a1a",
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(255,194,14,0.35)",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              {text("மனு சமர்ப்பிக்க", "Submit Petition")}
              <span style={{ fontSize: "1.1rem" }}>↗</span>
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 28px",
                background: "#A00000",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                borderRadius: 10,
                textDecoration: "none",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              {text("மனுவைக் கண்காணிக்க", "Track Petition")}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Navigation + Copyright */}
      <div
        style={{
          background: "#A00000",
          color: "#fff",
          borderRadius: "20px 20px 0 0",
          padding: "36px 40px 28px",
          maxWidth: 900,
          marginLeft: "auto",
          marginTop: -20,
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
          }}
        >
          {/* HOME Column */}
          <div>
            <h4
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                marginBottom: 14,
              }}
            >
              {text("முகப்பு", "HOME")}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {homeLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {isTamil ? item.ta : item.en === "Home" ? `About ${PROFILE.constituency}` : `About ${PROFILE.name.split(" ")[0]}`}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* MEDIA Column */}
          <div>
            <h4
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                marginBottom: 14,
              }}
            >
              {text("ஊடகம்", "MEDIA")}
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
              {mediaLinks.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {isTamil ? item.ta : item.en}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            marginTop: 28,
            paddingTop: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)", margin: 0 }}>
            © {new Date().getFullYear()} {isTamil ? PROFILE.partyTamil : PROFILE.party} •{" "}
            {isTamil ? PROFILE.nameTamil : PROFILE.name}
          </p>
          <a
            href="#top"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.5)",
              color: "#fff",
              textDecoration: "none",
              fontSize: "1.1rem",
              transition: "border-color 0.2s",
            }}
            aria-label={text("மேலே செல்க", "Back to Top")}
          >
            ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
