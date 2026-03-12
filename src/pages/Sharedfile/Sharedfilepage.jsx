import { Bookmark, Menu } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const sharedFiles = Array(8).fill({
  title: "Create a song",
  preview: "Generate great article with any topic you want",
  date: "12 Feb 2026",
});

export default function SharedFilePage() {
  const { onMenuClick } = useOutletContext();
  const [bookmarked, setBookmarked] = useState(
    Array(8).fill(false).map((_, i) => i === 0)
  );

  const toggleBookmark = (i) => {
    setBookmarked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  };

  return (
    <div className="flex flex-col flex-1 h-screen bg-white overflow-hidden">

      {/* ── Top Bar ── */}
      <div className="flex items-center gap-[8px] lg:gap-[10px]
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[50px] sm:h-[56px] lg:h-[64px]
                      border-b border-gray-200 shrink-0">

        {/* Hamburger — mobile/tablet only */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1 -ml-1 text-gray-700 hover:text-black transition-colors"
          aria-label="Open menu"
        >
          <Menu size={22} className="sm:w-6 sm:h-6" />
        </button>

        <span className="font-helvetica font-bold text-black
                         text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
          Shared File
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto
                      px-[14px] py-[14px]
                      sm:px-[18px] sm:py-[18px]
                      lg:px-[24px] lg:py-[24px]">

        {/* Grid */}
        <div className="grid grid-cols-2 gap-[10px]
                        sm:grid-cols-2 sm:gap-[12px]
                        md:grid-cols-3 md:gap-[14px]
                        lg:grid-cols-4 lg:gap-[16px]">
          {sharedFiles.map((item, i) => (
            <div
              key={i}
              className="bg-[#FF44000D] border border-[#00000012] rounded-[14px]
                         p-[10px] sm:p-[12px] lg:p-[16px]
                         flex flex-col gap-[4px] sm:gap-[5px] lg:gap-[6px]
                         cursor-pointer hover:shadow-sm transition-shadow"
            >
              {/* Title + Bookmark icon */}
              <div className="flex items-start justify-between">
                <p className="font-helvetica font-normal text-black
                              text-[12px] sm:text-[13px] lg:text-[14px]">
                  {item.title}
                </p>
                <button
                  onClick={() => toggleBookmark(i)}
                  className="shrink-0 mt-[2px]"
                >
                  <Bookmark
                    size={13}
                    className={`transition-colors
                      sm:w-[14px] sm:h-[14px] lg:w-[16px] lg:h-[16px]
                      ${bookmarked[i]
                        ? "text-[#E8430A] fill-[#E8430A]"
                        : "text-[#E8430A]"
                      }`}
                  />
                </button>
              </div>

              {/* Preview */}
              <p className="font-helvetica font-normal text-[#00000080] leading-[18px]
                            text-[10px] sm:text-[11px] lg:text-[12px]">
                {item.preview}
              </p>

              {/* Date */}
              <p className="font-helvetica font-normal tracking-normal text-[#00000060] leading-[16px]
                            text-[9px] sm:text-[9px] lg:text-[10px]">
                {item.date}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}