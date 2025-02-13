"use client";
import React from "react";
import { useContents } from "./useContents";
import MovieCard from "./MovieCard";

const ContentGrid = () => {
  const { data, isLoading, isError } = useContents();

  console.log("Full data received:", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Content Library</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.map((content) => (
          <MovieCard
            imageUrl={content.poster_url}
            key={content.id}
            title={content.title}
            year={content.year}
            rating={null} // Add if you have rating in your Content model
            duration={content.fileSize} // Using fileSize as duration
            genre={content.genres}
            director={content.dj} // Using dj field as director
            description={content.plotSummary}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentGrid;
