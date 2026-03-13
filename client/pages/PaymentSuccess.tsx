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
    <div className="min-h-screen flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full mx-4 text-center">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful
        </h1>
        <p className="text-gray-500 mb-8">
          Your payment has been completed successfully.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-full transition-colors text-lg"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
