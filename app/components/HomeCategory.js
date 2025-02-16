import React from "react";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const HomeCategory = ({ category, items }) => {
  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  return (
    <div className="space-y-2 bg-gray-800 rounded-lg p-4">
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
            <div
              key={content.id}
              className="flex-none w-[calc(35%-0.5rem)] h-2rem sm:w-[calc(45%-0.5rem)] md:w-[calc(30%-0.5rem)] lg:w-[calc(50%-0.5rem)]"
            >
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
      </div>
    </div>
  );
};

export default HomeCategory;
