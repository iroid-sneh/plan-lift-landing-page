import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, getErrorMessage } from "@/lib/api";
import { setPendingOtpContext } from "@/lib/auth";

export default function CreateAccount() {
  const [isLoginView, setIsLoginView] = useState(false); // Added state to toggle Login/Register
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Validation: Only allow numbers and max 10 digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric
    if (value.length <= 10) {
      setPhoneNumber(value);
      if (value.length === 10) setError("");
    }
  };

  const handleContinue = async () => {
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    // Only require agreement if we are in the Register view
    if (!isLoginView && !agreed) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      await apiFetch<{ success: boolean; message: string }>("/send-otp", {
        method: "POST",
        auth: false,
        body: {
          country_code: "+91",
          phone_number: phoneNumber,
          type: isLoginView ? 2 : 1,
        },
      });

      setPendingOtpContext({
        country_code: "+91",
        phone_number: phoneNumber,
        flowType: isLoginView ? "login" : "register",
      });

      navigate("/verification");
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
    setError(""); // Reset errors on switch
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
            <div className="w-[100px] h-[100px] flex items-center justify-center mb-8 shadow-sm">
              <img
                src="/logo.png"
                alt="Planlift Logo"
                className="w-24 h-24 object-contain"
              />
            </div>

            {/* Dynamic Typography based on Login/Register state */}
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#1D2939] mb-3 leading-tight tracking-tight">
              {isLoginView ? "Welcome Back!" : "Create an Account"}
            </h1>
            <p className="text-base text-[#667085] mb-8 leading-relaxed max-w-[340px]">
              {isLoginView
                ? "Enter your mobile number to continue"
                : "Sign up and start organizing shared tasks with friends today"}
            </p>

            {/* Input Form */}
            <div className="space-y-5 max-w-[400px]">
              <div>
                <label className="block text-[15px] font-bold text-[#1D2939] mb-2">
                  Mobile Number<span className="text-red-500 ml-1">*</span>
                </label>
                <div className="flex gap-3 h-[52px]">
                  {/* Static Country Code Box */}
                  <div className="w-[70px] flex items-center justify-center border border-gray-200 rounded-xl bg-white text-[#667085] font-medium text-base">
                    +91
                  </div>
                  {/* Phone Input */}
                  <input
                    type="tel"
                    placeholder="99999 67676"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    className={`flex-1 px-4 border ${error ? "border-red-400" : "border-gray-200"} rounded-xl bg-white text-base text-[#1D2939] placeholder:text-gray-300 focus:outline-none focus:border-[#FFC700] transition-all`}
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>
                )}
              </div>

              {/* Terms Checkbox - Hidden during Login view */}
              {!isLoginView && (
                <div className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 accent-[#FFC700] cursor-pointer"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-[#667085] cursor-pointer select-none"
                  >
                    By signing up, you agree to our{" "}
                    <button className="text-[#FFC700] font-semibold hover:underline">
                      Terms and Conditions
                    </button>
                  </label>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={
                  isSubmitting ||
                  (isLoginView
                    ? phoneNumber.length < 10
                    : !agreed || phoneNumber.length < 10)
                }
                className="w-full h-[52px] bg-[#FFC700] hover:bg-[#E6B400] disabled:bg-[#FFC700]/50 disabled:cursor-not-allowed rounded-full text-[17px] font-bold text-[#1D2939] transition-all transform active:scale-[0.98] shadow-md"
              >
                {isSubmitting ? "Sending OTP..." : "Continue"}
              </button>

              {/* Dynamic Footer Links */}
              <p className="text-center text-[15px] text-[#667085] mt-4">
                {isLoginView
                  ? "Don't have an Account? "
                  : "Already have an account? "}
                <button
                  onClick={toggleView}
                  className="text-[#1D2939] font-bold hover:underline"
                >
                  {isLoginView ? "Register" : "Log in"}
                </button>
              </p>
            </div>
          </div>

          {/* Right Side - Illustration Container (Left Exactly As Is) */}
          <div className="w-full lg:w-[55%] bg-white flex items-end justify-center lg:items-center overflow-hidden">
            <div className="relative w-full h-full lg:p-0">
              <img
                src="/CreateAccountImg.png"
                alt="Illustration"
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
