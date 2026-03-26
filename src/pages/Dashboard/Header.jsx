import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

export default function Header({ onMenuClick }) {
  const userName = localStorage.getItem("username");
  const [trialInfo, setTrialInfo] = useState(null); // { daysLeft, plan }

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axiosInstance.get(`/auth/users/${userId}`)
      .then((res) => {
        const user = res?.data?.user;
        if (user?.plan === "trial" && user?.trialEndsAt) {
          const diff = new Date(user.trialEndsAt) - new Date();
          const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
          setTrialInfo({ daysLeft: daysLeft > 0 ? daysLeft : 0 });
        }
      })
      .catch(() => {});
  }, []);

  const isExpiring = trialInfo?.daysLeft <= 2;

  return (
    <>
      <div className="flex items-center justify-between mb-6 sm:mb-7 md:mb-8 lg:mb-10 relative">

        {/* Left — Hamburger + Welcome */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1 -ml-1 text-gray-700 hover:text-black transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} className="sm:w-6 sm:h-6" />
          </button>

          <h2 className="font-helvetica font-bold
                         text-[16px] sm:text-[18px] md:text-[20px] lg:text-[21.82px]
                         leading-[8.82px] ml-3 lg:ml-0">
            Welcome back, {userName}
          </h2>
        </div>

        {/* Right — Trial badge (only for trial users) */}
        {trialInfo !== null && (
          <div
            className="flex items-center gap-[6px] px-[10px] py-[5px] rounded-[8px] shrink-0"
            style={{
              background: isExpiring ? "#FFF0EE" : "#FFF5E6",
              border: `1px solid ${isExpiring ? "#FFD5CC" : "#FFE0A3"}`,
            }}
          >
            {/* Pulsing dot */}
            <span
              className="w-[6px] h-[6px] rounded-full shrink-0 animate-pulse"
              style={{ background: isExpiring ? "#FF4400" : "#FF8800" }}
            />
            <span
              className="font-helvetica font-medium text-[11px] sm:text-[12px] whitespace-nowrap"
              style={{ color: isExpiring ? "#CC3300" : "#996600" }}
            >
              {trialInfo.daysLeft === 0
                ? "Trial expired"
                : `${trialInfo.daysLeft} day${trialInfo.daysLeft === 1 ? "" : "s"} left in free trial`}
            </span>
          </div>
        )}

      </div>

      <hr className="border-0 h-[1px] bg-[#00000026] -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10" />
    </>
  );
}