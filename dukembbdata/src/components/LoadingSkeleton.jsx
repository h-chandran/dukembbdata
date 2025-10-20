const LoadingSkeleton = () => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 animate-pulse">
      {/* Player Header Skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-gray-700"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-700 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="w-8 h-8 bg-gray-700 rounded"></div>
      </div>

      {/* Stats Row Skeleton */}
      <div className="grid grid-cols-5 gap-2 mb-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="text-center">
            <div className="h-8 bg-gray-700 rounded mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Percentages Skeleton */}
      <div className="flex justify-center gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-8 bg-gray-700 rounded-full w-16"></div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="h-48 bg-gray-700 rounded mb-6"></div>

      {/* Button Skeleton */}
      <div className="h-10 bg-gray-700 rounded-lg"></div>
    </div>
  );
};

export default LoadingSkeleton;
