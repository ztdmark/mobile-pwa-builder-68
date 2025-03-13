
import { Skeleton } from "@/components/ui/skeleton"
import { 
  DashboardIcon,
  SendReceiveIcon,
  PayBillsIcon,
  BuyLoadIcon,
  MoreIcon,
} from "@/components/icons/NavigationIcons";
import { 
  ArrowRight, Mail, QrCode, 
  ChevronRight
} from "lucide-react";

export const DashboardSkeleton = () => {
  // Array of menu items for the bottom navigation
  const menuItems = [
    { icon: DashboardIcon, label: "DASHBOARD" },
    { icon: SendReceiveIcon, label: "SEND/RECEIVE" },
    { icon: PayBillsIcon, label: "PAY BILLS" },
    { icon: BuyLoadIcon, label: "BUY LOAD" },
    { icon: MoreIcon, label: "MORE" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Render actual Header instead of skeleton */}
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
          <button className="flex flex-col items-center text-gray-500 text-xs">
            <ArrowRight size={18} />
            <span className="mt-0.5">Log out</span>
          </button>
        </div>
      </header>

      {/* Account Section Skeleton */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-8 w-28 rounded-full" />
        </div>

        <div className="bg-[#F97316] rounded-xl p-4 mb-4 relative shadow-[0_8px_30px_rgb(249,115,22,0.2)]">
          <div className="flex justify-between items-center mb-1">
            <Skeleton className="h-5 w-48 bg-white/20" />
            <Skeleton className="h-6 w-6 rounded-full bg-white/20" />
          </div>
          <Skeleton className="h-4 w-36 mb-10 bg-white/20" />
          <div className="text-right">
            <Skeleton className="h-4 w-24 ml-auto mb-1 bg-white/20" />
            <Skeleton className="h-6 w-32 ml-auto bg-white/20" />
          </div>
        </div>

        {/* Banking Services Grid Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-16">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-12 h-12 rounded-lg mb-1" />
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="w-12 h-12 rounded-lg mb-1" />
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render actual Bottom Navigation instead of skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-3">
        {menuItems.map((item, index) => (
          <div key={index} className={`flex flex-col items-center ${index === 0 ? 'text-unionbank-orange' : 'text-gray-500'}`}>
            <item.icon className="w-8 h-8 mb-1" />
            <span className="text-[0.65rem]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
