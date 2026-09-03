import { projects, experience } from "../data.js";
import AsciiVideo from "./AsciiVideo.jsx";

const num = (i) => String(i + 1).padStart(3, "0");
const isCode = (url) => url && url.includes("github");

export default function Showcase() {
  const goToContact = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    document.getElementById("contact")?.scrollIntoView({ behavior, block: "start" });
  };

  return (
    <div className="showcase">
      <AsciiVideo />
      <div className="showcase__inner">
        <header className="showcase__header">
          <div>
            <p className="showcase__eyebrow">Selected work</p>
            <h2 className="showcase__title">Built across the stack.</h2>
          </div>
          <p className="showcase__intro">
            Eight representative builds spanning civic technology, secure systems,
            immersive frontends, and client automation.
          </p>
        </header>

        <div className="text-work">
          {projects.map((project, index) => (
            <article className="text-work__item" key={project.name}>
              <div className="text-work__heading">
                <p>
                  <span className="text-work__index">{num(index)} /</span>
                  <strong>{project.name}</strong>
                </p>
                <span className="text-work__year">{project.year}</span>
              </div>
              <p className="text-work__desc">{project.desc}</p>
              <div className="text-work__footer">
                <span>{project.tags.slice(0, 3).join(" · ")}</span>
                <a href={project.url} target="_blank" rel="noreferrer">
                  {isCode(project.url) ? "View code" : "Visit site"} <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <section id="experience" className="experience-strip anchor" aria-labelledby="experience-title">
          <div className="experience-strip__heading">
            <p className="showcase__eyebrow">Client work</p>
            <h2 id="experience-title">Applied experience.</h2>
          </div>
          <div className="experience-strip__list">
            {experience.map((item, index) => (
              <article className="experience-row" key={item.role}>
                <span className="experience-row__index">{num(index)}</span>
                <div>
                  <h3>{item.role}</h3>
                  <p className="experience-row__org">{item.org}</p>
                </div>
                <p className="experience-row__desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="show-cta">
          <p className="showcase__eyebrow">Available for select projects</p>
          <h2 className="show-cta__title">Have a useful thing<br />worth building?</h2>
          <button type="button" className="show-cta__link" onClick={goToContact}>Start a conversation →</button>
        </div>
      </div>
    </div>
  );
}
