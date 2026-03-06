import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* ── Mobile Overlay ─────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────────────────── */}
      {/* Desktop: always visible | Mobile: slide in from left */}
      <div
        className={`
          fixed top-0 left-0 h-full z-30 transition-transform duration-300
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Right Content ──────────────────────────────────────────── */}
      <div className="flex-1 h-full overflow-y-auto bg-white">
        <Outlet context={{ onMenuClick: () => setSidebarOpen(true) }} />
      </div>

    </div>
  );
}

export default Layout;