import { useState } from "react";

const BookmarkIcon = () => (
  <svg
    width="13.9"
    height="16.17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#000000"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ArticlesIcon = ({ active }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#fff" : "#374151"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const AcademicIcon = ({ active }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke={active ? "#fff" : "#374151"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const TranslateIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#374151"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

function ToolCard({ title, active, icon }) {
  return (
    <div className="
      w-full
      h-[110px] sm:h-[120px] md:h-[128px] lg:w-[284px] lg:h-[137px]
      bg-[#F3F4F6] rounded-[12px]
      p-[12px] sm:p-[14px] md:p-[16px] lg:p-[18px]
      relative cursor-pointer border border-gray-300
    ">

      {/* Bookmark */}
      <div className="absolute top-[10px] right-[10px] lg:top-[14px] lg:right-[14px]">
        <BookmarkIcon />
      </div>

      {/* Icon */}
      <div className={`
        w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] lg:w-[43px] lg:h-[43px]
        rounded-full flex items-center justify-center
        mb-[8px] sm:mb-[10px] lg:mb-[12px]
        ${active ? "bg-[#F54900]" : "bg-[#D1D5DB]"}
      `}>
        {icon}
      </div>

      {/* Title */}
      <div className="font-helvetica font-normal text-[#111827]
                      text-[12px] sm:text-[13px] lg:text-[14px]
                      mb-[3px] lg:mb-[4px]">
        {title}
      </div>

      {/* Description */}
      <div className="font-helvetica font-normal text-[#6B7280] leading-[16px]
                      text-[10px] sm:text-[11px] lg:text-[12px]">
        Generate great article with any topic you want
      </div>
    </div>
  );
}

export default function PromptStudio() {
  return (
    <div className="flex justify-center
                    pt-3 sm:pt-4 lg:pt-4">

      <div className="
        w-full lg:w-[893px]
        h-auto lg:h-[188px]
        rounded-[8px] font-sans
      ">

        {/* Header */}
        <div className="flex justify-between items-center
                        mb-[12px] sm:mb-[14px] lg:mb-[16px]">

          <h3 className="font-helvetica font-medium
                         text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
            Prompt Studio
          </h3>

          <span className="font-helvetica font-normal text-[#F54900] cursor-pointer
                           text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
            View All Tools
          </span>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-[10px] sm:grid-cols-2 sm:gap-[12px] md:gap-[14px] lg:flex lg:gap-[16px]">
          <ToolCard title="Articles"        active icon={<ArticlesIcon active />} />
          <ToolCard title="Academic Writer"        icon={<AcademicIcon />} />
          <ToolCard title="Translate"              icon={<TranslateIcon />} />
        </div>

      </div>
    </div>
  );
}