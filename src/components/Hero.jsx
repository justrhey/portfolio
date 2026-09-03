import Icon from "./Icon.jsx";
import AsciiSpiral from "./AsciiSpiral.jsx";
import { profile } from "../data.js";

// Bitmap-paper intro paired with the interactive ASCII vortex.
export default function Hero() {
  const goToWork = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";
    document.getElementById("projects")?.scrollIntoView({ behavior, block: "start" });
  };

  return (
    <section className="hero" id="top">
      <div className="hero__content">
      <div className="hero__body">
      <div className="hero__text">
      <div className="hero__identity">
        <div className="hero__portrait">
          <img src={profile.photo} alt="" />
        </div>
        <p className="hero__eyebrow">
          <strong>{profile.name}</strong>
          <span>Full-stack developer</span>
        </p>
      </div>

      <h1 className="hero__title">
        Backends with depth.<br />
        Interfaces with intent.
      </h1>

      <p className="hero__lead">
        I build production-minded products across Rust, React, and Next.js—from
        secure APIs to polished interfaces. Based in the Philippines and open
        to remote work and thoughtful collaborations.
      </p>

      <div className="hero__actions">
        <button type="button" className="hbtn hbtn--primary" onClick={goToWork}>
          <Icon name="grid" className="icon" />
          View selected work
        </button>
        <a className="hbtn" href={`mailto:${profile.email}`}>
          <Icon name="mail" className="icon" />
          Email me
        </a>
      </div>
      </div>
      </div>

      <div className="hero__meta">
        <div><span>Philippines</span><span>Remote · GMT+8</span></div>
        <div><span>08 Projects</span><span>Shipped</span></div>
        <div><span>Rust · React</span><span>TypeScript</span></div>
        <div><span>Open to work</span><span className="hero__cursor">Status: online</span></div>
      </div>
      </div>

      <div className="hero__viz">
        <AsciiSpiral />
      </div>
    </section>
  );
}
