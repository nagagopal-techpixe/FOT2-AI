import { Trash2 } from "lucide-react";

export default function DeleteProjectModal({ onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50
                    px-4 sm:px-6">
      <div className="bg-white rounded-[20px]
                      w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                      px-[20px] py-[24px] sm:px-[30px] sm:py-[30px] lg:px-[40px] lg:py-[36px]
                      shadow-[0px_8px_40px_rgba(0,0,0,0.10)]
                      flex flex-col items-center
                      gap-[6px] sm:gap-[7px] lg:gap-[8px]">

        {/* Icon */}
        <div className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] lg:w-[70px] lg:h-[70px]
                        rounded-[16px] bg-[#FF44000D] border border-[#E8430A]/30
                        flex items-center justify-center">
          <Trash2
            size={22}
            className="text-[#E8430A] sm:w-[25px] sm:h-[25px] lg:w-[28px] lg:h-[28px]"
            strokeWidth={1.5}
          />
        </div>

        {/* Title */}
        <h2 className="font-clarendon font-medium text-black
                       text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
          Delete Project
        </h2>

        {/* Description */}
        <p className="font-helvetica font-normal text-[#000000] text-center
                      text-[11px] sm:text-[12px] lg:text-[13px]">
          This action will permanently delete the selected project. Do you want to proceed?
        </p>

        {/* Buttons */}
        <div className="flex gap-[10px] sm:gap-[12px] lg:gap-[14px]
                        w-full mt-[6px] sm:mt-[7px] lg:mt-[8px]">
          <button
            onClick={onClose}
            className="flex-1
                       h-[34px] sm:h-[36px] lg:h-[38px]
                       border border-[#FF4400] text-[#E8430A]
                       text-[12px] sm:text-[13px] lg:text-[14px]
                       font-helvetica font-bold rounded-[10px]
                       hover:bg-[#FFF5F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1
                       h-[34px] sm:h-[36px] lg:h-[38px]
                       bg-[#FF4400] hover:bg-[#d13c08] transition-colors
                       text-white
                       text-[12px] sm:text-[13px] lg:text-[14px]
                       font-helvetica font-bold rounded-[10px]"
          >
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
}