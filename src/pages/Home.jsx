import Section from "../components/Section.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProjectStack from "../components/ProjectStack.jsx";
import GithubContrib from "../components/GithubContrib.jsx";
import IntroDots from "../components/IntroDots.jsx";
import Icon from "../components/Icon.jsx";
import { experience } from "../data.js";

export default function Home() {
  return (
    <div className="page">
      <ProfileHeader />

      <Section title="Intro">
        <IntroDots />
      </Section>

      <Section title="Top projects" action={{ label: "All projects", to: "/projects" }} bare>
        <ProjectStack />
      </Section>

      <Section title="Client work" action={{ label: "Full experience", to: "/experience" }}>
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

      <GithubContrib />
    </div>
  );
}
