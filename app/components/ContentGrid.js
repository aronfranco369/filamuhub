// ContentGrid.js
"use client";
import React, { useState } from "react";
import { useContents } from "../useContents";
import { useFilteredContents } from "../useFilteredContents";
import Filters from "./Filters";
import GridLayout from "./GridLayout";
import HomeCategory from "./HomeCategory";
import AnimatedHeader from "./AnimatedHeader";

const ContentGrid = () => {
  const [filters, setFilters] = useState({
    country: null,
    genre: null,
    dj: null,
  });
  const { data: categories, isLoading, isError } = useContents();
  const { data: filteredContents } = useFilteredContents(filters);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto p-2 space-y-4">
        {/* Filters Component */}
        <Filters onFilterChange={setFilters} />

        {/* Display filtered content if any filter is selected */}
        {filters.country || filters.genre || filters.dj ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <GridLayout
              data={filteredContents}
              message="No series/movie of this filter found"
            />
          </div>
        ) : (
          // Display legacy category-based layout if no filters are selected
          categories?.map(({ category, items }) => (
            <HomeCategory key={category} category={category} items={items} />
          ))
        )}
      </div>
    </div>
  );
};

export default ContentGrid;
