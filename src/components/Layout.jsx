import { Outlet } from "react-router-dom";
import NavPill from "./NavPill.jsx";

export default function Layout() {
  return (
    <div className="app">
      <NavPill />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
