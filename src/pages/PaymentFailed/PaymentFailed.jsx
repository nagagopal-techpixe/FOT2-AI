import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
  const navigate = useNavigate();

  const items = [
    { label: "Status",  value: "Payment Failed",      highlight: true  },
    { label: "Reason",  value: "Cancelled or Declined", highlight: false },
    { label: "Charges", value: "None",                 highlight: false },
  ];

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] px-4 sm:px-6">
      <div className="bg-white rounded-[20px] w-full sm:w-[400px] md:w-[440px] lg:w-[480px]
                      shadow-[0px_8px_40px_rgba(0,0,0,0.12)]">

        {/* Header */}
        <div className="flex items-center justify-center gap-[10px]
                        px-[16px] py-[14px] sm:px-[20px] sm:py-[16px] lg:px-[24px] lg:py-[20px]
                        border-b border-[#00000012]">
          <XCircle size={18} className="text-[#E8430A] shrink-0" />
          <h2 className="font-clarendon font-medium text-black
                         text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
            Payment Failed
          </h2>
        </div>

        {/* Body */}
        <div className="px-[16px] py-[14px] flex flex-col gap-[12px]
                        sm:px-[20px] sm:py-[16px] sm:gap-[14px]
                        lg:px-[24px] lg:py-[20px] lg:gap-[16px]">

          {/* Summary Card */}
          <div className="bg-[#FFF5F2] rounded-[14px] overflow-hidden">
            {items.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between
                                px-[12px] py-[12px] sm:px-[14px] sm:py-[14px] lg:px-[18px] lg:py-[16px]">
                  <span className="font-helvetica font-normal text-black
                                   text-[12px] sm:text-[13px] lg:text-[14px]">
                    {item.label}
                  </span>
                  <span className={`font-helvetica font-normal text-[12px] sm:text-[13px] lg:text-[14px]
                                    ${item.highlight ? "text-[#E8430A]" : "text-black/60"}`}>
                    {item.value}
                  </span>
                </div>
                {i < items.length - 1 && (
                  <hr className="border-0 h-[1px] bg-[#00000012] mx-[16px]" />
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center gap-[8px] pt-[2px] sm:pt-[3px] lg:pt-[4px]">
            <button
              onClick={() => navigate(-1)}
              className="w-[200px] sm:w-[220px] lg:w-[245px]
                         h-[32px] sm:h-[34px] lg:h-[36px]
                         bg-[#FF4400] hover:bg-[#d13c08] transition-colors
                         text-white font-helvetica font-medium rounded-[12px]
                         text-[12px] sm:text-[13px] lg:text-[14px]"
            >
              Try Again
            </button>
            {/* <button
              onClick={() => navigate("/app/dashboard")}
              className="w-[200px] sm:w-[220px] lg:w-[245px]
                         h-[32px] sm:h-[34px] lg:h-[36px]
                         border border-[#00000026] hover:bg-[#F7F7F7] transition-colors
                         text-black font-helvetica font-medium rounded-[12px]
                         text-[12px] sm:text-[13px] lg:text-[14px]"
            >
              Back to Dashboard
            </button> */}
          </div>

        </div>
      </div>
    </div>
  );
}