import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-planlift-cream">
      {/* Header */}
      <header className="border-b border-planlift-gray-border bg-planlift-cream">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px] py-8">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2F6a4de2054f21403ca4c69a8742227895?format=webp&width=100" 
                alt="Planlift Logo" 
                className="h-10 w-10"
              />
              <span className="text-2xl sm:text-[28px] font-bold text-planlift-dark font-satoshi">Planlift</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              <a href="#home" className="text-planlift-gray text-lg xl:text-2xl font-bold hover:text-planlift-dark transition-colors">Home</a>
              <a href="#about" className="text-planlift-gray text-lg xl:text-2xl font-normal hover:text-planlift-dark transition-colors">About</a>
              <a href="#how-it-work" className="text-planlift-gray text-lg xl:text-2xl font-normal hover:text-planlift-dark transition-colors">How it work</a>
              <a href="#pricing" className="text-planlift-gray text-lg xl:text-2xl font-normal hover:text-planlift-dark transition-colors">Pricing</a>
              <a href="#faq" className="text-planlift-gray text-lg xl:text-2xl font-normal hover:text-planlift-dark transition-colors">FAQ</a>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="px-6 lg:px-8 py-3 lg:py-4 bg-planlift-yellow rounded-full text-black text-base lg:text-lg font-bold hover:bg-yellow-500 transition-colors">
                Contact us
              </button>
              <button className="px-6 lg:px-8 py-3 lg:py-4 border border-planlift-dark rounded-full text-planlift-dark text-base lg:text-lg font-bold hover:bg-gray-50 transition-colors">
                Create Account
              </button>
            </div>

            {/* Mobile menu button */}
            <button className="lg:hidden p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Newsletter Bar */}
      <div className="bg-planlift-dark py-6 sm:py-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[100px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white text-lg sm:text-xl font-normal text-center md:text-left">
              We would love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full sm:w-[350px]">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full px-6 py-4 rounded-full border border-white/40 bg-transparent text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                />
                <svg className="absolute left-6 top-1/2 -translate-y-1/2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                  <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <button className="w-full sm:w-auto px-8 py-4 bg-planlift-yellow rounded-full text-black text-lg font-bold hover:bg-yellow-500 transition-colors">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="relative bg-planlift-cream overflow-hidden py-12 sm:py-16 lg:py-20">
        {/* Decorative circles */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 pointer-events-none">
          <div className="relative w-[1214px] h-[1214px]">
            <div className="absolute inset-[107px] rounded-full border border-dashed border-black/20" />
            <div className="absolute inset-0 rounded-full border border-dashed border-black/20" />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 relative">
          <div className="max-w-[850px] mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-planlift-gray-border mb-4">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=1" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?img=2" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center backdrop-blur">
                  <span className="text-xs font-bold text-white">3+</span>
                </div>
              </div>
              <span className="text-planlift-gray text-sm">Invite Friends, Plan Tours Together.</span>
            </div>

            {/* Hero Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold text-planlift-dark leading-tight mb-4">
              Smarter Tour Planning in One Powerful App.
            </h1>

            {/* Subtitle */}
            <p className="text-planlift-gray text-lg sm:text-xl mb-8">
              Plan tours, invite friends, and manage everything in one simple app.
            </p>

            {/* CTA Button */}
            <button className="px-8 py-4 bg-planlift-yellow rounded-full text-black text-lg font-bold hover:bg-yellow-500 transition-colors mb-12">
              Download App
            </button>

            {/* Hero Image */}
            <div className="relative max-w-[850px] mx-auto">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2F51732a9b8437444a98f83596348b0e9c?format=webp&width=1200" 
                alt="App mockup with tour planning interface" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section - Your Smarter Way To Plan Together */}
      <section id="about" className="border-t border-planlift-gray-border bg-planlift-cream py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[163px]">
          <div className="flex flex-col items-center gap-10">
            {/* Section Header */}
            <div className="text-center max-w-[560px]">
              <div className="inline-flex px-4 py-2 rounded-full border border-planlift-gray-border mb-4">
                <span className="text-black/60 text-sm font-medium">About Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-planlift-dark leading-tight">
                Your Smarter Way to Plan Together
              </h2>
            </div>

            {/* Image */}
            <div className="w-full max-w-[1115px]">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2F35d8e1cb887e432d9d85d751d05b45ba?format=webp&width=1200" 
                alt="Friends planning together" 
                className="w-full h-auto rounded-2xl"
              />
            </div>

            {/* CTA Button */}
            <button className="px-8 py-4 bg-planlift-yellow rounded-full text-black text-base font-medium hover:bg-yellow-500 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* How It Works - 3 Easy Steps */}
      <section id="how-it-work" className="border-t border-planlift-gray-border bg-planlift-cream py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24">
          <div className="flex flex-col items-center gap-12">
            {/* Section Header */}
            <div className="text-center max-w-[700px]">
              <div className="inline-flex px-4 py-2 rounded-full border border-planlift-gray-border mb-4">
                <span className="text-planlift-gray text-sm">How It Work</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-planlift-dark leading-tight mb-4">
                Plan Your Perfect Trip in Just 3 Easy Steps.
              </h2>
              <p className="text-planlift-gray text-lg sm:text-xl">
                A Simple Workflow To Create, Manage, And Share Your Travel Plans.
              </p>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full max-w-[1154px]">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-full aspect-square max-w-[280px] flex items-center justify-center">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2F2f69b445efde498e9564d2cf2557c10a?format=webp&width=600" 
                    alt="Create a clear plan" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-planlift-yellow flex items-center justify-center text-black text-xl font-bold mb-3 mx-auto">
                    1
                  </div>
                  <h3 className="text-xl lg:text-2xl font-medium text-black mb-3">
                    Creating a Clear Plan
                  </h3>
                  <p className="text-black/60 text-base lg:text-xl">
                    Turn your travel ideas into a real plan, instantly.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-full aspect-square max-w-[280px] flex items-center justify-center">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2Ff3396bb161b8477694f4e1b3c9569a6c?format=webp&width=600" 
                    alt="Share with friends" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-planlift-yellow flex items-center justify-center text-black text-xl font-bold mb-3 mx-auto">
                    2
                  </div>
                  <h3 className="text-xl lg:text-2xl font-medium text-black mb-3">
                    Sharing it With Friends
                  </h3>
                  <p className="text-black/60 text-base lg:text-xl">
                    Send your plan to friends instantly and collaborate in real time.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-full aspect-square max-w-[280px] flex items-center justify-center">
                  <img 
                    src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2F7b82d601f4b542aa8b8283a90b4c2b6a?format=webp&width=600" 
                    alt="Get responses" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-planlift-yellow flex items-center justify-center text-black text-xl font-bold mb-3 mx-auto">
                    3
                  </div>
                  <h3 className="text-xl lg:text-2xl font-medium text-black mb-3">
                    Get Responses
                  </h3>
                  <p className="text-black/60 text-base lg:text-xl">
                    Connect, collaborate, and create unforgettable journeys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-planlift-gray-border bg-planlift-cream py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Left Content */}
            <div className="flex-1 max-w-[483px]">
              <div className="inline-flex px-4 py-2 rounded-full border border-planlift-gray-border mb-4">
                <span className="text-planlift-gray text-sm">Pricing</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-planlift-dark leading-tight mb-4">
                Flexible Pricing for Every Need
              </h2>
              <p className="text-planlift-gray text-lg sm:text-xl mb-8">
                Planlift makes trip planning easy, fast, and enjoyable for everyone.
              </p>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2F20a4cddb8b3a4bad996976fd6ae547da?format=webp&width=600" 
                alt="Rocket illustration" 
                className="w-[313px] h-auto"
              />
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-12 max-w-[1114px]">
            {/* Free Plan */}
            <div className="bg-white rounded-3xl border border-gray-200 p-6">
              <div className="inline-flex px-4 py-2 rounded-full border border-planlift-gray-border mb-6">
                <span className="text-sm font-medium">Free</span>
              </div>

              <div className="mb-6">
                <div className="text-5xl lg:text-[64px] font-medium text-black mb-1">$00</div>
                <div className="text-black/60 text-lg font-general-sans">Per Brand, Per Month</div>
              </div>

              <div className="border-t border-planlift-gray-border my-6" />

              <div className="mb-8">
                <p className="text-black font-general-sans text-lg mb-4">Benefits:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">Create up to 5 plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">Group tour planning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">Share with friends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="#131313" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">Cancel anytime</span>
                  </li>
                </ul>
              </div>

              <button className="w-full px-8 py-4 bg-gray-100 rounded-full text-black text-base font-medium hover:bg-gray-200 transition-colors">
                Select Plan
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-3xl border-2 border-planlift-yellow shadow-[0_1px_14.1px_0_#B38C00] p-6">
              <div className="inline-flex px-4 py-2 rounded-full border border-planlift-gray-border mb-6 gap-2">
                <span className="text-sm font-medium font-general-sans">Premium</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11.1335 12.6532H4.8668C4.5868 12.6532 4.27347 12.4332 4.18013 12.1666L1.42013 4.44658C1.0268 3.33991 1.4868 2.99991 2.43347 3.67991L5.03347 5.53991C5.4668 5.83991 5.96013 5.68658 6.1468 5.19991L7.32013 2.07324C7.69347 1.07324 8.31347 1.07324 8.6868 2.07324L9.86013 5.19991C10.0468 5.68658 10.5401 5.83991 10.9668 5.53991L13.4068 3.79991C14.4468 3.05324 14.9468 3.43324 14.5201 4.63991L11.8268 12.1799C11.7268 12.4332 11.4135 12.6532 11.1335 12.6532Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.33398 14.6667H11.6673" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6.33398 9.33325H9.66732" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div className="mb-6">
                <div className="text-5xl lg:text-[64px] font-medium text-black mb-1">$3.99</div>
                <div className="text-black/60 text-lg font-general-sans">Per Brand, Per Year</div>
              </div>

              <div className="border-t border-black/10 my-6" />

              <div className="mb-8">
                <p className="text-black font-general-sans text-lg mb-4">Benefits:</p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">Unlimited plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">All Pro features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">Best value yearly plan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M6 7.17243L8.0202 9.33341L12.6667 4.66675" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C8.65479 2 9.28509 2.10489 9.875 2.29878" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-black/60">Cancel anytime</span>
                  </li>
                </ul>
              </div>

              <button className="w-full px-8 py-4 bg-planlift-yellow rounded-full text-black text-base font-normal hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
                Select Plan
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-t border-planlift-gray-border bg-planlift-cream py-16 lg:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[167px]">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            {/* Left Side */}
            <div className="flex-1 max-w-[644px]">
              <div className="inline-flex px-4 py-2 rounded-full border border-planlift-gray-border mb-4">
                <span className="text-planlift-gray text-sm">FAQ</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-planlift-dark font-manrope leading-tight mb-4">
                Frequently asked questions
              </h2>
              <p className="text-planlift-gray text-lg sm:text-xl mb-12">
                Clear answers to help you use Planlift with confidence and enjoy smooth, stress-free tour planning with your friends.
              </p>

              {/* FAQ Items - Left Column */}
              <div className="space-y-6">
                {/* FAQ 1 */}
                <div className="rounded-3xl border border-gray-300 overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(0)}
                    className="w-full px-5 py-10 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-5">
                      <div className={`w-1 flex-shrink-0 ${openFaqIndex === 0 ? 'bg-planlift-yellow' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-black mb-3">What is Planlift?</h3>
                        {openFaqIndex === 0 && (
                          <p className="text-base text-planlift-gray/60 pr-4">
                            PlanLift is an app that helps you make clear and decisive plans with friends. Instead of long back and forth conversations, you can create a plan, share it, and get a clear response within a set timeframe.
                          </p>
                        )}
                      </div>
                    </div>
                    <svg 
                      className="flex-shrink-0 mt-1" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      {openFaqIndex === 0 ? (
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11L19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12Z" fill="black"/>
                      ) : (
                        <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10.9999L5 10.9999C4.44772 10.9999 4 11.4476 4 11.9999C4 12.5522 4.44771 12.9999 5 12.9999L11 12.9999V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V12.9999L19 12.9999C19.5523 12.9999 20 12.5522 20 11.9999C20 11.4476 19.5523 10.9999 19 10.9999L13 10.9999V5Z" fill="black"/>
                      )}
                    </svg>
                  </button>
                </div>

                {/* FAQ 2 */}
                <div className="rounded-3xl border border-gray-300 overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(1)}
                    className="w-full px-5 py-10 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-5">
                      <div className={`w-1 flex-shrink-0 ${openFaqIndex === 1 ? 'bg-planlift-yellow' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-black">How does it work?</h3>
                      </div>
                    </div>
                    <svg 
                      className="flex-shrink-0 mt-1" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10.9999L5 10.9999C4.44772 10.9999 4 11.4476 4 11.9999C4 12.5522 4.44771 12.9999 5 12.9999L11 12.9999V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V12.9999L19 12.9999C19.5523 12.9999 20 12.5522 20 11.9999C20 11.4476 19.5523 10.9999 19 10.9999L13 10.9999V5Z" fill="black"/>
                    </svg>
                  </button>
                </div>

                {/* FAQ 3 */}
                <div className="rounded-3xl border border-gray-300 overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(2)}
                    className="w-full px-5 py-10 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-5">
                      <div className={`w-1 flex-shrink-0 ${openFaqIndex === 2 ? 'bg-planlift-yellow' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-black">What happens after I make a plan?</h3>
                      </div>
                    </div>
                    <svg 
                      className="flex-shrink-0 mt-1" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10.9999L5 10.9999C4.44772 10.9999 4 11.4476 4 11.9999C4 12.5522 4.44771 12.9999 5 12.9999L11 12.9999V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V12.9999L19 12.9999C19.5523 12.9999 20 12.5522 20 11.9999C20 11.4476 19.5523 10.9999 19 10.9999L13 10.9999V5Z" fill="black"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 max-w-[513px]">
              <div className="mb-12 lg:mt-[171px]">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2Fa2b01c603a1e40468d0227ef83c41a6b?format=webp&width=600" 
                  alt="FAQ illustration" 
                  className="w-[283px] h-auto mx-auto lg:mx-0"
                />
              </div>

              {/* FAQ Items - Right Column */}
              <div className="space-y-6">
                {/* FAQ 4 */}
                <div className="rounded-3xl border border-gray-300 overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(3)}
                    className="w-full px-5 py-10 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-5">
                      <div className={`w-1 flex-shrink-0 ${openFaqIndex === 3 ? 'bg-planlift-yellow' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-black mb-3">What can I use PlanLift for?</h3>
                      </div>
                    </div>
                    <svg 
                      className="flex-shrink-0 mt-1" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10.9999L5 10.9999C4.44772 10.9999 4 11.4476 4 11.9999C4 12.5522 4.44771 12.9999 5 12.9999L11 12.9999V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V12.9999L19 12.9999C19.5523 12.9999 20 12.5522 20 11.9999C20 11.4476 19.5523 10.9999 19 10.9999L13 10.9999V5Z" fill="black"/>
                    </svg>
                  </button>
                </div>

                {/* FAQ 5 */}
                <div className="rounded-3xl border border-gray-300 overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(4)}
                    className="w-full px-5 py-10 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-5">
                      <div className={`w-1 flex-shrink-0 ${openFaqIndex === 4 ? 'bg-planlift-yellow' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-black mb-3">Do my friends need PlanLift?</h3>
                        {openFaqIndex === 4 && (
                          <p className="text-base text-planlift-gray/60 pr-4">
                            Yes. When you send a plan, your friends will be prompted to download PlanLift so they can respond. We recommend encouraging them to download the app so you can continue making plans with each other more easily.
                          </p>
                        )}
                      </div>
                    </div>
                    <svg 
                      className="flex-shrink-0 mt-1" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      {openFaqIndex === 4 ? (
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 12C4 11.4477 4.44772 11 5 11L19 11C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13L5 13C4.44772 13 4 12.5523 4 12Z" fill="black"/>
                      ) : (
                        <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10.9999L5 10.9999C4.44772 10.9999 4 11.4476 4 11.9999C4 12.5522 4.44771 12.9999 5 12.9999L11 12.9999V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V12.9999L19 12.9999C19.5523 12.9999 20 12.5522 20 11.9999C20 11.4476 19.5523 10.9999 19 10.9999L13 10.9999V5Z" fill="black"/>
                      )}
                    </svg>
                  </button>
                </div>

                {/* FAQ 6 */}
                <div className="rounded-3xl border border-gray-300 overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(5)}
                    className="w-full px-5 py-10 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-5">
                      <div className={`w-1 flex-shrink-0 ${openFaqIndex === 5 ? 'bg-planlift-yellow' : 'bg-transparent'}`} />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-black">Is it free?</h3>
                      </div>
                    </div>
                    <svg 
                      className="flex-shrink-0 mt-1" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5V10.9999L5 10.9999C4.44772 10.9999 4 11.4476 4 11.9999C4 12.5522 4.44771 12.9999 5 12.9999L11 12.9999V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V12.9999L19 12.9999C19.5523 12.9999 20 12.5522 20 11.9999C20 11.4476 19.5523 10.9999 19 10.9999L13 10.9999V5Z" fill="black"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-planlift-yellow rounded-full text-planlift-dark text-lg font-bold hover:bg-yellow-500 transition-colors lowercase">
              Ask a Questions
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-planlift-dark py-16 lg:py-[70px]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[141px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Column 1 - Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img 
                  src="https://cdn.builder.io/api/v1/image/assets%2F712777f382274689b287e591644a3bb1%2F6a4de2054f21403ca4c69a8742227895?format=webp&width=100" 
                  alt="Planlift Logo" 
                  className="h-10 w-10"
                />
                <span className="text-2xl lg:text-[28px] font-bold text-white font-satoshi">Planlift</span>
              </Link>
              <p className="text-white text-lg mb-6 max-w-[339px]">
                Planlif turns your ideas into clear plans and lets you share and collaborate instantly — all in one simple app.
              </p>
              <button className="px-8 py-4 bg-planlift-yellow rounded-full text-black text-lg font-bold hover:bg-yellow-500 transition-colors">
                Download App
              </button>
            </div>

            {/* Column 2 - Links */}
            <div>
              <h3 className="text-white text-xl font-bold font-manrope mb-8">Links</h3>
              <ul className="space-y-6">
                <li><a href="#how-it-work" className="text-white text-lg hover:text-planlift-yellow transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="text-white text-lg hover:text-planlift-yellow transition-colors">Pricing</a></li>
                <li><a href="#" className="text-white text-lg hover:text-planlift-yellow transition-colors">Contact us</a></li>
              </ul>
            </div>

            {/* Column 3 - Explore */}
            <div>
              <h3 className="text-white text-xl font-bold font-manrope mb-8">Explore</h3>
              <ul className="space-y-6">
                <li><a href="#" className="text-white text-lg hover:text-planlift-yellow transition-colors">Group Tour Planning</a></li>
                <li><a href="#" className="text-white text-lg hover:text-planlift-yellow transition-colors">Travel Chat</a></li>
                <li><a href="#" className="text-white text-lg hover:text-planlift-yellow transition-colors">Invite Friends</a></li>
                <li><a href="#" className="text-white text-lg hover:text-planlift-yellow transition-colors">Tour Management</a></li>
              </ul>
            </div>

            {/* Column 4 - Download */}
            <div>
              <h3 className="text-white text-xl font-bold mb-8">Download our app</h3>
              <div className="space-y-4">
                <a href="#" className="flex items-center justify-between px-4 py-4 rounded-xl border border-white/40 hover:border-white transition-colors">
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M14.9392 4.69C15.3172 4.25428 15.6055 3.74817 15.7874 3.20074C15.9693 2.6533 16.0413 2.07533 15.9992 1.5C14.8386 1.59369 13.7612 2.13956 12.9992 3.02C12.6343 3.44198 12.3578 3.93288 12.186 4.46364C12.0142 4.99441 11.9507 5.55424 11.9992 6.11C12.5653 6.11472 13.125 5.9891 13.6348 5.74286C14.1446 5.49662 14.5909 5.13637 14.9392 4.69ZM17.4592 12.13C17.4659 11.3637 17.6677 10.6118 18.0456 9.9452C18.4236 9.27859 18.9651 8.71926 19.6192 8.32C19.2064 7.72524 18.6607 7.23483 18.0254 6.88767C17.3901 6.54052 16.6827 6.34615 15.9592 6.32C14.3992 6.16 12.9592 7.23 12.1292 7.23C11.2992 7.23 10.1292 6.34 8.82918 6.36C7.97931 6.388 7.1512 6.63578 6.42563 7.07919C5.70005 7.52259 5.10179 8.14648 4.68918 8.89C2.92918 11.95 4.23918 16.5 5.99918 18.97C6.79918 20.18 7.79918 21.55 9.11918 21.5C10.4392 21.45 10.8692 20.68 12.3992 20.68C13.9292 20.68 14.3992 21.5 15.6992 21.47C16.9992 21.44 17.9192 20.23 18.7592 19.02C19.3542 18.1415 19.819 17.1816 20.1392 16.17C19.3467 15.832 18.6705 15.2693 18.1942 14.5513C17.7179 13.8333 17.4624 12.9916 17.4592 12.13Z" fill="white"/>
                    </svg>
                    <span className="text-white text-lg font-bold">App store</span>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                <a href="#" className="flex items-center justify-between px-4 py-4 rounded-xl border border-white/40 hover:border-white transition-colors">
                  <div className="flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M20.3992 11.4398V11.6198C20.3992 12.0998 20.0992 12.5798 19.6792 12.8198L16.3792 14.7398L13.1992 11.4998L16.3792 8.25977L19.6792 10.1798C20.0992 10.4198 20.3992 10.8998 20.3992 11.4398Z" fill="#FDBD04"/>
                      <path d="M16.3795 8.26039L13.1995 11.5004L4.01953 2.32039C4.25953 2.08039 4.61953 1.90039 5.03953 1.90039C5.27953 1.90039 5.51953 1.96039 5.75953 2.08039L16.3795 8.26039Z" fill="#03A846"/>
                      <path d="M13.1996 11.5003L4.01961 20.6803C3.77961 20.4403 3.59961 20.0803 3.59961 19.6603V3.34031C3.59961 2.92031 3.77961 2.62031 4.01961 2.32031L13.1996 11.5003Z" fill="#0284FE"/>
                      <path d="M16.3795 14.68L5.69953 20.92C5.51953 21.04 5.27953 21.1 5.03953 21.1C4.67953 21.1 4.31953 20.92 4.01953 20.68L13.1995 11.5L16.3795 14.68Z" fill="#FF4131"/>
                    </svg>
                    <span className="text-white text-lg font-bold">Play store</span>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M9 18L15 12L9 6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-white text-lg">© Sparkly Inc. All Rights Reserved.</p>
            
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-white/40 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18.4291 1.21484C19.4916 1.21484 20.4001 1.59208 21.1546 2.34654C21.909 3.101 22.2863 4.00949 22.2863 5.07199V17.9291C22.2863 18.9916 21.909 19.9001 21.1546 20.6546C20.4001 21.409 19.4916 21.7863 18.4291 21.7863H15.9113V13.8175H18.5765L18.9782 10.7104H15.9113V8.72824C15.9113 8.22824 16.0162 7.85324 16.226 7.60324C16.4358 7.35324 16.8443 7.22824 17.4515 7.22824L19.0854 7.21484V4.44252C18.5229 4.36217 17.7282 4.32199 16.7015 4.32199C15.4872 4.32199 14.5162 4.67913 13.7885 5.39342C13.0608 6.1077 12.697 7.11663 12.697 8.4202V10.7104H10.0184V13.8175H12.697V21.7863H5.57199C4.50949 21.7863 3.601 21.409 2.84654 20.6546C2.09208 19.9001 1.71484 18.9916 1.71484 17.9291V5.07199C1.71484 4.00949 2.09208 3.101 2.84654 2.34654C3.601 1.59208 4.50949 1.21484 5.57199 1.21484H18.4291Z" fill="white"/>
                </svg>
              </a>
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-white/40 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7V7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9V9Z" fill="white"/>
                </svg>
              </a>
              <a href="#" className="p-4 rounded-full border border-white/10 hover:border-white/40 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M16.7841 19.821H3.34974C1.57589 19.821 0.132812 18.381 0.132812 16.6108V3.21026C0.132812 1.44 1.57589 0 3.34974 0H16.7841C18.5574 0 20.0005 1.44 20.0005 3.21026V16.6113C20.0005 18.3815 18.5574 19.821 16.7841 19.821ZM6.84615 16.3862H6.85025V7.83641H4.19025V16.3862H6.84563H6.84615ZM5.51845 6.66872C5.7207 6.66899 5.92101 6.62935 6.10791 6.55208C6.29481 6.47481 6.46463 6.36142 6.60764 6.21842C6.75065 6.07541 6.86403 5.90559 6.9413 5.71869C7.01857 5.53179 7.05821 5.33148 7.05794 5.12923C7.05713 4.72118 6.89467 4.33008 6.60614 4.04155C6.3176 3.75301 5.9265 3.59056 5.51845 3.58974C5.1102 3.58988 4.7187 3.75212 4.43002 4.0408C4.14134 4.32948 3.9791 4.72098 3.97897 5.12923C3.9791 5.53749 4.14134 5.92898 4.43002 6.21766C4.7187 6.50634 5.1102 6.66858 5.51845 6.66872ZM16.7995 16.3867V11.6995C16.7995 9.39641 16.2995 7.62462 13.6123 7.62462C12.3205 7.62462 11.4533 8.33231 11.0969 9.0041H11.061V7.83641H8.51384V16.3862H11.1692V12.1554C11.1692 11.0395 11.381 9.96 12.7641 9.96C14.1241 9.96 14.1441 11.2359 14.1441 12.2272V16.3862H16.7995V16.3867Z" fill="white"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
