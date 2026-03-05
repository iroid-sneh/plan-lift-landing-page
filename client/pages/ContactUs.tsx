import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Question",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact Form Submitted:", formData);
    // Add your API submission logic here
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-satoshi flex flex-col">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 border-b border-gray-100 bg-[#FFFDF7]">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/contactUsLogo.png" // Replace with the yellow bird logo from Figma
            alt="Planlift Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-10 text-[16px] text-[#667085] font-medium">
          <a href="/" className="hover:text-[#1D2939] transition-colors">
            Home
          </a>
          <a href="/#about" className="hover:text-[#1D2939] transition-colors">
            About
          </a>
          <a
            href="/#how-it-work"
            className="hover:text-[#1D2939] transition-colors"
          >
            How It Work
          </a>
          <a
            href="/#pricing"
            className="hover:text-[#1D2939] transition-colors"
          >
            Pricing
          </a>
          <a href="/#faq" className="hover:text-[#1D2939] transition-colors">
            FAQ
          </a>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2.5 h-[48px] rounded-full border border-[#FFC700] text-[#1D2939] font-bold text-[15px] hover:bg-[#FFC700]/10 transition-colors">
            Contact us
          </button>
          <button className="px-6 py-2.5 h-[48px] rounded-full border border-[#1D2939] text-[#1D2939] font-bold text-[15px] hover:bg-[#1D2939] hover:text-white transition-all">
            Register/Login
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center pt-16 pb-24 px-4 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 flex flex-col items-center">
          {/* Small Pill Badge */}
          <div className="inline-flex items-center justify-center px-5 py-1.5 border border-gray-200 rounded-full bg-white mb-6 shadow-sm">
            <span className="text-[13px] font-medium text-[#667085]">
              Contact Us
            </span>
          </div>

          <h1 className="text-[40px] md:text-[54px] font-bold text-[#1D2939] mb-4 tracking-tight">
            Have A Question?
          </h1>

          <p className="text-[17px] text-[#667085] max-w-xl mx-auto leading-relaxed">
            We're Here To Help. Send Us A Message And We'll Get Back To You
            Soon.
          </p>
        </div>

        {/* Form Card */}
        <div className="w-full max-w-[700px] bg-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-[56px] border border-gray-100 shadow-[0_10px_60px_rgba(0,0,0,0.04)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-[15px] font-medium text-[#1D2939] mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John doe"
                className="w-full h-[52px] border border-gray-200 rounded-xl px-4 text-base text-[#1D2939] placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/50 transition-all bg-white"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-[15px] font-medium text-[#1D2939] mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                className="w-full h-[52px] border border-gray-200 rounded-xl px-4 text-base text-[#1D2939] placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/50 transition-all bg-white"
              />
            </div>

            {/* Subject Dropdown */}
            <div>
              <label className="block text-[15px] font-medium text-[#1D2939] mb-2">
                Subject
              </label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full h-[52px] border border-gray-200 rounded-xl px-4 text-base text-[#667085] focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/50 transition-all bg-white appearance-none cursor-pointer"
                >
                  <option value="General Question">General Question</option>
                  <option value="Billing Support">Billing Support</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Partnership">Partnership</option>
                </select>
                {/* Custom Dropdown Arrow */}
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L13 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-[15px] font-medium text-[#1D2939] mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                className="w-full min-h-[140px] border border-gray-200 rounded-xl p-4 text-base text-[#1D2939] placeholder:text-gray-400 focus:outline-none focus:border-[#FFC700] focus:ring-1 focus:ring-[#FFC700]/50 transition-all bg-white resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[52px] mt-4 bg-[#FFC700] hover:bg-[#E6B400] rounded-full text-[17px] font-bold text-[#1D2939] transition-all transform active:scale-[0.98] shadow-sm"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
