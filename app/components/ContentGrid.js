"use client";
import React, { useState } from "react";
import { useContents } from "../hooks/useContents";
import { useFilteredContents } from "../hooks/useFilteredContents";
import Filters from "./Filters";
import GridLayout from "./GridLayout";
import HomeCategory from "./HomeCategory";
import ContentSkeleton from "./skeltons/ContentSkelton";

const ContentGrid = () => {
  const [filters, setFilters] = useState({
    country: null,
    genre: null,
    dj: null,
    year: null,
  });

  const {
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useContents();
  const {
    data: filteredContents,
    isLoading: isFilteredContentsLoading,
    isError: isFilteredContentsError,
  } = useFilteredContents(filters);

  if (isCategoriesError || isFilteredContentsError)
    return <div>Error fetching data</div>;

  const hasFilters =
    filters.country || filters.genre || filters.dj || filters.year;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-2 space-y-4">
        {/* Filters Component */}
        <Filters onFilterChange={setFilters} />

        {/* Display filtered content if any filter is selected */}
        {hasFilters ? (
          <GridLayout
            data={filteredContents}
            message="No series/movie of this filter found"
            isLoading={isFilteredContentsLoading}
          />
        ) : // Display either skeleton or category-based layout
        isCategoriesLoading ? (
          <ContentSkeleton />
        ) : (
          categories?.map(({ category, items }) => (
            <HomeCategory
              key={category}
              category={category}
              items={items}
              isLoading={false}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContentGrid;
