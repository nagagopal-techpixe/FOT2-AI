import { X, Star } from "lucide-react";
import { useState, useEffect } from "react";
import PaymentMethodModal from "./PaymentMethodModal";
import { getPlans } from "../../api/planapi";

// ── Skeleton ──────────────────────────────────────────────
const PlanSkeleton = () => (
  <div className="animate-pulse">
    {[0, 1].map((i) => (
      <div key={i}>
        <div className="flex items-center justify-between px-[14px] py-[12px] sm:px-[16px] sm:py-[14px] lg:px-[18px] lg:py-[16px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[18px] h-[18px] lg:w-[20px] lg:h-[20px] rounded-full bg-gray-200" />
            <div className="w-[100px] h-[13px] rounded bg-gray-200" />
          </div>
          <div className="w-[40px] h-[13px] rounded bg-gray-200" />
        </div>
        {i === 0 && <hr className="border-0 h-[1px] bg-[#00000026] mx-[16px]" />}
      </div>
    ))}
  </div>
);

export default function UpgradePlanModal({ onClose }) {
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState("upgrade");
  const [isLoading, setIsLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState(null);

  // ── Fetch plans ───────────────────────────────────────────
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setPlansLoading(true);
        const data = await getPlans();
        if (data.success) {
          setPlans(data.plans);
        } else {
          setPlansError("Failed to load plans.");
        }
      } catch (err) {
        setPlansError("Network error. Please try again.");
      } finally {
        setPlansLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // ── Stripe checkout ───────────────────────────────────────
  const handleSubscribe = async (priceId) => {
    if (!priceId) return; // free/trial plan
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        "https://fotwo.bizmailo.com/api/stripe/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priceId, userId }),
        }
      );
      const session = await response.json();
      if (session.url) window.location.href = session.url;
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (step === "payment") {
    return <PaymentMethodModal onClose={onClose} onBack={() => setStep("upgrade")} />;
  }

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999] px-4 sm:px-6">
      <div className="rounded-[20px] w-full sm:w-[400px] md:w-[440px] lg:w-[480px] shadow-[0px_8px_40px_rgba(0,0,0,0.15)] overflow-hidden">

        {/* ── Orange Top Section ── */}
        <div className="bg-[#FF4400] px-[20px] pt-[20px] pb-[40px] sm:px-[26px] sm:pt-[26px] sm:pb-[44px] lg:px-[32px] lg:pt-[32px] lg:pb-[48px] flex flex-col items-center gap-[6px] sm:gap-[7px] lg:gap-[8px] relative">
          <button
            onClick={onClose}
            className="absolute top-[12px] right-[12px] sm:top-[14px] sm:right-[14px] lg:top-[16px] lg:right-[16px] w-[24px] h-[24px] lg:w-[26px] lg:h-[26px] flex items-center justify-center rounded-full border border-white hover:bg-white/20 transition-colors"
          >
            <X size={12} className="text-white lg:w-[14px] lg:h-[14px]" />
          </button>

          <div className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] lg:w-[70px] lg:h-[70px] rounded-[16px] bg-white/20 flex items-center justify-center">
            <Star size={24} className="text-white sm:w-[27px] sm:h-[27px] lg:w-[30px] lg:h-[30px]" strokeWidth={1.5} />
          </div>

          <h2 className="font-clarendon font-medium text-white text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
            Upgrade Your Plan
          </h2>
          <p className="font-helvetica font-normal text-white text-center text-[11px] sm:text-[12px] lg:text-[13px]">
            Access powerful features designed for serious creators.
          </p>
        </div>

        {/* ── White Bottom Section ── */}
        <div className="bg-white px-[20px] pt-[12px] pb-[20px] sm:px-[26px] sm:pt-[14px] sm:pb-[24px] lg:px-[32px] lg:pt-[16px] lg:pb-[28px] flex flex-col gap-[12px] sm:gap-[14px] lg:gap-[16px]">

          {/* Plan Options */}
          <div className="bg-[#FFF5F2] rounded-[10px] overflow-hidden mx-[2px] mt-[-36px] sm:mt-[-38px] lg:mt-[-40px] relative z-10">
            {plansLoading ? (
              <PlanSkeleton />
            ) : plansError ? (
              <p className="text-center text-red-500 text-[13px] py-[16px] px-[14px]">
                {plansError}
              </p>
            ) : (
              plans.map((plan, i) => (
                <div key={plan._id}>
                  <button
                    onClick={() => setSelected(i)}
                    className="w-full flex items-center justify-between px-[14px] py-[12px] sm:px-[16px] sm:py-[14px] lg:px-[18px] lg:py-[16px] hover:bg-[#FFE8E0] transition-colors"
                  >
                    <div className="flex items-center gap-[10px] sm:gap-[11px] lg:gap-[12px]">
                      <div className={`w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] lg:w-[20px] lg:h-[20px] rounded-full border-2 flex items-center justify-center ${selected === i ? "border-[#0000004D]" : "border-[#00000040]"}`}>
                        {selected === i && (
                          <div className="w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] lg:w-[10px] lg:h-[10px] rounded-full bg-[#FF4400]" />
                        )}
                      </div>
                      <span className="font-helvetica font-normal text-black text-[12px] sm:text-[13px] lg:text-[14px]">
                        {plan.label}
                      </span>
                    </div>
                    <span className="font-helvetica font-normal text-[#FF4400] text-[11px] lg:text-[12px]">
                      {plan.price}
                    </span>
                  </button>
                  {i < plans.length - 1 && (
                    <hr className="border-0 h-[1px] bg-[#00000026] mx-[16px]" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Upgrade Button */}
          <div
            onClick={() => {
              if (isLoading || plansLoading) return;
              const plan = plans[selected];
              handleSubscribe(plan?.priceId);
            }}
            className="flex flex-col items-center pt-[4px] sm:pt-[5px] lg:pt-[6px] pb-[10px] sm:pb-[14px] lg:pb-[28px]"
          >
            <button
              disabled={isLoading || plansLoading}
              className="w-[200px] sm:w-[220px] lg:w-[245px] h-[32px] sm:h-[34px] lg:h-[36px] bg-[#FF4400] hover:bg-[#d13c08] transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-white font-helvetica font-bold rounded-[10px] text-[12px] sm:text-[13px] lg:text-[14px] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </>
              ) : (
                "Upgrade Now"
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}