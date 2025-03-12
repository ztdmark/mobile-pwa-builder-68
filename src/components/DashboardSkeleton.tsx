
import { Skeleton } from "@/components/ui/skeleton"

export const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-white p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
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

      {/* Bottom Navigation Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white py-3 flex justify-around">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="w-8 h-8 mb-1" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    </div>
  )
}
