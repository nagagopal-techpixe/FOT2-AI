import { X, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  { question: "1. What is FO2.AI?", answer: "FO2.AI is a prompt-generation platform that helps you create structured, optimized prompts for use with other AI tools. It does not generate final content — it builds the prompt that powers your AI results." },
  { question: "2. How is FO2.AI different from an AI chatbot?", answer: "Unlike traditional chatbots that produce final answers, FO2.AI focuses on designing high-quality prompts that you can use in image, video, writing, or other AI systems." },
  { question: "3. What can I generate with FO2.AI?", answer: "You can generate prompts for articles, scripts, cinematic videos, AI images, translations, academic writing, and more — depending on your needs." },
  { question: "4. Do I own the prompts I create?", answer: "Yes. You retain full ownership of the prompts you generate within your account" },
  { question: "5. Is my prompt data private?", answer: "Your private sessions are not shared publicly unless you choose to generate and share a public link." },
  { question: "6. Can I save and organize my prompts?", answer: "Yes. You can save prompts to projects, bookmark them, and access them anytime from your activity archive." },
  { question: "7. Can I share my prompt with others?", answer: "Yes. FO2.AI allows you to generate shareable links for collaboration or reference." },
  { question: "8. Does FO2.AI connect to other AI tools?", answer: "FO2.AI generates optimized prompts that you can copy and use in your preferred AI platforms." },
];

export default function FAQModal({ onClose }) {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999]
                    px-4 sm:px-6">
      <div className="bg-white rounded-[10px]
                      w-full sm:w-[400px] md:w-[440px] lg:w-[480px]
                      max-h-[80vh]
                      shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                      flex flex-col overflow-hidden">

        {/* Header */}
        <div className="relative flex items-center justify-center
                        px-[16px] py-[14px] sm:px-[22px] sm:py-[16px] lg:px-[28px] lg:py-[20px]
                        shrink-0">
          <h2 className="font-clarendon font-medium text-black mx-auto
                         text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
            FAQ
          </h2>
          <button
            onClick={onClose}
            className="absolute right-[16px] sm:right-[22px] lg:right-[28px]
                       w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]
                       flex items-center justify-center rounded-full
                       border border-[#000000]
                       hover:bg-[#F7F7F7] transition-colors"
          >
            <X size={12} className="lg:w-[14px] lg:h-[14px]" />
          </button>
        </div>

        <hr className="border h-[1px] bg-[#00000033] mx-[12px] shrink-0" />

        {/* Accordion */}
        <div className="overflow-y-auto
                        px-[14px] py-[12px] space-y-[8px]
                        sm:px-[16px] sm:py-[14px] sm:space-y-[9px]
                        lg:px-[20px] lg:py-[16px] lg:space-y-[10px]">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#FF44000F] rounded-[10px] overflow-hidden">

              {/* Question Row */}
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between text-left
                           px-[12px] py-[12px] sm:px-[14px] sm:py-[14px] lg:px-[16px] lg:py-[16px]"
              >
                <span className="font-helvetica font-bold text-black
                                 text-[12px] sm:text-[13px] lg:text-[14px]">
                  {faq.question}
                </span>
                {openIndex === i
                  ? <ChevronUp size={14} className="text-black shrink-0 lg:w-[16px] lg:h-[16px]" />
                  : <ChevronDown size={14} className="text-black shrink-0 lg:w-[16px] lg:h-[16px]" />
                }
              </button>

              {/* Answer */}
              {openIndex === i && (
                <div className="px-[12px] pb-[12px] sm:px-[14px] sm:pb-[14px] lg:px-[16px] lg:pb-[16px]">
                  <p className="font-helvetica font-normal text-black leading-[20px] text-justify
                                text-[11px] sm:text-[12px] lg:text-[14px]">
                    {faq.answer}
                  </p>
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}