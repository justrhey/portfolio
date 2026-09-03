import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import Showcase from "../components/Showcase.jsx";
import About from "./About.jsx";
import Certificates from "./Certificates.jsx";
import Contact from "./Contact.jsx";

// Single-page site: hero + numbered showcase (projects & experience) + about /
// skills + certificates, ending in the contact footer. The nav pill scrolls
// between these anchors instead of routing to separate pages.
export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const sectionId = location.state?.sectionId;
    if (!sectionId) return;

    const frame = requestAnimationFrame(() => {
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
      const target = sectionId === "top" ? document.documentElement : document.getElementById(sectionId);
      if (sectionId === "top") window.scrollTo({ top: 0, behavior });
      else target?.scrollIntoView({ behavior, block: "start" });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.key, location.state]);

  return (
    <div className="page-home">
      <Hero />
      <div id="projects" className="anchor"><Showcase /></div>
      <div id="about" className="anchor"><About /></div>
      <div id="certificates" className="anchor"><Certificates /></div>
      <footer id="contact" className="anchor site-footer"><Contact /></footer>
    </div>
  );
}
