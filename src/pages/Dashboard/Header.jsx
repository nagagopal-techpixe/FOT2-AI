import { Menu } from "lucide-react";

export default function Header({ onMenuClick }) {
  const userName = localStorage.getItem("username");
  return (
    <>
      <div className="flex items-center mb-6 sm:mb-7 md:mb-8 lg:mb-10 relative">

        {/* Hamburger — mobile/tablet only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 -ml-1 text-gray-700 hover:text-black transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} className="sm:w-6 sm:h-6" />
        </button>

        {/* Welcome Text */}
        <h2 className="font-helvetica font-bold
                       text-[16px] sm:text-[18px] md:text-[20px] lg:text-[21.82px]
                       leading-[8.82px]
                       ml-3 lg:ml-0">
          Welcome back, {userName}
        </h2>

      </div>

      {/* Divider — negative margin tracks parent padding at each breakpoint */}
      <hr className="border-0 h-[1px] bg-[#00000026]
                     -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10" />
    </>
  );
}