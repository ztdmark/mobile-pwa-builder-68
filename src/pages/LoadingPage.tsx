
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
      <div className="max-w-[160px] mb-8">
        <img 
          src="/lovable-uploads/3a9c61a0-d575-47f7-b413-c964b4a6e931.png" 
          alt="Union Bank" 
          className="w-full"
        />
      </div>
      <h1 className="text-2xl text-gray-800 font-medium mt-8">Union Bank Mobile</h1>
    </div>
  );
};

export default LoadingPage;
