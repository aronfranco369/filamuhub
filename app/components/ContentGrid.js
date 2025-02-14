// components/ContentGrid.js
"use client";
import React from "react";
import { useContents } from "../useContents";
import MovieCard from "./MovieCard";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ContentGrid = () => {
  const { data, isLoading, isError } = useContents();

  console.log("Fetched Data:", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {data?.map(({ category, items }) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-2xl font-bold">{category}</h2>
            <Link
              href={`/category/${encodeURIComponent(category)}`}
              className="flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors text-white"
            >
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="relative">
            <div className="flex overflow-x-auto pb-4 gap-4 scroll-smooth scrollbar-hide">
              {items.map((content) => (
                <Link
                  key={content.id}
                  href={`/details/${content.id}`} // Updated to match your dynamic route
                  className="flex-none w-[calc(40%-1rem)] sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)]"
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
