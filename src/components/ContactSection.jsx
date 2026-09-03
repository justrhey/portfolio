import Section from "./Section.jsx";
import { profile, shortcuts } from "../data.js";

// Minimal contact footer — a single prominent email plus a row of links.
export default function ContactSection() {
  return (
    <Section title="Contact">
      <div className="contact-min">
        <a className="contact-min__email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <p className="contact-min__note">
          Philippines · Open to freelance &amp; collaboration
        </p>
        <div className="contact-min__links">
          {shortcuts.map((s) => (
            <a
              key={s.label}
              className="link"
              href={s.href}
              target="_blank"
              rel="noreferrer"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
