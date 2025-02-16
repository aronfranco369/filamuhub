import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const ContentDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      {/* Top section skeleton */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full">
        {/* Image skeleton */}
        <div className="w-full md:w-1/3 h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-full animate-pulse bg-gray-700 rounded-lg" />
        </div>

        {/* Metadata section skeleton */}
        <div className="w-full md:w-2/3 flex flex-col justify-center space-y-4">
          {/* Title skeleton */}
          <div className="h-10 w-3/4 animate-pulse bg-gray-700 rounded" />

          {/* Year skeleton */}
          <div className="h-6 w-24 animate-pulse bg-gray-700 rounded" />

          {/* Genres skeleton */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="h-6 w-20 animate-pulse bg-gray-700 rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section skeleton */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4 space-y-2">
          <div className="h-6 w-24 animate-pulse bg-gray-700 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse bg-gray-700 rounded" />
            <div className="h-4 w-full animate-pulse bg-gray-700 rounded" />
            <div className="h-4 w-3/4 animate-pulse bg-gray-700 rounded" />
          </div>
        </CardContent>
      </Card>

      {/* Episodes Section skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-32 animate-pulse bg-gray-700 rounded" />

        {/* Episode cards skeleton */}
        {[1, 2, 3].map((index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <div className="flex justify-between items-start p-4">
              <div className="flex flex-col gap-3 flex-grow">
                <div className="h-6 w-3/4 animate-pulse bg-gray-700 rounded" />
                <div className="flex flex-row gap-4 items-center">
                  <div className="h-5 w-20 animate-pulse bg-gray-700 rounded" />
                  <div className="h-5 w-32 animate-pulse bg-gray-700 rounded" />
                </div>
              </div>
              <div className="h-8 w-8 animate-pulse bg-gray-700 rounded" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ContentDetailsSkeleton;
