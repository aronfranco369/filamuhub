import React from "react";

const CountrySectionSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Create multiple section skeletons */}
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <section
          key={sectionIndex}
          className="space-y-2 bg-gray-800 rounded-lg p-4"
        >
          {/* Country title skeleton */}
          <div className="animate-pulse">
            <div className="h-7 bg-gray-700 rounded w-48"></div>
          </div>

          {/* Grid of movie cards skeleton */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {Array.from({ length: 6 }).map((_, cardIndex) => (
                <div key={cardIndex} className="animate-pulse">
                  {/* Image placeholder */}
                  <div className="relative aspect-[2/3] w-full bg-gray-700 rounded-lg"></div>

                  {/* Text placeholders */}
                  <div className="mt-2 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Load more button skeleton */}
          <div className="animate-pulse mt-4">
            <div className="h-10 bg-gray-700 rounded w-full"></div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default CountrySectionSkeleton;
