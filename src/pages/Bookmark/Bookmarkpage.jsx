import { Search, Bookmark, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getBookmarksApi, removeBookmarkApi } from "../../api/bookmark";

export default function BookmarkPage() {
  const { onMenuClick } = useOutletContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  // ── Fetch bookmarks on mount ───────────────────────────────────────────────
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await getBookmarksApi();
        setBookmarks(res.data.bookmarks);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  const filtered = bookmarks.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  // ── Remove bookmark ────────────────────────────────────────────────────────
  const handleUnbookmark = async (e, bookmarkId, conversationId) => {
    e.stopPropagation();
    // Remove instantly from UI first
    setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
    try {
      await removeBookmarkApi(conversationId);
    } catch (err) {
      console.error("Failed to remove bookmark:", err);
      // Refetch if API fails to restore UI
      const res = await getBookmarksApi();
      setBookmarks(res.data.bookmarks);
    }
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
          Bookmark
        </span>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto
                      px-[14px] py-[14px]
                      sm:px-[18px] sm:py-[18px]
                      lg:px-[24px] lg:py-[24px]">

        {/* Search */}
        <div className="relative mb-[14px] sm:mb-[16px] lg:mb-[19px]">
          <div className="flex items-center gap-[8px] lg:gap-[10px]
                          h-[36px] sm:h-[38px] lg:h-[40px]
                          border border-[#E8430A]/40 rounded-[10px]
                          px-[10px] sm:px-[12px] lg:px-[12px]
                          bg-[#FF44000D]">
            <Search size={13} className="text-[#292D32] shrink-0 sm:w-[14px] sm:h-[14px] lg:w-[15px] lg:h-[15px]" />
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

          {/* Dynamic suggestions dropdown */}
          {isFocused && search && (
            <div className="absolute top-[42px] left-0 right-0 z-50
                            bg-white border border-[#E8430A]/40 rounded-[10px]
                            shadow-md overflow-hidden">
              {bookmarks
                .filter((b) => b.title.toLowerCase().includes(search.toLowerCase()))
                .map((b, i) => (
                  <div
                    key={i}
                    onClick={() => { setSearch(b.title); setIsFocused(false); }}
                    className="flex items-center gap-[8px]
                               px-[12px] py-[9px] lg:px-[14px] lg:py-[10px]
                               hover:bg-[#FF44000D] cursor-pointer
                               border-b border-[#E8430A]/10 last:border-0"
                  >
                    <Search size={12} className="text-[#292D32] shrink-0" />
                    <span className="font-helvetica font-normal text-black
                                     text-[11px] sm:text-[12px] lg:text-[13px]">
                      {b.title}
                    </span>
                  </div>
                ))}
              {bookmarks.filter((b) =>
                b.title.toLowerCase().includes(search.toLowerCase())
              ).length === 0 && (
                <div className="px-[12px] py-[10px] font-helvetica font-normal
                                text-gray-400 text-[11px] sm:text-[12px] lg:text-[13px]">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>

        <hr className="border-0 h-[1px] bg-[#00000026]
                       mb-[14px] sm:mb-[16px] lg:mb-[19px]" />

        {/* Loading */}
        {loading && (
          <p className="font-helvetica font-normal text-[13px] text-gray-400 text-center py-8">
            Loading...
          </p>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <p className="font-helvetica font-normal text-[13px] text-gray-400 text-center py-8">
            No bookmarks yet.
          </p>
        )}

        {/* Grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 gap-[10px]
                          sm:grid-cols-2 sm:gap-[12px]
                          md:grid-cols-3 md:gap-[14px]
                          lg:grid-cols-4 lg:gap-[16px]">
            {filtered.map((item, i) => (
              <div
                key={item._id}
                onClick={() => navigate(`/app/chat/${item.conversationId?._id}`)}
                className="bg-[#FFF5F2] border border-[#00000012] rounded-[14px]
                           p-[10px] sm:p-[12px] lg:p-[16px]
                           flex flex-col
                           gap-[4px] sm:gap-[5px] lg:gap-[6px]
                           cursor-pointer hover:shadow-sm transition-shadow"
              >
                {/* Title + Bookmark icon */}
                <div className="flex items-start justify-between">
                  <p className="font-helvetica font-normal
                                text-[12px] sm:text-[13px] lg:text-[14px]">
                    {item.title}
                  </p>
                  <Bookmark
                    size={13}
                    onClick={(e) => handleUnbookmark(e, item._id, item.conversationId?._id)}
                    className="text-[#E8430A] fill-[#E8430A] shrink-0 mt-[2px]
                               sm:w-[14px] sm:h-[14px] lg:w-[16px] lg:h-[16px]"
                  />
                </div>

                {/* Preview — 2 lines only */}
              <p className="font-helvetica font-normal text-[#00000080] leading-[18px]
              text-[10px] sm:text-[11px] lg:text-[12px]
              line-clamp-2">
  {(item.conversationId?.messages?.[0]?.text || "No preview available").replace(/\*\*/g, "")}
</p>

                {/* Date */}
                <p className="font-helvetica font-normal tracking-normal text-[#00000060] leading-[16px]
                              text-[9px] sm:text-[9px] lg:text-[10px]">
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}