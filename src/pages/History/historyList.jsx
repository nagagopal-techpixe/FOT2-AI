import { Search, ChevronRight, Clock, XCircle, Menu } from "lucide-react";
import DeleteActivityModal from "../../components/modals/DeleteActivityModal";
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getAllConversationsApi, clearAllConversationsApi } from "../../api/chat";

const groupByDate = (conversations) => {
  const groups = {};
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  conversations.forEach((conv) => {
    const date = new Date(conv.updatedAt);
    let label;
    if (date.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    } else {
      label = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    }
    if (!groups[label]) groups[label] = [];
    groups[label].push(conv);
  });

  return Object.entries(groups).map(([group, items]) => ({ group, items }));
};

export default function HistoryList() {
  const { onMenuClick } = useOutletContext();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(""); // actual API trigger
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch list only when searchTrigger changes (on mount, suggestion click, Enter) ──
  useEffect(() => {
    setLoading(true);
    const fetchHistory = async () => {
      try {
        const res = await getAllConversationsApi(searchTrigger);
        setHistoryData(groupByDate(res.data.conversations));
      } catch (err) {
        console.error("Failed to fetch history:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [searchTrigger]);

  // ── Fetch suggestions only while typing (does NOT update list) ──────────
  useEffect(() => {
    if (!search) { setSuggestions([]); return; }
    const timer = setTimeout(async () => {
      try {
        const res = await getAllConversationsApi(search);
        setSuggestions(res.data.conversations.map((c) => c.title));
      } catch (err) {
        console.error("Suggestions error:", err);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  // ── Enter key → trigger list + save to recent ────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && search.trim()) {
      setSearchTrigger(search);
      setIsFocused(false);
      setRecentSearches((prev) =>
        prev.includes(search) ? prev : [search, ...prev].slice(0, 5)
      );
    }
  };

  // ── Click suggestion → fill input + trigger list ──────────────────────────
  const handleSuggestionClick = (title) => {
    setSearch(title);
    setSearchTrigger(title);
    setIsFocused(false);
    setRecentSearches((prev) =>
      prev.includes(title) ? prev : [title, ...prev].slice(0, 5)
    );
  };

  // ── Clear input → reset to full list ─────────────────────────────────────
  const handleClearSearch = () => {
    setSearch("");
    setSearchTrigger("");
    setSuggestions([]);
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[50px] sm:h-[56px] lg:h-[64px]
                      border-b border-gray-300 shrink-0">

        <div className="flex items-center gap-[8px] lg:gap-[10px]">
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
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none
                           text-[12px] sm:text-[13px] lg:text-[14px]
                           font-helvetica font-normal text-black
                           placeholder:font-helvetica placeholder:font-normal placeholder:text-gray-400"
              />
              {search && (
                <button onClick={handleClearSearch}>
                  <XCircle size={14} className="text-[#292D32] lg:w-[16px] lg:h-[16px]" />
                </button>
              )}
            </div>

            {/* ── Dropdown ── */}
            {isFocused && (
              <div className="mt-[8px] bg-[#FF44000D] border border-[#E8430A]/40 rounded-[12px] overflow-hidden">

                {/* Recent searches — when input empty */}
                {!search && recentSearches.length > 0 && (
                  <>
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
                        onClick={() => handleSuggestionClick(item)}
                        className="flex items-center justify-between
                                   px-[12px] py-[8px] lg:px-[14px] lg:py-[10px]
                                   border-t border-[#E8430A]/20 cursor-pointer"
                      >
                        <div className="flex items-center gap-[8px] lg:gap-[10px]">
                          <Clock size={15} className="text-[#292D32] lg:w-[18px] lg:h-[18px]" />
                          <span className="font-helvetica font-normal text-black
                                           text-[11px] sm:text-[12px] lg:text-[14px]">
                            {item}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setRecentSearches((prev) => prev.filter((_, idx) => idx !== i));
                          }}
                        >
                          <XCircle size={14} className="text-[#292D32] lg:w-[16px] lg:h-[16px]" />
                        </button>
                      </div>
                    ))}
                  </>
                )}

                {/* Live suggestions — when typing */}
                {search && suggestions.length > 0 && (
                  <>
                    <div className="px-[12px] py-[8px] lg:px-[14px] lg:py-[10px]">
                      <span className="font-helvetica font-medium text-[#0000004D]
                                       text-[11px] sm:text-[12px] lg:text-[14px]">
                        Suggestions
                      </span>
                    </div>
                    {suggestions.map((title, i) => (
                      <div
                        key={i}
                        onClick={() => handleSuggestionClick(title)}
                        className="flex items-center gap-[8px] lg:gap-[10px]
                                   px-[12px] py-[8px] lg:px-[14px] lg:py-[10px]
                                   border-t border-[#E8430A]/20 cursor-pointer"
                      >
                        <Search size={13} className="text-[#292D32] lg:w-[15px] lg:h-[15px]" />
                        <span className="font-helvetica font-normal text-black
                                         text-[11px] sm:text-[12px] lg:text-[14px]">
                          {title}
                        </span>
                      </div>
                    ))}
                  </>
                )}

                {/* No results */}
                {search && suggestions.length === 0 && (
                  <div className="px-[12px] py-[10px] lg:px-[14px]">
                    <span className="font-helvetica font-normal text-gray-400
                                     text-[11px] sm:text-[12px] lg:text-[13px]">
                      No results found
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── Loading ── */}
          {loading && (
            <p className="font-helvetica font-normal text-[13px] text-gray-400 text-center py-8">
              Loading...
            </p>
          )}

          {/* ── Empty state ── */}
          {!loading && historyData.length === 0 && (
            <p className="font-helvetica font-normal text-[13px] text-gray-400 text-center py-8">
              No history yet.
            </p>
          )}

          {/* ── Grouped List ── */}
          <div className="space-y-[8px] sm:space-y-[10px] lg:space-y-[11px]">
            {historyData.map((group) => (
              <div key={group.group}>
                <p className="font-helvetica font-medium
                              text-[12px] sm:text-[13px] lg:text-[14px]
                              mb-[6px] sm:mb-[7px] lg:mb-[8px]">
                  {group.group}
                </p>
                <div className="space-y-[6px] sm:space-y-[7px] lg:space-y-[8px]">
                  {group.items.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => navigate(`/app/chat/${item._id}`)}
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
                          {item.messages?.[0]?.text || "No preview available"}
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
          onConfirm={async () => {
            await clearAllConversationsApi();
            setHistoryData([]);
            setRecentSearches([]);
            setShowDeleteModal(false);
          }}
        />
      )}
    </>
  );
}