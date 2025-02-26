import React from "react";
import Link from "next/link";
import MovieCard from "./MovieCard";
import { fetchCategorizedContent } from "../actions/categories";

const ContentSection = ({ title, items, showViewMore = false, type }) => (
  <section className="space-y-2 bg-gray-800 rounded-lg p-1">
    <h2 className="text-xl font-semibold tracking-wide text-gray-100 font-sans uppercase">
      {title}
    </h2>
    <div className="relative">
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
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
    {showViewMore && (
      <Link
        href={`/category/${type}`}
        className="block mt-4 text-center py-2 px-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white rounded-md transition-all duration-300 w-full shadow-sm"
      >
        Onyesha zaidi
      </Link>
    )}
  </section>
);

async function ContentCategories() {
  const categorizedContent = await fetchCategorizedContent();

  const sections = [
    {
      title: "Sizoni Mpya",
      items: categorizedContent.sizonMpya,
      showViewMore: true,
      type: "series",
    },
    {
      title: "Muvi Mpya",
      items: categorizedContent.muviMpya,
      showViewMore: true,
      type: "movie",
    },
    {
      title: "Sizoni Zinazotrendi",
      items: categorizedContent.sizoniZinazotrendi,
      showViewMore: false,
    },
    {
      title: "Muvi Zinazotrend",
      items: categorizedContent.muviZinazotrend,
      showViewMore: false,
    },
  ];

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <ContentSection
          key={section.title}
          title={section.title}
          items={section.items}
          showViewMore={section.showViewMore}
          type={section.type}
        />
      ))}
    </div>
  );
}

export default ContentCategories;
