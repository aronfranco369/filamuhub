"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContents } from "./useContents";
import MovieCard from "./MovieCard";

const ContentGrid = () => {
  const { data, isLoading, isError } = useContents();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -300 : 300;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      {data?.map(({ category, items }) => (
        <div key={category} className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">{category}</h2>
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
            >
              <ChevronLeft className="h-6 w-6 text-gray-500" />
            </button>
            <div
              ref={scrollRef}
              className="flex overflow-x-auto pb-4 gap-4 scroll-smooth scrollbar-hide"
            >
              {items.map((content) => (
                <div
                  key={content.id}
                  className="flex-none w-[calc(100%/3-1rem)] md:w-[280px]"
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
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
            >
              <ChevronRight className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentGrid;
