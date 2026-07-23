import { NavLink } from "react-router-dom";
import Icon from "./Icon.jsx";
import { profile, tabs } from "../data.js";

export default function ProfileHeader() {
  return (
    <section className="pcard profile-head">
      <div className="cover" />

      <div className="profile-head__body">
        <div className="profile-head__id">
          <div className="avatar avatar--lg">
            <img className="avatar__img" src={profile.photo} alt={profile.name} />
          </div>

          <div className="profile-head__meta">
            <h1 className="profile-head__name">{profile.name}</h1>
            <p className="profile-head__stats">
              {profile.stats.map((s, i) => (
                <span key={s.label}>
                  {i > 0 && " · "}
                  <strong>{s.value}</strong> {s.label}
                </span>
              ))}
            </p>
            <a className="profile-head__link" href={profile.linkHref} target="_blank" rel="noreferrer">{profile.link}</a>
          </div>
        </div>

        <div className="profile-actions">
          <NavLink className="btn btn--primary" to="/contact">
            <Icon name="mail" className="icon" />
            Contact me
          </NavLink>
          <a className="btn btn--secondary" href={profile.linkHref} target="_blank" rel="noreferrer">
            <Icon name="download" className="icon" />
            Download CV
          </a>
        </div>

        <nav className="tabs" aria-label="Profile content">
          {tabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) => `tab${isActive ? " is-active" : ""}`}
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </section>
  );
}
