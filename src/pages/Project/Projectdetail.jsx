import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { ChevronLeft, Menu, MessageSquare, Trash2, MoreVertical } from "lucide-react";
import { getProjectByIdApi, getProjectConversationsApi, removeConversationFromProjectApi } from "../../api/project";
import { showSuccess, showError } from "../../utils/toast";

export default function ProjectDetail() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { onMenuClick } = useOutletContext();

  const [project, setProject] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    loadProject();
  }, [projectId]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const loadProject = async () => {
    setLoading(true);
    try {
      const res = await getProjectConversationsApi(projectId);
      setProject(res.data.project);
      setConversations(res.data.conversations);
    } catch (err) {
      console.error("loadProject error:", err);
      showError("Failed to load project.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (conversationId) => {
    try {
      await removeConversationFromProjectApi(projectId, conversationId);
      setConversations((prev) => prev.filter((c) => c._id !== conversationId));
      showSuccess("Chat removed from project.");
    } catch (err) {
      showError("Failed to remove chat.");
    } finally {
      setOpenMenu(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getLastMessage = (conv) => {
    if (!conv.messages || conv.messages.length === 0) return "No messages yet";
    const last = [...conv.messages].reverse().find((m) => m.role === "ai");
    if (!last) return "No reply yet";
    return last.text?.substring(0, 80) + (last.text?.length > 80 ? "..." : "");
  };

  return (
    <div className="flex flex-col flex-1 h-screen bg-white overflow-hidden">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[50px] sm:h-[56px] lg:h-[64px]
                      border-b border-gray-200 shrink-0">

        <div className="flex items-center gap-[8px] lg:gap-[10px]">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-1 -ml-1 text-gray-700 hover:text-black transition-colors"
          >
            <Menu size={22} />
          </button>
          <button
            onClick={() => navigate("/app/project")}
            className="w-[26px] h-[26px] flex items-center justify-center
                       border-[1.5px] border-gray-400 rounded-[8px] hover:border-gray-700 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-helvetica font-bold text-black
                           text-[16px] sm:text-[18px] lg:text-[22px] truncate max-w-[200px] sm:max-w-none">
            {project?.title || "Project"}
          </span>

          {/* Chat count badge */}
          {!loading && (
            <span className="flex items-center gap-[4px] px-[10px] py-[3px]
                             bg-[#FFF5F2] border border-[#E8430A]/30 rounded-full
                             text-[11px] sm:text-[12px] font-helvetica text-[#F54900]">
              <MessageSquare size={11} />
              {conversations.length} {conversations.length === 1 ? "chat" : "chats"}
            </span>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto
                      px-[14px] py-[14px]
                      sm:px-[18px] sm:py-[18px]
                      lg:px-[24px] lg:py-[24px]">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center h-[200px]">
            <div className="w-[11px] h-[11px] rounded-full bg-[#F54900] animate-pulse" />
          </div>
        )}

        {/* Empty state */}
        {!loading && conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-[300px] gap-[12px]">
            <div className="w-[48px] h-[48px] rounded-full bg-[#FFF5F2] flex items-center justify-center">
              <MessageSquare size={20} className="text-[#F54900]" />
            </div>
            <p className="text-[14px] font-helvetica text-gray-400">No chats saved to this project yet</p>
            <p className="text-[12px] font-helvetica text-gray-300">
              Open a chat and click "Save to Project" to add it here
            </p>
          </div>
        )}

        {/* Conversation cards grid — matches your existing project card style */}
        {!loading && conversations.length > 0 && (
          <div className="grid grid-cols-2 gap-[10px]
                          sm:grid-cols-2 sm:gap-[12px]
                          md:grid-cols-3 md:gap-[14px]
                          lg:grid-cols-4 lg:gap-[16px]">
            {conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => navigate(`/app/chat/${conv._id}`)}
                className="border border-[#E8430A]/30 rounded-[14px]
                           py-[12px] px-[10px] sm:py-[14px] sm:px-[12px] lg:py-[16px] lg:px-[14px]
                           bg-[#FFF5F2] cursor-pointer hover:shadow-sm transition-shadow relative"
              >
                {/* Bookmark icon top-right — matches screenshot style */}
                <div className="absolute top-[10px] right-[10px] z-10">
                  <div
                    className="relative"
                    ref={openMenu === conv._id ? menuRef : null}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setOpenMenu(openMenu === conv._id ? null : conv._id)}
                      className="w-[22px] h-[22px] flex items-center justify-center
                                 hover:bg-[#0000000D] rounded-[6px]"
                    >
                      <MoreVertical size={13} />
                    </button>

                    {openMenu === conv._id && (
                      <div className="absolute right-0 top-[26px] bg-white border border-[#00000012]
                                      rounded-[12px] shadow-lg z-20 w-[150px] py-[3px]">
                        <button
                          onClick={() => navigate(`/app/chat/${conv._id}`)}
                          className="flex items-center gap-[8px] w-full px-[12px] py-[7px]
                                     text-[12px] font-helvetica text-black hover:bg-[#F7F7F7]"
                        >
                          <MessageSquare size={13} />
                          <span>Open Chat</span>
                        </button>
                        <hr className="border-0 h-[1px] bg-[#00000012] mx-[10px]" />
                        <button
                          onClick={() => handleRemove(conv._id)}
                          className="flex items-center gap-[8px] w-full px-[12px] py-[7px]
                                     text-[12px] font-helvetica text-red-500 hover:bg-[#FFF5F2]"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card content */}
                <div className="pr-[24px]">
                  {/* Title */}
                  <p className="font-helvetica font-normal text-black
                                text-[12px] sm:text-[13px] lg:text-[14px]
                                mb-[6px] line-clamp-2 leading-[18px]">
                    {conv.title || "Untitled"}
                  </p>

                  {/* Last AI reply preview */}
                  <p className="font-helvetica font-normal text-[#00000080]
                                text-[10px] sm:text-[11px] lg:text-[12px]
                                leading-[16px] line-clamp-2 mb-[8px]">
                    {getLastMessage(conv)}
                  </p>

                  {/* Date */}
                  <p className="font-helvetica font-normal text-[#F54900]
                                text-[10px] sm:text-[11px]">
                    {formatDate(conv.updatedAt || conv.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}