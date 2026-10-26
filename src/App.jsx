import { useEffect, useState } from "react";
import { NAV_ITEMS } from "./data.js";
import Header from "./components/Header.jsx";
import Extras from "./components/Extras.jsx";
import Hero from "./sections/Hero.jsx";
import DravidianModel from "./sections/DravidianModel.jsx";
import About from "./sections/About.jsx";
import Impact from "./sections/Impact.jsx";
import Work from "./sections/Work.jsx";
import Journey from "./sections/Journey.jsx";
import MapSection from "./sections/MapSection.jsx";
import NewsEvents from "./sections/NewsEvents.jsx";
import Gallery from "./sections/Gallery.jsx";
import MembershipCTA from "./sections/MembershipCTA.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Videos from "./sections/Videos.jsx";
import Testimonials from "./sections/Testimonials.jsx";
import KeyMoments from "./sections/KeyMoments.jsx";
import WelcomeScreen from "./components/WelcomeScreen.jsx";
import { useLocale } from "./hooks.js";

const PAGE_IDS = new Set(NAV_ITEMS.map((item) => item.id));
const PAGE_ALIASES = {
  top: "home",
  model: "home",
  impact: "home",
  work: "home",
  journey: "home",
  news: "articles",
  plan: "home",
  membership: "home",
  contact: "petitions",
};

function pageFromHash() {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.replace(/^#/, "").toLowerCase();
  return PAGE_ALIASES[hash] || (PAGE_IDS.has(hash) ? hash : "home");
}

function HomePage() {
  return (
    <>
      <Hero />
      <DravidianModel />
      <KeyMoments />   {/* new: right, left, right flip images */}
      <About />
      <Impact />
      <Work />
      <Journey />
      <MapSection />
      <NewsEvents />
      <Gallery />
      <MembershipCTA />
      <Contact />
    </>
  );
}

export default function App() {
  const [page, setPage] = useState(pageFromHash);
  const { lang } = useLocale();

  useEffect(() => {
    document.documentElement.lang = lang === "ta" ? "ta" : "en";
  }, [lang]);

  const navigate = (hash) => {
    const targetHash = `#${hash}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState({}, "", targetHash);
    }
    setPage(pageFromHash());
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // Browser back/forward + manual hash edits
  useEffect(() => {
    const sync = () => setPage(pageFromHash());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  let pageContent;
  switch (page) {
    case "about":
      pageContent = <About />;
      break;
    case "articles":
      pageContent = <NewsEvents />;
      break;
    case "videos":
      pageContent = <Videos />;
      break;
    case "gallery":
      pageContent = <Gallery />;
      break;
    case "petitions":
      pageContent = <Contact />;
      break;
    case "testimonials":
      pageContent = <Testimonials />;
      break;
    case "home":
    default:
      pageContent = <HomePage />;
      break;
  }

  return (
    <div className={`cp language-${lang} font-sans antialiased`} data-language={lang}>
      <WelcomeScreen />
      <Header currentPage={page} onNavigate={navigate} />
      <Extras />
      {/* key={page} remounts the page so reveal animations/counters re-run */}
      <main id="main-content" key={page}>
        {pageContent}
      </main>
      <Footer />
    </div>
  );
}
