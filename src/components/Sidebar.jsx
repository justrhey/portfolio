import { NavLink } from "react-router-dom";
import Icon from "./Icon.jsx";
import { profile, navItems, shortcuts } from "../data.js";

export default function Sidebar({ open, onNavigate }) {
  return (
    <aside className={`sidebar${open ? " is-open" : ""}`} id="sidebar" aria-label="Sidebar">
      <NavLink className="side-item side-item--profile" to="/" onClick={onNavigate}>
        <span className="avatar avatar--sm">
          <img className="avatar__img" src={profile.photo} alt={profile.name} />
        </span>
        <span className="side-item__label">{profile.name}</span>
      </NavLink>

      <nav className="side-nav" aria-label="Sections">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) => `side-item${isActive ? " is-active" : ""}`}
            onClick={onNavigate}
          >
            <span className="side-icon">
              <Icon name={item.icon} />
            </span>
            <span className="side-item__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="side-divider" />

      <p className="side-heading">Shortcuts</p>
      <nav className="side-nav" aria-label="Shortcuts">
        {shortcuts.map((item) => (
          <a
            key={item.label}
            className="side-item"
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            onClick={onNavigate}
          >
            <span className="side-icon side-icon--thumb" />
            <span className="side-item__label">{item.label}</span>
          </a>
        ))}
      </nav>

      <p className="side-footer">© 2026 Justine Rhey</p>
    </aside>
  );
}
