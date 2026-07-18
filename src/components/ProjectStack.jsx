import { useState } from "react";
import { topProjects } from "../data.js";

const POS = ["left", "front", "right"];

export default function ProjectStack() {
  // Visual order: [left, front, right]
  const byPos = Object.fromEntries(topProjects.map((p) => [p.pos, p]));
  const [deck, setDeck] = useState([byPos.left, byPos.front, byPos.right]);

  const bringToFront = (i) => {
    if (i === 1) return; // already at front
    setDeck((prev) => {
      const next = [...prev];
      [next[1], next[i]] = [next[i], next[1]];
      return next;
    });
  };

  return (
    <div className="stack">
      {deck.map((p, i) => {
        const pos = POS[i];
        const isFront = pos === "front";
        return (
          <article
            className={`stack-card stack-card--${pos}`}
            key={p.title}
            role={isFront ? undefined : "button"}
            tabIndex={isFront ? undefined : 0}
            aria-label={isFront ? undefined : `Bring ${p.title} to front`}
            onClick={() => bringToFront(i)}
            onKeyDown={(e) => {
              if (!isFront && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                bringToFront(i);
              }
            }}
          >
            <div className="ribbon">{p.badge}</div>

            <div className="stack-card__head">
              <span className={`app-icon${p.logo ? " app-icon--img" : ""}`} aria-hidden="true">
                {p.logo ? <img src={p.logo} alt="" /> : p.title.charAt(0)}
              </span>
              <h3 className="stack-card__title">{p.title}</h3>
            </div>

            <p className="stack-card__desc">{p.desc}</p>

            <div className="stack-card__tags">
              {p.tags.slice(0, 3).map((t) => (
                <span className="pill" key={t}>{t}</span>
              ))}
            </div>

            <a
              className="stack-card__cta"
              href={p.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {p.cta}
              <svg viewBox="0 0 24 24" className="cta-arrow" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          </article>
        );
      })}
    </div>
  );
}
