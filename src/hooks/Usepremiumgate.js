import { useState, useCallback } from "react";

/**
 * Returns { isPremium, gateClick, UpgradeModalNode }
 *
 * Usage:
 *   const { isPremium, gateClick, UpgradeModalNode } = usePremiumGate();
 *
 *   <div onClick={gateClick}>...dashboard content...</div>
 *   {UpgradeModalNode}
 */
export function usePremiumGate() {
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Read plan from localStorage — adjust key/value to match your auth flow
  const isPremium = localStorage.getItem("plan") === "premium";

  const gateClick = useCallback(
    (e) => {
      if (!isPremium) {
        e.stopPropagation(); // prevent event bubbling
        setShowUpgrade(true);
      }
    },
    [isPremium]
  );

  return { isPremium, gateClick, showUpgrade, setShowUpgrade };
}