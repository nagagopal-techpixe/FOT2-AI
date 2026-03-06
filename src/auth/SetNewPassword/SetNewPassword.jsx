import { useNavigate } from "react-router-dom";

export default function SetNewPassword() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F54900]
                    px-4 sm:px-6 md:px-8">

      {/* Card */}
      <div className="bg-white rounded-[14px] shadow-lg
                      w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                      h-auto lg:h-[390px]
                      px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-7 lg:px-12 lg:py-8">

        {/* Title */}
        <h1 className="text-center font-clarendon font-medium
                       text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                       mb-1">
          Set a New Password
        </h1>

        {/* Subtitle */}
        <p className="text-center font-normal font-helvetica
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                      mb-3 sm:mb-3 md:mb-4 lg:mb-4">
          Create a secure password for your account. If needed, you can
          <br />
          restart the recovery process anytime.
        </p>

        {/* New Password */}
        <div className="mb-4 sm:mb-5 lg:mb-6">
          <label className="block font-helvetica font-bold
                            text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                            mb-1">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3
                       bg-[#00000008] border border-[#0000001A] rounded-[10px]
                       font-helvetica
                       text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                       focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-5 sm:mb-6 md:mb-7 lg:mb-8">
          <label className="block font-helvetica font-bold
                            text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                            mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Re-enter your new password"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3
                       bg-[#00000008] border border-[#0000001A] rounded-[10px]
                       font-helvetica
                       text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                       focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/password-success")}
          className="w-full py-2
                     bg-[#F54900] text-white rounded-[10px]
                     font-helvetica font-bold
                     text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]
                     tracking-[1px]"
        >
          Update Password
        </button>

      </div>
    </div>
  );
}