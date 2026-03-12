import { useEffect } from "react";

export default function GoogleSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");

    if (token) {
      localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
      window.location.replace("/app/dashboard"); 
    } else {
      window.location.replace("/login");
    }
  }, []);

  return <p>Logging you in...</p>;
}