import React, { useState } from "react";
import { Eye, EyeOff, Apple, Chrome, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess, showError } from "../../utils/toast";
import { DiApple } from "react-icons/di";
import { useAuth } from "../../hooks/useAuth";

const FO2Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    username: "", 
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
if (!form.username) {
  showError("Please enter username");
  return;
}
    if (!form.email) {
      showError("Please enter email");
      return;
    }

    if (!form.password) {
      showError("Please enter password");
      return;
    }

    if (!form.confirmPassword) {
      showError("Please confirm your password");
      return;
    }

    if (form.password !== form.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    if (!form.termsAccepted) {
      showError("Please accept Terms first");
      return;
    }

    try {
      const res = await register({
        username: form.username,
        email: form.email,
        password: form.password,
      });

      showSuccess(res.message);
      navigate("/login");
    } catch (err) {
      showError(err.response?.data?.message || "Something went wrong");
    }
  };
  const validate = () => {
    let newErrors = {};
    if (!form.username) {
  newErrors.username = "Username is required";
} else if (form.username.length < 3) {
  newErrors.username = "Username must be at least 3 characters";
}

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Password must contain 8 characters, 1 uppercase, 1 number and 1 symbol";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  return (
    <div className="flex min-h-screen font-sans">
      <div className="hidden lg:flex w-[60%] bg-[#FF4500] flex-col items-center justify-between py-12 px-12 text-white relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7B57] rounded-full blur-[100px] opacity-30"></div>

        {/* Phone Container */}
        <div className="relative w-[320px] h-[550px] mt-10 z-10">
          {/* Phone Frame */}
          <div className="absolute inset-0 p-[14px] bg-gradient-to-b from-white/80 via-white/30 to-transparent rounded-[2.5rem]">
            <div className="w-full h-full bg-gradient-to-b from-white via-white/30 to-transparent rounded-[2rem] flex items-center justify-center overflow-hidden relative">
              {/* Logo */}
              <span className="font-clarendon mt-[-80px] font-normal text-4xl text-[#5C3D2E] opacity-60 tracking-tighter select-none">
                FO2
              </span>

              {/* Top Fade */}
              <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent"></div>
            </div>
          </div>

          {/* Side Buttons (outside phone frame) */}
          <div className="absolute top-32 -left-[8px] w-[8px] h-10 bg-white/60 rounded-l"></div>
          <div className="absolute top-44 -left-[8px] w-[8px] h-16 bg-white/60 rounded-l"></div>
          <div className="absolute top-36 -right-[8px] w-[8px] h-20 bg-white/60 rounded-r"></div>

          {/* Chat Bubbles */}
          <div className="absolute -left-20 top-12 bg-white text-black p-3 rounded-2xl rounded-bl-none shadow-2xl w-[240px] font-helvetica">
            <p className="text-[13px] leading-tight font-medium">
              Hi, can you write a cinematic ad script for my brand
            </p>
          </div>

          <div className="absolute -right-24 top-[58%] bg-white text-black p-3 rounded-2xl rounded-br-none w-[220px] font-helvetica">
            <p className="text-[13px] leading-tight font-medium">
              Build a studio-grade realism image prompt.
            </p>
          </div>

          <div className="absolute -left-10 bottom-20 bg-white text-black p-3 rounded-2xl rounded-bl-none shadow-2xl w-[200px] font-helvetica">
            <p className="text-[13px] leading-tight font-medium">
              Design a luxury brand campaign concept.
            </p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center z-10">
          <h2 className="font-helvetica font-bold text-[26px] mb-3">
            Say Hello to FO2.AI
          </h2>

          <p className="font-helvetica font-normal text-[13px] leading-[20px] tracking-normal max-w-sm">
            Your intelligent prompt partner for images, videos, scripts,
            branding, and beyond. Type your vision, and get high-performance
            prompts built for next-level AI creation.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Registration Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center ">
            <h1 className="font-clarendon font-medium text-[26px] text-[#FF4500] leading-[10.51px]  mb-20">
              FO2.AI
            </h1>
          </div>
          <div>
            <h2 className="font-clarendon font-medium text-[26px] text-center mb-1">
              Create Your FO2.AI Account
            </h2>
            <p className="font-helvetica  font-normal text-[14px]  text-center mb-8">
              Enter your details below to unlock powerful prompt generation
              tools.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
  <label className="block font-helvetica text-[14px] font-bold mb-1.5">
    Username
  </label>
  <input
    type="text"
    name="username"
    value={form.username}
    onChange={handleChange}
    placeholder="Choose a username"
    className={`w-full px-2 py-2 bg-gray-50 border rounded-[10px]
      ${errors.username ? "border-red-500" : "border-gray-200"}
      font-helvetica font-normal text-[14px]
      focus:outline-none focus:ring-1 focus:ring-black transition-all`}
  />
  {errors.username && (
    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
  )}
</div>
              {/* Email Field */}
              <div>
                <label className="block font-helvetica text-[14px] font-bold mb-1.5">
                  Email Address
                </label>{" "}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your active email"
                  className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-[10px]
             font-helvetica font-normal text-[14px] leading-[20px] tracking-[0%]
             placeholder-helvetica placeholder:font-normal placeholder:text-[14px] placeholder:leading-[20px] placeholder:tracking-[0%]
             focus:outline-none focus:ring-1 focus:ring-black-500 transition-all"
                />
                
              </div>

              {/* Password Field */}
              <div>
                <label className="block font-helvetica text-[14px] font-bold mb-1.5">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a secure password"
                    className={`w-full px-2 py-2 bg-gray-50 border rounded-[10px]
      ${errors?.password ? "border-red-500" : "border-gray-200"}
      font-helvetica text-[14px]
      focus:outline-none focus:ring-1 focus:ring-black transition-all`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* error message OUTSIDE relative div */}
                {errors?.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block font-helvetica text-[14px] font-bold mb-1.5">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-2 py-2 bg-gray-50 border rounded-[10px]
  ${errors.confirmPassword ? "border-red-500" : "border-gray-200"}
  focus:outline-none focus:ring-1 focus:ring-black transition-all`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="termsAccepted"
                  checked={form.termsAccepted}
                  onChange={handleChange}
                  className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] lg:w-[21px] lg:h-[21px]
             border-2 border-gray-300 rounded-full
             accent-[#FF4500]
             focus:ring-0 shrink-0"
                />
                <label className="font-helvetica font-normal text-[14px]">
                  I accept the FO2.AI Terms of Service & Privacy Policy
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-[#FF4500] text-white font-helvetica font-bold text-[14px] leading-[20px] tracking-[1px] rounded-lg hover:bg-orange-600 transition-colors"
              >
                Create Account
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-8">
              <div className="text-center text-[14px] text-orange-500 font-helvetica font-normal mb-5 ">
                or Login with
              </div>
              <div className="flex justify-center gap-2">
                {/* Apple Button */}
                <button className="w-[47px] h-[45px] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  {/* <Apple size={20} /> */}
                  <DiApple size={22} />
                </button>

                {/* Chrome Button */}
                <button  onClick={() => window.location.href = "https://fotwo.bizmailo.com/api/auth/google"} className="w-[47px] h-[45px] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                    alt="google"
                    className="w-8 h-8"
                  />
                </button>

                {/* Facebook Button */}

                <button className="w-[47px] h-[45px] bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <img
                    src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                    alt="Facebook"
                    className="w-8 h-8"
                  />
                </button>
              </div>
            </div>

            <p
              onClick={() => navigate("/login")}
              className="mt-24 text-center font-helvetica font-normal text-[14px]"
            >
              Already have access?{" "}
              <span className="text-orange-500 font-bold cursor-pointer hover:underline">
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FO2Registration;
