import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "@/lib/auth";

const navLinks = [
    { label: "Home", hash: "" },
    { label: "About", hash: "#about" },
    { label: "How It Work", hash: "#how-it-work" },
    { label: "Pricing", hash: "#pricing" },
    { label: "FAQ", hash: "#faq" },
];

export default function Navbar({ hideAuthButtons = false }: { hideAuthButtons?: boolean }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();
    const isHomePage = location.pathname === "/";

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const handleNavClick = (e: React.MouseEvent, hash: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        if (isHomePage) {
            if (!hash) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const el = document.querySelector(hash);
                el?.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            navigate("/");
            setTimeout(() => {
                if (!hash) {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    const el = document.querySelector(hash);
                    el?.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    };

    return (
        <>
            <nav className="w-full flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-3 md:py-5 border-b border-gray-100 bg-[#FFFDF7]">
                {/* Logo */}
                <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
                    <img
                        src="/contactUsLogo.png"
                        alt="Planlift Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                {/* Center Links - Desktop */}
                <div className="hidden lg:flex items-center gap-10 text-[24px] text-[#667085] font-regular">
                    {navLinks.map((item) => (
                        <a
                            key={item.label}
                            href={`/${item.hash}`}
                            onClick={(e) => handleNavClick(e, item.hash)}
                            className="hover:text-[#1D2939] transition-colors"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Right Buttons - Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {!hideAuthButtons && !user && (
                        <button
                            onClick={() => navigate("/create-account")}
                            className="px-6 py-2.5 h-[48px] rounded-full border border-[#1D2939] text-[#1D2939] font-bold text-[15px] hover:bg-[#1D2939] hover:text-white transition-all"
                        >
                            Register/Login
                        </button>
                    )}
                </div>

                {/* Hamburger Button - Mobile */}
                <button
                    className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    onClick={() => setMobileMenuOpen(true)}
                    aria-label="Open menu"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#1D2939" strokeWidth="1.8" strokeLinecap="round">
                        <line x1="3" y1="5" x2="17" y2="5" />
                        <line x1="3" y1="10" x2="17" y2="10" />
                        <line x1="3" y1="15" x2="13" y2="15" />
                    </svg>
                </button>
            </nav>

            {/* Mobile Menu - Full Screen */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden bg-white flex flex-col overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-100">
                        <div className="cursor-pointer" onClick={() => { setMobileMenuOpen(false); navigate("/"); }}>
                            <img
                                src="/contactUsLogo.png"
                                alt="Planlift Logo"
                                className="h-10 w-auto object-contain"
                            />
                        </div>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                            aria-label="Close menu"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <line x1="4" y1="4" x2="16" y2="16" />
                                <line x1="16" y1="4" x2="4" y2="16" />
                            </svg>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-col px-6 py-4 gap-2">
                        {navLinks.map((item) => (
                            <a
                                key={item.label}
                                href={`/${item.hash}`}
                                onClick={(e) => handleNavClick(e, item.hash)}
                                className="py-4 text-[18px] font-medium text-[#1D2939] hover:text-[#FFC700] transition-colors border-b border-gray-100 last:border-b-0"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    {/* Auth Button */}
                    {!hideAuthButtons && !user && (
                        <div className="mt-auto px-6 pb-8">
                            <button
                                onClick={() => { setMobileMenuOpen(false); navigate("/create-account"); }}
                                className="w-full py-3.5 rounded-full bg-[#FFC700] text-[#1D2939] font-bold text-[16px] hover:bg-[#FFD633] transition-colors"
                            >
                                Register/Login
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
