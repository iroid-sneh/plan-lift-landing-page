import { useNavigate, useLocation } from "react-router-dom";
import { getUser } from "@/lib/auth";

export default function Navbar({ hideAuthButtons = false }: { hideAuthButtons?: boolean }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();
    const isHomePage = location.pathname === "/";

    const handleNavClick = (e: React.MouseEvent, hash: string) => {
        e.preventDefault();
        if (isHomePage) {
            if (!hash) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                const el = document.querySelector(hash);
                el?.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Navigate to home first, then scroll after render
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
                {[
                    { label: "Home", hash: "" },
                    { label: "About", hash: "#about" },
                    { label: "How It Work", hash: "#how-it-work" },
                    { label: "Pricing", hash: "#pricing" },
                    { label: "FAQ", hash: "#faq" },
                ].map((item) => (
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
