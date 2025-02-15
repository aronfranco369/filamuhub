"use client";
import React from "react";
import { useContents } from "../useContents";
import MovieCard from "./MovieCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ContentGrid = () => {
  const { data, isLoading, isError } = useContents();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="container mx-auto p-2 space-y-4">
      {data?.map(({ category, items }) => (
        <div key={category} className="space-y-2 bg-gray-800 rounded-lg p-4">
          {/* Category header section */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-wide text-gray-100 font-sans">
              {formatCategory(category)}
            </h2>
            <Link
              href={`/category/${encodeURIComponent(category)}`}
              className="flex items-center text-sm font-medium text-gray-300 hover:text-purple-400 active:text-purple-500 transition-colors"
            >
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="relative">
            <div className="flex overflow-x-auto pb-2 gap-2 scroll-smooth scrollbar-hide">
              {items.map((content) => (
                <Link
                  key={content.id}
                  href={`/details/${content.id}`}
                  className="flex-none w-[calc(30%-0.5rem)] h-2rem sm:w-[calc(33.33%-0.5rem)] md:w-[calc(25%-0.5rem)] lg:w-[calc(20%-0.5rem)]"
                >
                  <MovieCard
                    imageUrl={content.poster_url}
                    title={content.title}
                    type={content.type}
                    created_at={content.created_at}
                    latestEpisode={content.latestEpisode}
                    genre={content.genres}
                    director={content.dj}
                    description={content.plot_summary}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
