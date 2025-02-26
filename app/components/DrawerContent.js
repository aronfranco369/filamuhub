"use client";
import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { Button } from "@/components/ui/button";
import { fetchDrawerContents } from "../actions/drawerContents";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CountrySectionSkeleton from "./skeltons/CountrySectionSkelton";

const DrawerContent = ({ country, type }) => {
  const [offset, setOffset] = useState(0);
  const limit = 6;
  const queryClient = useQueryClient(); // Add the query client

  const {
    data: contentData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["specific-country-content", country, type], // Remove offset from the key
    queryFn: async () => {
      try {
        const data = await fetchDrawerContents({
          country,
          type,
          offset: 0, // Always start from 0
          limit,
        });
        console.log(`Fetched ${type} data for ${country}:`, data);
        return data;
      } catch (error) {
        console.error("Query error:", error);
        throw error;
      }
    },
  });

  const handleLoadMore = async () => {
    try {
      const newOffset = offset + limit;

      // Fetch more content directly
      const moreContent = await fetchDrawerContents({
        country,
        type,
        offset: newOffset,
        limit,
      });

      // Manually update the existing query data
      queryClient.setQueryData(
        ["specific-country-content", country, type],
        (oldData) => {
          if (!oldData) return moreContent;

          return {
            ...oldData,
            items: [...oldData.items, ...moreContent.items],
            hasMore: moreContent.hasMore,
          };
        }
      );

      // Update the offset for the next load more
      setOffset(newOffset);
    } catch (error) {
      console.error("Error loading more content:", error);
    }
  };

  if (error) {
    return (
      <div className="text-center p-8">
        <div className="text-red-500 mb-4">
          Error loading content: {error.message}
        </div>
        <Button
          onClick={() => refetch()}
          className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading && offset === 0) {
    return (
      <div className="bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <CountrySectionSkeleton />
        </div>
      </div>
    );
  }

  // Only show "No content" when NOT loading AND there's no data
  if (!isLoading && (!contentData?.items || contentData.items.length === 0)) {
    return (
      <div className="text-center p-8 text-gray-300">
        No {type} content available for {country}.
      </div>
    );
  }
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto ">
        <section className="space-y-2 rounded-lg p-4">
          <div className="relative">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {contentData.items.map((item) => (
                <MovieCard
                  key={item.id}
                  id={item.id}
                  imageUrl={item.poster_url}
                  name={item.external_id}
                  title={item.title}
                  type={item.type}
                  created_at={item.created_at}
                  genre={item.genres}
                  director={item.dj}
                  description={item.plot_summary}
                  latestEpisode={item.latestEpisode}
                />
              ))}
            </div>
          </div>
          {contentData.hasMore ? (
            <Button
              onClick={handleLoadMore}
              className="block mt-4 text-center py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-md transition-all duration-300 w-full shadow-sm"
            >
              ONYESHA ZAIDI
            </Button>
          ) : (
            <p className="text-center text-gray-400 mt-4"></p>
          )}
        </section>
      </div>
    </div>
  );
};

export default DrawerContent;
