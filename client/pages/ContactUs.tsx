import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, getErrorMessage } from "@/lib/api";
import Navbar from "@/components/Navbar";

const subjectOptions = [
  "General Question",
  "Billing Support",
  "Technical Issue",
  "Partnership",
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Question",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const subjectDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close subject dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(e.target as Node)) {
        setShowSubjectDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) errors.message = "Message is required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      const res = await apiFetch<{
        success: boolean;
        message: string;
        data: {
          id: string;
          full_name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string;
        };
      }>("/contact", {
        method: "POST",
        auth: false,
        body: {
          full_name: formData.fullName.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        },
      });

      setSuccessMessage(
        res.message || "Contact request submitted successfully.",
      );

      setFormData({
        fullName: "",
        email: "",
        subject: "General Question",
        message: "",
      });

      window.setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-satoshi flex flex-col">
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center pt-8 md:pt-16 pb-12 md:pb-24 px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-12 flex flex-col items-center">
          {/* Small Pill Badge */}
          <div className="inline-flex items-center justify-center px-5 py-1.5 border border-[#2828271A] rounded-full mb-2">
            <span className="text-[13px] font-medium text-[#28282799]">
              Contact Us
            </span>
          </div>

          <h1 className="text-[28px] md:text-[54px] font-bold text-[#1D2939] mb-2 tracking-tight">
            Have A Question?
          </h1>

          <p className="text-sm md:text-[17px] text-[#667085] max-w-xl mx-auto leading-relaxed">
            We're Here To Help. Send Us A Message And We'll Get Back To You
            Soon.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-[700px] bg-white rounded-[24px] sm:rounded-[40px] p-6 sm:p-12 lg:p-[56px] border border-gray-100 shadow-[0_10px_60px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm md:text-[15px] font-medium text-[#1D2939] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John doe"
                className={`w-full h-[48px] md:h-[52px] border ${fieldErrors.fullName ? "border-red-400" : "border-gray-200"} rounded-xl px-4 text-sm md:text-base text-[#1D2939] placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/50 transition-all bg-white`}
              />
              {fieldErrors.fullName && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.fullName}</p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm md:text-[15px] font-medium text-[#1D2939] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                className={`w-full h-[48px] md:h-[52px] border ${fieldErrors.email ? "border-red-400" : "border-gray-200"} rounded-xl px-4 text-sm md:text-base text-[#1D2939] placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/50 transition-all bg-white`}
              />
              {fieldErrors.email && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Subject Dropdown */}
            <div>
              <label className="block text-sm md:text-[15px] font-medium text-[#1D2939] mb-2">
                Subject
              </label>
              <div className="relative" ref={subjectDropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
                  className={`w-full h-[48px] md:h-[52px] border ${showSubjectDropdown ? "border-[#FFC700] ring-1 ring-[#FFC700]/50" : "border-gray-200"} rounded-xl px-4 text-sm md:text-base text-[#667085] bg-white flex items-center justify-between cursor-pointer transition-all`}
                >
                  <span>{formData.subject}</span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform ${showSubjectDropdown ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showSubjectDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    {subjectOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, subject: option });
                          setShowSubjectDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm md:text-base transition-colors ${
                          formData.subject === option
                            ? "bg-[#FFF8E1] text-[#1D2939] font-medium"
                            : "text-[#667085] hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-sm md:text-[15px] font-medium text-[#1D2939] mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className={`w-full min-h-[120px] md:min-h-[140px] border ${fieldErrors.message ? "border-red-400" : "border-gray-200"} rounded-xl p-4 text-sm md:text-base text-[#1D2939] placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/50 transition-all bg-white resize-none`}
              ></textarea>
              {fieldErrors.message && (
                <p className="text-sm text-red-500 mt-1">{fieldErrors.message}</p>
              )}
            </div>

            {error && (
              <p className="text-sm text-red-500 mt-2" role="alert">
                {error}
              </p>
            )}

            {successMessage && !error && (
              <p className="text-sm text-green-600 mt-2" role="status">
                {successMessage} Redirecting to home...
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-[48px] md:h-[52px] mt-2 md:mt-4 bg-[#FFC700] hover:bg-[#E6B400] disabled:bg-[#FFE380] disabled:cursor-not-allowed rounded-full text-[15px] md:text-[17px] font-bold text-[#1D2939] transition-all transform active:scale-[0.98] shadow-sm"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
