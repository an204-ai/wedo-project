import { Skeleton } from "@/components/ui/skeleton";

const AppSkeleton = () => {
  return (
    <div className="container pt-8 mx-auto sm:w-full sm:max-w-2xl px-4">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-10 w-44 rounded-md" />
          <Skeleton className="h-4 w-60 rounded-md" />
        </div>

        {/* Profile Skeleton */}
        <div className="flex flex-col items-center space-y-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
          <Skeleton className="h-6 w-40 rounded-md" />
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton className="h-4 w-48 rounded-md" />
            <Skeleton className="h-4 w-56 rounded-md" />
            <Skeleton className="h-4 w-28 rounded-md" />
          </div>
          <Skeleton className="h-9 w-24 rounded-lg mt-1" />
        </div>

        {/* AddTask Box Skeleton */}
        <div className="p-4 rounded-2xl border border-slate-200/80 shadow-sm bg-white space-y-3">
          <div className="flex gap-3 items-center">
            <Skeleton className="h-11 w-full rounded-xl" />
            <Skeleton className="h-11 w-28 rounded-xl" />
          </div>
        </div>

        {/* Stats & Filters Row Skeleton */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="flex gap-2">
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-32 rounded-lg" />
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>

        {/* Task List Skeleton Items */}
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 bg-white border border-slate-200/80 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-3 w-full">
                <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                <div className="space-y-2 w-3/4">
                  <Skeleton className="h-5 w-4/5 rounded-md" />
                  <Skeleton className="h-3.5 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Pagination & Filter Skeleton */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-md" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>

      </div>
    </div>
  );
};

export default AppSkeleton;
