import { MessageSquare, Menu } from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
export default function HistoryPage() {
  const navigate = useNavigate();
  const { onMenuClick } = useOutletContext();

  return (
    <div className="flex flex-col flex-1 h-screen bg-white overflow-hidden">

      {/* ── Top Bar ── */}
      <div className="flex items-center gap-[8px] lg:gap-[10px]
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[50px] sm:h-[56px] lg:h-[64px]
                      border-b border-gray-300 shrink-0">

        {/* Hamburger — mobile/tablet only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 -ml-1 text-gray-700 hover:text-black transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} className="sm:w-6 sm:h-6" />
        </button>

        <span className="font-helvetica font-bold text-black
                         text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]
                         leading-[28px]">
          History
        </span>
      </div>

      {/* ── Content Area ── */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6">

        <div className="bg-[#F5F5F5] rounded-[20px]
                        w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                        h-auto lg:h-[271px]
                        flex flex-col items-center justify-center gap-[12px] sm:gap-[14px] lg:gap-[16px]
                        py-[32px] px-[24px] sm:py-[40px] sm:px-[32px] lg:py-[48px] lg:px-[40px]">

          {/* Icon */}
          <div className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] lg:w-[70px] lg:h-[70px]
                          p-[18px] sm:p-[20px] lg:p-[24px]
                          rounded-[14px] bg-[#FFF0EB] border border-[#E8430A]/30
                          flex items-center justify-center">
            <MessageSquare
              size={26}
              className="text-[#E8430A] sm:w-[30px] sm:h-[30px] lg:w-[36px] lg:h-[36px]"
              strokeWidth={1.5}
            />
          </div>

          {/* Title */}
          <h2 className="font-clarendon font-medium text-black -mb-3
                         text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
            Conversation History
          </h2>

          {/* Subtitle */}
          <p className="font-helvetica font-normal text-center
                        text-[11px] sm:text-[12px] lg:text-[13px]">
            No conversations yet. Start creating to see your sessions here.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/app/historylist")}
            className="bg-[#F54900] text-white rounded-[10px]
                       px-8 py-2 sm:px-10 sm:py-2.5 lg:px-12 lg:py-3
                       font-helvetica font-bold
                       text-[12px] sm:text-[13px] lg:text-[14px]"
          >
            Start New Session
          </button>

        </div>

      </div>

    </div>
  );
}