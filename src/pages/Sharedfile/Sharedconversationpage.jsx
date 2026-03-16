import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "lucide-react";
import { getSharedConversationApi } from "../../api/Shareapi";
import ReactMarkdown from "react-markdown"
export default function SharedConversationPage() {
  const { shareToken } = useParams();
  const [conversation, setConversation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShared = async () => {
      try {
        const res = await getSharedConversationApi(shareToken);
        setConversation(res.data.conversation);
      } catch (err) {
        setError("This share link is invalid or has been revoked.");
      } finally {
        setLoading(false);
      }
    };
    fetchShared();
  }, [shareToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-helvetica font-normal text-[14px] text-gray-400">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="font-helvetica font-normal text-[14px] text-gray-400 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Header ── */}
      <div className="flex items-center justify-between
                      px-[16px] sm:px-[24px] lg:px-[40px]
                      h-[50px] sm:h-[56px] lg:h-[64px]
                      border-b border-gray-200 shrink-0">
        <span className="font-helvetica font-bold text-black
                         text-[16px] sm:text-[18px] lg:text-[20px]">
          Shared Chat
        </span>
        <p className="font-helvetica font-normal text-[11px] sm:text-[12px] lg:text-[13px] text-gray-400">
          {new Date(conversation.createdAt).toLocaleDateString("en-GB", {
            day: "numeric", month: "long", year: "numeric",
          })}
        </p>
      </div>

      {/* ── Title ── */}
      <div className="px-[16px] sm:px-[24px] lg:px-[40px] py-[14px] sm:py-[18px] lg:py-[24px]
                      border-b border-gray-100">
        <p className="font-helvetica font-medium text-black
                      text-[15px] sm:text-[16px] lg:text-[18px]">
          {conversation.title}
        </p>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto
                      px-[16px] sm:px-[24px] lg:px-[80px]
                      py-[16px] sm:py-[20px] lg:py-[24px]
                      space-y-[14px] sm:space-y-[18px] lg:space-y-[20px]">
        {conversation.messages.map((msg, i) =>
          msg.role === "user" ? (
            <div key={i} className="flex items-start gap-[8px] lg:gap-[10px]">
              <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[34px] lg:h-[34px]
                              rounded-full bg-[#0000000D] flex items-center justify-center shrink-0">
                <User size={10} className="lg:w-3 lg:h-3" />
              </div>
              <div className="bg-[#F5F5F5] rounded-[12px]
                              px-[12px] py-[10px] sm:px-[14px] sm:py-[12px]
                              max-w-[80%]">
                <p className="font-helvetica font-normal text-black
                              text-[12px] sm:text-[13px] lg:text-[14px]">
                  {msg.text}
                </p>
              </div>
            </div>
          ) : (
            <div key={i} className="flex items-start gap-[8px] lg:gap-[10px]">
              <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[34px] lg:h-[34px]
                              rounded-full bg-[#F54900] flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-[10px]">AI</span>
              </div>
              <div className="max-w-[80%]">
  <ReactMarkdown
    components={{
      p: ({ children }) => <p className="font-helvetica font-normal text-black text-[12px] sm:text-[13px] lg:text-[14px] leading-[20px] mb-[4px] last:mb-0">{children}</p>,
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      ol: ({ children }) => <ol className="list-decimal pl-[16px] space-y-[2px]">{children}</ol>,
      ul: ({ children }) => <ul className="list-disc pl-[16px] space-y-[2px]">{children}</ul>,
      li: ({ children }) => <li className="text-[12px] sm:text-[13px] lg:text-[14px] leading-[20px]">{children}</li>,
    }}
  >
    {msg.text}
  </ReactMarkdown>
</div>
            </div>
          )
        )}
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-gray-200 px-[16px] py-[12px] text-center">
        <p className="font-helvetica font-normal text-[11px] sm:text-[12px] text-gray-400">
          Shared via FO2 AI
        </p>
      </div>
    </div>
  );
}