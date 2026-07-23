import Icon from "../components/Icon.jsx";
import Section from "../components/Section.jsx";
import SkillsGraph from "../components/SkillsGraph.jsx";
import { about } from "../data.js";

export default function About() {
  return (
    <div className="page">
      <Section title="About">
        <ul className="detail-list">
          {about.map((item) => (
            <li className="detail" key={item.text}>
              <span className="detail__icon"><Icon name={item.icon} /></span>
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Skills">
        <SkillsGraph />
      </Section>
    </div>
  );
}
