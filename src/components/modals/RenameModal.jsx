import { X } from "lucide-react";
import { useState } from "react";

export default function RenameModal({ onClose, onRename }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await onRename(title.trim());
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50
                    px-4 sm:px-6">
      <div className="bg-white rounded-[8px]
                      w-full sm:w-[400px] md:w-[445px] lg:w-[490px]
                      shadow-[0px_8px_40px_rgba(0,0,0,0.10)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between
                        px-[14px] py-[12px] sm:px-[16px] sm:py-[14px] lg:px-[20px] lg:py-[17px]">
          <h2 className="font-clarendon font-medium text-black mx-auto
                         text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
            Rename
          </h2>
          <button
            onClick={onClose}
            className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]
                       flex items-center justify-center rounded-full
                       border-[1.5px] border-[#000000]
                       hover:bg-[#F7F7F7] transition-colors shrink-0"
          >
            <X size={12} className="lg:w-[14px] lg:h-[14px]" />
          </button>
        </div>

        <hr className="border-0 h-[1px] bg-[#00000026]" />

        {/* Body */}
        <div className="flex flex-col
                        px-[16px] py-[12px] gap-[6px]
                        sm:px-[22px] sm:py-[14px] sm:gap-[7px]
                        lg:px-[28px] lg:py-[16px] lg:gap-[8px]">

          <p className="font-helvetica font-normal text-black
                        text-[12px] sm:text-[13px] lg:text-[14px]">
            Enter a new title for this project.
          </p>

          <input
            type="text"
            placeholder="New project name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            className="h-[38px] sm:h-[40px] lg:h-[44px]
                       bg-[#FF44000F] rounded-[10px]
                       px-[12px] lg:px-[14px]
                       outline-none font-helvetica text-black
                       text-[12px] sm:text-[13px] lg:text-[14px]
                       placeholder:text-[#00000040]"
          />

          {/* Buttons */}
          <div className="flex gap-[10px] sm:gap-[11px] lg:gap-[12px]
                          mt-[6px] sm:mt-[8px] lg:mt-[10px]">
            <button
              onClick={onClose}
              className="flex-1
                         h-[34px] sm:h-[36px] lg:h-[38px]
                         border border-[#E8430A] text-[#FF4400]
                         text-[12px] sm:text-[13px] lg:text-[14px]
                         font-helvetica font-bold rounded-[10px]
                         hover:bg-[#FFF5F2] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRename}
              disabled={!title.trim() || loading}
              className="flex-1
                         h-[34px] sm:h-[36px] lg:h-[38px]
                         bg-[#FF4400] text-white
                         text-[12px] sm:text-[13px] lg:text-[14px]
                         font-helvetica font-bold rounded-[12px]
                         hover:bg-[#d13c08] transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Ok"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}