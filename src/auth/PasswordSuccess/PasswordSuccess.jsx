export default function PasswordSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F54900]
                    px-4 sm:px-6 md:px-8">

      {/* Card */}
      <div className="bg-white rounded-[14px] shadow-lg
                      flex flex-col items-center justify-center text-center
                      w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                      h-auto lg:h-[216px]
                      px-5 py-8 sm:px-8 sm:py-8 md:px-10 lg:px-12 lg:py-0">

        {/* Icon Container */}
        <div className="w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] lg:w-[70px] lg:h-[70px]
                        rounded-[14px]
                        border border-[#F5490033]
                        flex items-center justify-center
                        mb-3 sm:mb-4 lg:mb-5">
          <svg
            width="32"
            height="32"
            className="sm:w-[36px] sm:h-[36px] lg:w-[40px] lg:h-[40px]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F54900"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Shield Shape */}
            <path d="M12 3L19 7V13C19 17 16 20 12 21C8 20 5 17 5 13V7L12 3Z" />
            {/* Checkmark */}
            <path d="M9 12L11 14L15 10" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="font-clarendon font-medium
                       text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                       mb-1">
          Password Updated Successfully
        </h1>

        {/* Subtitle */}
        <p className="font-helvetica font-normal
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]">
          Your account security has been refreshed. Redirecting you to the dashboard.
        </p>

      </div>
    </div>
  );
}