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
      // Handle verification logic here
      console.log("Verification code:", verificationCode);
    }
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
            
            {/* Logo Wrapper */}
            <div className="w-[100px] h-[100px] bg-[#FFC700] rounded-[24px] flex items-center justify-center mb-8 shadow-sm">
              <img
                src="/logo.png"
                alt="Planlift Logo"
                className="w-14 h-14 object-contain"
              />
            </div>

            {/* Typography */}
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#1D2939] mb-3 leading-tight tracking-tight">
               Enter Verification Code
            </h1>
            <p className="text-base text-[#667085] mb-8 leading-relaxed max-w-[340px]">
               We've sent a 6-digit code to <span className="text-[#1D2939] font-bold">+91 98989 XXXXX</span>
            </p>

            {/* Form */}
            <div className="space-y-6 max-w-[400px]">
                {/* OTP Inputs */}
                <div>
                  <label className="block text-[15px] font-bold text-[#1D2939] mb-2">
                    Enter the Code<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-2 justify-between">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="tel"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-[48px] h-[48px] sm:w-[52px] sm:h-[52px] text-center text-xl sm:text-2xl font-bold border border-gray-200 rounded-xl bg-white text-[#1D2939] focus:outline-none focus:border-[#FFC700] transition-all focus:ring-4 focus:ring-[#FFC700]/10 placeholder-transparent"
                      />
                    ))}
                  </div>
                </div>

                 {/* Resend Code */}
                <div className="flex items-center justify-start gap-1">
                   <button
                     onClick={handleResend}
                     disabled={timer > 0}
                     className={`text-sm font-medium ${
                       timer > 0
                         ? "text-[#667085] cursor-not-allowed"
                         : "text-[#1D2939] hover:underline"
                     }`}
                   >
                     Resend Code
                   </button>
                   {timer > 0 && (
                       <span className="text-sm font-medium text-[#1D2939]">
                         {formatTime(timer)}
                       </span>
                   )}
                </div>

                {/* Verify Button */}
                <button
                  onClick={handleVerify}
                  disabled={code.some((d) => !d)}
                  className="w-full h-[52px] bg-[#FFC700] hover:bg-[#E6B400] disabled:bg-[#FFC700]/50 disabled:cursor-not-allowed rounded-full text-[17px] font-bold text-[#1D2939] transition-all transform active:scale-[0.98] shadow-md"
                >
                  Verify & Continue
                </button>
            </div>
          </div>

          {/* Right Side - Illustration Container */}
          <div className="w-full lg:w-[55%] bg-white flex items-end justify-center lg:items-center overflow-hidden">
            <div className="relative w-full h-full lg:p-0">
               <img 
                 src="/VerificationImg.png" 
                 alt="Verification Illustration" 
                 className="w-full h-full object-contain object-center scale-105" 
               />
               
               {/* Top Accent Bar */}
               <div className="absolute top-0 right-10 w-20 h-2 bg-[#FFC700] rounded-b-lg" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
