import {
  ChevronLeft,
  Bookmark,
  Clock,
  Download,
  Trash2,
  Share2,
  Send,
  User,
  MoreVertical,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function MainContent() {
    const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isGenerating]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: `Of course! I'd be delighted to help you create a song. To get started, I'll need a bit of information from you. Could you please provide me with the following:

1. What is the overall mood or theme of the song? (e.g., love, friendship, adventure, etc.)
2. What genre would you like the song to be? (e.g., pop, rock, ballad, etc.)
3. Do you have any specific lyrics or phrases you'd like to include in the song?
4. Is there any particular story or message you want the song to convey?

Feel free to share any additional details that you think would be helpful for crafting your personalized song.`,
        },
      ]);
    }, 2000);
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-white">

      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between
                      px-[14px] sm:px-[18px] lg:px-[24px]
                      h-[56px] sm:h-[64px] lg:h-[80px]
                      border-b border-gray-300 shrink-0 relative">

        {/* Left: back arrow + title */}
        <div className="flex items-center gap-[8px] lg:gap-[10px]">
          <button className="w-[26px] h-[26px] flex items-center justify-center
                             border-[1.5px] border-gray-500 rounded-[8px]"    onClick={() => navigate("/app/Dashboard")}>
            <ChevronLeft size={16} />
          </button>
          <span className="font-helvetica font-bold
                           text-[16px] sm:text-[18px] lg:text-[21.82px]
                           lg:leading-[8.82px] text-black">
            Untitled
          </span>
        </div>

        {/* Right: action buttons — desktop only */}
        <div className="hidden lg:flex items-center gap-[8px]">

          {/* Save to Bookmark */}
          <button className="flex items-center gap-[7px]
                             w-[203px] h-[40px] px-[18px]
                             border border-[#00000026] rounded-[12px]
                             text-[14px] font-helvetica font-normal bg-[#F7F7F7]">
            <Bookmark size={14} />
            <span>Save to Bookmark</span>
          </button>

          {/* Save to Project */}
          <button className="flex items-center gap-[7px]
                             w-[203px] h-[40px] px-[18px]
                             border border-[#00000026] rounded-[12px]
                             text-[14px] font-helvetica font-normal bg-[#F7F7F7]">
            <Clock size={14} />
            <span>Save to Project</span>
          </button>

          {/* Divider */}
          <div className="w-[1px] h-[37px] border border-gray-300 mx-[4px]" />

          <button className="w-[21.5px] h-[27.5px] flex items-center justify-center">
            <Clock size={15} />
          </button>
          <button className="w-[21.5px] h-[27.5px] flex items-center justify-center"
                  onClick={() => setShowShare(true)}>
            <Share2 size={15} />
          </button>
          <button className="w-[21.5px] h-[27.5px] flex items-center justify-center">
            <Trash2 size={15} />
          </button>
        </div>

        {/* Right: three-dot menu — mobile/tablet only */}
        <div className="lg:hidden relative">
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-1 text-gray-700"
          >
            <MoreVertical size={20} />
          </button>

          {/* Dropdown */}
          {showMobileMenu && (
            <div className="absolute right-0 top-[36px] bg-white border border-gray-200
                            rounded-[12px] shadow-lg z-50 w-[160px] py-2"
                 onClick={() => setShowMobileMenu(false)}>
                  <button className="flex items-center gap-[8px] w-full px-4 py-2
                                 text-[11px] font-helvetica font-normal hover:bg-gray-50"
                      onClick={() => setShowShare(true)}>
                <Share2 size={14} /> Share
              </button>
            <hr className="border-0 h-[1px] bg-[#00000026]" />

              <button className="flex items-center gap-[8px] w-full px-4 py-2
                                 text-[11px] font-helvetica font-normal hover:bg-gray-50">
                <Trash2 size={14} /> Delete
              </button>
            <hr className="border-0 h-[1px] bg-[#00000026]" />

                <button className="flex items-center gap-[8px] w-full px-4 py-2
                                 text-[11px] font-helvetica font-normal hover:bg-gray-50">
                <Clock size={14} /> History
              </button>
            <hr className="border-0 h-[1px] bg-[#00000026]" />

                 <button className="flex items-center gap-[8px] w-full px-4 py-2
                                 text-[11px] font-helvetica font-normal hover:bg-gray-50">
                <Clock size={14} /> Save to Project
              </button>
            <hr className="border-0 h-[1px] bg-[#00000026]" />

              <button className="flex items-center gap-[8px] w-full px-4 py-2
                                 text-[11px] font-helvetica font-normal hover:bg-gray-50">
                <Bookmark size={14} /> Save to Bookmark
              </button>
           
            
              
              
            </div>
          )}
        </div>
      </div>

      {/* ── Chat / Content Area ── */}
      <div className="flex-1 overflow-y-auto
                      px-[14px] py-[14px] sm:px-[18px] sm:py-[18px] lg:px-[24px] lg:py-[24px]
                      space-y-[16px]">
        {messages.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex items-start gap-[10px]">
              <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] lg:w-[44px] lg:h-[44px]
                              rounded-full bg-[#0000000D] flex items-center justify-center shrink-0">
                <User size={14} className="lg:w-4 lg:h-4" />
              </div>
              <div className="bg-[#F54900] text-white
                              text-[12px] sm:text-[13px] lg:text-[14px]
                              px-[12px] sm:px-[14px] lg:px-[16px]
                              h-[36px] sm:h-[40px] lg:h-[44px]
                              flex items-center rounded-[14px] max-w-[90%] lg:max-w-[600px]
                              font-poppins font-normal">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-[10px]">
              <div className="w-[30px] h-[30px] sm:w-[33px] sm:h-[33px] lg:w-[36px] lg:h-[36px]
                              rounded-full bg-[#E8430A] flex items-center justify-center shrink-0" />
              <div className="bg-[#F5F5F5] rounded-[14px]
                              px-[12px] py-[10px] sm:px-[14px] sm:py-[12px] lg:px-[16px] lg:py-[14px]
                              max-w-[90%] lg:max-w-[600px]
                              text-[12px] sm:text-[13px] lg:text-[14px]
                              text-black font-helvetica font-normal leading-[22px]">
                {msg.text}
              </div>
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {/* Generating indicator */}
      {isGenerating && (
        <div className="flex items-center justify-center gap-[8px] py-[8px]">
          <div className="w-[11px] h-[11px] rounded-full bg-[#F54900]" />
          <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-helvetica font-normal">
            Generating...
          </span>
        </div>
      )}

      {/* ── Bottom Input Bar ── */}
      <div className="flex items-center justify-center gap-[8px] sm:gap-[10px] lg:gap-[10px]
                      px-[14px] sm:px-[18px] lg:px-0
                      py-[10px] sm:py-[12px] lg:py-[12px]">
        <input
          type="text"
          placeholder="Describe the prompt you want to generate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="w-full lg:w-[893px]
                     h-[40px] sm:h-[42px] lg:h-[44px]
                     border border-gray-300 rounded-[12px]
                     px-[12px] sm:px-[14px] lg:px-[16px]
                     bg-[#F7F7F7] outline-none
                     text-[12px] sm:text-[13px] lg:text-[14px]
                     font-normal text-black font-helvetica"
        />
        <button
          onClick={handleSend}
          className="w-[40px] h-[40px] sm:w-[42px] sm:h-[42px] lg:w-[44px] lg:h-[44px]
                     flex items-center justify-center
                     bg-[#F54900] rounded-[12px]
                     hover:bg-[#d13c08] transition-colors shrink-0"
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
            className="bg-white rounded-[20px]
                        w-full sm:w-[500px] lg:w-[597px]
                        flex flex-col gap-[14px] border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title */}
            <h2 className="text-center
                           text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                           p-[9px] font-clarendon font-medium">
              Share chat link
            </h2>
            <hr className="border-0 h-[1px] bg-[#00000026]" />

            {/* Description */}
            <p className="text-center font-helvetica font-normal
                          text-[11px] sm:text-[12px] lg:text-[13px]
                          px-2">
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
                            overflow-y-auto mx-auto
                            mb-[12px] sm:mb-[16px] lg:mb-[20px]">
              {messages.slice(0, 4).map((msg, i) =>
                msg.role === "user" ? (
                  <div key={i} className="flex items-start gap-[8px] lg:gap-[10px]">
                    <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[34px] lg:h-[34px]
                                    rounded-full bg-[#0000000D] flex items-center justify-center shrink-0">
                      <User size={10} className="lg:w-3 lg:h-3" />
                    </div>
                    <div className="bg-[#F54900] text-white
                                    text-[11px] sm:text-[12px] lg:text-[14px]
                                    font-helvetica font-normal
                                    px-[10px] py-[5px] sm:px-[12px] sm:py-[6px] lg:px-[12px] lg:py-[6px]
                                    rounded-[10px] max-w-[80%] lg:max-w-[260px]">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex items-start gap-[8px] lg:gap-[10px]">
                    <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[34px] lg:h-[34px]
                                    rounded-full bg-[#F54900] shrink-0" />
                    <div className="text-[11px] sm:text-[12px] lg:text-[12px]
                                    text-black max-w-[80%] lg:max-w-[440px]
                                    font-helvetica leading-[20px] whitespace-pre-line
                                    bg-[#E8E8E8] rounded-[10px]
                                    px-[10px] py-[8px] sm:px-[12px] lg:px-[14px] lg:py-[10px]">
                      {msg.text}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Meta */}
            <div className="text-black
                            px-[20px] sm:px-[28px] lg:px-[38px]">
              <p className="font-helvetica font-normal
                            text-[11px] sm:text-[12px] lg:text-[13px]">
                Create a song
              </p>
              <p className="font-helvetica font-normal
                            text-[11px] sm:text-[12px] lg:text-[13px]">
                Username . 12 February 2026
              </p>
            </div>

            {/* Button */}
            <button className="w-[90%] sm:w-[480px] lg:w-[525px]
                               h-[40px] sm:h-[42px] lg:h-[44px]
                               mx-auto bg-[#F54900] text-white
                               text-[12px] sm:text-[13px] lg:text-[14px]
                               font-helvetica font-normal rounded-[12px]
                               mb-[14px] sm:mb-[16px] lg:mb-[20px]">
              Generate Share Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
}