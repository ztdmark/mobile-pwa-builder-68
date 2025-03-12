
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, Mail, QrCode, 
  RefreshCcw, DollarSign, Smartphone, 
  MoreHorizontal, ChevronRight, Megaphone,
  FileCheck, CircleDollarSign, CreditCard
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { icon: <RefreshCcw size={20} className="transform rotate-90" />, label: "DASHBOARD" },
    { icon: <RefreshCcw size={20} />, label: "SEND/RECEIVE" },
    { icon: <DollarSign size={20} />, label: "PAY BILLS" },
    { icon: <Smartphone size={20} />, label: "BUY LOAD" },
    { icon: <MoreHorizontal size={20} />, label: "MORE" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-unionbank-orange flex items-center justify-center text-white text-lg font-bold">
            PC
          </div>
          <div className="text-lg font-medium text-gray-700">Dashbo...</div>
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

        <div className="bg-unionbank-orange rounded-xl p-4 text-white mb-4 relative">
          <div className="flex justify-between items-center mb-1">
            <h3 className={`${isMobile ? 'text-[calc(1rem*0.84)]' : 'text-xl'} font-bold uppercase text-white/90`}>PRINCE IVANN BODO COMISO</h3>
            <ChevronRight size={24} className="bg-white/20 rounded-full p-1" />
          </div>
          <div className="text-sm mb-10">Classic Savings ePaycard ****0499</div>
          <div className="text-right">
            <div className="text-xs">Available Balance</div>
            <div className="text-2xl font-bold">PHP 981,412.50</div>
          </div>
        </div>

        {/* Banking Services Grid */}
        <Card className="p-6 shadow-sm mb-16 rounded-xl">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/sendmoney.png" alt="Send Money" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Send</span>
              <span className="text-xs text-center text-gray-600">Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/receivemoney.png" alt="Receive Money" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Receive</span>
              <span className="text-xs text-center text-gray-600">Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/paybills.png" alt="Pay Bills" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Pay</span>
              <span className="text-xs text-center text-gray-600">Bills</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/buyload.png" alt="Buy Load" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Buy</span>
              <span className="text-xs text-center text-gray-600">Load</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-1 flex items-center justify-center">
                <img src="/promos.png" alt="Promos" className="w-full h-full object-contain" />
              </div>
              <span className="text-xs text-center text-gray-600">Promos</span>
              <span className="text-xs text-center text-gray-600">&</span>
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        {menuItems.map((item, index) => (
          <div key={index} className={`flex flex-col items-center ${index === 0 ? 'text-unionbank-orange' : 'text-gray-500'}`}>
            {item.icon}
            <span className="text-[9px] mt-0.5">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
