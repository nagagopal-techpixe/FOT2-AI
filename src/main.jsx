import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PlanModalProvider } from "./context/PlanModalContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlanModalProvider>
      <App />
    </PlanModalProvider>
  </StrictMode>
);