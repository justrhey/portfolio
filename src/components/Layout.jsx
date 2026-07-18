import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Icon from "./Icon.jsx";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile drawer after tapping a link (only relevant < 900px)
  const handleNavigate = () => {
    if (window.innerWidth <= 900) setSidebarOpen(false);
  };

  return (
    <div className="layout">
      <button
        className="mobile-menu icon-btn"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Menu"
      >
        <Icon name="menu" />
      </button>

      <Sidebar open={sidebarOpen} onNavigate={handleNavigate} />

      {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}

      <main className="profile">
        <Outlet />
      </main>
    </div>
  );
}
