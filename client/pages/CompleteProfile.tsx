import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { apiFetch, getErrorMessage } from "@/lib/api";
import { getVerifiedUser, setUser, clearVerifiedUser, UserProfile } from "@/lib/auth";

type ProfileUpdateResponse = {
  success: boolean;
  message: string;
  data: UserProfile;
};

export default function CompleteProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    countryCode: "+91",
  });

  const verified = getVerifiedUser();

  useEffect(() => {
    if (!verified) {
      if (localStorage.getItem("planlark.auth")) {
        // If already logged in, maybe redirect to home? 
        // For now, if no verified user context, go to create account
        navigate("/", { replace: true });
      } else {
        navigate("/create-account", { replace: true });
      }
      return;
    }
    setFormData(prev => ({
      ...prev,
      mobile: verified.phone_number,
      countryCode: verified.country_code
    }));
  }, [verified, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !profileImage) {
      setError("All fields including profile picture are required.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const body = new FormData();
      body.append("profile", profileImage);
      body.append("full_name", formData.fullName);
      body.append("email", formData.email);

      const res = await apiFetch<ProfileUpdateResponse>("/user/info-update", {
        method: "POST",
        body,
      });

      setUser(res.data);
      clearVerifiedUser();
      navigate("/", { replace: true });
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col relative overflow-hidden font-satoshi">
      <Navbar hideAuthButtons />
      <main className="flex-1 flex items-center justify-center p-4 md:p-10 w-full relative z-10">
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
              {/* Typography */}
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#1D2939] mb-8 leading-tight tracking-tight">
                Complete Your Profile
              </h1>

              {/* Form Area - max width updated to match CreateAccount inputs */}
              <div className="w-full max-w-[400px]">
                {/* Avatar Upload UI */}
                <div
                  className="relative w-[88px] h-[88px] mb-8 group cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />

                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover border-2 border-gray-100"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-[#EAEAEA] overflow-hidden flex items-end justify-center relative">
                      <div className="absolute top-[18px] w-[34px] h-[34px] rounded-full bg-[#9CA3AF]"></div>
                      <div className="w-[74px] h-[30px] rounded-t-full bg-[#9CA3AF]"></div>
                    </div>
                  )}

                  {/* Plus Button */}
                  <div className="absolute bottom-0 right-0 w-7 h-7 bg-[#344054] rounded-full border-[2px] border-white flex items-center justify-center text-white group-hover:bg-[#1D2939] transition-colors shadow-sm">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <path d="M6 2v8M2 6h8" />
                    </svg>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Full Name Input */}
                  <div>
                    <label className="block text-[15px] font-bold text-[#1D2939] mb-2">
                      Full Name<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your Name"
                      className="w-full h-[52px] border border-gray-200 rounded-xl px-4 text-base text-[#1D2939] placeholder:text-gray-300 focus:outline-none focus:border-[#FFC700] transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block text-[15px] font-bold text-[#1D2939] mb-2">
                      Email<span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      className="w-full h-[52px] border border-gray-200 rounded-xl px-4 text-base text-[#1D2939] placeholder:text-gray-300 focus:outline-none focus:border-[#FFC700] transition-all"
                    />
                  </div>

                  {/* Mobile Number Input Group - Pre-filled and Read-only */}
                  <div>
                    <label className="block text-[15px] font-bold text-[#1D2939] mb-2">
                      Mobile Number<span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="flex gap-3 h-[52px]">
                      <div className="w-[70px] flex items-center justify-center border border-gray-200 rounded-xl bg-gray-50 text-[#667085] font-medium text-base">
                        {formData.countryCode}
                      </div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        readOnly
                        className="flex-1 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-[#667085] focus:outline-none cursor-not-allowed"
                        placeholder="Enter mobile number"
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}

                  {/* Verify & Continue Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full h-[52px] mt-2 bg-[#FFC700] hover:bg-[#E6B400] disabled:bg-[#FFC700]/60 disabled:cursor-not-allowed rounded-full text-[17px] font-bold text-[#1D2939] transition-all transform active:scale-[0.98] shadow-md"
                  >
                    {isSubmitting ? "Updating..." : "Verify & Continue"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Illustration Container matched to CreateAccount */}
            <div className="w-full lg:w-[55%] bg-white flex items-end justify-center lg:items-center overflow-hidden">
              <div className="relative w-full h-full lg:p-0">
                <img
                  src="/CompleteProfileImg.png"
                  alt="Profile Setup Illustration"
                  className="w-full h-full object-contain object-center scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
