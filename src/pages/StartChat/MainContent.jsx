import {
  ChevronLeft,
  Bookmark,
  Clock,
  Trash2,
  Share2,
  Send,
  User,
  MoreVertical,
  Copy,
  Check,
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
  const [copiedMsgIndex, setCopiedMsgIndex] = useState(null);
  const [image, setImage] = useState(null);
const [preview, setPreview] = useState(null);
  const bottomRef = useRef(null);
const fileInputRef = useRef(null);
 // NEW — skip loadConversation if messages already exist
useEffect(() => {
  if (urlConversationId) {
    // Only fetch from DB if no messages loaded yet
    // (avoid overwriting optimistic messages after new chat)
    if (messages.length === 0) {
      loadConversation(urlConversationId);
    }
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


  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setImage(file);
  setPreview(URL.createObjectURL(file)); // preview
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

  const handleCopyMessage = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgIndex(index);
    setTimeout(() => setCopiedMsgIndex(null), 2000);
  };

 const handleSend = async () => {
  if (!input.trim() && !image) return;

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

  // Prepare FormData
  const formData = new FormData();
  formData.append("text", input);
  if (image) {
    formData.append("image", image);
  }

  setInput("");
  setImage(null);
  setPreview(null);

  await sendMessage(formData, convId); // 👈 send formData instead of text
};

  const handleDelete = async () => {
    const convId = urlConversationId || conversationId;
    if (!convId) return;
    await deleteConversation(convId);
    navigate("/app/Dashboard");
  };

  const markdownComponents = {
    p: ({ children }) => (
      <p className="mb-[10px] last:mb-0 leading-[28px]">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-[16px] space-y-[6px] mb-[8px]">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-[16px] space-y-[6px] mb-[8px]">{children}</ul>
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
    // ✅ flex flex-col with full height — keyboard safe on mobile
    <div className="flex flex-col w-full bg-white overflow-hidden" style={{ height: "100%" }}>

      {/* ── Top Bar ── */}
      {/* ✅ shrink-0 — never shrinks when keyboard opens */}
      <div className="shrink-0 flex items-center justify-between
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[56px] sm:h-[64px] lg:h-[80px]
                      border-b border-gray-300 relative">

        <div className="flex items-center gap-[8px] lg:gap-[10px]">
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
            className={`flex items-center gap-[7px] w-[203px] h-[40px] px-[18px]
                        border border-[#00000026] rounded-[12px]
                        text-[14px] font-helvetica font-normal transition-colors
                        ${isBookmarked ? "bg-[#F54900] text-white" : "bg-[#F7F7F7] text-black"}`}
          >
            <Bookmark size={14} fill={isBookmarked ? "white" : "none"} />
            <span>{isBookmarked ? "Bookmarked" : "Save to Bookmark"}</span>
          </button>

          <button className="flex items-center gap-[7px] w-[203px] h-[40px] px-[18px]
                             border border-[#00000026] rounded-[12px]
                             text-[14px] font-helvetica font-normal bg-[#F7F7F7]">
            <Clock size={14} />
            <span>Save to Project</span>
          </button>

          <div className="w-[1px] h-[37px] border border-gray-300 mx-[4px]" />

          <button onClick={() => navigate("/app/historylist")} className="w-[21.5px] h-[27.5px] flex items-center justify-center">
            <Clock size={15} />
          </button>
          <button className="w-[21.5px] h-[27.5px] flex items-center justify-center" onClick={() => setShowShare(true)}>
            <Share2 size={15} />
          </button>
          <button className="w-[21.5px] h-[27.5px] flex items-center justify-center" onClick={handleDelete}>
            <Trash2 size={15} />
          </button>
        </div>

        {/* Mobile menu */}
        <div className="lg:hidden relative">
          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="p-1 text-gray-700">
            <MoreVertical size={20} />
          </button>
          {showMobileMenu && (
            <div
              className="absolute right-0 top-[36px] bg-white border border-gray-200
                          rounded-[12px] shadow-lg z-50 w-[160px] py-2"
              onClick={() => setShowMobileMenu(false)}
            >
              <button className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50" onClick={() => setShowShare(true)}>
                <Share2 size={14} /> Share
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50" onClick={handleDelete}>
                <Trash2 size={14} /> Delete
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button onClick={() => navigate("/app/historylist")} className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50">
                <Clock size={14} /> History
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50">
                <Clock size={14} /> Save to Project
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50" onClick={handleBookmark}>
                <Bookmark size={14} fill={isBookmarked ? "#F54900" : "none"} stroke={isBookmarked ? "#F54900" : "currentColor"} />
                {isBookmarked ? "Bookmarked" : "Save to Bookmark"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Chat Area ── */}
      {/* ✅ flex-1 min-h-0 — takes remaining space, shrinks when keyboard opens */}
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
<div className="flex flex-col gap-[8px] max-w-[90%] lg:max-w-[70%]">

  {msg.image && (
    <img
      src={msg.image}
      alt="upload"
      className="w-full max-w-[150px] rounded-[12px] object-cover"
    />
  )}

  {msg.text && (
    <div className="bg-[#F54900] text-white
                    text-[12px] sm:text-[13px] lg:text-[15px]
                    px-[12px] sm:px-[14px] lg:px-[16px]
                    min-h-[36px] sm:min-h-[40px] lg:min-h-[44px]
                    flex items-center rounded-[14px]
                    font-helvetica font-normal py-[8px]
                    break-words whitespace-pre-wrap">
      {msg.text}
    </div>
  )}

</div>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-[10px]">
              <div className="w-[30px] h-[30px] sm:w-[33px] sm:h-[33px] lg:w-[36px] lg:h-[36px]
                              rounded-full bg-[#E8430A] flex items-center justify-center shrink-0" />

              {/* AI card with copy button inside */}
              <div className="relative bg-[#F5F5F5] rounded-[14px]
                              px-[12px] py-[10px] sm:px-[14px] sm:py-[12px] lg:px-[16px] lg:py-[14px]
                              w-full max-w-[90%] lg:max-w-[75%]
                              text-[12px] sm:text-[13px] lg:text-[15px]
                              text-black font-helvetica font-normal leading-[34px]">
                <ReactMarkdown components={markdownComponents}>
                  {msg.text}
                </ReactMarkdown>

                {/* Copy button inside card — bottom right */}
                <div className="flex justify-end mt-[8px] pt-[8px] border-t border-[#00000010]">
                  <button
                    onClick={() => handleCopyMessage(msg.text, i)}
                    className="flex items-center gap-[5px] px-[10px] py-[4px] rounded-[8px]
                               bg-white border border-[#00000015]
                               hover:border-[#F54900] hover:text-[#F54900]
                               transition-colors text-[11px] font-helvetica text-gray-400"
                  >
                    {copiedMsgIndex === i ? (
                      <>
                        <Check size={11} className="text-[#F54900]" />
                        <span className="text-[#F54900]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Generating indicator */}
      {isGenerating && (
        <div className="shrink-0 flex items-center justify-center gap-[8px] py-[8px]">
          <div className="w-[11px] h-[11px] rounded-full bg-[#F54900] animate-pulse" />
          <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-helvetica font-normal">
            Generating...
          </span>
        </div>
      )}

      {/* ── Bottom Input Bar ── */}
{preview && (
  <div className="px-[14px] sm:px-[18px] lg:px-[60px] mb-[6px]">
    <div className="relative w-[60px] h-[60px]">
      <img
        src={preview}
        alt="preview"
        className="w-full h-full object-cover rounded-[10px]"
      />
      <button
        onClick={() => {
          setImage(null);
          setPreview(null);
          if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
        }}
        className="absolute -top-2 -right-2 bg-black text-white 
                   w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  </div>
)}

{/* ✅ Input Bar */}
<div className="shrink-0 flex items-center justify-center gap-[8px] sm:gap-[10px]
                px-[14px] sm:px-[18px] lg:px-[60px]
                py-[10px] sm:py-[12px]">

  {/* Wrapper */}
  <div className="relative w-full">

    {/* ➕ moved inside (ONLY change) */}
    <label
      className="absolute left-[10px] top-1/2 -translate-y-1/2 
                 cursor-pointer text-[18px] text-gray-600"
    >
      +
      <input
       ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>

    {/* Input (only padding added) */}
    <input
      type="text"
      placeholder="Describe the prompt you want to generate..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSend()}
      className="w-full h-[40px] sm:h-[42px] lg:h-[44px]
                 border border-gray-300 rounded-[12px]
                 pl-[36px] px-[12px]   {/* 👈 only change */}
                 bg-[#F7F7F7] outline-none
                 text-[12px] sm:text-[13px] lg:text-[14px]
                 font-normal text-black font-helvetica"
    />
  </div>

  {/* ✅ Send Button (UNCHANGED) */}
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
              Anyone with this link can access and view this conversation.
            </p>

            <div className="bg-[#F5F5F5] rounded-[10px]
                            w-[90%] sm:w-[480px] lg:w-[525px]
                            h-[180px] sm:h-[200px] lg:h-[238px]
                            p-[16px] sm:p-[20px] lg:p-[25px]
                            space-y-[14px] overflow-y-auto mx-auto mb-[12px]">
              {messages.slice(0, 4).map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex items-start gap-[8px]">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#0000000D] flex items-center justify-center shrink-0">
                      <User size={10} />
                    </div>
                    <div className="bg-[#F54900] text-white text-[11px] font-helvetica font-normal px-[10px] py-[5px] rounded-[10px] max-w-[80%]">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-[8px]">
                    <div className="w-[28px] h-[28px] rounded-full bg-[#F54900] shrink-0" />
                    <div className="text-[11px] text-black max-w-[80%] font-helvetica bg-[#E8E8E8] rounded-[10px] px-[10px] py-[8px]">
                      <ReactMarkdown components={markdownComponents}>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="text-black px-[20px] sm:px-[28px] lg:px-[38px]">
              <p className="font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px]">{title}</p>
              <p className="font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px]">
                {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </div>

            {shareUrl && (
              <div className="flex items-center gap-[8px] w-[90%] sm:w-[480px] lg:w-[525px] mx-auto
                              border border-[#00000026] rounded-[12px] px-[12px] py-[10px] bg-[#F7F7F7]">
                <p className="flex-1 truncate font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px] text-black">{shareUrl}</p>
                <button onClick={handleCopyLink} className="shrink-0 font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px] text-[#F54900]">
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
              {shareLoading ? "Generating..." : shareUrl ? (copied ? "Copied!" : "Copy Link") : "Generate Share Link"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}