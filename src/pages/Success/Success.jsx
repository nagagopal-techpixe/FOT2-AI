import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Success() {
  const [params] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    fetch(`https://fotwo.bizmailo.com/api/stripe/session/${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Payment data:", data);
        setPaymentData(data);
      })
      .catch((err) => console.error("Error fetching payment:", err));
  }, []);

  if (!paymentData) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-[20px] w-full sm:w-[400px] md:w-[440px] lg:w-[480px]
                        shadow-[0px_8px_40px_rgba(0,0,0,0.12)] px-[24px] py-[32px] flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#FF4400] border-t-transparent rounded-full animate-spin" />
          <p className="font-helvetica text-[13px] text-black/50">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const items = [
    { label: "Email",           value: paymentData.customerEmail, highlight: false },
    { label: "Plan",            value: paymentData.plan,          highlight: true  },
    { label: "Amount",          value: `$${paymentData.amount}`,  highlight: true  },
    { label: "Subscription ID", value: paymentData.subscriptionId, highlight: false },
  ];

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] px-4 sm:px-6">
      <div className="bg-white rounded-[20px] w-full sm:w-[400px] md:w-[440px] lg:w-[480px]
                      shadow-[0px_8px_40px_rgba(0,0,0,0.12)]">

        {/* Header */}
        <div className="flex items-center justify-center gap-[10px]
                        px-[16px] py-[14px] sm:px-[20px] sm:py-[16px] lg:px-[24px] lg:py-[20px]
                        border-b border-[#00000012]">
          <CheckCircle size={18} className="text-[#E8430A] shrink-0" />
          <h2 className="font-clarendon font-medium text-black
                         text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
            Payment Successful
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
                                    ${item.highlight ? "text-[#E8430A]" : "text-black/60"}
                                    ${item.label === "Subscription ID" ? "text-[10px] sm:text-[11px] lg:text-[12px]" : ""}`}>
                    {item.value}
                  </span>
                </div>
                {i < items.length - 1 && (
                  <hr className="border-0 h-[1px] bg-[#00000012] mx-[16px]" />
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center pt-[2px] sm:pt-[3px] lg:pt-[4px]">
            <button
              onClick={() => window.location.href = "/app/dashboard"}
              className="w-[200px] sm:w-[220px] lg:w-[245px]
                         h-[32px] sm:h-[34px] lg:h-[36px]
                         bg-[#FF4400] hover:bg-[#d13c08] transition-colors
                         text-white font-helvetica font-medium rounded-[12px]
                         text-[12px] sm:text-[13px] lg:text-[14px]"
            >
              Go to Dashboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}