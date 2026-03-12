import { Bookmark, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { getSharedConversationsApi } from "../../api/Shareapi";
import { addBookmarkApi, removeBookmarkApi, checkBookmarkApi } from "../../api/bookmark";

export default function SharedFilePage() {
  const { onMenuClick } = useOutletContext();
  const navigate = useNavigate();
  const [sharedFiles, setSharedFiles] = useState([]);
  const [bookmarked, setBookmarked] = useState({});
  const [loading, setLoading] = useState(true);

  // ── Fetch shared conversations ────────────────────────────────────────────
  useEffect(() => {
    const fetchShared = async () => {
      try {
        const res = await getSharedConversationsApi();
        const files = res.data.shared;
        setSharedFiles(files);

        // Check bookmark status for each conversation
        const bookmarkStatuses = {};
        await Promise.all(
          files.map(async (item) => {
            try {
              const bRes = await checkBookmarkApi(item._id);
              bookmarkStatuses[item._id] = bRes.data.isBookmarked;
            } catch {
              bookmarkStatuses[item._id] = false;
            }
          })
        );
        setBookmarked(bookmarkStatuses);
      } catch (err) {
        console.error("Failed to fetch shared files:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShared();
  }, []);

  // ── Toggle bookmark ───────────────────────────────────────────────────────
  const toggleBookmark = async (e, conversationId) => {
    e.stopPropagation();
    const isCurrentlyBookmarked = bookmarked[conversationId];
    try {
      if (isCurrentlyBookmarked) {
        await removeBookmarkApi(conversationId);
      } else {
        await addBookmarkApi(conversationId);
      }
      setBookmarked((prev) => ({ ...prev, [conversationId]: !isCurrentlyBookmarked }));
    } catch (err) {
      console.error("Bookmark toggle failed:", err);
    }
  };

  // ── Format date ───────────────────────────────────────────────────────────
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric", month: "short", year: "numeric",
    });

  return (
    <div className="flex flex-col flex-1 h-screen bg-white overflow-hidden">

      {/* ── Top Bar ── */}
      <div className="flex items-center gap-[8px] lg:gap-[10px]
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[50px] sm:h-[56px] lg:h-[64px]
                      border-b border-gray-200 shrink-0">
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

        {/* Loading */}
        {loading && (
          <p className="font-helvetica font-normal text-[13px] text-gray-400 text-center py-8">
            Loading...
          </p>
        )}

        {/* Empty state */}
        {!loading && sharedFiles.length === 0 && (
          <p className="font-helvetica font-normal text-[13px] text-gray-400 text-center py-8">
            No shared files yet.
          </p>
        )}

        {/* Grid */}
        {!loading && sharedFiles.length > 0 && (
          <div className="grid grid-cols-2 gap-[10px]
                          sm:grid-cols-2 sm:gap-[12px]
                          md:grid-cols-3 md:gap-[14px]
                          lg:grid-cols-4 lg:gap-[16px]">
            {sharedFiles.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/app/chat/${item._id}`)}
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
                    onClick={(e) => toggleBookmark(e, item._id)}
                    className="shrink-0 mt-[2px]"
                  >
                    <Bookmark
                      size={13}
                      className={`transition-colors
                        sm:w-[14px] sm:h-[14px] lg:w-[16px] lg:h-[16px]
                        ${bookmarked[item._id]
                          ? "text-[#E8430A] fill-[#E8430A]"
                          : "text-[#E8430A]"
                        }`}
                    />
                  </button>
                </div>

                {/* Preview — last message */}
                <p className="font-helvetica font-normal text-[#00000080] leading-[18px]
                              text-[10px] sm:text-[11px] lg:text-[12px] line-clamp-2">
                  {item.preview || "No preview available"}
                </p>

                {/* Date */}
                <p className="font-helvetica font-normal tracking-normal text-[#00000060] leading-[16px]
                              text-[9px] sm:text-[9px] lg:text-[10px]">
                  {formatDate(item.sharedAt || item.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}