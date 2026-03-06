import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeleteActivityModal({ onClose, onConfirm }) {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50
                    px-4 sm:px-6">

      <div className="bg-white rounded-[20px]
                      w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                      h-auto lg:h-[271px]
                      p-[20px] sm:p-[26px] lg:p-[32px]
                      flex flex-col items-center justify-center
                      gap-[12px] sm:gap-[14px] lg:gap-[16px]">

        {/* Icon */}
        <div className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] lg:w-[70px] lg:h-[70px]
                        rounded-[16px] bg-[#FFF0EB] border border-[#E8430A]/30
                        flex items-center justify-center">
          <MessageSquare
            size={22}
            className="text-[#E8430A] sm:w-[25px] sm:h-[25px] lg:w-[28px] lg:h-[28px]"
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h2 className="font-clarendon font-medium
                       text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
          Remove All Activity
        </h2>

        {/* Description */}
        <p className="font-helvetica text-center
                      text-[11px] sm:text-[12px] lg:text-[13px]
                      -mt-[6px] sm:-mt-[8px] lg:-mt-[10px]
                      max-w-[90%] sm:max-w-[400px] lg:max-w-[480px]">
          This action will erase your entire conversation archive. Do you wish to continue?
        </p>

        {/* Buttons */}
        <div className="flex gap-[10px] sm:gap-[12px] lg:gap-[12px]
                        w-full mt-[1px]">
          <button
            onClick={onClose}
            className="flex-1
                       h-[36px] sm:h-[38px] lg:h-[40px]
                       border border-[#E8430A] text-[#E8430A]
                       text-[12px] sm:text-[13px] lg:text-[14px]
                       font-helvetica font-bold rounded-[10px]
                       hover:bg-[#FFF0EB] transition-colors"
          >
            Go Back
          </button>

          <button
            onClick={() => { onConfirm(); navigate("/app/history/"); }}
            className="flex-1
                       h-[36px] sm:h-[38px] lg:h-[40px]
                       bg-[#E8430A] text-white
                       text-[12px] sm:text-[13px] lg:text-[14px]
                       font-helvetica font-bold rounded-[10px]
                       hover:bg-[#d13c08] transition-colors"
          >
            Yes, Delete Everything
          </button>
        </div>

      </div>
    </div>
  );
}