import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clearPlanCache } from "../../utils/planCache";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Bust the plan cache so next check hits the API fresh
    clearPlanCache();

    // ✅ Set flag so PremiumRoute trusts the upgrade instantly
    // even if Stripe webhook hasn't updated the DB yet
    sessionStorage.setItem("paymentJustCompleted", "true");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-[16px]">
      <div className="w-[70px] h-[70px] rounded-full bg-[#FF4400]/10 flex items-center justify-center">
        <svg
          className="w-[36px] h-[36px] text-[#FF4400]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="font-clarendon text-[22px] font-medium text-black">
        Payment Successful!
      </h1>
      <p className="font-helvetica text-[14px] text-[#00000080] text-center max-w-[280px]">
        Your plan has been upgraded. You now have full access to all premium features.
      </p>

      <button
        onClick={() => navigate("/app/dashboard")}
        className="mt-[8px] w-[200px] h-[40px] bg-[#FF4400] hover:bg-[#d13c08] transition-colors text-white font-helvetica font-bold rounded-[10px] text-[14px]"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default Success;