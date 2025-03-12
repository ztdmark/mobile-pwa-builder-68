
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../contexts/AuthContext";
import { Eye, EyeOff, Loader } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username] = useState("PRI•••••••••••••••");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate login delay
      setTimeout(async () => {
        const success = await login(username, password);
        if (success) {
          navigate("/dashboard");
        }
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white px-6 py-10">
      <div className="w-full max-w-md flex justify-center mb-10">
        <img 
          src="/ub.png" 
          alt="Union Bank" 
          className="h-10" 
        />
      </div>
      
      <div className="w-16 h-16 rounded-full bg-unionbank-orange flex items-center justify-center text-white text-xl font-semibold mb-4">
        PI
      </div>
      
      <div className="text-gray-500 text-sm mb-6">{username}</div>
      
      <form onSubmit={handleLogin} className="w-full max-w-md">
        <div className="relative mb-6">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-12 text-base rounded-md px-4 border-none shadow-[0_0_0_1px_#e0e0e0] focus-visible:shadow-[0_0_0_1px_#F97316] hover:shadow-[0_0_0_1px_#F97316]"
          />
          <button 
            type="button"
            onClick={togglePasswordVisibility} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-unionbank-orange hover:bg-unionbank-orange/90 text-white text-lg font-medium rounded-full"
        >
          {isLoading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            'LOG IN'
          )}
        </Button>
      </form>
      
      <div className="mt-6">
        <a href="#" className="text-unionbank-orange text-sm">Forgot my User ID or Password</a>
      </div>
      
      <div className="flex-1 flex flex-col justify-end w-full max-w-md">
        <div className="text-gray-400 text-sm text-center mb-4">
          Scroll up for more options
        </div>
        
        <Button 
          variant="outline"
          className="w-full h-12 border-gray-300 text-black justify-between items-center px-6 rounded-lg mb-4"
        >
          <span>Generate OTP</span>
          <span className="text-unionbank-orange font-bold text-xl">›</span>
        </Button>
        
        <Button 
          variant="outline"
          className="w-full h-12 border-gray-300 text-black justify-between items-center px-6 rounded-lg"
        >
          <span>ATM & Branch Locator</span>
          <span className="text-unionbank-orange font-bold text-xl">›</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
