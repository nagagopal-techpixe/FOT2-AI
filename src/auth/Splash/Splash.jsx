import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/register");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    // ✅ 100dvh instead of h-screen — fixes mobile browser address bar cutting content
    <div
      className="relative w-full bg-[#FF4400] flex items-center justify-center"
      style={{ height: "100dvh" }}
    >

      {/* Animated dots CSS */}
      <style>{`
        @keyframes dot1 { 0%, 20% { opacity: 0; } 40%, 100% { opacity: 1; } }
        @keyframes dot2 { 0%, 40% { opacity: 0; } 60%, 100% { opacity: 1; } }
        @keyframes dot3 { 0%, 60% { opacity: 0; } 80%, 100% { opacity: 1; } }
        .dot1 { animation: dot1 1.4s infinite; }
        .dot2 { animation: dot2 1.4s infinite; }
        .dot3 { animation: dot3 1.4s infinite; }
      `}</style>

      {/* Center Text */}
      <h1 className="font-clarendon font-medium
                     text-[40px] sm:text-[50px] lg:text-[60px]
                     leading-[20px]">
        FO2
      </h1>

      {/* Bottom Loader — always visible on mobile now ✅ */}
      <div className="absolute bottom-8 sm:bottom-9 lg:bottom-10
                      w-[120px] sm:w-[133px] lg:w-[147px]
                      h-[28px] sm:h-[30px] lg:h-[33px]
                      flex items-center justify-center gap-2
                      bg-white rounded-lg shadow-md">

        <span className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] lg:w-[11px] lg:h-[11px]
                         bg-[#FF4400] rounded-full" />

        {/* "Getting Ready" + animated dots */}
        <span className="text-black/50 font-medium text-[11px] sm:text-[12px] lg:text-sm">
          Getting Ready
          <span className="dot1">.</span>
          <span className="dot2">.</span>
          <span className="dot3">.</span>
        </span>

      </div>

    </div>
  );
}