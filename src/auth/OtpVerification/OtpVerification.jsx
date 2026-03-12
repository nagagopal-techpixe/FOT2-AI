import { useNavigate,useLocation  } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOtp } = useAuth();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

const handleSubmit = async () => {
  const code = otp.join("");

  try {
    const res = await verifyOtp({   // ✅ capture the response
      email,
      otp: code
    });

    navigate("/set-new-password", {
      state: { 
        email,
        resetToken: res.resetToken   // ✅ pass the token
      }
    });

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F54900]
                    px-4 sm:px-6 md:px-8">

      {/* Card */}
      <div className="bg-white rounded-[14px] shadow-lg text-center
                      w-full sm:w-[480px] md:w-[540px] lg:w-[597px]
                      h-auto lg:h-[365px]
                      px-5 py-6 sm:px-8 sm:py-7 md:px-10 md:py-7 lg:px-12 lg:py-8">

        {/* Title */}
        <h1 className="font-clarendon font-medium
                       text-[18px] sm:text-[20px] md:text-[22px] lg:text-[26px]
                       mb-1">
          OTP Code Verification
        </h1>

        {/* Subtitle */}
        <p className="font-helvetica font-normal leading-[20px]
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                      mb-5 sm:mb-6 lg:mb-8">
          We've sent a 4-digit verification code to your email.
          <br />
          Enter the code below to confirm your identity.
        </p>

        {/* OTP Boxes */}
      <div className="flex justify-center gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-[56px] h-[56px] text-center text-[24px]
                         bg-[#00000008] border border-[#0000001A]
                         rounded-[12px] focus:outline-none"
            />
          ))}
        </div>

        {/* Resend Text */}
        <p className="font-helvetica
                      text-[12px] sm:text-[13px] md:text-[13px] lg:text-[14px]
                      mb-4 sm:mb-5 lg:mb-6">
          Didn't receive the email?
          <br />
          You can request a new code in 21 seconds.
        </p>

        {/* Button */}
        <button
        onClick={handleSubmit}
          className="w-full py-2
                     bg-[#F54900] text-white rounded-[10px]
                     font-helvetica font-bold
                     text-[13px] sm:text-[13px] md:text-[14px] lg:text-[14px]
                     tracking-[1px]"
        >
          Submit Code
        </button>

      </div>
    </div>
  );
}