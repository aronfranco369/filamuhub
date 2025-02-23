"use client";
import React, { useState } from "react";
import MovieCard from "./MovieCard";
import { Button } from "@/components/ui/button";
import { fetchContentByCountry } from "../actions/countryCategories";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const CountrySection = ({ country, items, type, onLoadMore, hasMore }) => (
  <section className="space-y-2 bg-gray-800 rounded-lg p-4">
    <h2 className="text-xl font-semibold tracking-wide text-gray-100 font-sans uppercase pt-1">
      {country}
    </h2>
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {items.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            imageUrl={item.poster_url}
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
    {hasMore ? (
      <Button
        onClick={() => onLoadMore(country)}
        className="block mt-4 text-center py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-md transition-all duration-300 w-full shadow-sm"
      >
        ONYESHA ZAIDI
      </Button>
    ) : items.length > 0 ? (
      <p className="text-center text-gray-400 mt-4">
        -----------Umefika mwisho------------
      </p>
    ) : null}
  </section>
);

const CountryContentSection = ({ type }) => {
  const [countryOffsets, setCountryOffsets] = useState({});
  const queryClient = useQueryClient();

  const {
    data: countryContentData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["country-content", type],
    queryFn: async () => {
      try {
        const data = await fetchContentByCountry({ type, offset: 0, limit: 6 });
        console.log("Fetched data:", data);
        return data;
      } catch (error) {
        console.error("Query error:", error);
        throw error;
      }
    },
  });

  const handleLoadMore = async (country) => {
    try {
      const currentOffset = countryOffsets[country] || 0;
      const newOffset = currentOffset + 6;

      const moreContent = await fetchContentByCountry({
        type,
        offset: newOffset,
        limit: 3,
        country,
      });

      queryClient.setQueryData(["country-content", type], (oldData) => {
        if (!oldData) return moreContent;

        return {
          ...oldData,
          results: oldData.results.map((categoryContent) => {
            if (categoryContent.country === country) {
              const newCountryContent = moreContent.results.find(
                (c) => c.country === country
              );
              return {
                ...categoryContent,
                items: [
                  ...categoryContent.items,
                  ...(newCountryContent?.items || []),
                ],
                hasMore: newCountryContent?.hasMore || false,
              };
            }
            return categoryContent;
          }),
        };
      });

      setCountryOffsets((prev) => ({
        ...prev,
        [country]: newOffset,
      }));
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

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-300">Loading content...</p>
      </div>
    );
  }

  if (!countryContentData?.results || countryContentData.results.length === 0) {
    return (
      <div className="text-center p-8 text-gray-300">
        No content available for this category.
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="w-auto">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                Filamu Hub
              </h1>
            </div>
            <div className="flex items-center flex-1 justify-end"></div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {countryContentData.results.map((categoryContent) => (
          <CountrySection
            key={categoryContent.country}
            country={categoryContent.country}
            items={categoryContent.items}
            type={type}
            onLoadMore={handleLoadMore}
            hasMore={categoryContent.hasMore}
          />
        ))}
      </div>
    </div>
  );
};

export default CountryContentSection;
