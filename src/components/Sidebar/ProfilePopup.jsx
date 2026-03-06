import { Crown, Lock, FileText, Phone, HelpCircle, LogOut, User } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import LogoutModal from "../../auth/Logout/Logout";
import PrivacyPolicyModal from "../modals/PrivacyPolicyModal";
import TermsModal from "../modals/TermsModal";
import FAQModal from "../modals/FAQModal";
import ContactUsModal from "../modals/ContactUsModal";
import UpgradePlanModal from "../modals/UpgradePlanModal";

export default function ProfilePopup({ onClose }) {
  const [showLogout, setShowLogout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const menuItems = [
    { icon: <Crown size={16} />,      label: "Upgrade Plan",    onClick: () => setShowUpgrade(true) },
    { icon: <Lock size={16} />,       label: "Privacy Policy",  onClick: () => setShowPrivacy(true) },
    { icon: <FileText size={16} />,   label: "Term & Condition",onClick: () => setShowTerms(true) },
    { icon: <Phone size={16} />,      label: "Contact Us",      onClick: () => setShowContact(true) },
    { icon: <HelpCircle size={16} />, label: "FAQ",             onClick: () => setShowFAQ(true) },
  ];

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-20" onClick={onClose} />

      {/* Panel */}
      <div className="absolute bottom-[114px] left-[18px] right-[18px] bg-white rounded-[10px] shadow-[0px_8px_40px_rgba(0,0,0,0.12)] py-[8px] z-30">

        {/* User card at top */}
        <div className="flex items-center gap-[10px] px-[16px] py-[8px]">
          <div className="w-[36px] h-[36px] bg-[#00000012] rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="leading-tight">
            <p className="text-[14px] font-Poppins font-normal">User Name</p>
            <p className="text-[12px] font-Poppins text-[#00000080] leading-[16px]">yourgmail@gmail.com</p>
          </div>
        </div>

        <hr className="border h-[1px] bg-[#00000033] mx-[12px]" />

        {menuItems.map((item, i) => (
          <div key={i} onClick={item.onClick}>
            <button className="flex items-center gap-[10px] w-full px-[16px] py-[12px] text-[14px] font-Poppins text-black hover:bg-[#F7F7F7] transition-colors">
              {item.icon}
              <span className="text-[14px] font-Poppins font-normal">{item.label}</span>
            </button>
            <hr className="border h-[1px] bg-[#00000033] mx-[12px]" />
          </div>
        ))}

        {/* Logout */}
        <button
          onClick={() => setShowLogout(true)}
          className="flex items-center gap-[10px] w-full px-[16px] py-[12px] text-[14px] font-Poppins font-normal text-black hover:bg-[#F7F7F7] transition-colors"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

        <hr className="border-0 h-[1px] bg-[#00000012] mx-[12px]" />
      </div>

      {/* ── All modals rendered via portal at <body> level ── */}
      {showLogout   && createPortal(<LogoutModal        onClose={() => setShowLogout(false)}   onConfirm={() => console.log("logged out")} />, document.body)}
      {showPrivacy  && createPortal(<PrivacyPolicyModal onClose={() => setShowPrivacy(false)}  />, document.body)}
      {showTerms    && createPortal(<TermsModal         onClose={() => setShowTerms(false)}    />, document.body)}
      {showFAQ      && createPortal(<FAQModal           onClose={() => setShowFAQ(false)}      />, document.body)}
      {showContact  && createPortal(<ContactUsModal     onClose={() => setShowContact(false)}  />, document.body)}
      {showUpgrade  && createPortal(<UpgradePlanModal   onClose={() => setShowUpgrade(false)}  />, document.body)}
    </>
  );
}