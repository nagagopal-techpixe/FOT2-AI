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
    <div className="relative h-screen w-full bg-[#FF4400] flex items-center justify-center">

      {/* Center Text */}
      <h1 className="font-clarendon font-medium
                     text-[40px] sm:text-[50px] lg:text-[60px]
                     leading-[20px]">
        FO2
      </h1>

      {/* Bottom Loader */}
      <div className="absolute bottom-8 sm:bottom-9 lg:bottom-10
                      w-[120px] sm:w-[133px] lg:w-[147px]
                      h-[28px] sm:h-[30px] lg:h-[33px]
                      flex items-center justify-center gap-2
                      bg-white rounded-lg shadow-md">
        <span className="w-[9px] h-[9px] sm:w-[10px] sm:h-[10px] lg:w-[11px] lg:h-[11px]
                         bg-[#FF4400] rounded-full">
        </span>
        <span className="text-black/50 font-medium
                         text-[11px] sm:text-[12px] lg:text-sm">
          Getting Ready...
        </span>
      </div>

    </div>
  );
}