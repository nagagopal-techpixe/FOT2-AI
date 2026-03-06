import { useNavigate } from "react-router-dom";

export default function RestoreAccount() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F54900]
                    px-4 sm:px-6 md:px-8">

      {/* Card */}
      <div className="bg-white rounded-[14px] shadow-lg
                      w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                      h-auto lg:h-[296px]
                      px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-7 lg:px-12 lg:py-8">

        {/* Title */}
        <h1 className="text-center font-clarendon font-medium
                       text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                       mb-1">
          Restore Account Access
        </h1>

        {/* Subtitle */}
        <p className="text-center font-normal font-helvetica
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]">
          Submit your email below to receive a one-time passcode for
        </p>
        <p className="text-center font-normal font-helvetica
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                      mb-4 sm:mb-5 lg:mb-6">
          secure password recovery
        </p>

        {/* Label */}
        <label className="block font-helvetica font-bold
                          text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                          mb-1 sm:mb-1.5 lg:mb-1.5">
          Email ID
        </label>

        {/* Input */}
        <input
          type="email"
          placeholder="Your email address"
          className="w-full px-2 py-2
                     bg-[#00000008] border border-[#0000001A] rounded-[10px]
                     font-helvetica font-normal
                     text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                     leading-[20px] tracking-[0%]
                     placeholder:font-normal
                     placeholder:text-[12px] sm:placeholder:text-[13px] lg:placeholder:text-[14px]
                     placeholder:leading-[20px] placeholder:tracking-[1%]
                     focus:outline-none focus:ring-1 focus:ring-black/30 transition-all"
        />

        {/* Button */}
        <button
          onClick={() => navigate("/otp-verification")}
          className="w-full py-2
                     mt-4 sm:mt-5 lg:mt-6
                     bg-[#F54900] text-white rounded-[10px]
                     font-helvetica font-bold
                     text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]
                     tracking-[1px]"
        >
          Request OTP Code
        </button>

      </div>
    </div>
  );
}