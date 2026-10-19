import { useEffect, useRef, useState } from "react";

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export function useInView(threshold = 0.3) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen];
}

/* page scroll: progress 0..1 and whether scrolled past `solidAt` px */
export function useScroll(solidAt = 40) {
  const [s, setS] = useState({ progress: 0, solid: false, y: 0 });
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setS({ progress: h > 0 ? window.scrollY / h : 0, solid: window.scrollY > solidAt, y: window.scrollY });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [solidAt]);
  return s;
}

/* which section is currently in view (for nav highlight) */
export function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); el && io.observe(el); });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* localStorage-backed state */
export function useStored(key, initial) {
  const [v, setV] = useState(() => {
    try { return JSON.parse(localStorage.getItem(key)) ?? initial; } catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

/* Global Language toggle hook (English <-> Tamil) */
export function useLanguage() {
  const [lang, setLang] = useStored("tvk-lang", "en");

  useEffect(() => {
    const onLangChange = (e) => {
      if (e.detail && e.detail !== lang) {
        setLang(e.detail);
      }
    };
    window.addEventListener("tvk-lang-change", onLangChange);
    return () => window.removeEventListener("tvk-lang-change", onLangChange);
  }, [lang, setLang]);

  const setLanguage = (next) => {
    setLang(next);
    window.dispatchEvent(new CustomEvent("tvk-lang-change", { detail: next }));
  };

  const toggleLang = () => {
    setLanguage(lang === "ta" ? "en" : "ta");
  };

  return { lang, setLang: setLanguage, toggleLang };
}

export function useLocale() {
  const language = useLanguage();
  const isTamil = language.lang === "ta";

  const text = (tamil, english) => (isTamil ? tamil : english);

  return { ...language, isTamil, text };
}
