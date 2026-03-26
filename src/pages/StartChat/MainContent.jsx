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
  FolderOpen,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useChat from "../../hooks/useChat";
import useProjects from "../../hooks/useProjects";
import { addBookmarkApi, removeBookmarkApi, checkBookmarkApi } from "../../api/bookmark";
import { createConversationApi } from "../../api/chat";
import { generateShareLinkApi } from "../../api/Shareapi";
import { saveConversationToProjectApi } from "../../api/project";
import { showSuccess, showError } from "../../utils/toast";

const MAX_IMAGE_SIZE = 20 * 1024 * 1024;
const MAX_IMAGE_COUNT = 10;

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

  const { projects, fetchProjects } = useProjects();

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

  // Multi-image state
  const [images, setImages] = useState([]);    // File[]
  const [previews, setPreviews] = useState([]); // string[] (blob URLs)

  // Save to Project state
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [savingToProject, setSavingToProject] = useState(false);

  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const projectDropdownRef = useRef(null);

  // Fetch projects once on mount
  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (urlConversationId) {
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
        const titleText = firstUserMsg.text || "Image prompt";
        setTitle(titleText.substring(0, 30) + (titleText.length > 30 ? "..." : ""));
      }
    }
  }, [messages]);

  // Close project dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (
        projectDropdownRef.current &&
        !projectDropdownRef.current.contains(e.target)
      ) {
        setShowProjectDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const checkIfBookmarked = async (convId) => {
    try {
      const res = await checkBookmarkApi(convId);
      setIsBookmarked(res.data.isBookmarked);
    } catch (err) {
      console.error("checkBookmark error:", err);
    }
  };

  // ── Multi-image handler — accumulate up to MAX_IMAGE_COUNT
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGE_COUNT - images.length;

    if (remaining <= 0) {
      showError(`You can upload a maximum of ${MAX_IMAGE_COUNT} images.`);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const toAdd = files.slice(0, remaining);
    const oversized = toAdd.filter((f) => f.size > MAX_IMAGE_SIZE);
    if (oversized.length > 0) {
      showError("Each image must be under 20MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setImages((prev) => [...prev, ...toAdd]);
    setPreviews((prev) => [...prev, ...toAdd.map((f) => URL.createObjectURL(f))]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove one image by index
  const handleClearImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
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

  // ── Save conversation to selected project
  const handleSaveToProject = async (projectId) => {
    const convId = urlConversationId || conversationId;
    if (!convId) {
      showError("No conversation to save. Start chatting first.");
      setShowProjectDropdown(false);
      return;
    }
    setSavingToProject(true);
    try {
      await saveConversationToProjectApi(projectId, convId);
      showSuccess("Chat saved to project!");
    } catch (err) {
      console.error("saveToProject error:", err);
      showError("Failed to save to project.");
    } finally {
      setSavingToProject(false);
      setShowProjectDropdown(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && images.length === 0) {
      showError("Please enter a message or attach an image before sending.");
      return;
    }

    let convId = urlConversationId || conversationId;

    if (!convId) {
      try {
        const res = await createConversationApi();
        convId = res.data.conversationId;
        navigate(`/app/chat/${convId}`, { replace: true });
      } catch (err) {
        console.error("Failed to create conversation:", err);
        showError("Failed to start conversation. Please try again.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("text", input.trim());
    images.forEach((img) => formData.append("images", img));

    setInput("");
    setImages([]);
    setPreviews([]);
    if (fileInputRef.current) fileInputRef.current.value = "";

    await sendMessage(formData, convId);
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
    <div className="flex flex-col w-full bg-white overflow-hidden" style={{ height: "100%" }}>

      {/* ── Top Bar ── */}
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

        {/* ── Desktop actions ── */}
        <div className="hidden lg:flex items-center gap-[8px]">

          {/* Save to Bookmark */}
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

          {/* Save to Project — dropdown */}
          <div className="relative" ref={projectDropdownRef}>
            <button
              onClick={() => setShowProjectDropdown((prev) => !prev)}
              className={`flex items-center gap-[7px] w-[203px] h-[40px] px-[18px]
                          border border-[#00000026] rounded-[12px]
                          text-[14px] font-helvetica font-normal transition-colors
                          ${showProjectDropdown ? "bg-[#F54900] text-white" : "bg-[#F7F7F7] text-black"}`}
            >
              <FolderOpen size={14} />
              <span>{savingToProject ? "Saving..." : "Save to Project"}</span>
            </button>

            {showProjectDropdown && (
              <div className="absolute right-0 top-[46px] bg-white border border-[#00000015]
                              rounded-[14px] shadow-xl z-50 w-[230px] py-[6px]
                              max-h-[280px] overflow-y-auto">
                {projects.length === 0 ? (
                  <p className="text-center text-[12px] text-gray-400 py-[16px] font-helvetica">
                    No projects found
                  </p>
                ) : (
                  projects.map((proj) => (
                    <button
                      key={proj._id}
                      onClick={() => handleSaveToProject(proj._id)}
                      className="flex items-center gap-[10px] w-full px-[14px] py-[9px]
                                 hover:bg-[#FFF5F2] text-left transition-colors group"
                    >
                      <img
                        src={
                          proj.image ||
                          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=40&h=40&fit=crop"
                        }
                        alt=""
                        className="w-[30px] h-[30px] rounded-[7px] object-cover shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] font-helvetica text-black truncate group-hover:text-[#F54900] transition-colors">
                          {proj.title}
                        </span>
                        {proj.description && (
                          <span className="text-[11px] font-helvetica text-gray-400 truncate">
                            {proj.description}
                          </span>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

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

        {/* ── Mobile menu ── */}
        <div className="lg:hidden relative">
          <button
            onClick={() => { setShowMobileMenu(!showMobileMenu); setShowProjectDropdown(false); }}
            className="p-1 text-gray-700"
          >
            <MoreVertical size={20} />
          </button>

          {showMobileMenu && (
            <div className="absolute right-0 top-[36px] bg-white border border-gray-200
                            rounded-[12px] shadow-lg z-50 w-[190px] py-2">

              <button
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                onClick={() => { setShowShare(true); setShowMobileMenu(false); }}
              >
                <Share2 size={14} /> Share
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />

              <button
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                onClick={() => { handleDelete(); setShowMobileMenu(false); }}
              >
                <Trash2 size={14} /> Delete
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />

              <button
                onClick={() => { navigate("/app/historylist"); setShowMobileMenu(false); }}
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
              >
                <Clock size={14} /> History
              </button>
              <hr className="border-0 h-[1px] bg-[#00000026]" />

              {/* Mobile Save to Project — inline expandable */}
              <button
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                onClick={() => setShowProjectDropdown((prev) => !prev)}
              >
                <FolderOpen size={14} />
                Save to Project
              </button>

              {showProjectDropdown && (
                <div className="border-t border-[#00000012] max-h-[180px] overflow-y-auto">
                  {projects.length === 0 ? (
                    <p className="text-center text-[11px] text-gray-400 py-[10px] font-helvetica">
                      No projects
                    </p>
                  ) : (
                    projects.map((proj) => (
                      <button
                        key={proj._id}
                        onClick={() => { handleSaveToProject(proj._id); setShowMobileMenu(false); }}
                        className="flex items-center gap-[8px] w-full px-[18px] py-[8px]
                                   hover:bg-[#FFF5F2] text-left transition-colors"
                      >
                        <img
                          src={
                            proj.image ||
                            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=40&h=40&fit=crop"
                          }
                          alt=""
                          className="w-[24px] h-[24px] rounded-[5px] object-cover shrink-0"
                        />
                        <span className="text-[11px] font-helvetica text-black truncate">
                          {proj.title}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}

              <hr className="border-0 h-[1px] bg-[#00000026]" />
              <button
                className="flex items-center gap-[8px] w-full px-4 py-2 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                onClick={() => { handleBookmark(); setShowMobileMenu(false); }}
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

              <div className="flex flex-col gap-[8px] max-w-[90%] lg:max-w-[70%]">
                {/* Render all images */}
                {msg.imageUrls?.length > 0 && (
                  <div className="flex flex-wrap gap-[8px]">
                    {msg.imageUrls.map((url, imgIdx) => (
                      <img
                        key={imgIdx}
                        src={url}
                        alt="upload"
                        className="w-[120px] h-[120px] rounded-[12px] object-cover border border-[#00000015]"
                      />
                    ))}
                  </div>
                )}
                {msg.text?.trim() && (
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

              <div className="relative bg-[#F5F5F5] rounded-[14px]
                              px-[12px] py-[10px] sm:px-[14px] sm:py-[12px] lg:px-[16px] lg:py-[14px]
                              w-full max-w-[90%] lg:max-w-[75%]
                              text-[12px] sm:text-[13px] lg:text-[15px]
                              text-black font-helvetica font-normal leading-[34px]">
                <ReactMarkdown components={markdownComponents}>
                  {msg.text}
                </ReactMarkdown>

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

      {/* ── Multi-image preview strip above input ── */}
      {previews.length > 0 && (
        <div className="shrink-0 px-[14px] sm:px-[18px] lg:px-[60px] mb-[6px] flex flex-wrap gap-[8px]">
          {previews.map((src, idx) => (
            <div key={idx} className="relative w-[60px] h-[60px]">
              <img
                src={src}
                alt="preview"
                className="w-full h-full object-cover rounded-[10px]"
              />
              <button
                onClick={() => handleClearImage(idx)}
                className="absolute -top-2 -right-2 bg-black text-white
                           w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add more images button — shown only if under limit */}
          {images.length < MAX_IMAGE_COUNT && (
            <label className="w-[60px] h-[60px] border-2 border-dashed border-gray-300
                              rounded-[10px] flex items-center justify-center cursor-pointer
                              text-gray-400 text-[22px] hover:border-[#F54900] transition-colors">
              +
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      )}

      {/* ── Bottom Input Bar ── */}
      <div className="shrink-0 flex items-center justify-center gap-[8px] sm:gap-[10px]
                      px-[14px] sm:px-[18px] lg:px-[60px]
                      py-[10px] sm:py-[12px]">

        <div className="relative w-full">
          {/* Show attach button only when no previews are shown (uses the strip instead) */}
          {previews.length === 0 && (
            <label className="absolute left-[10px] top-1/2 -translate-y-1/2
                               cursor-pointer text-[18px] text-gray-600">
              +
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}

          <input
            type="text"
            placeholder="Describe the prompt you want to generate..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className={`w-full h-[40px] sm:h-[42px] lg:h-[44px]
                       border border-gray-300 rounded-[12px]
                       ${previews.length === 0 ? "pl-[36px]" : "pl-[12px]"} pr-[12px]
                       bg-[#F7F7F7] outline-none
                       text-[12px] sm:text-[13px] lg:text-[14px]
                       font-normal text-black font-helvetica`}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={isGenerating}
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
                    <div className="flex flex-col gap-[4px]">
                      {msg.imageUrls?.length > 0 && (
                        <div className="flex flex-wrap gap-[4px]">
                          {msg.imageUrls.map((url, imgIdx) => (
                            <img
                              key={imgIdx}
                              src={url}
                              alt="upload"
                              className="w-[40px] h-[40px] rounded-[6px] object-cover"
                            />
                          ))}
                        </div>
                      )}
                      {msg.text?.trim() && (
                        <div className="bg-[#F54900] text-white text-[11px] font-helvetica font-normal px-[10px] py-[5px] rounded-[10px] max-w-[80%]">
                          {msg.text}
                        </div>
                      )}
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