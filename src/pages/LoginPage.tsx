
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username] = useState("PRI••••••••");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white px-6 py-10">
      <img src="/lovable-uploads/09912f0f-39b3-4704-9285-257b332724f5.png" alt="Union Bank" className="w-40 mb-12" />
      
      <div className="w-24 h-24 rounded-full bg-unionbank-orange flex items-center justify-center text-white text-3xl font-semibold mb-4">
        PI
      </div>
      
      <div className="text-unionbank-gray text-lg mb-8">{username}</div>
      
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <div className="relative mb-6">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-14 text-lg border-unionbank-gray/30 focus:border-unionbank-orange"
          />
          <button 
            type="button"
            onClick={togglePasswordVisibility} 
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-14 bg-unionbank-orange hover:bg-unionbank-orange/90 text-white text-xl font-medium rounded-full"
        >
          LOG IN
        </Button>
      </form>
      
      <div className="flex justify-between w-full max-w-md mt-6 text-unionbank-gray">
        <a href="#" className="text-sm">Forgot my User ID or Password</a>
        <span className="text-unionbank-gray">|</span>
        <a href="#" className="text-sm">Unblock my profile</a>
      </div>
      
      <div className="mt-8 text-unionbank-gray">
        Scroll up for more options
      </div>
      
      <div className="w-full max-w-md mt-6">
        <Button 
          variant="outline"
          className="w-full h-14 border-unionbank-gray/30 text-black justify-between items-center px-6 rounded-lg"
        >
          <span>Generate OTP</span>
          <span className="text-unionbank-orange">›</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
