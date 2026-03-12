import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { showError, showSuccess } from "../../utils/toast";
import { Eye, EyeOff } from "lucide-react";

export default function SetNewPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();
  const [errors, setErrors] = useState({});

  const email = location.state?.email;
  const resetToken = location.state?.resetToken;
  // console.log("location.state:", location.state);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);           // 👁️ NEW
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👁️ NEW

  const handleSubmit = async () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

    let newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must contain 8 characters, 1 uppercase and 1 symbol";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      await resetPassword({ email, password, resetToken });
      showSuccess("Password updated successfully");
      navigate("/password-success");
    } catch (err) {
      showError(err?.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F54900] px-4 sm:px-6 md:px-8">
    <div
  className="bg-white rounded-[14px] shadow-lg
             w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
             px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-7 lg:px-12 lg:py-8"
>
        <h1
          className="text-center font-clarendon font-medium
                     text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px] mb-1"
        >
          Set a New Password
        </h1>

        <p
          className="text-center font-normal font-helvetica
                     text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                     mb-3 sm:mb-3 md:mb-4 lg:mb-4"
        >
          Create a secure password for your account. If needed, you can
          <br />
          restart the recovery process anytime.
        </p>

        {/* New Password */}
        <div className="mb-4 sm:mb-5 lg:mb-6">
          <label
            className="block font-helvetica font-bold
                       text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] mb-1"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}   // 👁️
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3
                         bg-[#00000008] border border-[#0000001A] rounded-[10px]
                         font-helvetica
                         text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                         focus:outline-none focus:ring-1 focus:ring-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-[12px] mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-5 sm:mb-6 md:mb-7 lg:mb-8">
          <label
            className="block font-helvetica font-bold
                       text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px] mb-1"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}   // 👁️
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 lg:px-4 lg:py-3
                         bg-[#00000008] border border-[#0000001A] rounded-[10px]
                         font-helvetica
                         text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                         focus:outline-none focus:ring-1 focus:ring-black pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-[12px] mt-0">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-[#F54900] text-white rounded-[10px]
                     font-helvetica font-bold
                     text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]
                     tracking-[1px]"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}