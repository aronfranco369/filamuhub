import React from "react";
import MovieCard from "./MovieCard";

const GridLayout = ({ data, message }) => {
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
    <div className="flex flex-wrap gap-4">
      {data.map((content) => (
        <div key={content.id} className="flex-none w-[calc(33.33%-1rem)]">
          <MovieCard
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
        </div>
      ))}
    </div>
  );
};

export default GridLayout;
