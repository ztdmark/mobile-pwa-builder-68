
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, Mail, QrCode, 
  RefreshCcw, DollarSign, Smartphone, 
  MoreHorizontal
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-unionbank-orange flex items-center justify-center text-white text-xl font-bold rounded-lg">
            PC
          </div>
          <div className="text-xl font-semibold">Dashboard</div>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex flex-col items-center text-unionbank-gray">
            <QrCode size={20} />
            <span className="text-xs mt-0.5">Scan</span>
          </button>
          <button className="flex flex-col items-center text-unionbank-gray relative">
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-unionbank-orange rounded-full"></div>
            <Mail size={20} />
            <span className="text-xs mt-0.5">Mailbox</span>
          </button>
          <button onClick={handleLogout} className="flex flex-col items-center text-unionbank-gray">
            <ArrowRight size={20} />
            <span className="text-xs mt-0.5">Log out</span>
          </button>
        </div>
      </header>

      {/* Account Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Accounts</h2>
          <Button variant="outline" className="text-sm h-8 rounded-full border-unionbank-gray/30 px-3 py-1">
            ADD / MANAGE
          </Button>
        </div>

        <div className="bg-unionbank-orange rounded-xl p-4 text-white mb-4">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-lg font-bold">{user?.name}</h3>
            <ArrowRight size={20} />
          </div>
          <div className="text-sm mb-4">Classic Savings ePaycard {user?.accountNumber}</div>
          <div className="text-right">
            <div className="text-xs">Available Balance</div>
            <div className="text-2xl font-bold">PHP {user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>

        {/* Banking Services Grid */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-16">
          <div className="grid grid-cols-4 gap-4 mb-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-1">
                <RefreshCcw size={18} />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Send Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-1">
                <RefreshCcw size={18} className="transform rotate-180" />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Receive Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-1">
                <DollarSign size={18} />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Pay Bills</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-1">
                <Smartphone size={18} />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Buy Load</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
        <div className="flex flex-col items-center text-unionbank-orange">
          <RefreshCcw size={18} className="transform rotate-90" />
          <span className="text-xs mt-0.5">DASHBOARD</span>
        </div>
        <div className="flex flex-col items-center text-unionbank-gray">
          <RefreshCcw size={18} />
          <span className="text-xs mt-0.5">SEND/RECEIVE</span>
        </div>
        <div className="flex flex-col items-center text-unionbank-gray">
          <DollarSign size={18} />
          <span className="text-xs mt-0.5">PAY BILLS</span>
        </div>
        <div className="flex flex-col items-center text-unionbank-gray">
          <Smartphone size={18} />
          <span className="text-xs mt-0.5">BUY LOAD</span>
        </div>
        <div className="flex flex-col items-center text-unionbank-gray">
          <MoreHorizontal size={18} />
          <span className="text-xs mt-0.5">MORE</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
