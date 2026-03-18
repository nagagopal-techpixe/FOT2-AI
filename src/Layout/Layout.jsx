import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // ✅ Use dvh instead of h-screen — fixes keyboard pushing layout on mobile
    <div className="flex overflow-hidden" style={{ height: "100dvh" }}>

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <div
        className={`
          fixed top-0 left-0 h-full z-30 transition-transform duration-300
          lg:static lg:translate-x-0 lg:z-auto
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Right Content ── */}
      {/* overflow-hidden here — child handles its own scroll */}
      <div className="flex-1 overflow-hidden bg-white flex flex-col">
        <Outlet context={{ onMenuClick: () => setSidebarOpen(true) }} />
      </div>

    </div>
  );
}

export default Layout;