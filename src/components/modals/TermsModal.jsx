import { X } from "lucide-react";

export default function TermsModal({ onClose }) {
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
            Term and Conditions
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
            Welcome to FO2.AI By accessing or using our platform, you agree to the following Terms & Conditions.
          </p>

          <p className="font-helvetica font-bold mb-[3px]">1. Use of the Platform</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["FO2.AI provides prompt-generation tools for AI-based workflows.", "You agree to use the platform only for lawful purposes.", "You must not misuse, disrupt, or attempt to gain unauthorized access to the system."].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">2. User Accounts</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["You are responsible for maintaining the confidentiality of your account credentials.", "All activities under your account are your responsibility.", "We reserve the right to suspend accounts that violate these terms."].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">3. Content & Prompts</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["You retain ownership of the prompts you create.", "FO2.AI does not claim ownership of your private content.", "You are responsible for how you use prompts generated through the platform.", "We are not liable for outcomes produced by third-party AI tools."].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">4. Prohibited Activities</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["Generating illegal, harmful, abusive, or fraudulent content", "Attempting to reverse-engineer or copy platform functionality", "Violating intellectual property rights"].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">5. Limitation of Liability</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["FO2.AI is not liable for any indirect or consequential damages.", "We do not guarantee uninterrupted or error-free service.", "Use of the platform is at your own risk."].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="font-helvetica font-bold mb-[3px]">6. Changes to Terms</p>
          <ul className="space-y-[1px] mb-[2px] pl-[4px]">
            {["We may update these terms at any time.", "Continued use of the platform means you accept the new terms."].map((item, i) => (
              <li key={i} className="flex items-start gap-[10px] sm:gap-[12px] lg:gap-[12px]">
                <span>·</span><span>{item}</span>
              </li>
            ))}
          </ul>

          <p>By using FO2.AI you agree to these Terms and Conditions.</p>

        </div>
      </div>
    </div>
  );
}