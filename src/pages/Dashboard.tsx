
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
        <div className="flex items-center">
          <div className="w-14 h-14 bg-unionbank-orange flex items-center justify-center text-white text-2xl font-bold mr-3 rounded-lg">
            PC
          </div>
          <div className="text-2xl font-semibold">Dashboard</div>
        </div>
        <div className="flex items-center gap-5">
          <button className="flex flex-col items-center text-unionbank-gray">
            <QrCode size={24} />
            <span className="text-xs mt-1">Scan</span>
          </button>
          <button className="flex flex-col items-center text-unionbank-gray relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-unionbank-orange rounded-full"></div>
            <Mail size={24} />
            <span className="text-xs mt-1">Mailbox</span>
          </button>
          <button onClick={handleLogout} className="flex flex-col items-center text-unionbank-gray">
            <ArrowRight size={24} />
            <span className="text-xs mt-1">Log out</span>
          </button>
        </div>
      </header>

      {/* Account Section */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Accounts</h2>
          <Button variant="outline" className="rounded-full border-unionbank-gray/30">
            ADD / MANAGE
          </Button>
        </div>

        <div className="bg-unionbank-orange rounded-xl p-4 text-white mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold">{user?.name}</h3>
            <ArrowRight size={24} />
          </div>
          <div className="mb-6">Classic Savings ePaycard {user?.accountNumber}</div>
          <div className="text-right">
            <div className="text-sm">Available Balance</div>
            <div className="text-3xl font-bold">PHP {user?.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
        </div>

        {/* Banking Services Grid */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <RefreshCcw size={22} />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Send Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <RefreshCcw size={22} className="transform rotate-180" />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Receive Money</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <DollarSign size={22} />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Pay Bills</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <Smartphone size={22} />
              </div>
              <span className="text-xs text-center text-unionbank-gray">Buy Load</span>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <RefreshCcw size={22} />
              </div>
              <span className="text-xs text-center text-unionbank-gray"></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <DollarSign size={22} />
              </div>
              <span className="text-xs text-center text-unionbank-gray"></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <RefreshCcw size={22} className="transform rotate-180" />
              </div>
              <span className="text-xs text-center text-unionbank-gray"></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-unionbank-gray mb-2">
                <Smartphone size={22} />
              </div>
              <span className="text-xs text-center text-unionbank-gray"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar (Mobile) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
          <div className="flex flex-col items-center text-unionbank-orange">
            <RefreshCcw size={20} className="transform rotate-90" />
            <span className="text-xs mt-1">DASHBOARD</span>
          </div>
          <div className="flex flex-col items-center text-unionbank-gray">
            <RefreshCcw size={20} />
            <span className="text-xs mt-1">SEND/RECEIVE</span>
          </div>
          <div className="flex flex-col items-center text-unionbank-gray">
            <DollarSign size={20} />
            <span className="text-xs mt-1">PAY BILLS</span>
          </div>
          <div className="flex flex-col items-center text-unionbank-gray">
            <Smartphone size={20} />
            <span className="text-xs mt-1">BUY LOAD</span>
          </div>
          <div className="flex flex-col items-center text-unionbank-gray">
            <MoreHorizontal size={20} />
            <span className="text-xs mt-1">MORE</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
