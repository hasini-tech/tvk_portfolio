import { useLocale } from "../hooks.js";

export default function Testimonials() {
  const { text } = useLocale();
  return (
    <section id="testimonials" className="sec sec-paper content-page testimonials-page">
      <div className="wrap">
        <div className="section-head-center">
          <div className="tvk-flag-pill">
            <span className="tvk-flag-dot" />
            <span>{text("பாராட்டுகள்", "Testimonials")}</span>
          </div>
          <h1 className="section-title-large">{text("பாராட்டுகள்", "Testimonials")}</h1>
          <p className="section-sub-text">
            {text("மக்களின் பாராட்டுகள் சேகரிக்கப்படும் போது இங்கே வெளியிடப்படும்.", "Community testimonials will be published here as they are collected.")}
          </p>
          <div className="tvk-dual-bar" aria-hidden="true" />
        </div>

        <div className="testimonial-empty-card">
          <span className="testimonial-empty-mark">“</span>
          <p>{text("மக்களின் குரல்கள் இந்தப் பக்கத்தில் சேர்க்கப்படும்.", "People’s voices will be added to this page.")}</p>
        </div>
      </div>
    </section>
  );
}
