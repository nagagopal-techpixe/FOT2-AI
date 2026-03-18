import { X, ImagePlus } from "lucide-react";
import { useState, useRef } from "react";

export default function CreateProjectModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;
    setLoading(true);
    await onCreate({ title, description, image });
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50
                    px-4 sm:px-6">
      <div className="bg-white rounded-[8px]
                      w-full sm:w-[440px] md:w-[490px] lg:w-[535px]
                      overflow-hidden shadow-[0px_8px_40px_rgba(0,0,0,0.10)]">

        {/* Header */}
        <div className="relative flex items-center justify-center
                        px-[16px] py-[14px] sm:px-[22px] sm:py-[16px] lg:px-[28px] lg:py-[20px]">
          <h2 className="font-clarendon font-medium text-black
                         text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]">
            Create New Project
          </h2>
          <button
            onClick={onClose}
            className="absolute right-[16px] sm:right-[22px] lg:right-[28px]
                       w-[20px] h-[20px] lg:w-[22px] lg:h-[22px]
                       flex items-center justify-center rounded-full
                       border-[1.5px] border-black
                       hover:bg-[#F7F7F7] transition-colors"
          >
            <X size={12} className="lg:w-[14px] lg:h-[14px]" />
          </button>
        </div>

        <hr className="border-0 h-[1px] bg-[#00000026]" />

        {/* Body */}
        <div className="flex flex-col
                        px-[16px] py-[16px] gap-[10px]
                        sm:px-[22px] sm:py-[20px] sm:gap-[11px]
                        lg:px-[28px] lg:py-[24px] lg:gap-[12px]">

          {/* Drag & Drop / Image Upload */}
          <div
            onClick={() => fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="bg-[#FF44000F] border border-dashed border-[#E8430A]/40 rounded-[14px]
                        h-[120px] sm:h-[140px] lg:h-[160px]
                        flex flex-col items-center justify-center
                        gap-[8px] sm:gap-[10px] lg:gap-[12px]
                        cursor-pointer hover:bg-[#FFF0EB] transition-colors overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <>
                <div className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] lg:w-[48px] lg:h-[48px]
                                bg-white border border-[#E8430A]/30 rounded-[12px]
                                flex items-center justify-center">
                  <ImagePlus
                    size={18}
                    className="text-[#E8430A] sm:w-[20px] sm:h-[20px] lg:w-[22px] lg:h-[22px]"
                    strokeWidth={1.5}
                  />
                </div>
                <p className="font-helvetica font-normal text-[#0000004D] text-center leading-[20px]
                              text-[11px] sm:text-[12px] lg:text-[14px]">
                  Drag & Drop your image here,<br />or click to browse
                </p>
              </>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Project Title */}
          <div className="flex flex-col gap-[6px] sm:gap-[7px] lg:gap-[8px]">
            <label className="font-helvetica font-medium text-black
                              text-[12px] sm:text-[13px] lg:text-[14px]">
              Project Title
            </label>
            <input
              type="text"
              placeholder="Enter your title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-[38px] sm:h-[40px] lg:h-[44px]
                         bg-[#FF44000F] border-0 rounded-[10px]
                         px-[12px] lg:px-[14px]
                         outline-none font-helvetica font-normal text-black
                         text-[12px] sm:text-[13px] lg:text-[14px]
                         placeholder:text-[#00000040]"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-[6px] sm:gap-[7px] lg:gap-[8px]">
            <label className="font-helvetica font-medium text-black
                              text-[12px] sm:text-[13px] lg:text-[14px]">
              Description
            </label>
            <textarea
              placeholder="Enter your Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-[90px] sm:h-[100px] lg:h-[112px]
                         bg-[#FFF5F2] border-0 rounded-[10px]
                         px-[12px] py-[10px] lg:px-[14px] lg:py-[12px]
                         outline-none font-helvetica font-normal text-black
                         text-[12px] sm:text-[13px] lg:text-[14px]
                         placeholder:text-[#00000040] resize-none"
            />
          </div>

          {/* Create Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!title.trim() || loading}
              className="h-[32px] sm:h-[34px] lg:h-[36px]
                         px-[32px] sm:px-[40px] lg:px-[48px]
                         bg-[#FF4400] hover:bg-[#d13c08] transition-colors
                         text-white font-helvetica font-bold rounded-[10px]
                         text-[12px] sm:text-[13px] lg:text-[14px]
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}