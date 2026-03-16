import {
  ChevronLeft,
  Bookmark,
  Clock,
  Trash2,
  Share2,
  Send,
  User,
  MoreVertical,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useChat from "../../hooks/useChat";
import { addBookmarkApi, removeBookmarkApi, checkBookmarkApi } from "../../api/bookmark";
import { createConversationApi } from "../../api/chat";
import { generateShareLinkApi } from "../../api/Shareapi";

export default function MainContent() {
  const navigate = useNavigate();
  const { conversationId: urlConversationId } = useParams();

  const {
    messages,
    conversationId,
    isGenerating,
    loading,
    sendMessage,
    loadConversation,
    deleteConversation,
    resetChat,
  } = useChat();

  const [input, setInput] = useState("");
  const [showShare, setShowShare] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  const [title, setTitle] = useState("Untitled");
  const [shareUrl, setShareUrl] = useState(null);
  const [shareLoading, setShareLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);

  // ✅ Single useEffect — no duplicate
  useEffect(() => {
    if (urlConversationId) {
      loadConversation(urlConversationId);
      checkIfBookmarked(urlConversationId);
    } else {
      resetChat();
      setTitle("Untitled");
      setIsBookmarked(false);
      setShareUrl(null);
    }
  }, [urlConversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  useEffect(() => {
    if (messages.length > 0) {
      const firstUserMsg = messages.find((m) => m.role === "user");
      if (firstUserMsg) {
        setTitle(
          firstUserMsg.text.substring(0, 30) +
            (firstUserMsg.text.length > 30 ? "..." : "")
        );
      }
    }
  }, [messages]);

  const checkIfBookmarked = async (convId) => {
    try {
      const res = await checkBookmarkApi(convId);
      setIsBookmarked(res.data.isBookmarked);
    } catch (err) {
      console.error("checkBookmark error:", err);
    }
  };

  const handleBookmark = async () => {
    const convId = urlConversationId || conversationId;
    if (!convId) return;
    setBookmarkLoading(true);
    try {
      if (isBookmarked) {
        await removeBookmarkApi(convId);
        setIsBookmarked(false);
      } else {
        await addBookmarkApi(convId);
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("bookmark error:", err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const handleGenerateShare = async () => {
    const convId = urlConversationId || conversationId;
    if (!convId) return;
    setShareLoading(true);
    try {
      const res = await generateShareLinkApi(convId);
      setShareUrl(res.data.shareUrl);
    } catch (err) {
      console.error("generateShareLink error:", err);
    } finally {
      setShareLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    let convId = urlConversationId || conversationId;
    if (!convId) {
      try {
        const res = await createConversationApi();
        convId = res.data.conversationId;
        navigate(`/app/chat/${convId}`, { replace: true });
      } catch (err) {
        console.error("Failed to create conversation:", err);
        return;
      }
    }
    await sendMessage(text, convId);
  };

  const handleDelete = async () => {
    const convId = urlConversationId || conversationId;
    if (!convId) return;
    await deleteConversation(convId);
    navigate("/app/Dashboard");
  };

  // ✅ Shared markdown components (no duplicate `li`)
  const markdownComponents = {
    p: ({ children }) => (
      <p className="mb-[10px] last:mb-0 leading-[28px]">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-[16px] space-y-[6px] mb-[8px]">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-[16px] space-y-[6px] mb-[8px]">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="leading-[28px] mb-[4px]">{children}</li>
    ),
    pre: ({ children }) => (
      <pre className="bg-[#E0E0E0] rounded-[8px] p-[10px] my-[8px] overflow-x-auto max-w-full text-[11px] leading-[20px] whitespace-pre-wrap break-words">
        {children}
      </pre>
    ),
    code: ({ inline, children }) =>
      inline ? (
        <code className="bg-[#E0E0E0] px-[7px] py-[1px] rounded text-[11px] break-words">
          {children}
        </code>
      ) : (
        <code className="text-[11px] break-words whitespace-pre-wrap font-mono">
          {children}
        </code>
      ),
  };

  if (loading) {
    return (
      <div className="flex flex-col flex-1 h-full bg-white items-center justify-center">
        <div className="w-[11px] h-[11px] rounded-full bg-[#F54900] animate-pulse" />
        <span className="text-[13px] font-helvetica mt-2">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-white overflow-hidden">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[56px] sm:h-[64px] lg:h-[80px]
                      border-b border-gray-300 shrink-0 relative">

        <div className="flex items-center gap-[8px] lg:gap-[10px]">
          {/* ✅ Back button now navigates */}
          <button
            onClick={() => navigate(-1)}
            className="w-[26px] h-[26px] flex items-center justify-center
                       border-[1.5px] border-gray-500 rounded-[8px]"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-helvetica font-bold
                           text-[16px] sm:text-[18px] lg:text-[21.82px]
                           lg:leading-[8.82px] text-black">
            {title}
          </span>
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-[8px]">
          <button
            onClick={handleBookmark}
            disabled={bookmarkLoading}
            className={`flex items-center gap-[7px]
                        w-[203px] h-[40px] px-[18px]
                        border border-[#00000026] rounded-[12px]
                        text-[14px] font-helvetica font-normal transition-colors
                        ${isBookmarked ? "bg-[#F54900] text-white" : "bg-[#F7F7F7] text-black"}`}
          >
            <Bookmark size={14} fill={isBookmarked ? "white" : "none"} />
            <span>{isBookmarked ? "Bookmarked" : "Save to Bookmark"}</span>
          </button>

          <button className="flex items-center gap-[7px]
                             w-[203px] h-[40px] px-[18px]
                             border border-[#00000026] rounded-[12px]
                             text-[14px] font-helvetica font-normal bg-[#F7F7F7]">
            <Clock size={14} />
            <span>Save to Project</span>
          </button>

          <div className="w-[1px] h-[37px] border border-gray-300 mx-[4px]" />

          <button
            onClick={() => navigate("/app/historylist")}
            className="w-[21.5px] h-[27.5px] flex items-center justify-center"
          >
            <Clock size={15} />
          </button>
          <button
            className="w-[21.5px] h-[27.5px] flex items-center justify-center"
            onClick={() => setShowShare(true)}
          >
            <Share2 size={15} />
          </button>
          <button
            className="w-[21.5px] h-[27.5px] flex items-center justify-center"
            onClick={handleDelete}
          >
            <Trash2 size={15} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-1 text-gray-700"
          >
            <MoreVertical size={20} />
          </button>
          {showMobileMenu && (
            <div
              className="absolute right-0 top-[36px] bg-white border border-gray-200
                          rounded-[12px] shadow-lg z-50 w-[160px] py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              <button
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                onClick={() => setShowShare(true)}
              >
                <Share2 size={14} /> Share
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                onClick={handleDelete}
              >
                <Trash2 size={14} /> Delete
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button
                onClick={() => navigate("/app/historylist")}
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
              >
                <Clock size={14} /> History
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50">
                <Clock size={14} /> Save to Project
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                onClick={handleBookmark}
              >
                <Bookmark
                  size={14}
                  fill={isBookmarked ? "#F54900" : "none"}
                  stroke={isBookmarked ? "#F54900" : "currentColor"}
                />
                {isBookmarked ? "Bookmarked" : "Save to Bookmark"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Chat Area ── */}
      <div className="flex-1 min-h-0 overflow-y-auto
                      px-[14px] py-[14px] sm:px-[18px] sm:py-[18px] lg:px-[60px] lg:py-[24px]
                      space-y-[16px]">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex items-start gap-[10px]">
              <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px]
                              rounded-full bg-[#0000000D] flex items-center justify-center shrink-0">
                <User size={14} className="lg:w-4 lg:h-4" />
              </div>
              <div className="bg-[#F54900] text-white
                              text-[12px] sm:text-[13px] lg:text-[15px]
                              px-[12px] sm:px-[14px] lg:px-[16px]
                              min-h-[36px] sm:min-h-[40px] lg:min-h-[44px]
                              flex items-center rounded-[14px] max-w-[90%] lg:max-w-[70%]
                              font-poppins font-normal py-[8px]
                              break-words whitespace-pre-wrap overflow-hidden">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-[10px]">
              <div className="w-[30px] h-[30px] sm:w-[33px] sm:h-[33px] lg:w-[36px] lg:h-[36px]
                              rounded-full bg-[#E8430A] flex items-center justify-center shrink-0" />
              <div className="bg-[#F5F5F5] rounded-[14px]
                              px-[12px] py-[10px] sm:px-[14px] sm:py-[12px] lg:px-[16px] lg:py-[14px]
                              w-full max-w-[90%] lg:max-w-[75%]
                              text-[12px] sm:text-[13px] lg:text-[15px]
                              text-black font-helvetica font-normal leading-[34px]">
                <ReactMarkdown components={markdownComponents}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Generating indicator */}
      {isGenerating && (
        <div className="flex items-center justify-center gap-[8px] py-[8px]">
          <div className="w-[11px] h-[11px] rounded-full bg-[#F54900] animate-pulse" />
          <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-helvetica font-normal">
            Generating...
          </span>
        </div>
      )}

      {/* ── Bottom Input Bar ── */}
      <div className="flex items-center justify-center gap-[8px] sm:gap-[10px] lg:gap-[10px]
                      px-[14px] sm:px-[18px] lg:px-[60px]
                      py-[10px] sm:py-[12px] lg:py-[12px]">
        <input
          type="text"
          placeholder="Describe the prompt you want to generate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full
                     h-[40px] sm:h-[42px] lg:h-[44px]
                     border border-gray-300 rounded-[12px]
                     px-[12px] sm:px-[14px] lg:px-[16px]
                     bg-[#F7F7F7] outline-none
                     text-[12px] sm:text-[13px] lg:text-[14px]
                     font-normal text-black font-helvetica"
        />
        <button
          onClick={handleSend}
          disabled={isGenerating || !input.trim()}
          className="w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] lg:w-[44px] lg:h-[44px]
                     flex items-center justify-center
                     bg-[#F54900] rounded-[12px]
                     hover:bg-[#d13c08] transition-colors shrink-0
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={14} className="text-white sm:w-[15px] sm:h-[15px]" />
        </button>
      </div>

      {/* ── Share Modal ── */}
      {showShare && (
        <div
          className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 sm:px-6"
          onClick={() => setShowShare(false)}
        >
          <div
            className="bg-white rounded-[20px] w-full sm:w-[500px] lg:w-[597px] flex flex-col gap-[14px] border"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] p-[9px] font-clarendon font-medium">
              Share chat link
            </h2>
            <hr className="border-0 h-[1px] bg-[#00000026]" />
            <p className="text-center font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px] px-2">
              Anyone with this link can access and view this conversation. You can{" "}
              <br className="hidden sm:block" />
              adjust the privacy settings using the lock option below.
            </p>

            {/* Chat Preview */}
            <div className="bg-[#F5F5F5] rounded-[10px]
                            w-[90%] sm:w-[480px] lg:w-[525px]
                            h-[180px] sm:h-[200px] lg:h-[238px]
                            p-[16px] sm:p-[20px] lg:p-[25px]
                            space-y-[14px] sm:space-y-[18px] lg:space-y-[20px]
                            overflow-y-auto mx-auto mb-[12px] sm:mb-[16px] lg:mb-[20px]">
              {messages.slice(0, 4).map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex items-start gap-[8px] lg:gap-[10px]">
                    <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[34px] lg:h-[34px]
                                    rounded-full bg-[#0000000D] flex items-center justify-center shrink-0">
                      <User size={10} className="lg:w-3 lg:h-3" />
                    </div>
                    <div className="bg-[#F54900] text-white text-[11px] sm:text-[12px] lg:text-[14px]
                                    font-helvetica font-normal px-[10px] py-[5px] sm:px-[12px] sm:py-[6px]
                                    rounded-[10px] max-w-[80%] lg:max-w-[260px]">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-[8px] lg:gap-[10px]">
                    <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[34px] lg:h-[34px]
                                    rounded-full bg-[#F54900] shrink-0" />
                    <div className="text-[11px] sm:text-[12px] lg:text-[12px] text-black
                                    max-w-[80%] lg:max-w-[440px] font-helvetica
                                    bg-[#E8E8E8] rounded-[10px]
                                    px-[10px] py-[8px] sm:px-[12px] lg:px-[14px] lg:py-[10px]">
                      <ReactMarkdown components={markdownComponents}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Meta */}
            <div className="text-black px-[20px] sm:px-[28px] lg:px-[38px]">
              <p className="font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px]">
                {title}
              </p>
              <p className="font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px]">
                {new Date().toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            {shareUrl && (
              <div className="flex items-center gap-[8px] w-[90%] sm:w-[480px] lg:w-[525px] mx-auto
                              border border-[#00000026] rounded-[12px] px-[12px] py-[10px] bg-[#F7F7F7]">
                <p className="flex-1 truncate font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px] text-black">
                  {shareUrl}
                </p>
                <button
                  onClick={handleCopyLink}
                  className="shrink-0 font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px] text-[#F54900]"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            <button
              onClick={shareUrl ? handleCopyLink : handleGenerateShare}
              disabled={shareLoading}
              className="w-[90%] sm:w-[480px] lg:w-[525px] h-[40px] sm:h-[42px] lg:h-[44px]
                         mx-auto bg-[#F54900] text-white text-[12px] sm:text-[13px] lg:text-[14px]
                         font-helvetica font-normal rounded-[12px] mb-[14px] sm:mb-[16px] lg:mb-[20px]
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {shareLoading
                ? "Generating..."
                : shareUrl
                ? copied
                  ? "Copied!"
                  : "Copy Link"
                : "Generate Share Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}