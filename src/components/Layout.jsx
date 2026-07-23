import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Icon from "./Icon.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen && window.innerWidth <= 900) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [sidebarOpen]);

  const handleNavigate = () => {
    if (window.innerWidth <= 900) setSidebarOpen(false);
  };

  return (
    <>
      <button
        className="mobile-menu-btn icon-btn"
        onClick={() => setSidebarOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <Icon name="menu" />
      </button>

      <div className="layout">
        <Sidebar open={sidebarOpen} onNavigate={handleNavigate} />

        {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)} />}

        <main className="profile">
          <Outlet />
        </main>
      </div>
    </>
  );
}
