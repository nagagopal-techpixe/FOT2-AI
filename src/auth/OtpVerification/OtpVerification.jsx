import { useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F54900]
                    px-4 sm:px-6 md:px-8">

      {/* Card */}
      <div className="bg-white rounded-[14px] shadow-lg text-center
                      w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                      h-auto lg:h-[365px]
                      px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-7 lg:px-12 lg:py-8">

        {/* Title */}
        <h1 className="font-clarendon font-medium
                       text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                       mb-1">
          OTP Code Verification
        </h1>

        {/* Subtitle */}
        <p className="font-helvetica font-normal leading-[20px]
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                      mb-5 sm:mb-6 lg:mb-8">
          We've sent a 4-digit verification code to your email.
          <br />
          Enter the code below to confirm your identity.
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-center gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-4">
          {[1, 2, 3, 4].map((_, index) => (
            <input
              key={index}
              maxLength={1}
              className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[64px] lg:h-[64px]
                         bg-[#00000008] border border-[#0000001A] rounded-[12px]
                         text-center font-bold font-helvetica
                         text-[20px] sm:text-[24px] lg:text-[28px]
                         focus:outline-none focus:ring-1 focus:ring-black"
            />
          ))}
        </div>

        {/* Resend Text */}
        <p className="font-helvetica
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                      mb-4 sm:mb-5 lg:mb-6">
          Didn't receive the email?
          <br />
          You can request a new code in 21 seconds.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/set-new-password")}
          className="w-full py-2
                     bg-[#F54900] text-white rounded-[10px]
                     font-helvetica font-bold
                     text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]
                     tracking-[1px]"
        >
          Submit Code
        </button>

      </div>
    </div>
  );
}