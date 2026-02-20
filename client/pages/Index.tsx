import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FaqSection from "./faqSection";

export default function Index() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openItems, setOpenItems] = useState<number[]>([0, 3]); // For FAQ section
  const navigate = useNavigate();
  const toggleFaq = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  // FAQ data
  const faqData = [
    {
      question: "What Is Planlift?",
      answer:
        "PlanLift is an app that helps you make clear and decisive plans with friends. Instead of long back and forth conversations, you can create a plan, share it, and get a clear response within a set timeframe.",
    },
    {
      question: "How does it work?",
      answer:
        "Simply create a plan, add details like time and location, and share the link with your friends. They can vote or confirm instantly.",
    },
    {
      question: "What happens after I make a plan?",
      answer:
        "Once a plan is created, participants receive notifications. You can track responses in real-time and finalize the tour details.",
    },
    {
      question: "What can I use PlanLift for?",
      answer:
        "You can use it for group tours, weekend trips, dinner plans, or any social gathering that requires coordination.",
    },
    {
      question: "Do my friends need PlanLift?",
      answer:
        "Yes. When you send a plan, your friends will be prompted to download PlanLift so they can respond. We recommend encouraging them to download the app so you can continue making plans with each other more easily.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, PlanLift offers a free tier that covers all the essential features for planning trips with your friends.",
    },
  ];

  function FaqItem({
    item,
    isOpen,
    onToggle,
  }: {
    item: { question: string; answer: string };
    isOpen: boolean;
    onToggle: () => void;
  }) {
    return (
      <div
        className={`bg-white border border-[#F2F4F7] rounded-[32px] overflow-hidden transition-all duration-300 h-fit ${isOpen ? "shadow-sm" : ""}`}
      >
        <button
          onClick={onToggle}
          className="w-full px-8 py-8 text-left flex items-start justify-between gap-4"
        >
          <div className="flex items-center gap-4 relative">
            {/* Yellow Indicator Bar */}
            <div
              className={`absolute -left-8 w-1.5 h-6 rounded-r-full transition-colors ${isOpen ? "bg-[#FFC700]" : "bg-transparent"}`}
            />
            <h3 className="text-xl md:text-[22px] font-bold text-[#1D2939]">
              {item.question}
            </h3>
          </div>

          <div className="mt-1 flex-shrink-0">
            {isOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D2939"
                strokeWidth="2.5"
              >
                <path d="M5 12h14" strokeLinecap="round" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1D2939"
                strokeWidth="2.5"
              >
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            )}
          </div>
        </button>

        <div
          className={`px-8 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-8" : "max-h-0"}`}
        >
          <p className="text-[#667085] text-lg leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-planlift-cream">
      {/* 1. NAVBAR */}
      <header className="bg-[#FDFCF6]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-[100px] py-6">
          <div className="flex items-center justify-between">
            {/* Logo - Fixed Path */}
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Planlift Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-[24px] font-bold text-[#1D2939] font-satoshi">
                Planlift
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-[#1D2939] text-lg font-bold">
                Home
              </a>
              <a
                href="#about"
                className="text-[#667085] text-lg hover:text-[#1D2939] transition-colors"
              >
                About
              </a>
              <a
                href="#how-it-work"
                className="text-[#667085] text-lg hover:text-[#1D2939] transition-colors"
              >
                How It Work
              </a>
              <a
                href="#pricing"
                className="text-[#667085] text-lg hover:text-[#1D2939] transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-[#667085] text-lg hover:text-[#1D2939] transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-8 py-3 bg-[#FFC700] rounded-full text-black text-base font-bold hover:bg-[#E6B400] transition-colors">
                Contact us
              </button>
              <button
                onClick={() => navigate("/create-account")}
                className="px-8 py-3 border border-[#1D2939] rounded-full text-[#1D2939] text-base font-bold hover:bg-gray-50 transition-colors"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. EMAIL / NEWSLETTER ROW */}
      <div className="bg-[#1D2939] py-5">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-[100px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white text-[20px] font-normal font-satoshi">
              We Would Love To Hear From You.
            </p>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-[400px]">
                <span className="absolute left-5 top-1/2 -translate-y-1/2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                  >
                    <path
                      d="M3 8L10.89 13.26C11.56 13.71 12.44 13.71 13.11 13.26L21 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-14 pr-6 py-4 rounded-full border border-white/20 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:border-white/50"
                />
              </div>
              <button className="px-10 py-4 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative overflow-hidden pt-20 pb-0">
        {/* Background Dashed Circles - Centered behind text */}
        <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
          <div className="relative w-[1400px] h-[1400px]">
            {/* Outer Circle */}
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-300" />
            {/* Inner Circle */}
            <div className="absolute inset-[140px] rounded-full border border-dashed border-gray-300" />

            {/* Floating Icons - Fixed Paths and precise positioning */}
            {/* Globe - Outer Top Left */}
            <img
              src="/1stillustration.png"
              className="absolute top-[2%] left-[-1%] w-24 h-24 object-contain"
              alt=""
            />
            {/* Route - Inner Middle Left */}
            <img
              src="/2ndillustration.png"
              className="absolute top-[32%] left-[16%] w-24 h-24 object-contain"
              alt=""
            />
            {/* Sun/Wind - Outer Top Right */}
            <img
              src="/3rdillustration.png"
              className="absolute top-[8%] right-[4%] w-24 h-24 object-contain"
              alt=""
            />
            {/* People Net - Inner Bottom Right */}
            <img
              src="/4thillustration.png"
              className="absolute top-[18%] right-[16%] w-24 h-24 object-contain"
              alt=""
            />
          </div>
        </div>

        <div className="relative z-10 max-w-[1800px] mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm mb-8">
            <div className="flex items-center -space-x-2">
              <img
                src="https://i.pravatar.cc/100?u=1"
                className="w-8 h-8 rounded-full border-2 border-white"
                alt="user"
              />
              <img
                src="https://i.pravatar.cc/100?u=2"
                className="w-8 h-8 rounded-full border-2 border-white"
                alt="user"
              />
              <div className="w-8 h-8 rounded-full bg-[#1D2939] border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">
                3+
              </div>
            </div>
            <span className="text-[#667085] text-sm font-medium">
              Invite Friends, Plan Tours Together.
            </span>
          </div>

          {/* Hero Content */}
          <h1 className="text-[42px] md:text-[68px] font-bold text-[#1D2939] leading-[1.1] mb-6 max-w-[950px] mx-auto font-satoshi">
            Smarter Tour Planning In One Powerful App.
          </h1>
          <p className="text-[#667085] text-xl md:text-[22px] mb-12 max-w-[700px] mx-auto font-normal">
            Plan Tours, Invite Friends, And Manage Everything In One Simple App.
          </p>

          {/* Download Button with Shadow to match Figma */}
          <button className="group relative px-10 py-5 bg-[#FFC700] rounded-full overflow-hidden text-lg font-bold text-[#1D2939] shadow-[0_10px_30px_-10px_rgba(255,199,0,0.5)] transition-all active:scale-95">
            {/* The Animated Text Wrapper */}
            <div className="relative flex items-center justify-center overflow-hidden">
              {"Download App".split("").map((char, index) => (
                <span
                  key={index}
                  className="relative inline-block transition-transform duration-500 ease-in-out"
                  style={{
                    // This creates the staggered "wave" effect
                    transitionDelay: `${index * 0.02}s`,
                  }}
                >
                  {/* Original Text (Slides Up) */}
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                    {char === " " ? "\u00A0" : char}
                  </span>

                  {/* Hover Text (Slides in from Below) */}
                  <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </div>
          </button>

          {/* Hero Main Image (Phone + Avatars) - Fixed Path */}
          <div className="mt-20">
            <img
              src="/heroImage.png"
              alt="App interface"
              className="w-full max-w-[1250px] mx-auto h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* About Section - Your Smarter Way To Plan Together */}
      <section id="about" className="bg-[#FDFCF6] py-16 lg:py-24">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-[100px]">
          <div className="flex flex-col items-center">
            {/* 1. Section Header (Centered) */}
            <div className="text-center mb-16">
              <div className="inline-flex px-4 py-2 rounded-full border border-gray-200 mb-6 bg-white">
                <span className="text-[#1D2939] text-sm font-medium">
                  About Us
                </span>
              </div>
              <h2 className="text-[36px] md:text-[56px] font-bold text-[#1D2939] leading-tight">
                Your Smarter Way To <br className="hidden md:block" /> Plan
                Together
              </h2>
            </div>

            {/* 2. Content Row (Two Columns) */}
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 w-full mb-16">
              {/* Left Column: Illustration */}
              <div className="w-full lg:w-1/2">
                <img
                  src="/Sec2Img.png"
                  alt="Friends planning together"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Right Column: Text with Dividers */}
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <div className="space-y-6">
                  <p className="text-[#475467] text-lg md:text-xl leading-relaxed">
                    PlanLift was created to make making plans with friends feel
                    easier and less stressful.
                  </p>
                  <div className="border-t border-gray-200" />

                  <p className="text-[#475467] text-lg md:text-xl leading-relaxed">
                    We started PlanLift after noticing how often plans fall
                    apart. Many plans are not clear or decisive. Some people
                    hesitate to initiate plans. Others worry about rejection.
                    And sometimes conversations go back and forth without ever
                    reaching a decision.
                  </p>
                  <div className="border-t border-gray-200" />

                  <p className="text-[#475467] text-lg md:text-xl leading-relaxed">
                    PlanLift is designed to remove that friction. It helps make
                    plans simple, clear, and decisive so everyone knows what is
                    happening and by when.
                  </p>
                  <div className="border-t border-gray-200" />

                  <p className="text-[#475467] text-lg md:text-xl leading-relaxed">
                    Our vision is simple. When making plans is easier, people
                    make more of them. That means getting out of the house,
                    spending quality time together, and building stronger real
                    world connections.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. CTA Button (Centered at bottom) */}
            <button className="px-10 py-4 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-all transform hover:scale-105 shadow-md">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Easy Steps */}
      <section id="how-it-work" className="bg-[#FDFCF6] py-20 lg:py-28">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-[100px]">
          <div className="flex flex-col items-center">
            {/* 1. Section Header */}
            <div className="text-center max-w-[800px] mb-16">
              <div className="inline-flex px-4 py-2 rounded-full border border-gray-200 mb-6 bg-white">
                <span className="text-[#667085] text-sm font-medium">
                  How It Work
                </span>
              </div>
              <h2 className="text-[36px] md:text-[56px] font-bold text-[#1D2939] leading-tight mb-6">
                Plan Your Perfect Trip In Just{" "}
                <br className="hidden md:block" /> 3 Easy Steps.
              </h2>
              <p className="text-[#667085] text-lg md:text-xl font-normal">
                A Simple Workflow To Create, Manage, And Share Your Travel
                Plans.
              </p>
            </div>

            {/* 2. Steps Flow Container */}
            <div className="w-full max-w-[1200px]">
              {/* Step Numbers with Dashed Line */}
              <div className="relative flex justify-between items-center max-w-[900px] mx-auto mb-10">
                {/* Dashed Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] border-t border-dashed border-gray-300 -z-0"></div>

                {/* Number 1 (Active) */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#FFC700] flex items-center justify-center text-black text-xl font-bold border-4 border-[#FDFCF6]">
                  1
                </div>
                {/* Number 2 */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#667085] text-xl font-bold border-4 border-[#FDFCF6]">
                  2
                </div>
                {/* Number 3 */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#667085] text-xl font-bold border-4 border-[#FDFCF6]">
                  3
                </div>
              </div>

              {/* Steps Grid (Titles & Descriptions) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
                <div>
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#1D2939] mb-3">
                    Creating A Clear Plan
                  </h3>
                  <p className="text-[#667085] text-lg">
                    Turn Your Travel Ideas Into A Real Plan, Instantly.
                  </p>
                </div>
                <div>
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#1D2939] mb-3">
                    Sharing It With Friends
                  </h3>
                  <p className="text-[#667085] text-lg">
                    Send Your Plan To Friends Instantly And Collaborate In Real
                    Time.
                  </p>
                </div>
                <div>
                  <h3 className="text-[22px] md:text-[24px] font-bold text-[#1D2939] mb-3">
                    Get Responses
                  </h3>
                  <p className="text-[#667085] text-lg">
                    Connect, Collaborate, And Create Unforgettable Journeys.
                  </p>
                </div>
              </div>

              {/* Step Image Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="bg-[#FCFCFD] border border-[#F2F4F7] rounded-[32px] p-8 flex items-center justify-center min-h-[350px]">
                  <img
                    src="/step1Img.png"
                    alt="Step 1"
                    className="max-w-full h-auto object-contain"
                  />
                </div>
                {/* Card 2 */}
                <div className="bg-[#FCFCFD] border border-[#F2F4F7] rounded-[32px] p-8 flex items-center justify-center min-h-[350px]">
                  <img
                    src="/Step2Img.png"
                    alt="Step 2"
                    className="max-w-full h-auto object-contain"
                  />
                </div>
                {/* Card 3 */}
                <div className="bg-[#FCFCFD] border border-[#F2F4F7] rounded-[32px] p-8 flex items-center justify-center min-h-[350px]">
                  <img
                    src="/Step3Img.png"
                    alt="Step 3"
                    className="max-w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-[#FDFCF6] py-20 lg:py-28">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-[100px]">
          {/* Top Content: Header & Rocket */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
            <div className="max-w-[600px]">
              <div className="inline-flex px-4 py-2 rounded-full border border-gray-200 mb-6 bg-white">
                <span className="text-[#667085] text-sm font-medium">
                  Pricing
                </span>
              </div>
              <h2 className="text-[40px] md:text-[64px] font-bold text-[#1D2939] leading-[1.1] mb-6 font-satoshi">
                Flexible Pricing for <br /> Every Need
              </h2>
              <p className="text-[#667085] text-lg md:text-xl max-w-[450px]">
                Planlift Makes Trip Planning Easy, Fast, And Enjoyable For
                Everyone.
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                src="/pricingRocketImg.png"
                alt="Rocket illustration"
                className="w-[350px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1240px]">
            {/* 1. Free Plan Card */}
            <div className="bg-white rounded-[32px] border border-gray-100 p-8 flex flex-col justify-between shadow-sm">
              <div className="flex items-start">
                {/* Price Column */}
                <div className="flex-1 pr-8">
                  <div className="inline-flex px-4 py-1.5 rounded-full border border-gray-100 mb-8">
                    <span className="text-sm font-medium text-[#1D2939]">
                      Free
                    </span>
                  </div>
                  <div className="text-[64px] font-bold text-[#1D2939] leading-none mb-2">
                    $00
                  </div>
                  <p className="text-[#667085] text-base">
                    Per Brand, Per Month
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-32 border-l border-dashed border-gray-300 mx-2 mt-12" />

                {/* Benefits Column */}
                <div className="flex-1 pl-8 pt-4">
                  <p className="text-[#1D2939] font-bold text-lg mb-4">
                    Benefits:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Create up to 5 plans",
                      "Group tour planning",
                      "Share with friends",
                      "Cancel anytime",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-[#667085]"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <circle cx="10" cy="10" r="10" fill="#F2F4F7" />
                          <path
                            d="M14 7L8.5 12.5L6 10"
                            stroke="#1D2939"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="w-full mt-10 py-4 bg-[#F2F4F7] rounded-full text-[#1D2939] text-lg font-bold hover:bg-gray-200 transition-colors">
                Select Plan
              </button>
            </div>

            {/* 2. Premium Plan Card */}
            <div className="bg-white rounded-[32px] border-2 border-[#FFC700] p-8 flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(255,199,0,0.3)] relative">
              <div className="flex items-start">
                {/* Price Column */}
                <div className="flex-1 pr-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFC700] mb-8 bg-[#FFF9E5]">
                    <span className="text-sm font-medium text-[#1D2939]">
                      Premium
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" transform="rotate(-180 12 12)" />
                    </svg>
                  </div>
                  <div className="text-[64px] font-bold text-[#1D2939] leading-none mb-2">
                    $3.99
                  </div>
                  <p className="text-[#667085] text-base">
                    Per Brand, Per Year
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-32 border-l border-dashed border-gray-300 mx-2 mt-12" />

                {/* Benefits Column */}
                <div className="flex-1 pl-8 pt-4">
                  <p className="text-[#1D2939] font-bold text-lg mb-4">
                    Benefits:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "Unlimited plans",
                      "All Pro features",
                      "Best value yearly plan",
                      "Cancel anytime",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-[#667085]"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <circle cx="10" cy="10" r="10" fill="#FFF9E5" />
                          <path
                            d="M14 7L8.5 12.5L6 10"
                            stroke="#FFC700"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="w-full mt-10 py-4 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-colors flex items-center justify-center gap-2">
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-28 bg-[#FDFCF6]">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-[100px]">
          {/* Header Row: Title + Illustration */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-16">
            <div className="max-w-[700px]">
              <div className="inline-flex px-4 py-2 rounded-full border border-gray-200 mb-6 bg-white">
                <span className="text-[#667085] text-sm font-medium">FAQ</span>
              </div>
              <h2 className="text-[40px] md:text-[64px] font-bold text-[#1D2939] leading-[1.1] mb-6 font-satoshi">
                Frequently asked questions
              </h2>
              <p className="text-[#667085] text-lg md:text-xl max-w-[550px]">
                Clear Answers To Help You Use Planlift With Confidence And Enjoy
                Smooth, Stress-Free Tour Planning With Your Friends.
              </p>
            </div>

            <div className="hidden lg:block">
              <img
                src="/faqImg.png"
                alt="FAQ illustration"
                className="w-[380px] h-auto object-contain"
              />
            </div>
          </div>

          {/* FAQ Columns: Split into two independent flex containers */}
          <div className="flex flex-col lg:flex-row items-start gap-6 mb-16">
            {/* Left Column (Items 1, 2, 3) */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              {faqData.slice(0, 3).map((item, index) => {
                const actualIndex = index; // 0, 1, 2
                const isOpen = openItems.includes(actualIndex);
                return (
                  <FaqItem
                    key={actualIndex}
                    item={item}
                    isOpen={isOpen}
                    onToggle={() => toggleFaq(actualIndex)}
                  />
                );
              })}
            </div>

            {/* Right Column (Items 4, 5, 6) */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              {faqData.slice(3, 6).map((item, index) => {
                const actualIndex = index + 2; // 3, 4, 5
                const isOpen = openItems.includes(actualIndex);
                return (
                  <FaqItem
                    key={actualIndex}
                    item={item}
                    isOpen={isOpen}
                    onToggle={() => toggleFaq(actualIndex)}
                  />
                );
              })}
            </div>
          </div>

          {/* Center CTA Button */}
          <div className="flex justify-center">
            <button className="px-12 py-5 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-all transform hover:scale-105 shadow-md">
              Ask a Questions
            </button>
          </div>
        </div>
      </section>

      {/* <FaqSection /> */}

      {/* Footer */}
      <footer className="bg-planlift-dark py-16 lg:py-[70px]">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-[141px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1 - Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img
                  src="/logo.png"
                  alt="Planlift Logo"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-2xl lg:text-[28px] font-bold text-white font-satoshi">
                  Planlift
                </span>
              </Link>
              <p className="text-white text-lg mb-6 max-w-[339px]">
                Planlif turns your ideas into clear plans and lets you share and
                collaborate instantly — all in one simple app.
              </p>
              <button className="px-8 py-4 bg-planlift-yellow rounded-full text-black text-lg font-bold hover:bg-yellow-500 transition-colors">
                Download App
              </button>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h3 className="text-white text-xl font-bold font-manrope mb-8">
                Links
              </h3>
              <ul className="space-y-6">
                <li>
                  <a
                    href="#how-it-work"
                    className="text-white text-lg hover:text-planlift-yellow transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="text-white text-lg hover:text-planlift-yellow transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-lg hover:text-planlift-yellow transition-colors"
                  >
                    Contact us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Explore */}
            <div>
              <h3 className="text-white text-xl font-bold font-manrope mb-8">
                Explore
              </h3>
              <ul className="space-y-6">
                <li>
                  <a
                    href="#"
                    className="text-white text-lg hover:text-planlift-yellow transition-colors"
                  >
                    Group Tour Planning
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-lg hover:text-planlift-yellow transition-colors"
                  >
                    Travel Chat
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-lg hover:text-planlift-yellow transition-colors"
                  >
                    Invite Friends
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white text-lg hover:text-planlift-yellow transition-colors"
                  >
                    Tour Management
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4 - Download */}
            <div>
              <h3 className="text-white text-xl font-bold mb-8">
                Download our app
              </h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-4 rounded-xl border border-white/40 hover:border-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14.9392 4.69C15.3172 4.25428 15.6055 3.74817 15.7874 3.20074C15.9693 2.6533 16.0413 2.07533 15.9992 1.5C14.8386 1.59369 13.7612 2.13956 12.9992 3.02C12.6343 3.44198 12.3578 3.93288 12.186 4.46364C12.0142 4.99441 11.9507 5.55424 11.9992 6.11C12.5653 6.11472 13.125 5.9891 13.6348 5.74286C14.1446 5.49662 14.5909 5.13637 14.9392 4.69ZM17.4592 12.13C17.4659 11.3637 17.6677 10.6118 18.0456 9.9452C18.4236 9.27859 18.9651 8.71926 19.6192 8.32C19.2064 7.72524 18.6607 7.23483 18.0254 6.88767C17.3901 6.54052 16.6827 6.34615 15.9592 6.32C14.3992 6.16 12.9592 7.23 12.1292 7.23C11.2992 7.23 10.1292 6.34 8.82918 6.36C7.97931 6.388 7.1512 6.63578 6.42563 7.07919C5.70005 7.52259 5.10179 8.14648 4.68918 8.89C2.92918 11.95 4.23918 16.5 5.99918 18.97C6.79918 20.18 7.79918 21.55 9.11918 21.5C10.4392 21.45 10.8692 20.68 12.3992 20.68C13.9292 20.68 14.3992 21.5 15.6992 21.47C16.9992 21.44 17.9192 20.23 18.7592 19.02C19.3542 18.1415 19.819 17.1816 20.1392 16.17C19.3467 15.832 18.6705 15.2693 18.1942 14.5513C17.7179 13.8333 17.4624 12.9916 17.4592 12.13Z"
                        fill="white"
                      />
                    </svg>
                    <span className="text-white text-lg font-bold">
                      App store
                    </span>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <a
                  href="#"
                  className="flex items-center justify-between px-4 py-4 rounded-xl border border-white/40 hover:border-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M20.3992 11.4398V11.6198C20.3992 12.0998 20.0992 12.5798 19.6792 12.8198L16.3792 14.7398L13.1992 11.4998L16.3792 8.25977L19.6792 10.1798C20.0992 10.4198 20.3992 10.8998 20.3992 11.4398Z"
                        fill="#FDBD04"
                      />
                      <path
                        d="M16.3795 8.26039L13.1995 11.5004L4.01953 2.32039C4.25953 2.08039 4.61953 1.90039 5.03953 1.90039C5.27953 1.90039 5.51953 1.96039 5.75953 2.08039L16.3795 8.26039Z"
                        fill="#03A846"
                      />
                      <path
                        d="M13.1996 11.5003L4.01961 20.6803C3.77961 20.4403 3.59961 20.0803 3.59961 19.6603V3.34031C3.59961 2.92031 3.77961 2.62031 4.01961 2.32031L13.1996 11.5003Z"
                        fill="#0284FE"
                      />
                      <path
                        d="M16.3795 14.68L5.69953 20.92C5.51953 21.04 5.27953 21.1 5.03953 21.1C4.67953 21.1 4.31953 20.92 4.01953 20.68L13.1995 11.5L16.3795 14.68Z"
                        fill="#FF4131"
                      />
                    </svg>
                    <span className="text-white text-lg font-bold">
                      Play store
                    </span>
                  </div>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white text-lg">
              © Sparkly Inc. All Rights Reserved.
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-4 rounded-full border border-white/10 hover:border-white/40 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.4291 1.21484C19.4916 1.21484 20.4001 1.59208 21.1546 2.34654C21.909 3.101 22.2863 4.00949 22.2863 5.07199V17.9291C22.2863 18.9916 21.909 19.9001 21.1546 20.6546C20.4001 21.409 19.4916 21.7863 18.4291 21.7863H15.9113V13.8175H18.5765L18.9782 10.7104H15.9113V8.72824C15.9113 8.22824 16.0162 7.85324 16.226 7.60324C16.4358 7.35324 16.8443 7.22824 17.4515 7.22824L19.0854 7.21484V4.44252C18.5229 4.36217 17.7282 4.32199 16.7015 4.32199C15.4872 4.32199 14.5162 4.67913 13.7885 5.39342C13.0608 6.1077 12.697 7.11663 12.697 8.4202V10.7104H10.0184V13.8175H12.697V21.7863H5.57199C4.50949 21.7863 3.601 21.409 2.84654 20.6546C2.09208 19.9001 1.71484 18.9916 1.71484 17.9291V5.07199C1.71484 4.00949 2.09208 3.101 2.84654 2.34654C3.601 1.59208 4.50949 1.21484 5.57199 1.21484H18.4291Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="p-4 rounded-full border border-white/10 hover:border-white/40 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7V7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9V9Z"
                    fill="white"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="p-4 rounded-full border border-white/10 hover:border-white/40 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16.7841 19.821H3.34974C1.57589 19.821 0.132812 18.381 0.132812 16.6108V3.21026C0.132812 1.44 1.57589 0 3.34974 0H16.7841C18.5574 0 20.0005 1.44 20.0005 3.21026V16.6113C20.0005 18.3815 18.5574 19.821 16.7841 19.821ZM6.84615 16.3862H6.85025V7.83641H4.19025V16.3862H6.84563H6.84615ZM5.51845 6.66872C5.7207 6.66899 5.92101 6.62935 6.10791 6.55208C6.29481 6.47481 6.46463 6.36142 6.60764 6.21842C6.75065 6.07541 6.86403 5.90559 6.9413 5.71869C7.01857 5.53179 7.05821 5.33148 7.05794 5.12923C7.05713 4.72118 6.89467 4.33008 6.60614 4.04155C6.3176 3.75301 5.9265 3.59056 5.51845 3.58974C5.1102 3.58988 4.7187 3.75212 4.43002 4.0408C4.14134 4.32948 3.9791 4.72098 3.97897 5.12923C3.9791 5.53749 4.14134 5.92898 4.43002 6.21766C4.7187 6.50634 5.1102 6.66858 5.51845 6.66872ZM16.7995 16.3867V11.6995C16.7995 9.39641 16.2995 7.62462 13.6123 7.62462C12.3205 7.62462 11.4533 8.33231 11.0969 9.0041H11.061V7.83641H8.51384V16.3862H11.1692V12.1554C11.1692 11.0395 11.381 9.96 12.7641 9.96C14.1241 9.96 14.1441 11.2359 14.1441 12.2272V16.3862H16.7995V16.3867Z"
                    fill="white"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
