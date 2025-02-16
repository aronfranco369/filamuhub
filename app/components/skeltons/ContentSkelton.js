import React from "react";
import { Card } from "@/components/ui/card";

const MovieCardSkeleton = () => (
  <Card className="h-full w-full overflow-hidden">
    <div className="relative aspect-[2/2] w-full">
      <div className="animate-pulse bg-gray-700 h-full w-full"></div>
    </div>
    <div className="p-2 bg-gray-900 space-y-2">
      <div className="animate-pulse bg-gray-700 h-4 w-3/4 rounded"></div>
      <div className="animate-pulse bg-gray-700 h-3 w-1/2 rounded"></div>
    </div>
  </Card>
);

const CategorySkeleton = () => (
  <div className="space-y-2 bg-gray-800 rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div className="animate-pulse bg-gray-700 h-8 w-48 rounded"></div>
      <div className="animate-pulse bg-gray-700 h-6 w-24 rounded"></div>
    </div>
    <div className="relative">
      <div className="flex overflow-x-auto pb-2 gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex-none w-[calc(30%-0.5rem)] h-2rem sm:w-[calc(33.33%-0.5rem)] md:w-[calc(25%-0.5rem)] lg:w-[calc(20%-0.5rem)]"
          >
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ContentSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 3 }).map((_, index) => (
      <CategorySkeleton key={index} />
    ))}
  </div>
);

export default ContentSkeleton;
