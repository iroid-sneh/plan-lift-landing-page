import { useState } from "react";

export default function Index() {
    // Allow multiple items to be open for the "same to same" look
    const [openItems, setOpenItems] = useState([0, 3]); // Defaulting 1st and 5th open as per design

    const toggleFaq = (index) => {
        setOpenItems((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    const faqData = [
        {
            question: "What Is Planlift?",
            answer: "PlanLift is an app that helps you make clear and decisive plans with friends. Instead of long back and forth conversations, you can create a plan, share it, and get a clear response within a set timeframe."
        },
        {
            question: "How does it work?",
            answer: "Simply create a plan, add details like time and location, and share the link with your friends. They can vote or confirm instantly."
        },
        {
            question: "What happens after I make a plan?",
            answer: "Once a plan is created, participants receive notifications. You can track responses in real-time and finalize the tour details."
        },
        {
            question: "What can I use PlanLift for?",
            answer: "You can use it for group tours, weekend trips, dinner plans, or any social gathering that requires coordination."
        },
        {
            question: "Do my friends need PlanLift?",
            answer: "Yes. When you send a plan, your friends will be prompted to download PlanLift so they can respond. We recommend encouraging them to download the app so you can continue making plans with each other more easily."
        },
        {
            question: "Is it free?",
            answer: "Yes, PlanLift offers a free tier that covers all the essential features for planning trips with your friends."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDFCF6]">
            {/* FAQ Section */}
            <section id="faq" className="py-20 lg:py-28 bg-[#FDFCF6]">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-[100px]">

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
                                Clear Answers To Help You Use Planlift With Confidence And Enjoy Smooth, Stress-Free Tour Planning With Your Friends.
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

                    {/* FAQ Grid: 2 Columns */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
                        {faqData.map((item, index) => {
                            const isOpen = openItems.includes(index);
                            return (
                                <div
                                    key={index}
                                    className={`bg-white border border-[#F2F4F7] rounded-[32px] overflow-hidden transition-all duration-300 h-fit ${isOpen ? 'shadow-sm' : ''}`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-8 py-8 text-left flex items-start justify-between gap-4"
                                    >
                                        <div className="flex items-center gap-4 relative">
                                            {/* Active Yellow Indicator Bar */}
                                            <div className={`absolute -left-8 w-1.5 h-6 rounded-r-full transition-colors ${isOpen ? 'bg-[#FFC700]' : 'bg-transparent'}`} />

                                            <h3 className={`text-xl md:text-[22px] font-bold transition-colors ${isOpen ? 'text-[#1D2939]' : 'text-[#1D2939]'}`}>
                                                {item.question}
                                            </h3>
                                        </div>

                                        {/* Plus/Minus Icon */}
                                        <div className="mt-1 flex-shrink-0">
                                            {isOpen ? (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D2939" strokeWidth="2.5">
                                                    <path d="M5 12h14" strokeLinecap="round" />
                                                </svg>
                                            ) : (
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1D2939" strokeWidth="2.5">
                                                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                                                </svg>
                                            )}
                                        </div>
                                    </button>

                                    {/* Answer Content */}
                                    <div className={`px-8 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] pb-8' : 'max-h-0'}`}>
                                        <p className="text-[#667085] text-lg leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Center CTA Button */}
                    <div className="flex justify-center">
                        <button className="px-12 py-5 bg-[#FFC700] rounded-full text-black text-lg font-bold hover:bg-[#E6B400] transition-all transform hover:scale-105 shadow-md">
                            Ask a Questions
                        </button>
                    </div>

                </div>
            </section>
        </div>
    );
}