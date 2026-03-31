import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, getErrorMessage } from "@/lib/api";
import { setPendingOtpContext } from "@/lib/auth";
import Navbar from "@/components/Navbar";

const countryCodes = [
  { code: "+1", country: "USA", flag: "🇺🇸", maxDigits: 10 },
  { code: "+91", country: "India", flag: "🇮🇳", maxDigits: 10 },
  { code: "+1", country: "Canada", flag: "🇨🇦", maxDigits: 10 },
  { code: "+44", country: "UK", flag: "🇬🇧", maxDigits: 10 },
  { code: "+61", country: "Australia", flag: "🇦🇺", maxDigits: 9 },
  { code: "+971", country: "UAE", flag: "🇦🇪", maxDigits: 9 },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", maxDigits: 9 },
  { code: "+65", country: "Singapore", flag: "🇸🇬", maxDigits: 8 },
  { code: "+49", country: "Germany", flag: "🇩🇪", maxDigits: 11 },
  { code: "+33", country: "France", flag: "🇫🇷", maxDigits: 9 },
  { code: "+81", country: "Japan", flag: "🇯🇵", maxDigits: 10 },
  { code: "+86", country: "China", flag: "🇨🇳", maxDigits: 11 },
  { code: "+55", country: "Brazil", flag: "🇧🇷", maxDigits: 11 },
  { code: "+27", country: "South Africa", flag: "🇿🇦", maxDigits: 9 },
  { code: "+234", country: "Nigeria", flag: "🇳🇬", maxDigits: 10 },
  { code: "+254", country: "Kenya", flag: "🇰🇪", maxDigits: 9 },
  { code: "+60", country: "Malaysia", flag: "🇲🇾", maxDigits: 10 },
  { code: "+63", country: "Philippines", flag: "🇵🇭", maxDigits: 10 },
  { code: "+82", country: "South Korea", flag: "🇰🇷", maxDigits: 10 },
  { code: "+39", country: "Italy", flag: "🇮🇹", maxDigits: 10 },
  { code: "+34", country: "Spain", flag: "🇪🇸", maxDigits: 9 },
  { code: "+7", country: "Russia", flag: "🇷🇺", maxDigits: 10 },
  { code: "+52", country: "Mexico", flag: "🇲🇽", maxDigits: 10 },
  { code: "+62", country: "Indonesia", flag: "🇮🇩", maxDigits: 12 },
  { code: "+90", country: "Turkey", flag: "🇹🇷", maxDigits: 10 },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩", maxDigits: 10 },
  { code: "+92", country: "Pakistan", flag: "🇵🇰", maxDigits: 10 },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰", maxDigits: 9 },
  { code: "+977", country: "Nepal", flag: "🇳🇵", maxDigits: 10 },
];

export default function CreateAccount() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showDropdown]);

  const filteredCountries = countryCodes.filter(
    (c) =>
      c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.includes(searchQuery)
  );

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= selectedCountry.maxDigits) {
      setPhoneNumber(value);
      if (error) setError("");
    }
  };

  const handleSelectCountry = (country: typeof countryCodes[0]) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchQuery("");
    setPhoneNumber("");
    setError("");
  };

  const handleContinue = async () => {
    if (phoneNumber.length !== selectedCountry.maxDigits) {
      setError(`Please enter a valid ${selectedCountry.maxDigits}-digit mobile number.`);
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
          country_code: selectedCountry.code,
          phone_number: phoneNumber,
          type: isLoginView ? 2 : 1,
        },
      });

      setPendingOtpContext({
        country_code: selectedCountry.code,
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
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col relative overflow-hidden font-satoshi">
      <Navbar hideAuthButtons />
      <main className="flex-1 flex items-center justify-center px-4 py-4 md:p-10 w-full relative z-10">
        {/* Background Decorative Dashed Circles - hidden on small mobile */}
        <div className="absolute inset-0 hidden sm:flex items-center justify-center pointer-events-none">
          <div className="relative w-[1000px] h-[1000px]">
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-300" />
            <div className="absolute inset-[120px] rounded-full border border-dashed border-gray-300" />
          </div>
        </div>

        {/* Main Card */}
        <div className="w-full max-w-[1240px] bg-white rounded-[20px] md:rounded-[40px] border border-gray-100 shadow-[0_10px_50px_rgba(0,0,0,0.05)] overflow-hidden relative z-10">
          <div className="flex flex-col lg:flex-row lg:min-h-[650px]">
            {/* Left Side - Form Container */}
            <div className="w-full lg:w-[45%] px-5 py-5 md:p-16 lg:pl-20 lg:pr-10 flex flex-col justify-center">
              {/* Logo Wrapper */}
              <div className="w-[56px] h-[56px] sm:w-[72px] sm:h-[72px] md:w-[100px] md:h-[100px] flex items-center justify-center mb-3 sm:mb-5 md:mb-8 shadow-sm">
                <img
                  src="/logo.png"
                  alt="Planlift Logo"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain"
                />
              </div>

              {/* Dynamic Typography based on Login/Register state */}
              <h1 className="text-[22px] sm:text-[24px] md:text-[40px] font-bold text-[#1D2939] mb-1 sm:mb-2 md:mb-3 leading-tight tracking-tight">
                {isLoginView ? "Welcome Back!" : "Create an Account"}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-[#667085] mb-4 sm:mb-5 md:mb-8 leading-relaxed max-w-[340px]">
                {isLoginView
                  ? "Enter your mobile number to continue"
                  : "Sign up and start organizing shared tasks with friends today"}
              </p>

              {/* Input Form */}
              <div className="space-y-4 md:space-y-5 w-full md:max-w-[400px]">
                <div>
                  <label className="block text-sm md:text-[15px] font-bold text-[#1D2939] mb-2">
                    Mobile Number<span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-2 sm:gap-3 h-[44px] sm:h-[48px] md:h-[52px]">
                    {/* Country Code Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                      <button
                        type="button"
                        ref={triggerRef}
                        onClick={() => {
                          if (!showDropdown && triggerRef.current) {
                            const rect = triggerRef.current.getBoundingClientRect();
                            setDropdownPos({ top: rect.bottom + 4, left: rect.left });
                          }
                          setShowDropdown(!showDropdown);
                        }}
                        className={`w-[88px] sm:w-[100px] h-full flex items-center justify-center gap-1 sm:gap-1.5 border ${showDropdown ? "border-[#FFC700]" : "border-gray-200"} rounded-xl bg-white text-[#667085] font-medium text-sm sm:text-base hover:border-[#FFC700] transition-all cursor-pointer`}
                      >
                        <span className="text-lg">{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <svg className={`w-3.5 h-3.5 transition-transform ${showDropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {showDropdown && (
                        <div
                          style={{ top: dropdownPos.top, left: dropdownPos.left }}
                          className="fixed w-[260px] bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                          {/* Search */}
                          <div className="p-2 border-b border-gray-100">
                            <input
                              ref={searchInputRef}
                              type="text"
                              placeholder="Search country..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#FFC700] placeholder:text-gray-300"
                            />
                          </div>
                          {/* Country List */}
                          <div className="max-h-[200px] overflow-y-auto">
                            {filteredCountries.length === 0 ? (
                              <div className="px-4 py-3 text-sm text-gray-400 text-center">No results</div>
                            ) : (
                              filteredCountries.map((c, i) => (
                                <button
                                  key={`${c.code}-${c.country}-${i}`}
                                  type="button"
                                  onClick={() => handleSelectCountry(c)}
                                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-[#FFF8E1] transition-colors cursor-pointer ${
                                    selectedCountry.code === c.code && selectedCountry.country === c.country
                                      ? "bg-[#FFF8E1] font-semibold"
                                      : ""
                                  }`}
                                >
                                  <span className="text-lg">{c.flag}</span>
                                  <span className="text-[#1D2939] flex-1 text-left">{c.country}</span>
                                  <span className="text-[#667085]">{c.code}</span>
                                </button>
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Phone Input */}
                    <input
                      type="tel"
                      placeholder={`${"9".repeat(selectedCountry.maxDigits)}`}
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className={`flex-1 min-w-0 px-3 sm:px-4 border ${error ? "border-red-400" : "border-gray-200"} rounded-xl bg-white text-sm sm:text-base text-[#1D2939] placeholder:text-gray-300 focus:outline-none focus:border-[#FFC700] transition-all`}
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
                      <a
                        href="https://dev.iroidsolutions.com:4002/docs/Planlark_Terms_of_Service.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FFC700] font-semibold hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                )}

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={
                    isSubmitting ||
                    (isLoginView
                      ? phoneNumber.length !== selectedCountry.maxDigits
                      : !agreed || phoneNumber.length !== selectedCountry.maxDigits)
                  }
                  className="w-full h-[44px] sm:h-[48px] md:h-[52px] bg-[#FFC700] hover:bg-[#E6B400] disabled:bg-[#FFC700]/50 disabled:cursor-not-allowed rounded-full text-sm sm:text-[15px] md:text-[17px] font-bold text-[#1D2939] transition-all transform active:scale-[0.98] shadow-md"
                >
                  {isSubmitting ? "Sending OTP..." : "Continue"}
                </button>

                {/* Dynamic Footer Links */}
                <p className="text-center text-sm md:text-[15px] text-[#667085] mt-3 md:mt-4">
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

            {/* Right Side - Illustration Container (hidden on mobile) */}
            <div className="hidden lg:flex w-full lg:w-[55%] bg-white items-center justify-center overflow-hidden">
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
      </main>
    </div>
  );
}
