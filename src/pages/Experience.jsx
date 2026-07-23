import Icon from "../components/Icon.jsx";
import Section from "../components/Section.jsx";
import { experience, education } from "../data.js";

export default function Experience() {
  return (
    <div className="page">
      <Section title="Experience">
        <ul className="timeline">
          {experience.map((item, i) => (
            <li className="tl-item" key={i}>
              <div className="tl-logo">
                <Icon name={item.icon} />
              </div>
              <div className="tl-body">
                <h3 className="tl-role">{item.role}</h3>
                <p className="tl-org">{item.org}</p>
                <p className="tl-desc">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Education">
        <ul className="timeline">
          {education.map((item, i) => (
            <li className="tl-item" key={i}>
              <div className="tl-logo tl-logo--edu">
                <Icon name="cap" />
              </div>
              <div className="tl-body">
                <h3 className="tl-role">{item.role}</h3>
                <p className="tl-org">{item.org}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
