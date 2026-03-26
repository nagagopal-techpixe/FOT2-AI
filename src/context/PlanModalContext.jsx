import { createContext, useContext, useEffect, useState } from "react";
import { PLAN_REQUIRED_EVENT } from "../utils/apiClient";

const PlanModalContext = createContext(null);

export function PlanModalProvider({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = () => setShow(true);
    window.addEventListener(PLAN_REQUIRED_EVENT, handler);
    return () => window.removeEventListener(PLAN_REQUIRED_EVENT, handler);
  }, []);

  return (
    <PlanModalContext.Provider value={{ show, setShow }}>
      {children}
    </PlanModalContext.Provider>
  );
}

export const usePlanModal = () => useContext(PlanModalContext);