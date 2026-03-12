import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, clearAuth } from "@/lib/auth";
import { apiFetch, getErrorMessage } from "@/lib/api";
import FaqSection from "./faqSection";

export default function Index() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openItems, setOpenItems] = useState<number[]>([0]); // For FAQ section
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = getUser();

  // Reference for the email input to allow scrolling and focusing
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Subscription states
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = async () => {
    if (!subscriberEmail || isSubscribing) return;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriberEmail)) {
      setSubscribeStatus("error");
      setSubscribeMessage("Please enter a valid email address.");
      return;
    }

    setSubscribeStatus("idle");
    setIsSubscribing(true);

    try {
      await apiFetch("/subscribe", {
        method: "POST",
        auth: false,
        body: { email: subscriberEmail },
      });

      setSubscribeStatus("success");
      setSubscriberEmail("");

      // Reset after 5 seconds
      setTimeout(() => {
        setSubscribeStatus("idle");
        setSubscribeMessage("");
      }, 5000);
    } catch (err) {
      setSubscribeStatus("error");
      setSubscribeMessage(getErrorMessage(err));
    } finally {
      setIsSubscribing(false);
    }
  };

  // Function to scroll to the Notify Me section and focus the input
  const scrollToNotify = () => {
    if (emailInputRef.current) {
      emailInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Trigger highlight animation
      setIsHighlighted(true);
      
      // Focus after scroll starts
      setTimeout(() => {
        emailInputRef.current?.focus();
      }, 600);

      // Remove highlight state after animation finishes
      setTimeout(() => {
        setIsHighlighted(false);
      }, 2500);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const handleLogout = async () => {
    try {
      await apiFetch("/logout", {
        method: "POST",
        // body: { device_id: "" },
      });
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      clearAuth();
      setShowUserMenu(false);
      navigate("/", { replace: true });
      window.location.reload();
    }
  };

  const baseRevCatUrl = import.meta.env.VITE_REVNUECAT_BASE_URL;

  const handlePremiumPlanClick = () => {
    if (!user) {
      navigate("/create-account");
      return;
    }

    const url = `${baseRevCatUrl}/${user.id}`;
    window.location.href = url;
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // FAQ data
  const faqData = [
    {
      question: "What Is Planlark?",
      answer:
        "Planlark helps you make clear, decisive plans with friends. Instead of long back-and-forth conversations, you create one plan, set a response deadline, and get clear yes-or-no responses.",
    },
    {
      question: "How does it work?",
      answer:
        "You create a plan with the details that matter and set a deadline for responses. Your friends can accept or decline before the deadline. If they don’t respond in time, the plan expires — so decisions don’t drag on.",
    },
    {
      question: "What happens after I make a plan?",
      answer:
        "Each plan includes a response window and expiration time. Friends must respond before the deadline. If they don’t, the plan expires and everyone moves on. This prevents plans from dragging on without a decision",
    },
    {
      question: "What can I use Planlark for?",
      answer:
        "You can use Planlark for anything you normally coordinate with friends — dinners, workouts, trips, hangouts, events, or casual meetups. It’s especially useful when plans tend to stall, change too often, or never get finalized.",
    },
    {
      question: "Do my friends need Planlark?",
      answer:
        "Yes. When you send a plan, your friends will be prompted to download Planlark so they can respond. This keeps everything in one place and makes future plans easier to coordinate.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes. You can create up to five plans for free. After that, a $2.99 per month subscription gives you unlimited plans. You can cancel anytime.",
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
        className={`border border-[#DCDCDC] rounded-[32px] overflow-hidden transition-all duration-300 h-fit ${isOpen ? "shadow-sm" : ""}`}
      >
        <button
          onClick={onToggle}
          className="w-full px-8 py-8 text-left flex items-start justify-between gap-4"
        >
          <div className="flex items-center gap-4 relative">
            {/* Yellow Indicator Bar */}
            <div className="absolute -left-8 w-1.5 h-6 rounded-r-full bg-[#FFC700]" />
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
      {/* Animation Styles for the highlight effect */}
      <style>{`
        @keyframes highlight-pulse {
          0% { box-shadow: 0 0 0 0px rgba(255, 199, 0, 0.7); border-color: #FFC700; }
          50% { box-shadow: 0 0 0 15px rgba(255, 199, 0, 0); border-color: #FFC700; }
          100% { box-shadow: 0 0 0 0px rgba(255, 199, 0, 0); }
        }
        .animate-highlight {
          animation: highlight-pulse 3s ease-out;
        }
      `}</style>

      {/* 1. NAVBAR */}
      <header className="bg-[#FDFCF6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] py-6">
          <div className="flex items-center justify-between">
            {/* Logo - Fixed Path */}
            <Link to="/" className="flex items-center gap-4">
              <img
                src="/logo.png"
                alt="Planlark Logo"
                className="h-16 w-16 object-contain"
              />
              <span className="text-[22px] font-bold text-[#1D2939] font-satoshi">
                planlark
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-14">
              <a href="#home" className="text-[#1D2939] text-xl font-bold">
                Home
              </a>
              <a
                href="#about"
                className="text-[#667085] text-xl hover:text-[#1D2939] transition-colors"
              >
                About
              </a>
              <a
                href="#how-it-work"
                className="text-[#667085] text-xl hover:text-[#1D2939] transition-colors"
              >
                How It Work
              </a>
              <a
                href="#pricing"
                className="text-[#667085] text-xl hover:text-[#1D2939] transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                className="text-[#667085] text-xl hover:text-[#1D2939] transition-colors"
              >
                FAQ
              </a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => navigate("/contact-us")}
                className="px-8 py-3 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-colors"
              >
                Contact us
              </button>

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-12 h-12 rounded-full border border-gray-200 overflow-hidden hover:border-[#FFC700] transition-all"
                  >
                    {user.profile ? (
                      <img src={user.profile} alt={user.full_name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#F2F4F7] flex items-center justify-center text-[#1D2939] font-bold">
                        {user.full_name.charAt(0)}
                      </div>
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-bold text-[#1D2939] truncate">{user.full_name}</p>
                        <p className="text-xs text-[#667085] truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/create-account")}
                  className="px-8 py-3 border border-[#1D2939] rounded-full text-[#1D2939] text-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Register/Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. EMAIL / NEWSLETTER ROW */}
      <div className="bg-[#282827] py-4 min-h-[88px] flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px] w-full">
          {subscribeStatus === "success" ? (
            <div className="flex justify-center items-center py-2">
              <p className="text-[#FFC700] text-xl font-bold animate-pulse text-center">
                Successfully Subscribed! We will notify you soon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-white text-[20px] font-normal font-satoshi">
                We Would Love To Hear From You.
              </p>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex flex-col flex-1 md:w-[400px]">
                  <div className="relative">
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
                      ref={emailInputRef}
                      type="email"
                      placeholder="Email address"
                      value={subscriberEmail}
                      onChange={(e) => setSubscriberEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                      className={`w-full pl-14 pr-6 py-4 rounded-full border transition-all duration-500 ${isHighlighted ? "animate-highlight" : ""} ${subscribeStatus === "error" ? "border-red-500" : "border-white/20"} bg-transparent text-white placeholder:text-white/60 text-lg focus:outline-none focus:border-white/50`}
                    />
                  </div>
                  {subscribeStatus === "error" && (
                    <p className="text-red-500 text-xs mt-1 ml-5">
                      {subscribeMessage}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="px-2 py-4 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[140px]"
                >
                  {isSubscribing ? "..." : "Notify me"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <section id="home" className="relative overflow-hidden pt-20 pb-32">
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
              className="absolute top-[40%] left-[-10%] w-24 h-24 object-contain"
              alt=""
            />
            {/* Route - Inner Middle Left */}
            <img
              src="/2ndillustration.png"
              className="absolute top-[60%] left-[1%] w-32 h-32 object-contain"
              alt=""
            />
            {/* Sun/Wind - Outer Top Right */}
            <img
              src="/4thillustration.png"
              className="absolute top-[44%] right-[1%] w-32 h-32 object-contain"
              alt=""
            />
            {/* People Net - Inner Bottom Right */}
            <img
              src="/3rdillustration.png"
              className="absolute top-[65%] right-[8%] w-24 h-24 object-contain"
              alt=""
            />
          </div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 text-center">
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
          <h1 className="text-[32px] md:text-[68px] font-bold text-[#1D2939] leading-[1.1] mb-6 max-w-[950px] mx-auto font-satoshi">
            Turn Group Chats <br /> Into Actual Plans
          </h1>
          <p className="text-[#667085] text-xl md:text-[22px] mb-12 max-w-[700px] mx-auto font-normal">
            Create a plan, Invite Friends, And Get Clear Yes-Or-No <br />{" "}
            Responses — Without Endless Back-And-Forth.
          </p>

          {/* Download Button with Shadow to match Figma */}
          <button 
            onClick={scrollToNotify}
            className="group relative px-10 py-5 bg-[#FFC700] rounded-full overflow-hidden text-lg font-bold text-[#1D2939] shadow-[0_10px_30px_-10px_rgba(255,199,0,0.5)] transition-all active:scale-95"
          >
            {/* The Animated Text Wrapper */}
            <div className="relative flex items-center justify-center overflow-hidden">
              {"Get Early Access".split("").map((char, index) => (
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
          <div>
            <img
              src="/heroImage.png"
              alt="App interface"
              className="w-full max-w-[1250px] mx-auto h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* About Section - Your Smarter Way To Plan Together */}
      <section id="about" className="bg-[#FDFCF6] py-14 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
          <div className="flex flex-col items-center">
            {/* 1. Section Header (Reduced bottom margin to close the gap) */}
            <div className="text-center mb-4 md:mb-5">
              <div className="inline-flex px-4 py-1.5 rounded-full border border-[#2828271A] mb-3 bg-transparent">
                <span className="text-[#28282799] text-sm font-medium">
                  About Us
                </span>
              </div>
              <h2 className="text-[28px] md:text-[44px] font-bold text-[#1D2939] leading-tight">
                Decisions, Not <br /> Discussions
              </h2>
            </div>

            {/* 2. Content Row (Reduced gap from title section) */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full mb-12">
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
                  <p className="text-[#475467] text-base md:text-lg leading-relaxed">
                    Planlark was created to solve a simple but frustrating
                    problem: <br /> making plans with friends often goes
                    nowhere.
                  </p>
                  <div className="border-t border-gray-200" />

                  <p className="text-[#475467] text-base md:text-lg leading-relaxed">
                    Group chats drag on. Options pile up. People hesitate and
                    delay. In the <br /> end, nothing gets decided and plans
                    fall apart.
                  </p>
                  <div className="border-t border-gray-200" />

                  <p className="text-[#475467] text-base md:text-lg leading-relaxed">
                    Planlark flips this by removing endless options. Instead, it
                    promotes <br /> clear commitments with a single plan and a
                    deadline to respond.
                  </p>
                  <div className="border-t border-gray-200" />

                  <h2 className="text-[#282827] text-lg md:text-2xl font-medium leading-relaxed">
                    Clear plans. Firm deadlines. Real results.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Easy Steps */}
      <section id="how-it-work" className="bg-[#FDFCF6] py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
          <div className="flex flex-col items-center">
            {/* 1. Section Header */}
            <div className="text-center max-w-[800px] mb-10">
              <div className="inline-flex px-4 py-1.5 rounded-full border border-[#2828271A] mb-2 bg-transparent">
                <span className="text-[#28282799] text-sm font-medium">
                  How It Work
                </span>
              </div>
              <h2 className="text-[28px] md:text-[44px] font-bold text-[#282827] leading-tight mb-4">
                Plan Your Perfect Trip In Just{" "}
                <br className="hidden md:block" /> 3 Easy Steps.
              </h2>
              <p className="text-[#667085] text-base md:text-lg font-normal">
                A Simple Workflow To Create, Manage, And Share Your Travel
                Plans.
              </p>
            </div>

            {/* 2. Steps Flow Container */}
            <div className="w-full max-w-[1200px]">
              {/* Step Numbers with Dashed Line */}
              <div className="relative flex justify-between items-center max-w-[900px] mx-auto mb-8">
                {/* Dashed Connecting Line */}
                <div className="absolute top-1/2 inset-x-16 h-px -z-0 bg-[repeating-linear-gradient(to_right,rgba(209,213,219,1)_0,rgba(209,213,219,1)_8px,transparent_8px,transparent_16px)]"></div>

                {/* Number 1 (Active) */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#FFC700] flex items-center justify-center text-black text-lg font-bold border-4 border-[#FDFCF6]">
                  1
                </div>
                {/* Number 2 */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#667085] text-lg font-bold border-4 border-[#FDFCF6]">
                  2
                </div>
                {/* Number 3 */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-[#F2F4F7] flex items-center justify-center text-[#667085] text-lg font-bold border-4 border-[#FDFCF6]">
                  3
                </div>
              </div>

              {/* Steps Grid (Titles & Descriptions) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-10">
                <div>
                  <h3 className="text-[20px] md:text-[22px] font-medium text-[#1D2939] mb-2">
                    Creating A Clear Plan
                  </h3>
                  <p className="text-[#667085] text-base md:text-lg">
                    Turn Your Travel Ideas Into A Real <br /> Plan, Instantly.
                  </p>
                </div>
                <div>
                  <h3 className="text-[20px] md:text-[22px] font-medium text-[#1D2939] mb-2">
                    Sharing It With Friends
                  </h3>
                  <p className="text-[#667085] text-base md:text-lg">
                    Send Your Plan To Friends Instantly <br /> And Collaborate
                    In Real Time.
                  </p>
                </div>
                <div>
                  <h3 className="text-[20px] md:text-[22px] font-medium text-[#1D2939] mb-2">
                    Get Responses
                  </h3>
                  <p className="text-[#667085] text-base md:text-lg">
                    Connect, Collaborate, And Create <br /> Unforgettable
                    Journeys.
                  </p>
                </div>
              </div>

              {/* Step Image Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="rounded-[32px] border border-gray-200 p-6 flex items-center justify-center min-h-[320px]">
                  <img
                    src="/step1Img.png"
                    alt="Step 1"
                    className="max-w-full h-auto object-contain"
                  />
                </div>
                {/* Card 2 */}
                <div className="rounded-[32px] border border-gray-200 p-6 flex items-center justify-center min-h-[180px]">
                  <img
                    src="/Step2Img.png"
                    alt="Step 2"
                    className="max-w-full h-[260px] object-contain"
                  />
                </div>
                {/* Card 3 */}
                <div className="rounded-[32px] border border-gray-200 p-6 flex items-center justify-center min-h-[320px]">
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
      <section id="pricing" className="bg-[#FDFCF6] py-16 lg:py-24">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
          {/* Top Content: Header & Rocket */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-14">
            <div className="max-w-[600px]">
              <div className="inline-flex px-4 py-1.5 rounded-full border border-[#2828271A] mb-4 bg-transparent">
                <span className="text-[#28282799] text-sm font-medium">
                  Pricing
                </span>
              </div>
              <h2 className="text-[30px] md:text-[48px] font-bold text-[#282827] leading-[1.1] mb-4 font-satoshi">
                Flexible Pricing for <br /> Every Need
              </h2>
              <p className="text-[#667085] text-base md:text-lg max-w-[550px]">
                Planlark Makes Trip Planning Easy, Fast, And Enjoyable <br />{" "}
                For Everyone.
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
            <div className="rounded-[32px] border border-gray-100 p-7 flex flex-col justify-between shadow-sm">
              <div className="flex items-start">
                {/* Price Column */}
                <div className="flex-1 pr-8">
                  <div className="inline-flex px-4 py-1.5 rounded-full border border-gray-100 mb-6">
                    <span className="text-sm font-medium text-[#1D2939]">
                      Free
                    </span>
                  </div>
                  <div className="text-[40px] md:text-[48px] font-bold text-[#1D2939] leading-none mb-1">
                    $00
                  </div>
                  <p className="text-[#667085] text-sm md:text-base">
                    Per Brand, Per Month
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-28 border-l border-dashed border-gray-300 mx-2 mt-10" />

                {/* Benefits Column */}
                <div className="flex-1 pl-8 pt-4">
                  <p className="text-[#1D2939] font-bold text-base md:text-lg mb-3">
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
                        <span className="text-xs md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="w-full mt-8 py-3 bg-[#F2F4F7] rounded-full text-[#1D2939] text-base md:text-lg font-bold hover:bg-gray-200 transition-colors">
                Select Plan
              </button>
            </div>

            {/* 2. Premium Plan Card */}
            <div className="rounded-[32px] border-2 border-[#FFC700] p-7 flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(255,199,0,0.3)] relative">
              <div className="flex items-start">
                {/* Price Column */}
                <div className="flex-1 pr-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFC700] mb-6 bg-[#FFF9E5]">
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
                  <div className="text-[40px] md:text-[48px] font-bold text-[#1D2939] leading-none mb-1">
                    $19.99
                  </div>
                  <p className="text-[#667085] text-sm md:text-base">
                    Per Brand, Per Year
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="w-[1px] h-28 border-l border-dashed border-gray-300 mx-2 mt-10" />

                {/* Benefits Column */}
                <div className="flex-1 pl-8 pt-4">
                  <p className="text-[#1D2939] font-bold text-base md:text-lg mb-3">
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
                        <span className="text-xs md:text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={handlePremiumPlanClick}
                className="w-full mt-8 py-3 bg-[#FFC700] rounded-full text-black text-base md:text-lg font-bold hover:bg-[#E6B400] transition-colors flex items-center justify-center gap-2"
              >
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 bg-[#FDFCF6]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
          {/* Header Row: Title + Illustration */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-10 mb-12">
            <div className="max-w-[900px]">
              <div className="inline-flex px-4 py-1.5 rounded-full border border-[#2828271A] mb-4 bg-transparent">
                <span className="text-[#28282799] text-sm font-medium">
                  FAQ
                </span>
              </div>
              <h2 className="text-[30px] md:text-[48px] font-bold text-[#282827] leading-[1.1] mb-4 font-satoshi">
                Frequently asked questions
              </h2>
              <p className="text-[#667085] text-base md:text-lg max-w-[550px]">
                Clear Answers To Help You Use Planlark With Confidence And Enjoy
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
          <div className="flex flex-col lg:flex-row items-start gap-6 mb-12">
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
                const actualIndex = index + 3; // 3, 4, 5
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
            <button
              onClick={() => navigate("/contact-us")}
              className="px-10 py-4 bg-[#FFC700] rounded-full text-black text-base md:text-lg font-bold hover:bg-[#E6B400] transition-all transform hover:scale-105 shadow-md"
            >
              Ask a Question
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1D1D1D] pt-16 pb-10 lg:pt-[80px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
            {/* Left: Logo & Nav Links */}
            <div className="flex flex-col gap-10">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="/FooterLogo.png"
                  alt="Planlark Logo"
                  className="h-10 w-10 object-contain"
                />
                <span className="text-[24px] font-bold text-white font-satoshi">
                  Planlark
                </span>
              </Link>

              {/* Navigation Links Row */}
              <nav className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {["Home", "About", "How It Works", "Pricing", "FAQ"].map(
                  (link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-white/80 text-lg hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  ),
                )}
              </nav>
            </div>

            {/* Right: Download Section */}
            <div className="flex flex-col items-start lg:items-end gap-6">
              <h3 className="text-white text-xl font-bold">Download our app</h3>
              <div className="flex flex-wrap gap-4">
                {/* App Store Badge Style */}
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-[50px] w-auto"
                  />
                </a>
                {/* Play Store Badge Style */}
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-[50px] w-auto"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal Divider Line */}
          <div className="w-full h-[1px] bg-white/10 mb-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white/60 text-lg font-normal">
              © Sparkly Inc. All Rights Reserved.
            </p>

            {/* Social Media Icons - Exactly 4 as per Figma */}
            <div className="flex items-center gap-4">
              {[
                {
                  icon: "facebook",
                  path: "/facebookLogo.png",
                },
                {
                  icon: "instagram",
                  path: "/InstagramLogo.png",
                },
                { icon: "tiktok", path: "/tiktokLogo.png" },
                { icon: "x", path: "/twitterLogo.png" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href="#"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                  <img
                    width="20"
                    height="20"
                    src={social.path}
                    alt={social.icon}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
