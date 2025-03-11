
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader } from "lucide-react";

const LoadingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img src="/lovable-uploads/09912f0f-39b3-4704-9285-257b332724f5.png" alt="Union Bank" className="w-40 mb-8" />
      <Loader className="w-10 h-10 text-unionbank-orange animate-spin" />
    </div>
  );
};

export default LoadingPage;
