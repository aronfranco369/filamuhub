// GridLayout.js
import React from "react";
import MovieCard from "./MovieCard";
import GridLayoutSkeleton from "./skeltons/GridLayoutSkelton";

const GridLayout = ({ data, message, isLoading }) => {
  if (isLoading) {
    return <GridLayoutSkeleton />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-600 text-xl">
          {message || "No data available"}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.map((content) => (
        <MovieCard
          key={content.id}
          id={content.id}
          imageUrl={content.poster_url}
          title={content.title}
          type={content.type}
          created_at={content.created_at}
          latestEpisode={content.latestEpisode}
          genre={content.genres}
          director={content.dj}
          description={content.plot_summary}
        />
      ))}
    </div>
  );
};

export default GridLayout;
