
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, Mail, QrCode, 
  ChevronRight, RefreshCw
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  DashboardIcon,
  SendReceiveIcon,
  PayBillsIcon,
  BuyLoadIcon,
  MoreIcon,
} from "@/components/icons/NavigationIcons";
import { useState, useEffect, useRef } from "react";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";

// Preload images helper function
const preloadImage = (src: string) => {
  const img = new Image();
  img.src = src;
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [startY, setStartY] = useState(0);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const imagesPreloaded = useRef(false);

  useEffect(() => {
    // Preload images on component mount if not already done
    if (!imagesPreloaded.current) {
      const imagesToPreload = [
        '/sendmoney.png',
        '/receivemoney.png',
        '/paybills1.png',
        '/buyload2.png',
        '/visitbranch.png',
        '/depositcheck.png',
        '/buysellusd.png',
        '/activatecard.png'
      ];
      
      imagesToPreload.forEach(preloadImage);
      imagesPreloaded.current = true;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY > 0) {
      const currentY = e.touches[0].clientY;
      const distance = currentY - startY;
      if (distance > 0 && window.scrollY === 0) {
        setPullDistance(distance);
      }
    }
  };

  const handleTouchEnd = () => {
    if (pullDistance > 150) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }, 1000);
    }
    setStartY(0);
    setPullDistance(0);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: DashboardIcon, label: "DASHBOARD" },
    { icon: SendReceiveIcon, label: "SEND/RECEIVE" },
    { icon: PayBillsIcon, label: "PAY BILLS" },
    { icon: BuyLoadIcon, label: "BUY LOAD" },
    { icon: MoreIcon, label: "MORE" },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div 
      className="flex flex-col min-h-screen bg-gray-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="fixed top-0 left-0 right-0 flex justify-center items-center py-3 z-50 bg-white/50 backdrop-blur-sm"
          style={{ 
            height: isRefreshing ? '60px' : Math.min(pullDistance * 0.5, 60), 
            opacity: isRefreshing ? 1 : Math.min(pullDistance / 150, 1) 
          }}
        >
          <RefreshCw 
            size={24} 
            className={`text-unionbank-orange ${isRefreshing ? 'animate-spin' : 'transform'}`} 
            style={{ transform: isRefreshing ? 'rotate(0deg)' : `rotate(${Math.min(pullDistance, 150) * 1.8}deg)` }}
          />
        </div>
      )}

      {/* Header - removed border-b */}
      <header className="bg-white p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-unionbank-orange flex items-center justify-center text-white text-lg font-bold">
            PC
          </div>
          <div className="text-lg font-medium text-gray-700">Dashboard</div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex flex-col items-center text-gray-500 text-xs">
            <QrCode size={18} />
            <span className="mt-0.5">Scan</span>
          </button>
          <button className="flex flex-col items-center text-gray-500 text-xs relative">
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-unionbank-orange rounded-full"></div>
            <Mail size={18} />
            <span className="mt-0.5">Mailbox</span>
          </button>
          <button onClick={handleLogout} className="flex flex-col items-center text-gray-500 text-xs">
            <ArrowRight size={18} />
            <span className="mt-0.5">Log out</span>
          </button>
        </div>
      </header>

      {/* Account Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-gray-800">Accounts</h2>
          <Button variant="outline" className="text-sm h-8 rounded-full border-gray-300 px-4 py-1 font-medium">
            ADD / MANAGE
          </Button>
        </div>

        <div className="bg-unionbank-orange rounded-xl p-4 text-white mb-4 relative shadow-[0_8px_30px_rgb(249,115,22,0.2)]">
          <div className="flex justify-between items-center mb-1">
            <h3 className={`${isMobile ? 'text-[1.1025em]' : 'text-[1.1025em]'} font-bold uppercase text-white/90`}>PRINCE IVANN BODO COMISO</h3>
            <ChevronRight size={24} className="bg-white/20 rounded-full p-1" />
          </div>
          <div className="text-xs mb-10">Classic Savings ePaycard ****0499</div>
          <div className="text-right">
            <div className="text-xs">Available Balance</div>
            <div className="text-[0.99225em] font-bold">PHP 741,412.50</div>
          </div>
        </div>

        {/* Banking Services Grid */}
        <Card className="p-6 shadow-sm mb-16 rounded-xl">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1">
                <img src="/sendmoney.png" alt="Send Money" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Send</span>
              <span className="text-xs text-center text-gray-600">Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1">
                <img src="/receivemoney.png" alt="Receive Money" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Receive</span>
              <span className="text-xs text-center text-gray-600">Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1">
                <img src="/paybills1.png" alt="Pay Bills" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Pay</span>
              <span className="text-xs text-center text-gray-600">Bills</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1">
                <img src="/buyload2.png" alt="Buy Load" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Buy</span>
              <span className="text-xs text-center text-gray-600">Load</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/visitbranch.png" alt="Visit Branch" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Visit</span>
              <span className="text-xs text-center text-gray-600">Branch</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/depositcheck.png" alt="Deposit Check" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Deposit</span>
              <span className="text-xs text-center text-gray-600">Check</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/buysellusd.png" alt="Buy/Sell USD" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Buy/Sell</span>
              <span className="text-xs text-center text-gray-600">USD</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/activatecard.png" alt="Activate Card" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Activate</span>
              <span className="text-xs text-center text-gray-600">Card</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
        {menuItems.map((item, index) => (
          <div key={index} className={`flex flex-col items-center ${index === 0 ? 'text-unionbank-orange' : 'text-gray-500'}`}>
            <item.icon className="w-8 h-8 mb-1" />
            <span className="text-[0.6rem]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
