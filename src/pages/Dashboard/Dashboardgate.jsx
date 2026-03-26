import { createPortal } from "react-dom";
import { usePremiumGate } from "../../hooks/Usepremiumgate"; // adjust path
import UpgradePlanModal from "../../components/modals/UpgradePlanModal";   // adjust path

/**
 * Wrap your entire dashboard page with this component.
 * Premium users → clicks pass through normally.
 * Free users    → any click opens the UpgradePlanModal.
 */
export default function DashboardGate({ children }) {
  const { isPremium, gateClick, showUpgrade, setShowUpgrade } = usePremiumGate();

  return (
    <>
      {/* Transparent click-capture overlay for free users only */}
      {!isPremium && (
        <div
          className="fixed inset-0 z-10 cursor-pointer"
          onClick={gateClick}
          aria-label="Upgrade to access dashboard"
        />
      )}

      {/* Dashboard content sits beneath the overlay */}
      <div className="relative">
        {children}
      </div>

      {/* Upgrade modal rendered at body level to avoid stacking issues */}
      {showUpgrade &&
        createPortal(
          <UpgradePlanModal onClose={() => setShowUpgrade(false)} />,
          document.body
        )}
    </>
  );
}