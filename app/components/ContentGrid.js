import React from "react";
import Filters from "./Filters";
import GridLayout from "./GridLayout";
import ContentCategories from "./ContentCategories";
import ContentSkeleton from "./skeltons/ContentSkelton";
import { getContents } from "../actions/contents";

async function ContentGrid({ searchParams }) {
  // Wait for searchParams to be available before destructuring
  const params = await Promise.resolve(searchParams);
  const filters = {
    country: params?.country || null,
    genre: params?.genre || null,
    dj: params?.dj || null,
    year: params?.year || null,
  };

  const hasFilters =
    filters.country || filters.genre || filters.dj || filters.year;

  try {
    if (hasFilters) {
      const data = await getContents(filters);
      return (
        <div className="min-h-screen bg-gray-900">
          <div className="container mx-auto p-2 space-y-4">
            <Filters />
            <GridLayout
              data={data}
              message="No series/movie of this filter found"
            />
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto p-1 space-y-1">
          <Filters />
          <ContentCategories />
        </div>
      </div>
    );
  } catch (error) {
    return <div>Error fetching data</div>;
  }
}

export default ContentGrid;
