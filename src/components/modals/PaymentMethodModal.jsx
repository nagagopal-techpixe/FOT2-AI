import { ChevronLeft, CreditCard } from "lucide-react";
import { useState } from "react";
import SummaryModal from "./SummaryModal";

const paymentMethods = [
  {
    label: "Credit Card",
    icon: <CreditCard size={16} className="text-white" />,
  },
  {
    label: "PayPal",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
      </svg>
    ),
  },
  {
    label: "Apple Pay",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
    ),
  },
  {
    label: "G-Pay",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
];

export default function PaymentMethodModal({ onClose, onBack }) {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState("payment");

  if (step === "summary") {
    return <SummaryModal onClose={onClose} onBack={() => setStep("payment")} onConfirm={() => console.log("confirmed")} />;
  }

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999]
                    px-4 sm:px-6">
      <div className="bg-white rounded-[20px]
                      w-full sm:w-[400px] md:w-[440px] lg:w-[480px]
                      shadow-[0px_8px_40px_rgba(0,0,0,0.12)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center gap-[10px] sm:gap-[11px] lg:gap-[12px]
                        px-[16px] py-[14px] sm:px-[22px] sm:py-[16px] lg:px-[28px] lg:py-[20px]
                        border-b border-[#00000012]">
          <button
            onClick={onBack}
            className="w-[24px] h-[24px] sm:w-[26px] sm:h-[26px] lg:w-[28px] lg:h-[28px]
                       flex items-center justify-center
                       border border-[#000000] rounded-[8px]
                       hover:bg-[#F7F7F7] transition-colors shrink-0"
          >
            <ChevronLeft size={14} className="lg:w-[16px] lg:h-[16px]" />
          </button>
          <h2 className="font-clarendon font-medium text-black
                         text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]">
            Payment Method
          </h2>
        </div>

        {/* Payment Options */}
        <div className="px-[14px] py-[14px] space-y-[8px]
                        sm:px-[18px] sm:py-[16px] sm:space-y-[9px]
                        lg:px-[24px] lg:py-[20px] lg:space-y-[10px]">
          {paymentMethods.map((method, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className="w-full flex items-center justify-between
                         bg-[#FF44000F] rounded-[12px]
                         px-[12px] sm:px-[14px] lg:px-[16px]
                         h-[46px] sm:h-[50px] lg:h-[56px]
                         hover:bg-[#FFE8E0] transition-colors"
            >
              <div className="flex items-center gap-[10px] sm:gap-[12px] lg:gap-[14px]">
                <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px]
                                rounded-full bg-[#FF4400] flex items-center justify-center shrink-0">
                  {method.icon}
                </div>
                <span className="font-helvetica font-normal text-black
                                 text-[12px] sm:text-[13px] lg:text-[14px]">
                  {method.label}
                </span>
              </div>

              {/* Radio */}
              <div className={`w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] lg:w-[20px] lg:h-[20px]
                              rounded-full border-2 flex items-center justify-center border-[#0000004D]`}>
                {selected === i && (
                  <div className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] lg:w-[12px] lg:h-[12px]
                                  rounded-full bg-[#FF4400]" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <div
          onClick={() => setStep("summary")}
          className="px-[14px] pb-[18px] sm:px-[18px] sm:pb-[20px] lg:px-[24px] lg:pb-[24px]
                     flex justify-center"
        >
          <button className="w-[200px] sm:w-[220px] lg:w-[245px]
                             h-[32px] sm:h-[34px] lg:h-[36px]
                             bg-[#FF4400] hover:bg-[#d13c08] transition-colors
                             text-white font-helvetica font-bold rounded-[10px]
                             text-[12px] sm:text-[13px] lg:text-[14px]">
            Continue to Pay
          </button>
        </div>

      </div>
    </div>
  );
}