
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
    }, 4000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <img 
        src="/public/ub.png" 
        alt="Union Bank" 
        className="h-10 mb-8"
      />
      <h1 className="text-2xl text-gray-800 font-medium mt-4"></h1>
    </div>
  );
};

export default LoadingPage;
