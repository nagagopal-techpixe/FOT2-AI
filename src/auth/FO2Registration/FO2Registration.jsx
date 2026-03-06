import React, { useState } from 'react';
import { Eye, EyeOff, Apple, Chrome, Facebook } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const FO2Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen font-sans">

      {/* ─── LEFT PANEL (desktop only) ─────────────────────────────────── */}
      <div className="hidden lg:flex w-[60%] bg-[#FF4500] flex-col items-center justify-between py-16 px-12 text-white relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7B57] rounded-full blur-[100px] opacity-30"></div>

        {/* THE PHONE CONTAINER */}
        <div className="relative w-[320px] h-[550px] mt-10 z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white/100 via-white/30 to-transparent rounded-[2.5rem] flex items-center justify-center overflow-hidden">
            <span className="font-clarendon mt-[-80px] font-normal text-4xl text-[#5C3D2E] opacity-60 tracking-tighter select-none">
              FO2
            </span>
            <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-white/50 to-transparent"></div>
          </div>

          {/* Side Buttons */}
          <div className="absolute top-32 -left-[2px] w-[4px] h-10 bg-white/60 rounded-l"></div>
          <div className="absolute top-44 -left-[2px] w-[4px] h-16 bg-white/60 rounded-l"></div>
          <div className="absolute top-36 -right-[2px] w-[4px] h-20 bg-white/60 rounded-r"></div>

          {/* Chat Bubbles */}
          <div className="absolute -left-20 top-12 bg-white text-black p-3 rounded-2xl rounded-bl-none shadow-2xl w-[240px] font-helvetica font-normal">
            <p className="font-helvetica text-[13px] leading-tight font-medium">Hi, can you write a cinematic ad script for my brand</p>
          </div>
          <div className="absolute -right-24 top-[58%] bg-white text-black p-3 rounded-2xl rounded-br-none w-[220px] font-helvetica font-normal">
            <p className="font-helvetica text-[13px] leading-tight font-medium">Build a studio-grade realism image prompt.</p>
          </div>
          <div className="absolute -left-10 bottom-20 bg-white text-black p-3 rounded-2xl rounded-bl-none shadow-2xl w-[200px] font-helvetica font-normal">
            <p className="font-helvetica text-[13px] leading-tight font-medium">Design a luxury brand campaign concept.</p>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="text-center z-10">
          <h2 className="font-helvetica font-bold text-[26px] mb-3">Say Hello to FO2.AI</h2>
          <p className="font-helvetica font-normal text-[13px] leading-[20px] tracking-normal max-w-sm">
            Your intelligent prompt partner for images, videos, scripts, branding, and beyond.
            Type your vision, and get high-performance prompts built for next-level AI creation.
          </p>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Registration Form ───────────────────────────────── */}
      <div className="w-full lg:w-[40%] flex items-center justify-center
                      p-4 sm:p-6 md:p-8
                      bg-white">

        <div className="w-full max-w-md">

          {/* ── Logo ── */}
          <div className="text-center">
            <h1 className="font-clarendon font-medium
                           text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px]
                           text-[#FF4500] leading-[10.51px]
                           mb-10 sm:mb-14 md:mb-16 lg:mb-20">
              FO2.AI
            </h1>
          </div>

          {/* ── Heading block ── */}
          <div>
            <h2 className="font-clarendon font-medium
                           text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                           text-center mb-1">
              Create Your FO2.AI Account
            </h2>
            <p className="font-helvetica font-normal
                          text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                          text-center
                          mb-5 sm:mb-6 md:mb-7 lg:mb-8">
              Enter your details below to unlock powerful prompt generation tools.
            </p>

            {/* ── Form ── */}
            <form className="space-y-4 sm:space-y-4 md:space-y-5 lg:space-y-5">

              {/* Email */}
              <div>
                <label className="block font-helvetica
                                  text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                                  font-bold
                                  mb-1 sm:mb-1.5 lg:mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Your active email"
                  className="w-full
                             px-2 py-2 sm:py-2 md:py-2
                             bg-gray-50 border border-gray-200 rounded-[10px]
                             font-helvetica font-normal
                             text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                             leading-[20px] tracking-[0%]
                             placeholder:font-normal
                             placeholder:text-[12px] sm:placeholder:text-[13px] lg:placeholder:text-[14px]
                             placeholder:leading-[20px] placeholder:tracking-[0%]
                             focus:outline-none focus:ring-1 focus:ring-black-500 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-helvetica
                                  text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                                  font-bold
                                  mb-1 sm:mb-1.5 lg:mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    className="w-full
                               px-2 py-2
                               bg-gray-50 border border-gray-200 rounded-[10px]
                               font-helvetica font-normal
                               text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                               leading-[20px] tracking-[0%]
                               placeholder:font-normal
                               placeholder:text-[12px] sm:placeholder:text-[13px] lg:placeholder:text-[14px]
                               placeholder:leading-[20px] placeholder:tracking-[0%]
                               focus:outline-none focus:ring-1 focus:ring-black-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block font-helvetica
                                  text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                                  font-bold
                                  mb-1 sm:mb-1.5 lg:mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    className="w-full
                               px-2 py-2
                               bg-gray-50 border border-gray-200 rounded-[10px]
                               font-helvetica font-normal
                               text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                               leading-[20px] tracking-[0%]
                               placeholder:font-normal
                               placeholder:text-[12px] sm:placeholder:text-[13px] lg:placeholder:text-[14px]
                               placeholder:leading-[20px] placeholder:tracking-[0%]
                               focus:outline-none focus:ring-1 focus:ring-black-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center space-x-2">
               <input
  type="radio"
  className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] lg:w-[21px] lg:h-[21px]
             border-2 border-gray-300 rounded-full
             accent-[#FF4500]
             focus:ring-0 shrink-0"
/>
                <label className="font-helvetica font-normal
                                  text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]">
                  I accept the FO2.AI Terms of Service &amp; Privacy Policy
                </label>
              </div>

              {/* Submit */}
              <button className="w-full
                                 py-2 sm:py-2 md:py-2
                                 bg-[#FF4500] text-white
                                 font-helvetica font-bold
                                 text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]
                                 leading-[20px] tracking-[1px]
                                 rounded-lg hover:bg-orange-600 transition-colors">
                Create Account
              </button>
            </form>

            {/* ── Social Login ── */}
            <div className="mt-6 sm:mt-6 md:mt-7 lg:mt-8">
              <div className="text-center
                              text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                              text-orange-500 font-helvetica font-normal
                              mb-4 sm:mb-4 md:mb-5 lg:mb-5">
                or Login with
              </div>
              <div className="flex justify-center gap-2">
                {/* Apple */}
                <button className="w-[42px] h-[40px] sm:w-[44px] sm:h-[42px] lg:w-[47px] lg:h-[45px]
                                   bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors
                                   flex items-center justify-center">
                  <Apple size={18} className="lg:w-5 lg:h-5" />
                </button>
                {/* Chrome */}
                <button className="w-[42px] h-[40px] sm:w-[44px] sm:h-[42px] lg:w-[47px] lg:h-[45px]
                                   bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors
                                   flex items-center justify-center">
                  <Chrome size={18} className="lg:w-5 lg:h-5" />
                </button>
                {/* Facebook */}
                <button className="w-[42px] h-[40px] sm:w-[44px] sm:h-[42px] lg:w-[47px] lg:h-[45px]
                                   bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors
                                   flex items-center justify-center">
                  <Facebook size={18} className="text-blue-600 lg:w-5 lg:h-5" />
                </button>
              </div>
            </div>

            {/* ── Sign In Link ── */}
            <p
              onClick={() => navigate("/login")}
              className="mt-10 sm:mt-14 md:mt-16 lg:mt-24
                         text-center font-helvetica font-normal
                         text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                         cursor-pointer"
            >
              Already have access?{' '}
              <span className="text-orange-500 font-bold hover:underline">Sign in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FO2Registration;