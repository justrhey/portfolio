import Icon from "./Icon.jsx";
import { profile } from "../data.js";

export default function TopBar({ onMenuToggle }) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <button className="icon-btn topbar__menu" onClick={onMenuToggle} aria-label="Toggle menu">
          <Icon name="menu" />
        </button>
        <a className="brand" href="#">
          <span className="brand__mark">P</span>
          <span className="brand__name">portfolio</span>
        </a>
      </div>

      <nav className="topbar__nav" aria-label="Primary">
        <a className="topbar__tab is-active" href="#" aria-label="Home" aria-current="page">
          <Icon name="home" />
        </a>
        <a className="topbar__tab" href="#projects" aria-label="Projects">
          <Icon name="grid" />
        </a>
        <a className="topbar__tab" href="#" aria-label="Notifications">
          <Icon name="bell" />
        </a>
      </nav>

      <div className="topbar__right">
        <button className="icon-btn" aria-label="Search">
          <Icon name="search" />
        </button>
        <span className="avatar avatar--sm">
          <img className="avatar__img" src={profile.photo} alt={profile.name} />
        </span>
      </div>
    </header>
  );
}
