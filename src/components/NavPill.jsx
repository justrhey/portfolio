import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { profile } from "../data.js";

// Floating horizontal nav. The site is a single scrolling page, so each link
// smooth-scrolls to its section anchor rather than routing to a separate page.
const sections = [
  { id: "top", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function scrollToSection(id) {
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
}

export default function NavPill() {
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("top");
  const lastY = useRef(0);
  const location = useLocation();
  const navigate = useNavigate();

  const go = (id) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { sectionId: id } });
      return;
    }
    scrollToSection(id);
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      // Pinned near the top; hides on scroll-down, reappears on scroll-up.
      if (y < 80) setHidden(false);
      else if (Math.abs(y - lastY.current) > 6) setHidden(y > lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/") return undefined;

    const nodes = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: [0, 0.1, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <nav className={`nav-pill${hidden ? " is-hidden" : ""}`} aria-label="Primary">
      <button type="button" className="nav-pill__brand" onClick={() => go("top")} aria-label="Go to top">
        <span className="nav-pill__mark" aria-hidden="true" />
        {profile.name}
      </button>
      <div className="nav-pill__links">
        {sections.slice(1).map((s) => (
          <button
            key={s.id}
            type="button"
            className={`nav-pill__link${active === s.id ? " is-active" : ""}`}
            onClick={() => go(s.id)}
            aria-current={active === s.id ? "location" : undefined}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
