import { useEffect, useRef, useState } from "react";
import Section from "../components/Section.jsx";
import { projects } from "../data.js";

// Per-project accent — pulled from the skill-graph palette so the giant name
// speaks the same color language as the rest of the site.
const ACCENTS = ["#1877f2", "#7c5cff", "#e0567a", "#12a5a0", "#e8883a", "#5b6b8c"];

export default function Projects() {
  const [active, setActive] = useState(null);
  const [inside, setInside] = useState(false);
  const stageRef = useRef(null);
  const cursorRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  // Custom cursor lerps toward the pointer for a trailing, physical feel.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = cursorRef.current;
    let raf;
    const tick = () => {
      const t = target.current, p = pos.current;
      const k = reduce ? 1 : 0.2;
      p.x += (t.x - p.x) * k;
      p.y += (t.y - p.y) * k;
      if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const accent = active !== null ? ACCENTS[active % ACCENTS.length] : undefined;
  const current = active !== null ? projects[active] : null;

  return (
    <div className="page">
      <Section title="Projects">
        <div className="pshow__head">
          <span className="pshow__eyebrow">Selected work</span>
          <span className="pshow__count">{String(projects.length).padStart(2, "0")} projects</span>
        </div>

        <div
          className={`pshow${inside ? " is-inside" : ""}`}
          ref={stageRef}
          style={accent ? { "--accent": accent } : undefined}
          onMouseEnter={() => setInside(true)}
          onMouseLeave={() => { setInside(false); setActive(null); }}
          onMouseMove={(e) => {
            const r = stageRef.current.getBoundingClientRect();
            target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
          }}
        >
          <ul className="pshow__row" onMouseLeave={() => setActive(null)}>
            {projects.map((p, i) => (
              <li key={p.name}>
                <a
                  className={`pthumb${active === i ? " is-active" : ""}`}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${p.name} (${p.year})`}
                  style={{ "--accent": ACCENTS[i % ACCENTS.length] }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                >
                  {p.image ? (
                    <img className="pthumb__img" src={p.image} alt="" loading="lazy" />
                  ) : (
                    <span className="pthumb__fallback" aria-hidden="true">{p.name.charAt(0)}</span>
                  )}
                </a>
                <span className="pthumb__label" aria-hidden="true">{p.name}</span>
              </li>
            ))}
          </ul>

          <div className="pshow__stage" aria-hidden="true">
            {current ? (
              <span className="pshow__name">{current.name}</span>
            ) : (
              <span className="pshow__hint">Hover a project</span>
            )}
          </div>

          {/* Caption for the active project — also the accessible/touch label */}
          <div className="pshow__caption" aria-live="polite">
            {current && (
              <>
                <span className="pshow__caption-name">{current.name}</span>
                <span className="pshow__caption-meta">{current.tags[0]} · {current.year}</span>
              </>
            )}
          </div>

          <div className="pshow__cursor" ref={cursorRef} aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M7 17 17 7M9 7h8v8" /></svg>
          </div>
        </div>
      </Section>
    </div>
  );
}
