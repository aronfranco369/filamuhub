"use client";
import React from "react";
import { useContents } from "./useContents";
import MovieCard from "./MovieCard";

const ContentGrid = () => {
  const { data, isLoading, isError } = useContents();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {data?.map(({ category, items }) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">{category}</h2>
          <div className="relative">
            <div className="flex overflow-x-auto pb-4 gap-4 scroll-smooth scrollbar-hide">
              {items.map((content) => (
                <div
                  key={content.id}
                  className="flex-none w-[calc(40%-1rem)] sm:w-[calc(33.33%-1rem)] md:w-[calc(25%-1rem)] lg:w-[calc(20%-1rem)]"
                >
                  <MovieCard
                    imageUrl={content.poster_url}
                    title={content.title}
                    year={content.year}
                    duration={content.file_size}
                    genre={content.genres}
                    director={content.dj}
                    description={content.plot_summary}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
