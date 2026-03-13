import { useNavigate } from "react-router-dom";
import { getUser } from "@/lib/auth";

export default function Navbar({ hideAuthButtons = false }: { hideAuthButtons?: boolean }) {
    const navigate = useNavigate();
    const user = getUser();

    return (
        <nav className="w-full flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 border-b border-gray-100 bg-[#FFFDF7]">
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
                <img
                    src="/contactUsLogo.png"
                    alt="Planlift Logo"
                    className="h-10 w-auto object-contain"
                />
            </div>

            {/* Center Links */}
            <div className="hidden lg:flex items-center gap-10 text-[24px] text-[#667085] font-regular">
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
                {/* <button
                    onClick={() => navigate("/contact-us")}
                    className="px-6 py-2.5 h-[48px] rounded-full border border-[#FFC700] text-[#1D2939] font-bold text-[15px] hover:bg-[#FFC700]/10 transition-colors"
                >
                    Contact us
                </button> */}
                {!hideAuthButtons && !user && (
                    <button
                        onClick={() => navigate("/create-account")}
                        className="px-6 py-2.5 h-[48px] rounded-full border border-[#1D2939] text-[#1D2939] font-bold text-[15px] hover:bg-[#1D2939] hover:text-white transition-all"
                    >
                        Register/Login
                    </button>
                )}
            </div>
        </nav>
    );
}
