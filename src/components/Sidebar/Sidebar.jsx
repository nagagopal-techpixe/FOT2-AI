import {
  Plus,
  Pencil,
  Clock,
  Grid,
  Share2,
  Bookmark,
  ChevronDown,
  User,
  ChevronRight,
  X,
} from "lucide-react";

import ProfilePopup from "./ProfilePopup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
const userName = localStorage.getItem("username");
const userEmail = localStorage.getItem("email");
  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div className="bg-[#F7F7F7] border-r border-[#00000012] flex flex-col justify-between
                    w-[280px] sm:w-[290px] lg:w-[300px]
                    h-screen">

      {/* Top */}
      <div className="px-[18px] pt-[16px] sm:px-[22px] sm:pt-[20px] lg:px-[26px] lg:pt-[24px]
                      flex-1 overflow-y-auto">

        {/* Logo row + close btn on mobile */}
        <div className="flex items-center justify-between mb-6 sm:mb-7 lg:mb-8 pt-3 lg:pt-4">
          <h1 className="font-clarendon font-medium
                         text-[18px] sm:text-[20px] lg:text-[21.82px] cursor-pointer
                         leading-[8.82px]"  onClick={() => navigate("/app/Dashboard")}>
            F02.AI
          </h1>
          {/* Close button — mobile/tablet only */}
          <button
            onClick={onClose}
            className="lg:hidden w-[26px] h-[26px] flex items-center justify-center
                       rounded-full border border-[#00000026] hover:bg-[#0000000D] transition-colors"
          >
            <X size={14} />
          </button>
        </div>

        {/* Start Button */}
        <button
          onClick={() => handleNavigate("/app/startchat")}
          className="w-full h-[40px] sm:h-[42px] lg:h-[44px]
                     bg-[#0000000D] rounded-[12px]
                     flex items-center gap-[8px] lg:gap-[10px]
                     px-[12px] lg:px-[14px]
                     font-helvetica font-normal text-black
                     text-[12px] sm:text-[13px] lg:text-[14px]
                     mb-[12px] sm:mb-[13px] lg:mb-[14px]">
          <Plus size={14} className="lg:w-4 lg:h-4" />
          <span>Start a New Conversation</span>
        </button>

        <hr className="border-0 h-[1px] bg-[#00000026] mb-[12px] sm:mb-[13px] lg:mb-[14px]" />

        {/* Prompt Studio */}
        <div className="mb-[14px] sm:mb-[16px] lg:mb-[18px]">
          <div className="flex items-center justify-between mb-[12px] lg:mb-[14px]">
            <div className="flex items-center gap-[8px] lg:gap-[10px]">
              <Pencil size={14} className="lg:w-4 lg:h-4" />
              <span className="font-helvetica font-normal pl-[6px] lg:pl-[8px]
                               text-[12px] sm:text-[13px] lg:text-[14px]">
                Prompt Studio
              </span>
            </div>
            <div className="w-[14.88px] h-[14.88px] flex items-center justify-center
                            border border-black rounded-[4px] font-bold">
              <ChevronDown size={12} className="lg:w-[14px] lg:h-[14px]" />
            </div>
          </div>

          <div className="pl-[6px] lg:pl-[8px] space-y-[4px]">
            <p className="font-helvetica font-normal text-[11px] sm:text-[11px] lg:text-[12px]">
              Recommended Tools
            </p>
            <div>
              <p className="font-helvetica font-normal text-[12px] sm:text-[13px] lg:text-[14px]">
                Prompt Article Builder
              </p>
              <p className="font-helvetica font-normal text-[#00000080]
                            text-[10px] sm:text-[11px] lg:text-[12px]">
                Generate optimized prompts to create powerful articles in any AI tool.
              </p>
            </div>
            <div>
              <p className="font-helvetica font-normal text-[12px] sm:text-[13px] lg:text-[14px]">
                Prompt Translator
              </p>
              <p className="font-helvetica font-normal text-[#00000080]
                            text-[10px] sm:text-[11px] lg:text-[12px]">
                Create structured translation prompts for seamless multi-language output.
              </p>
            </div>
            <div>
              <p className="font-helvetica font-normal text-[11px] sm:text-[11px] lg:text-[12px]">
                Academic Prompt Architect
              </p>
              <p className="font-helvetica font-normal text-[#00000080]
                            text-[10px] sm:text-[11px] lg:text-[12px]">
                Build detailed academic writing prompts ready for research-grade results.
              </p>
            </div>
          </div>
        </div>

        <hr className="border-0 h-[1px] bg-[#00000026] mb-[12px] sm:mb-[13px] lg:mb-[14px]" />

        {/* Conversation History */}
        <div className="mb-[14px] sm:mb-[16px] lg:mb-[18px]">
          <div
            className="flex items-center justify-between mb-[12px] lg:mb-[14px]
                       pl-[6px] lg:pl-[8px] cursor-pointer"
            onClick={() => handleNavigate("historylist")}
          >
            <div className="flex items-center gap-[8px]">
              <Clock size={14} className="lg:w-4 lg:h-4" />
              <span className="font-helvetica font-normal
                               text-[12px] sm:text-[13px] lg:text-[14px]">
                Conversation History
              </span>
            </div>
            <div className="w-[14.88px] h-[14.88px] flex items-center justify-center
                            border border-black rounded-[4px] font-bold">
              <ChevronDown size={12} className="lg:w-[14px] lg:h-[14px]" />
            </div>
          </div>

          <div className="pl-[6px] lg:pl-[8px] space-y-[6px] sm:space-y-[7px] lg:space-y-[8px]
                          font-helvetica font-normal
                          text-[11px] sm:text-[12px] lg:text-[12px]">
            <p>How to calibrate monitor?</p>
            <p>Can you help me to create a canva?</p>
            <p>Select between nike and adidas</p>
          </div>
        </div>

        <hr className="border-0 h-[1px] bg-[#00000026] mb-[12px] sm:mb-[13px] lg:mb-[14px]" />

        {/* Bottom Links */}
        <div className="space-y-[14px] sm:space-y-[16px] lg:space-y-[18px]
                        mb-[20px] sm:mb-[22px] lg:mb-[24px]
                        pl-[6px] lg:pl-[8px]
                        font-helvetica font-normal
                        text-[12px] sm:text-[13px] lg:text-[14px]">
          <div
            className="flex items-center gap-[8px] cursor-pointer "
            onClick={() => handleNavigate("/app/project")}
          >
            <Grid size={14} className="lg:w-4 lg:h-4" />
            <span>Project</span>
          </div>
          <div onClick={() => navigate("/app/shared")} className="cursor-pointer flex items-center gap-[8px]">
            <Share2 size={14} className="lg:w-4 lg:h-4" />
            <span>Shared Files</span>
          </div>
          <div
            className="flex items-center gap-[8px] cursor-pointer"
            onClick={() => handleNavigate("/app/bookmark")}
          >
            <Bookmark size={14} className="lg:w-4 lg:h-4" />
            <span>Bookmark</span>
          </div>
        </div>

      </div>

      {/* Bottom User Card */}
      <div className="px-[6px] pb-[20px] sm:pb-[22px] lg:pb-[24px] mt-auto shrink-0 relative">

        {showProfile && <ProfilePopup onClose={() => setShowProfile(false)} />}

        <div onClick={() => setShowProfile(!showProfile)} className="cursor-pointer">
          <div className="px-[16px] sm:px-[20px] lg:px-[26px]
                          pb-[16px] sm:pb-[20px] lg:pb-[24px]">
            <div className="bg-[#0000000D] rounded-[14px]
                            h-[48px] sm:h-[52px] lg:h-[56px]
                            flex items-center justify-between
                            px-[12px] lg:px-[14px]">

              {/* Left Side */}
              <div className="flex items-center gap-[8px] lg:gap-[10px]">
                <div className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px]
                                bg-white rounded-full flex items-center justify-center">
                  <User size={14} className="lg:w-4 lg:h-4" />
                </div>
             <div className="leading-tight">
  <p className="font-medium text-[12px] sm:text-[13px] lg:text-[14px]">
    {userName}
  </p>
  <p className="text-[#00000080] text-[10px] sm:text-[11px] lg:text-[12px]">
    {userEmail}
  </p>
</div>
              </div>

              {/* Right Arrow */}
              <ChevronRight size={14} className="text-black lg:w-4 lg:h-4" />

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}