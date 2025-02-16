import React from "react";

const GridLayoutSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="animate-pulse">
          {/* Image placeholder */}
          <div className="relative aspect-[2/3] w-full bg-gray-700 rounded-lg"></div>

          {/* Text placeholders (matching MovieCard structure) */}
          <div className="mt-2 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridLayoutSkeleton;
