import { X } from "lucide-react";

export default function PrivacyPolicyModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-[9999]
                    px-4 sm:px-6">
      <div className="bg-white rounded-[10px]
                      w-full sm:w-[440px] md:w-[490px] lg:w-[535px]
                      max-h-[80vh]
                      shadow-[0px_8px_40px_rgba(0,0,0,0.12)]
                      flex flex-col overflow-hidden">

        {/* Header */}
        <div className="relative flex items-center justify-center
                        px-[16px] py-[14px] sm:px-[22px] sm:py-[16px] lg:px-[28px] lg:py-[20px]
                        shrink-0">
          <h2 className="font-clarendon font-medium text-black mx-auto
                         text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
            Privacy Policy
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

        <hr className="border h-[1px] bg-[#00000033] mx-[12px]" />

        {/* Scrollable Content */}
        <div className="overflow-y-auto
                        px-[16px] py-[16px] sm:px-[20px] sm:py-[20px] lg:px-[24px] lg:py-[23px]
                        font-helvetica text-black leading-[16px]
                        text-[11px] sm:text-[12px] lg:text-[13px]">

          <p className="mb-[2px] font-helvetica font-normal">
            At FO2.AI, your privacy matters to us. This policy explains how we collect, use, and protect your information.
          </p>

          <p className="font-helvetica font-bold mb-[3px]">1. Information We Collect</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["Name and email address during account registration", "Login and authentication details", "Prompt inputs, session history, and generated outputs", "Device information, browser type, IP address, and usage analytics"].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">2. How We Use Your Information</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["To provide access to your account", "To generate and store your prompt sessions", "To improve platform performance and user experience", "To ensure security and prevent misuse", "To communicate service updates or support responses"].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">3. Prompt & Content Data</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["Your prompts may be processed to deliver results", "You retain ownership of your content", "We do not publicly share private sessions without your consent", "Aggregated and anonymized data may be used for improvement"].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">4. Data Protection</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["We apply technical and organizational safeguards", "We do not sell or rent your personal information", "Trusted service providers may assist in platform operations"].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">5. Your Rights</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["Request access, correction, or deletion of your data", "Contact us for privacy-related concerns"].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p>By using FO2.AI you agree to this Privacy Policy.</p>

        </div>
      </div>
    </div>
  );
}