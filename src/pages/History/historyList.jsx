import { Search, ChevronRight, Clock, XCircle, Menu } from "lucide-react";
import DeleteActivityModal from "../../components/modals/DeleteActivityModal";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const historyData = [
  {
    group: "Today",
    items: [
      { title: "Create a song", preview: "Of course! I'd be delighted to help you create a song. To get started, I'll need a bit of information from you. Could you" },
    ],
  },
  {
    group: "Yesterday",
    items: [
      { title: "Create a song", preview: "Of course! I'd be delighted to help you create a song. To get started, I'll need a bit of information from you. Could you" },
    ],
  },
  {
    group: "12 Feb",
    items: [
      { title: "Create a song", preview: "Of course! I'd be delighted to help you create a song. To get started, I'll need a bit of information from you. Could you" },
      { title: "Create a song", preview: "Of course! I'd be delighted to help you create a song. To get started, I'll need a bit of information from you. Could you" },
      { title: "Create a song", preview: "Of course! I'd be delighted to help you create a song. To get started, I'll need a bit of information from you. Could you" },
      { title: "Create a song", preview: "Of course! I'd be delighted to help you create a song. To get started, I'll need a bit of information from you. Could you" },
    ],
  },
];

export default function HistoryList() {
  const { onMenuClick } = useOutletContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState(["Create", "Create", "Create"]);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[50px] sm:h-[56px] lg:h-[64px]
                      border-b border-gray-300 shrink-0">

        <div className="flex items-center gap-[8px] lg:gap-[10px]">
          {/* Hamburger — mobile/tablet only */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1 -ml-1 text-gray-700 hover:text-black transition-colors"
            aria-label="Open menu"
          >
            <Menu size={22} className="sm:w-6 sm:h-6" />
          </button>

          <span className="font-helvetica font-bold text-black
                           text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]
                           leading-[28px]">
            History
          </span>
        </div>

        <p
          onClick={() => setShowDeleteModal(true)}
          className="text-[11px] sm:text-[12px] lg:text-[14px]
                     font-helvetica font-normal text-[#FF4400] cursor-pointer"
        >
          Clear hist
        </p>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto
                      px-[16px] py-[16px]
                      sm:px-[32px] sm:py-[20px]
                      md:px-[56px] md:py-[22px]
                      lg:px-[80px] lg:py-[24px]">

        <div className="flex-1 overflow-y-auto
                        px-[0px] py-[0px]
                        sm:px-[8px]
                        lg:px-[24px] lg:py-[24px]">

          {/* ── Search ── */}
          <div className="relative mb-[16px] sm:mb-[20px] lg:mb-[24px]">
            <div className="flex items-center gap-[8px] lg:gap-[10px]
                            h-[38px] sm:h-[40px] lg:h-[44px]
                            border border-[#E8430A]/40 rounded-[12px]
                            px-[12px] lg:px-[14px] bg-[#FF44000D]">
              <Search size={14} className="text-[#292D32] shrink-0 lg:w-[15px] lg:h-[15px]" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setTimeout(() => setIsFocused(false), 150)}
                className="flex-1 bg-transparent outline-none
                           text-[12px] sm:text-[13px] lg:text-[14px]
                           font-helvetica font-normal text-black
                           placeholder:font-helvetica placeholder:font-normal placeholder:text-gray-400"
              />
            </div>

            {/* Dropdown */}
            {isFocused && recentSearches.length > 0 && (
              <div className="mt-[8px] bg-[#FF44000D] border border-[#E8430A]/40 rounded-[12px] overflow-hidden">
                <div className="flex items-center justify-between px-[12px] py-[8px] lg:px-[14px] lg:py-[10px]">
                  <span className="font-helvetica font-medium text-[#0000004D]
                                   text-[11px] sm:text-[12px] lg:text-[14px]">
                    Previous Search
                  </span>
                  <button
                    onClick={() => setRecentSearches([])}
                    className="font-poppins font-normal text-[#FF4400]
                               text-[11px] sm:text-[12px] lg:text-[14px]"
                  >
                    Clear All
                  </button>
                </div>
                {recentSearches.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between
                               px-[12px] py-[8px] lg:px-[14px] lg:py-[10px]
                               border-t border-[#E8430A]/20"
                  >
                    <div className="flex items-center gap-[8px] lg:gap-[10px]">
                      <Clock size={15} className="text-[#292D32] lg:w-[18px] lg:h-[18px]" />
                      <span className="font-helvetica font-normal text-black
                                       text-[11px] sm:text-[12px] lg:text-[14px]">
                        {item}
                      </span>
                    </div>
                    <button onClick={() => setRecentSearches((prev) => prev.filter((_, idx) => idx !== i))}>
                      <XCircle size={14} className="text-[#292D32] lg:w-[16px] lg:h-[16px]" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Grouped List ── */}
          <div className="space-y-[8px] sm:space-y-[10px] lg:space-y-[11px]">
            {historyData.map((group) => (
              <div key={group.group}>

                {/* Group Label */}
                <p className="font-helvetica font-medium
                              text-[12px] sm:text-[13px] lg:text-[14px]
                              mb-[6px] sm:mb-[7px] lg:mb-[8px]">
                  {group.group}
                </p>

                {/* Items */}
                <div className="space-y-[6px] sm:space-y-[7px] lg:space-y-[8px]">
                  {group.items
                    .filter((item) =>
                      item.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between
                                   border border-[#00000012] rounded-[12px]
                                   px-[12px] py-[10px] sm:px-[14px] sm:py-[12px] lg:px-[18px] lg:py-[14px]
                                   bg-[#F5F5F5] cursor-pointer transition-colors"
                      >
                        <div className="flex flex-col gap-[2px] min-w-0">
                          <p className="font-helvetica font-medium text-black
                                        text-[13px] sm:text-[14px] lg:text-[16px]">
                            {item.title}
                          </p>
                          <p className="font-helvetica font-normal truncate
                                        text-[11px] sm:text-[12px] lg:text-[14px]
                                        max-w-[200px] sm:max-w-[400px] md:max-w-[560px] lg:max-w-[700px]">
                            {item.preview}
                          </p>
                        </div>
                        <ChevronRight
                          width={15}
                          height={13}
                          className="text-black shrink-0 lg:w-[18px] lg:h-[15px]"
                        />
                      </div>
                    ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Delete Modal ── */}
      {showDeleteModal && (
        <DeleteActivityModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => { setRecentSearches([]); setShowDeleteModal(false); }}
        />
      )}
    </>
  );
}