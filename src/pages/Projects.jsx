import Section from "../components/Section.jsx";
import { projects } from "../data.js";

export default function Projects() {
  return (
    <div className="page">
      <Section title="Projects">
        <div className="project-grid">
          {projects.map((p) => (
            <a className="project" key={p.name} href={p.url} target="_blank" rel="noreferrer">
              <div className="project__top">
                <h3 className="project__title">{p.name}</h3>
                <span className="project__year">{p.year}</span>
              </div>
              <p className="project__desc">{p.desc}</p>
              <div className="project__tags">
                {p.tags.slice(0, 4).map((t) => (
                  <span className="pill" key={t}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}
