"use client";
import React from "react";
import { useContents } from "./useContents";
import MovieCard from "./MovieCard";

const ContentGrid = () => {
  const { data, isLoading, isError } = useContents();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto p-4 space-y-12">
      {data?.map(({ category, items }) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">{category}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {items.map((content) => (
              <MovieCard
                key={content.id}
                imageUrl={content.poster_url}
                title={content.title}
                year={content.year}
                duration={content.file_size}
                genre={content.genres}
                director={content.dj}
                description={content.plot_summary}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
