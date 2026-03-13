import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { setSubscription, setUser, Subscription, UserProfile } from "@/lib/auth";

type ProfileResponse = {
  success: boolean;
  message: string;
  data: {
    user: UserProfile;
    subscription: Subscription;
  };
};

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiFetch<ProfileResponse>("/user/profile");
        if (res.data?.subscription) {
          setSubscription(res.data.subscription);
        }
        if (res.data?.user) {
          setUser(res.data.user);
        }
      } catch {
        // Silently fail — subscription will be fetched on next login
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#FFC700] rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-[#1D2939] mb-2">
        Payment Successful
      </h1>
      <p className="text-[#667085] mb-8">
        Your payment has been completed successfully.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-[#FFC700] hover:bg-[#E6B400] text-black font-semibold py-3 px-12 rounded-full transition-colors text-lg"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
