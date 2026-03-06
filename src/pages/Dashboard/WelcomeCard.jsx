import { useNavigate } from "react-router-dom";

export default function WelcomeCard() {
  const navigate = useNavigate();

  return (
    <div className="
      w-full sm:w-[540px] md:w-[600px] lg:w-[664px]
      h-auto lg:h-[198px]
      bg-[#F7F7F7] rounded-[12px] border border-gray-300
      p-4 sm:p-5 lg:p-6
      mt-8 sm:mt-10 md:mt-12 lg:mt-14
      text-center mx-auto
    ">

      {/* Title */}
      <h3 className="font-clarendon font-medium
                     text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                     mb-1 sm:mb-2 lg:mb-2">
        Welcome to F02.AI
      </h3>

      {/* Subtitle */}
      <p className="font-helvetica font-normal
                    text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                    mb-3 sm:mb-3 md:mb-4 lg:mb-4">
        Experience intelligent prompt engineering built for precision and performance,
        designed for creators, strategists, and innovators who demand accuracy.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/app/startchat")}
        className="bg-[#F54900] text-white rounded-[10px]
                   px-4 py-1.5 sm:px-5 sm:py-2 lg:px-6 lg:py-2
                   font-helvetica font-normal
                   text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]"
      >
        Begin a New Session
      </button>

    </div>
  );
}