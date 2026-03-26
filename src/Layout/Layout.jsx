import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import UpgradePlanModal from "../components/modals/UpgradePlanModal";
import { usePlanModal } from "../context/PlanModalContext";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { show, setShow } = usePlanModal();  // ← pull from context
  const navigate = useNavigate();

  return (
    <div className="flex overflow-hidden" style={{ height: "100dvh" }}>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`
        fixed top-0 left-0 h-full z-30 transition-transform duration-300
        lg:static lg:translate-x-0 lg:z-auto
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 overflow-hidden bg-white flex flex-col">
        <Outlet context={{ onMenuClick: () => setSidebarOpen(true) }} />
      </div>

      {/* 🔹 Your existing UpgradePlanModal — shown on any 403 */}
      {show && createPortal(
        <UpgradePlanModal
          onClose={() => {
            setShow(false);
            navigate("/app/dashboard");
          }}
        />,
        document.body
      )}

    </div>
  );
}

export default Layout;