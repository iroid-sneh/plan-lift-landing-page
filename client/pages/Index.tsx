import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getSubscription,
  setSubscription,
  setUser,
  clearAuth,
  Subscription,
  UserProfile,
} from "@/lib/auth";
import { apiFetch, getErrorMessage } from "@/lib/api";
import FaqSection from "./faqSection";

export default function Index() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openItems, setOpenItems] = useState<number[]>([0]); // For FAQ section
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileUserMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const user = getUser();
  const [subscription, setLocalSubscription] = useState(getSubscription());

  // Fetch fresh subscription data from API on mount for logged-in users
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        const res = await apiFetch<{
          success: boolean;
          data: { user: UserProfile; subscription: Subscription };
        }>("/user/profile");
        if (res.data?.subscription) {
          setSubscription(res.data.subscription);
          setLocalSubscription(res.data.subscription);
        }
        if (res.data?.user) {
          // Preserve needs_onboarding from cached user if API doesn't return it
          const updatedUser = {
            ...res.data.user,
            needs_onboarding: res.data.user.needs_onboarding ?? user.needs_onboarding,
          };
          setUser(updatedUser);
        }
      } catch {
        // Use cached data on failure
      }
    };
    fetchProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Determine active plan
  const isPremiumActive =
    subscription?.tier === "premium" &&
    subscription?.isActive &&
    (!subscription?.expiryDate ||
      new Date(subscription.expiryDate) > new Date());
  const isFreePlan = !subscription || subscription.tier === "free";

  // Reference for the email input to allow scrolling and focusing
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isHighlighted, setIsHighlighted] = useState(false);

  // How It Works - scroll-driven step animation
  const [activeStep, setActiveStep] = useState(0);
  const howItWorksSectionRef = useRef<HTMLDivElement>(null);

  // Active nav section tracking
  const [activeSection, setActiveSection] = useState("home");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const sectionIds = ["home", "about", "how-it-work", "pricing", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Subscription states
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = async () => {
    if (isSubscribing) return;

    const trimmedEmail = subscriberEmail.trim();
    if (!trimmedEmail) {
      setSubscribeStatus("error");
      setSubscribeMessage("Please enter an email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
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
        body: { email: trimmedEmail },
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
      emailInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

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

  const needsOnboarding = user?.needs_onboarding === true || (user && !user.full_name);

  const handlePremiumPlanClick = () => {
    if (!user) {
      navigate("/create-account");
      return;
    }

    if (needsOnboarding) {
      navigate("/complete-profile");
      return;
    }

    const url = `${baseRevCatUrl}/${user.id}`;
    window.location.href = url;
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideDesktop = userMenuRef.current?.contains(target);
      const isInsideMobile = mobileUserMenuRef.current?.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll-driven step progression for How It Works
  useEffect(() => {
    const handleScroll = () => {
      if (!howItWorksSectionRef.current) return;
      const wrapper = howItWorksSectionRef.current;
      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = wrapper.offsetHeight - viewportHeight;

      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      if (progress < 0.33) setActiveStep(0);
      else if (progress < 0.66) setActiveStep(1);
      else setActiveStep(2);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
          className="w-full px-5 py-5 md:px-8 md:py-8 text-left flex items-start justify-between gap-4"
        >
          <div className="flex items-center gap-4 relative">
            {/* Yellow Indicator Bar */}
            <div className="absolute -left-5 md:-left-8 w-1.5 h-6 rounded-r-full bg-[#FFC700]" />
            <h3 className="text-[18px] md:text-[22px] font-bold text-[#1D2939]">
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
          className={`px-5 md:px-8 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[500px] pb-6 md:pb-8" : "max-h-0"}`}
        >
          <p className="text-[#667085] text-[16px] md:text-lg leading-relaxed">
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
        section[id], div[id] {
          scroll-margin-top: 100px;
        }
      `}</style>

      {/* 1. NAVBAR */}
      <header className="bg-[#FDFCF6] sticky top-0 z-50 border-b border-gray-100 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[100px] py-3 md:py-6">
          <div className="flex items-center justify-between">
            {/* Logo - Fixed Path */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="Planlark Logo"
                className="h-10 w-10 md:h-16 md:w-16 object-contain"
              />
              <span className="text-[18px] md:text-[22px] font-bold text-[#1D2939] font-satoshi">
                planlark
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-14">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "how-it-work", label: "How It Work" },
                { id: "pricing", label: "Pricing" },
                { id: "faq", label: "FAQ" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-xl transition-colors ${
                    activeSection === item.id
                      ? "text-[#1D2939] font-bold"
                      : "text-[#667085] hover:text-[#1D2939]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* CTA Buttons - Desktop */}
            <div className="hidden xl:flex items-center gap-4">
              <button
                onClick={() => navigate("/contact-us")}
                className="px-8 py-3 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-colors"
              >
                Contact us
              </button>

              {user ? (
                needsOnboarding ? (
                  <button
                    onClick={() => navigate("/complete-profile")}
                    className="px-8 py-3 border border-[#1D2939] rounded-full text-[#1D2939] text-lg font-bold hover:bg-gray-50 transition-colors"
                  >
                    Complete Profile
                  </button>
                ) : (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-12 h-12 rounded-full border border-gray-200 overflow-hidden hover:border-[#FFC700] transition-all"
                  >
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt={user.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F2F4F7] flex items-center justify-center text-[#1D2939] font-bold">
                        {user.full_name?.charAt(0) ?? ""}
                      </div>
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-bold text-[#1D2939] truncate">
                          {user.full_name}
                        </p>
                        <p className="text-xs text-[#667085] truncate">
                          {user.email}
                        </p>
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
                )
              ) : (
                <button
                  onClick={() => navigate("/create-account")}
                  className="px-8 py-3 border border-[#1D2939] rounded-full text-[#1D2939] text-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Register/Login
                </button>
              )}
            </div>

            {/* Mobile: User Avatar + Hamburger */}
            <div className="xl:hidden flex items-center gap-3">
              {user && (
                needsOnboarding ? (
                  <button
                    onClick={() => navigate("/complete-profile")}
                    className="px-4 py-2 border border-[#1D2939] rounded-full text-[#1D2939] text-sm font-bold hover:bg-gray-50 transition-colors"
                  >
                    Complete Profile
                  </button>
                ) : (
                <div ref={mobileUserMenuRef}>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="w-9 h-9 md:w-11 md:h-11 rounded-full border border-gray-200 overflow-hidden hover:border-[#FFC700] transition-all"
                  >
                    {user.profile ? (
                      <img
                        src={user.profile}
                        alt={user.full_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F2F4F7] flex items-center justify-center text-[#1D2939] text-sm font-bold">
                        {user.full_name?.charAt(0) ?? ""}
                      </div>
                    )}
                  </button>

                  {/* Mobile User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-4 top-16 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 xl:hidden">
                      <div className="px-4 py-3 border-b border-gray-50">
                        <p className="text-sm font-bold text-[#1D2939] truncate">
                          {user.full_name}
                        </p>
                        <p className="text-xs text-[#667085] truncate">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                )
              )}
              <button
                className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 20 20" fill="none" stroke="#1D2939" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="3" y1="5" x2="17" y2="5" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="15" x2="13" y2="15" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full Screen */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden bg-white flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100">
            <a
              href="/"
              className="flex items-center gap-3 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setMobileNavOpen(false);
                window.location.href = "/";
              }}
            >
              <img
                src="/logo.png"
                alt="Planlark Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-[18px] font-bold text-[#1D2939] font-satoshi">
                planlark
              </span>
            </a>
            <button
              onClick={() => setMobileNavOpen(false)}
              className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col px-6 py-4 gap-2">
            {[
              { id: "home", label: "Home" },
              { id: "about", label: "About" },
              { id: "how-it-work", label: "How It Work" },
              { id: "pricing", label: "Pricing" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileNavOpen(false);
                  const el = document.getElementById(item.id);
                  if (item.id === "home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`py-4 text-[18px] font-medium transition-colors border-b border-gray-100 last:border-b-0 ${
                  activeSection === item.id
                    ? "text-[#FFC700] font-bold"
                    : "text-[#1D2939] hover:text-[#FFC700]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className="mt-auto px-6 pb-8 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                navigate("/contact-us");
              }}
              className="w-full py-3.5 rounded-full bg-[#FFC700] text-[#1D2939] font-bold text-[16px] hover:bg-[#FFD633] transition-colors"
            >
              Contact us
            </button>
            {user ? (
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  handleLogout();
                }}
                className="w-full py-3.5 rounded-full border border-red-400 text-red-600 font-bold text-[16px] hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  navigate("/create-account");
                }}
                className="w-full py-3.5 rounded-full border border-[#1D2939] text-[#1D2939] font-bold text-[16px] hover:bg-gray-50 transition-colors"
              >
                Register/Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* 2. EMAIL / NEWSLETTER ROW */}
      <div className="bg-[#282827] py-3 md:py-4">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-[100px] w-full">
          {subscribeStatus === "success" ? (
            <div className="flex justify-center items-center py-1">
              <p className="text-[#FFC700] text-base md:text-xl font-bold animate-pulse text-center">
                Successfully Subscribed! We will notify you soon.
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
              <p className="text-white text-[14px] md:text-[20px] font-normal font-satoshi text-center md:text-left md:whitespace-nowrap shrink-0">
                We Would Love To Hear From You.
              </p>
              <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
                <div className="flex flex-col flex-1 md:flex-1 md:min-w-0">
                  <div className="relative">
                    <span className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        className="md:w-5 md:h-5"
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
                      className={`w-full pl-10 md:pl-12 pr-4 md:pr-16 py-2.5 md:py-3.5 rounded-full border transition-all duration-500 ${isHighlighted ? "animate-highlight" : ""} ${subscribeStatus === "error" ? "border-red-500" : "border-white/20"} bg-transparent text-white placeholder:text-white/60 text-sm md:text-lg focus:outline-none focus:border-white/50`}
                    />
                  </div>
                  {subscribeStatus === "error" && (
                    <p className="text-red-500 text-xs mt-1 ml-3 md:ml-5">
                      {subscribeMessage}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleSubscribe}
                  disabled={isSubscribing}
                  className="px-4 md:px-6 py-2.5 md:py-3.5 bg-[#FFC700] rounded-full text-black text-sm md:text-lg font-bold hover:bg-[#E6B400] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
                >
                  {isSubscribing ? "..." : "Notify me"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. HERO SECTION */}
      <section
        id="home"
        className="relative overflow-hidden pt-10 pb-6 md:pt-20 md:pb-32"
      >
        {/* Background Dashed Circles - Scale with screen */}
        <div className="absolute -top-[200px] sm:-top-[350px] md:-top-[500px] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none">
          <div className="relative w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] md:w-[1400px] md:h-[1400px]">
            {/* Outer Circle */}
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-300" />
            {/* Inner Circle */}
            <div className="absolute inset-[60px] sm:inset-[90px] md:inset-[140px] rounded-full border border-dashed border-gray-300" />

            {/* Floating Icons - Pushed further out on mobile so they don't overlap text */}
            <img
              src="/1stillustration.png"
              className="absolute top-[50%] left-[-2%] sm:top-[40%] sm:left-[-15%] w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain opacity-100 sm:opacity-100"
              alt=""
            />
            <img
              src="/2ndillustration.png"
              className="absolute top-[77%] left-[5%] sm:top-[60%] sm:left-[1%] w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 object-contain opacity-100 sm:opacity-100"
              alt=""
            />
            <img
              src="/4thillustration.png"
              className="absolute top-[53%] right-[-3%] sm:top-[44%] sm:right-[1%] w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 object-contain opacity-100 sm:opacity-100"
              alt=""
            />
            <img
              src="/3rdillustration.png"
              className="absolute top-[83%] right-[4%] sm:top-[65%] sm:right-[8%] w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 object-contain opacity-100 sm:opacity-100"
              alt=""
            />
          </div>
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm mb-6 md:mb-8">
            <div className="flex items-center -space-x-2">
              <img
                src="https://i.pravatar.cc/100?u=1"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                alt="user"
              />
              <img
                src="https://i.pravatar.cc/100?u=2"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                alt="user"
              />
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#1D2939] border-2 border-white flex items-center justify-center text-[8px] sm:text-[10px] text-white font-bold">
                3+
              </div>
            </div>
            <span className="text-[#667085] text-xs sm:text-sm font-medium">
              Invite Friends, Plan Tours Together.
            </span>
          </div>

          {/* Hero Content */}
          <h1 className="text-[36px] sm:text-[36px] md:text-[68px] font-bold text-[#1D2939] leading-[1.15] mb-4 md:mb-6 max-w-[950px] mx-auto font-satoshi">
            Turn Group Chats <br /> Into Actual Plans
          </h1>
          <p className="text-[#667085] text-base sm:text-lg md:text-[22px] mb-8 md:mb-12 max-w-[500px] sm:max-w-[700px] mx-auto font-normal leading-relaxed px-6 sm:px-2">
            Create a plan, Invite Friends, And Get Clear Yes-Or-No Responses —
            Without Endless Back-And-Forth.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToNotify}
            className="group relative px-8 py-4 md:px-10 md:py-5 bg-[#FFC700] rounded-full overflow-hidden text-base md:text-lg font-bold text-[#1D2939] shadow-[0_10px_30px_-10px_rgba(255,199,0,0.5)] transition-all active:scale-95"
          >
            <div className="relative flex items-center justify-center overflow-hidden">
              {"Get Early Access".split("").map((char, index) => (
                <span
                  key={index}
                  className="relative inline-block transition-transform duration-500 ease-in-out"
                  style={{ transitionDelay: `${index * 0.02}s` }}
                >
                  <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">
                    {char === " " ? "\u00A0" : char}
                  </span>
                  <span className="absolute left-0 top-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                    {char === " " ? "\u00A0" : char}
                  </span>
                </span>
              ))}
            </div>
          </button>

          {/* Hero Main Image - Responsive sizing */}
          <div className="mt-8 md:mt-0">
            <img
              src="/heroImage.png"
              alt="App interface"
              className="w-full max-w-[100vw] sm:max-w-[80vw] md:max-w-[1250px] mx-auto h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* About Section - Your Smarter Way To Plan Together */}
      <section id="about" className="bg-[#FDFCF6] py-14 lg:py-8">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-[100px]">
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
                  <p className="text-[#5A5A59] text-base md:text-lg leading-relaxed font-satoshi font-normal">
                    Planlark was created to solve a simple but frustrating
                    problem: making plans with friends often goes nowhere.
                  </p>
                  <div className="border-t border-gray-200" />

                  <p className="text-[#5A5A59] text-base md:text-lg leading-relaxed font-satoshi font-normal">
                    Group chats drag on. Options pile up. People hesitate and
                    delay. In the end, nothing gets decided and plans fall
                    apart.
                  </p>
                  <div className="border-t border-gray-200" />

                  <p className="text-[#5A5A59] text-base md:text-lg leading-relaxed font-satoshi font-normal">
                    Planlark flips this by removing endless options. Instead, it
                    promotes clear commitments with a single plan and a deadline
                    to respond.
                  </p>
                  <div className="border-t border-gray-200" />

                  <h2 className="text-[#282827] text-lg md:text-2xl font-medium leading-relaxed font-satoshi">
                    Clear plans. Firm deadlines. Real results.
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Easy Steps (Scroll-driven) */}
      <div
        id="how-it-work"
        ref={howItWorksSectionRef}
        className="relative"
        style={{ height: "250vh" }}
      >
        <section className="bg-[#FDFCF6] py-8 md:py-12 lg:py-20 sticky top-0 min-h-screen flex flex-col justify-center overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-[100px] w-full">
            <div className="flex flex-col items-center">
              {/* 1. Section Header */}
              <div className="text-center max-w-[800px] mb-6 md:mb-10">
                <div className="inline-flex px-4 py-1.5 rounded-full border border-[#2828271A] mb-2 bg-transparent">
                  <span className="text-[#28282799] text-sm font-medium">
                    How It Work
                  </span>
                </div>
                <h2 className="text-[28px] md:text-[44px] font-bold text-[#282827] leading-tight mb-3">
                  Plan Your Perfect Trip In Just{" "}
                  <br className="hidden md:block" /> 3 Easy Steps.
                </h2>
                <p className="text-[#667085] text-base md:text-lg font-normal">
                  A Simple Workflow To Create, Manage, And Share Your Travel
                  Plans.
                </p>
              </div>

              {/* 2. Steps Flow Container */}
              <div className="w-full max-w-[1600px]">
                {/* Step Numbers with Dashed Line */}
                <div className="relative flex justify-between items-center max-w-[300px] md:max-w-[900px] mx-auto mb-8 md:mb-12">
                  <div className="absolute top-1/2 inset-x-8 md:inset-x-16 h-px -z-0 bg-[repeating-linear-gradient(to_right,rgba(209,213,219,1)_0,rgba(209,213,219,1)_8px,transparent_8px,transparent_16px)]"></div>
                  <div
                    className="absolute top-1/2 left-8 md:left-16 h-[2px] -z-0 bg-[#FFC700] transition-all duration-500 rounded-full"
                    style={{
                      width: `${activeStep * 50}%`,
                      maxWidth: "calc(100% - 64px)",
                    }}
                  />

                  {[0, 1, 2].map((step) => (
                    <div
                      key={step}
                      className={`relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-base md:text-lg font-bold border-4 border-[#FDFCF6] transition-all duration-500 ${
                        activeStep === step
                          ? "bg-[#FFC700] text-black scale-110"
                          : "bg-[#F2F4F7] text-[#667085]"
                      }`}
                    >
                      {step + 1}
                    </div>
                  ))}
                </div>

                {/* Steps Content */}
                {(() => {
                  const steps = [
                    {
                      title: "Creating A Clear Plan",
                      desc: "Turn Your Travel Ideas Into A Real Plan, Instantly.",
                      src: "/step1Img.png",
                      alt: "Step 1",
                    },
                    {
                      title: "Sharing It With Friends",
                      desc: "Send Your Plan To Friends Instantly And Collaborate In Real Time.",
                      src: "/Step2Img.png",
                      alt: "Step 2",
                    },
                    {
                      title: "Get Responses",
                      desc: "Connect, Collaborate, And Create Unforgettable Journeys.",
                      src: "/Step3Img.png",
                      alt: "Step 3",
                    },
                  ];

                  return (
                    <>
                      {/* Mobile View: Fixed clipping and updated indicators */}
                      <div className="md:hidden flex flex-col items-center">
                        <div className="text-center mb-6 h-20">
                          <h3 className="text-[20px] font-semibold text-[#1D2939] mb-1">
                            {steps[activeStep].title}
                          </h3>
                          <p className="text-[#667085] text-sm px-4">
                            {steps[activeStep].desc}
                          </p>
                        </div>
                        
                        {/* Image Frame with Aspect Ratio to prevent cutting */}
                        <div className="relative w-full max-w-[280px] aspect-[3/4] mb-8">
                          {steps.map((step, index) => (
                            <div
                              key={index}
                              className="absolute inset-0 transition-all duration-700 ease-in-out"
                              style={{
                                transform: `translateX(${(index - activeStep) * 105}%)`,
                                opacity: activeStep === index ? 1 : 0,
                                visibility: Math.abs(index - activeStep) > 1 ? 'hidden' : 'visible'
                              }}
                            >
                              <div className="h-full w-full rounded-[32px] border-2 border-[#FFC700] bg-white shadow-[0_10px_40px_-10px_rgba(255,199,0,0.2)] p-5 flex items-center justify-center">
                                <img
                                  src={step.src}
                                  alt={step.alt}
                                  className="max-h-full max-w-full object-contain"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Updated Dot indicators - Matching Image Style */}
                        <div className="flex justify-center items-center gap-2">
                          {steps.map((_, index) => (
                            <div
                              key={index}
                              className={`transition-all duration-500 rounded-full ${
                                activeStep === index
                                  ? "w-8 h-2.5 bg-[#FFC700]" // Pill
                                  : "w-2.5 h-2.5 bg-[#D1D5DB]" // Dot
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Desktop View (Unchanged Logic, Visual tweaks) */}
                      <div className="hidden md:block">
                        <div className="grid grid-cols-3 gap-8 text-center mb-10">
                          {steps.map((step, index) => (
                            <div
                              key={index}
                              className={`transition-opacity duration-500 ${activeStep === index ? "opacity-100" : "opacity-40"}`}
                            >
                              <h3 className="text-[22px] font-semibold text-[#1D2939] mb-2">
                                {step.title}
                              </h3>
                              <p className="text-[#667085] text-lg">
                                {step.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-8 items-end">
                          {steps.map((step, index) => (
                            <div
                              key={index}
                              className={`rounded-[32px] border-2 p-6 flex items-center justify-center h-[350px] transition-all duration-700 ${
                                activeStep === index
                                  ? "border-[#FFC700] shadow-[0_20px_50px_-12px_rgba(255,199,0,0.25)] scale-105 bg-white"
                                  : "border-gray-100 opacity-50 scale-95"
                              }`}
                            >
                              <img
                                src={step.src}
                                alt={step.alt}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Pricing Section */}
      <section id="pricing" className="bg-[#FDFCF6] py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-[100px]">
          {/* Top Content: Header & Rocket */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-10 mb-14">
            <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start lg:max-w-[600px]">
              <div className="flex-1">
                <div className="inline-flex px-4 py-1.5 rounded-full border border-[#2828271A] mb-4 bg-transparent">
                  <span className="text-[#28282799] text-sm font-medium">
                    Pricing
                  </span>
                </div>
                <h2 className="text-[28px] md:text-[44px] font-bold text-[#282827] leading-[1.1] mb-4 font-satoshi">
                  Flexible Pricing for Every Need
                </h2>
                <p className="text-[#667085] text-base md:text-lg max-w-[550px]">
                  Planlark Makes Trip Planning Easy, Fast, And Enjoyable
                  For Everyone.
                </p>
              </div>
              {/* Rocket - Mobile: beside text */}
              <img
                src="/pricingRocketImg.png"
                alt="Rocket illustration"
                className="w-[100px] h-auto object-contain flex-shrink-0 lg:hidden"
              />
            </div>

            {/* Rocket - Desktop */}
            <div className="hidden lg:block">
              <img
                src="/pricingRocketImg.png"
                alt="Rocket illustration"
                className="w-[350px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 max-w-[1600px]">
            {/* 1. Free Plan Card */}
            <div className="rounded-[32px] bg-white border border-gray-100 p-6 md:p-7 flex flex-col justify-between shadow-[0px_20px_50px_rgba(0,0,0,0.05)] ">
              <div className="flex flex-row items-start gap-0">
                {/* Price Column */}
                <div className="flex-1">
                  <div className="inline-flex px-4 py-1.5 rounded-full border border-gray-100 mb-4 sm:mb-6">
                    <span className="text-sm font-medium text-[#1D2939]">
                      Free
                    </span>
                  </div>
                  <div className="text-[36px] sm:text-[40px] md:text-[48px] font-bold text-[#1D2939] leading-none mb-1">
                    Free
                  </div>
                  <p className="text-[#667085] text-sm md:text-base">
                    Upto 5 plans
                  </p>
                </div>

                {/* Benefits Column */}
                <div className="flex-1 pt-4">
                  <p className="text-[#1D2939] font-bold text-base md:text-lg mb-3">
                    Benefits:
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      "Create up to 5 plans",
                      "Create group with friends",
                      "Accept plans from friends",
                      "Share plans with friends",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-[#667085]"
                      >
                        <img
                          src="/check circle.png"
                          alt="check"
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={!user ? () => navigate("/create-account") : needsOnboarding ? () => navigate("/complete-profile") : undefined}
                disabled={user && !needsOnboarding ? isPremiumActive || isFreePlan : false}
                className={`w-full mt-8 py-3 rounded-full text-base md:text-lg font-bold transition-colors ${
                  user && !needsOnboarding && isPremiumActive
                    ? "bg-[#F2F4F7] text-[#98A2B3] cursor-not-allowed"
                    : user && !needsOnboarding && isFreePlan
                      ? "bg-[#F2F4F7] text-[#1D2939] cursor-default"
                      : "bg-[#F2F4F7] text-[#1D2939] hover:bg-gray-200"
                }`}
              >
                {user && !needsOnboarding && isFreePlan ? "Selected Plan" : "Select Plan"}
              </button>
            </div>

            {/* 2. Premium Monthly Plan Card */}
            <div className="rounded-[32px] bg-white border-2 border-[#FFC700] p-6 md:p-7 flex flex-col justify-between shadow-[0_20px_50px_-15px_rgba(255,199,0,0.3)] relative">
              <div className="flex flex-row items-start gap-0">
                {/* Price Column */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2828271A] mb-4 sm:mb-6">
                    <span className="text-sm font-medium text-[#1D2939]">
                      Premium
                    </span>
                    <img src="/crown.png" alt="crown" className="w-4 h-4" />
                  </div>
                  <div className="text-[36px] sm:text-[40px] md:text-[48px] font-bold text-[#1D2939] leading-none mb-1">
                    $2.99
                  </div>
                  <p className="text-[#667085] text-sm md:text-base">
                    Per Month
                  </p>
                </div>

                {/* Benefits Column */}
                <div className="flex-1 pt-4">
                  <p className="text-[#1D2939] font-bold text-base md:text-lg mb-3">
                    Benefits:
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      "Unlimited plans",
                      "Create group with friends",
                      "Accept plans with friends",
                      "Share plans with friends",
                      "Cancel anytime",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-[#667085]"
                      >
                        <img
                          src="/check circle.png"
                          alt="check"
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={isPremiumActive ? undefined : handlePremiumPlanClick}
                disabled={isPremiumActive}
                className={`w-full mt-8 py-3 rounded-full text-base md:text-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                  isPremiumActive
                    ? "bg-[#FFC700]/60 text-black/50 cursor-default"
                    : "bg-[#FFC700] text-black hover:bg-[#E6B400]"
                }`}
              >
                {isPremiumActive ? "Selected Plan" : "Select Plan"}
              </button>
            </div>

            {/* 3. Premium Yearly Plan Card */}
            <div className="rounded-[32px] bg-white border border-gray-100 p-6 md:p-7 flex flex-col justify-between shadow-[0px_20px_50px_rgba(0,0,0,0.05)] relative">
              <div className="flex flex-row items-start gap-0">
                {/* Price Column */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2828271A] mb-4 sm:mb-6">
                    <span className="text-sm font-medium text-[#1D2939]">
                      Premium
                    </span>
                    <img src="/crown.png" alt="crown" className="w-4 h-4" />
                  </div>
                  <div className="text-[36px] sm:text-[40px] md:text-[48px] font-bold text-[#1D2939] leading-none mb-1">
                    $19.99
                  </div>
                  <p className="text-[#667085] text-sm md:text-base">
                    Per Year
                  </p>
                </div>

                {/* Benefits Column */}
                <div className="flex-1 pt-4">
                  <p className="text-[#1D2939] font-bold text-base md:text-lg mb-3">
                    Benefits:
                  </p>
                  <ul className="space-y-3 sm:space-y-4">
                    {[
                      "Unlimited plans",
                      "Create group with friends",
                      "Accept plans with friends",
                      "Share plans with friends",
                      "Cancel anytime",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-[#667085]"
                      >
                        <img
                          src="/check circle.png"
                          alt="check"
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={isPremiumActive ? undefined : handlePremiumPlanClick}
                disabled={isPremiumActive}
                className={`w-full mt-8 py-3 rounded-full text-base md:text-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                  isPremiumActive
                    ? "bg-[#FFC700]/60 text-black/50 cursor-default"
                    : "bg-[#FFC700] text-black hover:bg-[#E6B400]"
                }`}
              >
                {isPremiumActive ? "Selected Plan" : "Select Plan"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 lg:py-24 bg-[#FDFCF6]">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-[100px]">
          {/* Header Row: Title + Illustration */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-10 mb-12">
            <div className="max-w-[900px] text-center lg:text-left">
              <div className="inline-flex px-4 py-1.5 rounded-full border border-[#2828271A] mb-4 bg-transparent">
                <span className="text-[#28282799] text-sm font-medium">
                  FAQ
                </span>
              </div>
              <h2 className="text-[28px] md:text-[48px] font-bold text-[#282827] leading-[1.1] mb-4 font-satoshi">
                Frequently asked questions
              </h2>
              <p className="text-[#667085] text-base md:text-lg max-w-[550px] mx-auto lg:mx-0">
                Clear Answers To Help You Use Planlark With Confidence And Enjoy
                Smooth, Stress-Free Tour Planning With Your Friends.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end w-full lg:w-auto">
              <img
                src="/faqImg.png"
                alt="FAQ illustration"
                className="w-[250px] md:w-[320px] lg:w-[380px] h-auto object-contain"
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
        <div className="max-w-[1600px] mx-auto px-6 lg:px-[100px]">
          {/* Mobile Footer - centered vertical layout */}
          <div className="flex flex-col items-center gap-8 lg:hidden mb-10">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/";
              }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src="/FooterLogo.png"
                alt="Planlark Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-[24px] font-bold text-white font-satoshi">
                planlark
              </span>
            </a>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {[
                { icon: "facebook", path: "/facebookLogo.png" },
                { icon: "instagram", path: "/InstagramLogo.png" },
                { icon: "tiktok", path: "/tiktokLogo.png" },
                { icon: "x", path: "/twitterLogo.png" },
              ].map((social) => (
                <a
                  key={social.icon}
                  href="#"
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                >
                  <img width="18" height="18" src={social.path} alt={social.icon} />
                </a>
              ))}
            </div>

            {/* Nav Links - horizontal centered row */}
            <nav className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3">
              {["Home", "About", "How It Work", "Pricing", "FAQ"].map(
                (link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/80 text-base hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                ),
              )}
            </nav>

            {/* Download Section */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-white text-lg font-bold">Download our app</h3>
              <div className="flex gap-3">
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-[44px] w-auto"
                  />
                </a>
                <a href="#" className="hover:opacity-80 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-[44px] w-auto"
                  />
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10" />

            {/* Copyright */}
            <p className="text-white/60 text-sm font-normal">
              © Sparkly Inc. All Rights Reserved.
            </p>
          </div>

          {/* Desktop Footer - original layout */}
          <div className="hidden lg:block">
            {/* Top Section */}
            <div className="flex flex-row justify-between items-start gap-12 mb-16">
              {/* Left: Logo & Nav Links */}
              <div className="flex flex-col gap-10">
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <img
                    src="/FooterLogo.png"
                    alt="Planlark Logo"
                    className="h-10 w-10 object-contain"
                  />
                  <span className="text-[24px] font-bold text-white font-satoshi">
                    planlark
                  </span>
                </a>

                <nav className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {["Home", "About", "How It Work", "Pricing", "FAQ"].map(
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
              <div className="flex flex-col items-start gap-6">
                <h3 className="text-white text-xl font-bold">Download our app</h3>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="App Store"
                      className="h-[50px] w-auto"
                    />
                  </a>
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
            <div className="flex flex-row items-center justify-between gap-6">
              <p className="text-white/60 text-lg font-normal">
                © Sparkly Inc. All Rights Reserved.
              </p>

              <div className="flex items-center gap-4">
                {[
                  { icon: "facebook", path: "/facebookLogo.png" },
                  { icon: "instagram", path: "/InstagramLogo.png" },
                  { icon: "tiktok", path: "/tiktokLogo.png" },
                  { icon: "x", path: "/twitterLogo.png" },
                ].map((social) => (
                  <a
                    key={social.icon}
                    href="#"
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                  >
                    <img width="20" height="20" src={social.path} alt={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
