
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
    }, 4000); // Changed to 4 seconds

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img 
        src="/lovable-uploads/046025eb-c8f8-4a33-9bb1-0b655f1d2e19.png" 
        alt="Union Bank" 
        className="w-64 mb-8" 
      />
    </div>
  );
};

export default LoadingPage;
