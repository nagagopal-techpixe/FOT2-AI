import { useState, useRef, useEffect } from "react";
import { Plus, Share2, Pencil, Trash2, MoreVertical, Menu } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import CreateProjectModal from "../../components/modals/CreateProjectModal";
import RenameModal from "../../components/modals/RenameModal";
import DeleteProjectModal from "../../components/modals/Deleteprojectmodal";

const projects = Array(4).fill({
  title: "Project Title",
  description: "Lorem Ipsum is simply dummy text of the printing",
  totalChat: 15,
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
});

export default function Project() {
  const { onMenuClick } = useOutletContext();
  const [openMenu, setOpenMenu] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <>
      <div className="flex flex-col flex-1 h-screen bg-white overflow-hidden">

        {/* ── Top Bar ── */}
        <div className="flex items-center justify-between
                        px-[14px] sm:px-[18px] lg:px-[24px]
                        h-[50px] sm:h-[56px] lg:h-[64px]
                        border-b border-gray-200 shrink-0">

          {/* Left: hamburger + title */}
          <div className="flex items-center gap-[8px] lg:gap-[10px]">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-1 -ml-1 text-gray-700 hover:text-black transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} className="sm:w-6 sm:h-6" />
            </button>
            <span className="font-helvetica font-bold text-black
                             text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
              Project
            </span>
          </div>

          {/* Right: Create button */}
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-[6px] sm:gap-[8px] lg:gap-[8px]
                       h-[34px] sm:h-[36px] lg:h-[40px]
                       px-[12px] sm:px-[16px]  lg:px-[20px]
                       bg-[#FF4400] hover:bg-[#d13c08] transition-colors
                       text-white font-helvetica font-medium rounded-[12px]
                       text-[11px] sm:text-[12px] lg:text-[14px]"
          >
            <div className="w-[13px] h-[13px] sm:w-[14px] sm:h-[14px] lg:w-[15px] lg:h-[15px]
                            rounded-full border border-white flex items-center justify-center shrink-0">
              <Plus size={11} className="text-white lg:w-[14px] lg:h-[14px]" />
            </div>
            <span className="font-helvetica font-normal hidden sm:inline">
              Create New Project
            </span>
            <span className="font-helvetica font-normal sm:hidden"> Create New Project</span>
          </button>
        </div>

        {/* ── Content ── */}
        <div className="flex-1 overflow-y-auto
                        px-[14px] py-[14px]
                        sm:px-[18px] sm:py-[18px]
                        lg:px-[24px] lg:py-[24px]">
          <div className="grid grid-cols-2 gap-[10px]
                          sm:grid-cols-2 sm:gap-[12px]
                          md:grid-cols-3 md:gap-[14px]
                          lg:grid-cols-4 lg:gap-[16px]">
            {projects.map((item, i) => (
              <div
                key={i}
                className="border border-[#E8430A]/30 rounded-[14px]
                           py-[12px] px-[10px] sm:py-[14px] sm:px-[12px] lg:py-[16px] lg:px-[14px]
                           bg-[#FFF5F2] cursor-pointer hover:shadow-sm transition-shadow"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt="project"
                  className="w-full h-[80px] sm:h-[96px] md:h-[108px] lg:h-[116px]
                             object-cover rounded-[14px]"
                />

                {/* Info */}
                <div className="p-[8px] sm:p-[10px] lg:p-[12px] relative">

                  {/* Title + Menu */}
                  <div className="flex items-center justify-between mb-[4px] sm:mb-[5px] lg:mb-[6px]">
                    <p className="font-helvetica font-normal
                                  text-[12px] sm:text-[13px] lg:text-[14px]">
                      {item.title}
                    </p>

                    {/* 3-dot button */}
                    <div className="relative" ref={openMenu === i ? menuRef : null}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === i ? null : i); }}
                        className="w-[22px] h-[22px] lg:w-[24px] lg:h-[24px]
                                   flex items-center justify-center
                                   hover:bg-[#0000000D] rounded-[6px]"
                      >
                        <MoreVertical size={13} className="lg:w-[15px] lg:h-[15px]" />
                      </button>

                      {/* Dropdown */}
                      {openMenu === i && (
                        <div className="absolute right-0 top-[26px] lg:top-[28px]
                                        bg-white border border-[#00000012] rounded-[12px]
                                        shadow-lg z-20
                                        w-[140px] sm:w-[150px] lg:w-[160px]
                                        py-[3px]">
                          <button className="flex items-center gap-[8px] lg:gap-[10px] w-full
                                             px-[12px] lg:px-[14px] py-[7px] lg:py-[8px]
                                             border-b-[0.5px] border-[#0000004D]
                                             text-[12px] sm:text-[13px] lg:text-[14px]
                                             font-helvetica text-black hover:bg-[#F7F7F7]">
                            <Share2 size={13} className="lg:w-[15px] lg:h-[15px]" />
                            <span>Share</span>
                          </button>
                          <hr className="border-0 h-[1px] bg-[#00000012] mx-[10px]" />
                          <button
                            onClick={() => { setShowRename(true); setOpenMenu(null); }}
                            className="flex items-center gap-[8px] lg:gap-[10px] w-full
                                       px-[12px] lg:px-[14px] py-[7px] lg:py-[8px]
                                       border-b-[0.5px] border-[#0000004D]
                                       text-[12px] sm:text-[13px] lg:text-[14px]
                                       font-helvetica text-black hover:bg-[#F7F7F7]">
                            <Pencil size={13} className="lg:w-[15px] lg:h-[15px]" />
                            <span>Rename</span>
                          </button>
                          <hr className="border-0 h-[1px] bg-[#00000012] mx-[10px]" />
                          <button
                            onClick={() => { setShowDelete(true); setOpenMenu(null); }}
                            className="flex items-center gap-[8px] lg:gap-[10px] w-full
                                       px-[12px] lg:px-[14px] py-[7px] lg:py-[8px]
                                       border-b-[0.5px] border-[#0000004D]
                                       text-[12px] sm:text-[13px] lg:text-[14px]
                                       font-helvetica text-black hover:bg-[#F7F7F7]">
                            <Trash2 size={13} className="lg:w-[15px] lg:h-[15px]" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-helvetica font-normal text-[#00000080] leading-[17px]
                                text-[10px] sm:text-[11px] lg:text-[12px]
                                mb-[4px] sm:mb-[5px] lg:mb-[6px]">
                    {item.description}
                  </p>

                  {/* Total Chat */}
                  <p className="font-helvetica font-normal text-[#00000060]
                                text-[10px] sm:text-[10px] lg:text-[11px]">
                    Total Chat : {item.totalChat}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Modals ── */}
      {showCreate && (
        <CreateProjectModal
          onClose={() => setShowCreate(false)}
          onCreate={(data) => console.log(data)}
        />
      )}
      {showRename && (
        <RenameModal
          onClose={() => setShowRename(false)}
          onRename={(newTitle) => console.log(newTitle)}
        />
      )}
      {showDelete && (
        <DeleteProjectModal
          onClose={() => setShowDelete(false)}
          onConfirm={() => console.log("deleted")}
        />
      )}
    </>
  );
}