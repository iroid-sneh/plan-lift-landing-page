import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    const sanitizedValue = value.replace(/\D/g, "");
    if (sanitizedValue.length > 1) return;

    const newCode = [...code];
    newCode[index] = sanitizedValue;
    setCode(newCode);

    // Move to next input
    if (sanitizedValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      console.log("Verification code:", verificationCode);
    }
    navigate("/complete-profile");
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex items-center justify-center p-4 md:p-10 relative overflow-hidden font-satoshi">
      {/* Background Decorative Dashed Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[1000px] h-[1000px]">
          <div className="absolute inset-0 rounded-full border border-dashed border-gray-300" />
          <div className="absolute inset-[120px] rounded-full border border-dashed border-gray-300" />
        </div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-[1240px] bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.05)] overflow-hidden relative z-10">
        <div className="flex flex-col lg:flex-row min-h-[650px]">
          {/* Left Side - Form Container */}
          <div className="w-full lg:w-[45%] p-8 md:p-16 lg:pl-20 lg:pr-10 flex flex-col justify-center">
            {/* Logo - Removed shadow box wrapper for a cleaner look */}
            <div className="mb-8">
              <img
                src="/logo.png"
                alt="Planlift Logo"
                className="w-[84px] h-[84px] object-contain rounded-[20px]"
              />
            </div>

            {/* Typography */}
            <h1 className="text-[32px] sm:text-[36px] font-bold text-[#1D2939] mb-2 tracking-tight">
              Enter Verification Code
            </h1>
            {/* Removed max-w to prevent the phone number from wrapping unnecesarily */}
            <p className="text-[15px] sm:text-[16px] text-[#667085] mb-10">
              We've sent a 6-digit code to{" "}
              <span className="text-[#1D2939] font-semibold">
                +91 98989 XXXXX
              </span>
            </p>

            {/* Form Area - Fixed max width to align elements nicely */}
            <div className="w-full max-w-[380px]">
              {/* Label */}
              <label className="block text-[14px] font-medium text-[#344054] mb-3">
                Enter the Code<span className="text-red-500 ml-1">*</span>
              </label>

              {/* OTP Inputs */}
              <div className="flex justify-between gap-2 sm:gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] text-center text-[22px] font-semibold border border-[#D0D5DD] rounded-[12px] bg-white text-[#1D2939] focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700] transition-all shadow-sm"
                  />
                ))}
              </div>

              {/* Resend Code - Centered horizontally */}
              <div className="flex items-center justify-center gap-1 mt-6 mb-8">
                <button
                  onClick={handleResend}
                  disabled={timer > 0}
                  className={`text-[14px] ${
                    timer > 0
                      ? "text-[#667085] cursor-not-allowed"
                      : "text-[#1D2939] font-medium hover:underline"
                  }`}
                >
                  Resend Code
                </button>
                {timer > 0 && (
                  <span className="text-[14px] font-semibold text-[#1D2939]">
                    {formatTime(timer)}
                  </span>
                )}
              </div>

              {/* Verify Button - Removed shadow, tweaked hover color */}
              <button
                onClick={handleVerify}
                disabled={code.some((d) => !d)}
                className="w-full h-[52px] bg-[#FFC700] hover:bg-[#F2BD00] disabled:bg-[#FFC700]/60 disabled:cursor-not-allowed rounded-full text-[16px] font-bold text-[#1D2939] transition-all active:scale-[0.98]"
              >
                Verify & Continue
              </button>
            </div>
          </div>

          {/* Right Side - Illustration Container */}
          {/* Switched to absolute inset + object-cover to ensure it perfectly fills the container to the edges */}
          <div className="hidden lg:block lg:w-1/2 relative bg-white overflow-hidden">
            <img
              src="/VerificationImg.png"
              alt="Verification Illustration"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
