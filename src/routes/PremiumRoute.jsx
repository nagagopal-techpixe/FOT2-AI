import { useState, useEffect, useCallback } from "react";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { createPortal } from "react-dom";
import UpgradePlanModal from "../components/modals/UpgradePlanModal";
import { checkIsPremium } from "../utils/planCache";

function PremiumRoute() {
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  // ✅ GET context from parent
  const context = useOutletContext();

  const verifyPlan = useCallback(async () => {
    setStatus("loading");
    try {
      const isPremium = await checkIsPremium();
      setStatus(isPremium ? "premium" : "free");
    } catch {
      setStatus("free");
    }
  }, []);

  useEffect(() => {
    verifyPlan();

    const handlePageShow = (e) => {
      if (e.persisted) {
        verifyPlan();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [verifyPlan]);

  // ── Loading ──
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-full">
        <svg
          className="animate-spin h-6 w-6 text-[#FF4400]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }

  // ── Free user ──
  if (status === "free") {
    return (
      <>
        {createPortal(
          <UpgradePlanModal
            onClose={() => navigate("/app/dashboard")}
          />,
          document.body
        )}
      </>
    );
  }

  // ── Premium user ──
  return <Outlet context={context} />; // ✅ PASS context
}

export default PremiumRoute;