import React from "react";

const FiltersSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 p-4 rounded-lg">
        {/* Skeleton for each dropdown */}
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-[180px] h-10 bg-gray-800 rounded-md animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

export default FiltersSkeleton;
