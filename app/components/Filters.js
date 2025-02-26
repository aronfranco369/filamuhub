"use client";
import React, { useEffect, useState, Suspense } from "react";
import { getFilterOptions } from "../actions/filters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Loading component for Suspense fallback
function FiltersLoading() {
  return (
    <div className="space-y-2 p-2 animate-pulse">
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4].map((index) => (
          <div key={index} className="w-[180px] h-10 bg-gray-800 rounded" />
        ))}
      </div>
    </div>
  );
}

// Client Component that uses searchParams
function FiltersContent() {
  const [filterOptions, setFilterOptions] = useState({
    countries: [],
    genres: [],
    djs: [],
    years: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        setIsLoading(true);
        const options = await getFilterOptions();
        setFilterOptions(options);
        setError(null);
      } catch (error) {
        console.error("Error loading filter options:", error);
        setError("Failed to load filter options");
      } finally {
        setIsLoading(false);
      }
    };

    loadFilterOptions();
  }, []);

  const selectedCountry = searchParams.get("country");
  const selectedGenre = searchParams.get("genre");
  const selectedDj = searchParams.get("dj");
  const selectedYear = searchParams.get("year");

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    if (value === null) {
      params.delete(name);
    } else {
      params.set(name, value);
    }
    return params.toString();
  };

  const handleFilterChange = (type, value) => {
    router.push(`?${createQueryString(type, value)}`);
  };

  const clearFilters = () => {
    router.push("/");
  };

  const hasActiveFilters =
    selectedCountry || selectedGenre || selectedDj || selectedYear;

  if (error) {
    return <div className="p-4 text-red-500 bg-red-100 rounded">{error}</div>;
  }

  if (isLoading) {
    return (
      <div className="space-y-2 p-1 animate-pulse">
        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-[180px] h-10 bg-gray-800 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-0.5">
      <div className="flex items-center space-x-2">
        <Select
          onValueChange={(value) => handleFilterChange("country", value)}
          value={selectedCountry || ""}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700 focus:ring-gray-700 focus:ring-offset-gray-900">
            <SelectValue placeholder="Country" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {filterOptions?.countries.map((country) => (
              <SelectItem
                key={country}
                value={country}
                className="hover:bg-gray-700 focus:bg-gray-700 text-white hover:text-white focus:text-white"
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("genre", value)}
          value={selectedGenre || ""}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700 focus:ring-gray-700 focus:ring-offset-gray-900">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {filterOptions?.genres.map((genre) => (
              <SelectItem
                key={genre}
                value={genre}
                className="hover:bg-gray-700 focus:bg-gray-700 text-white hover:text-white focus:text-white"
              >
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("dj", value)}
          value={selectedDj || ""}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700 focus:ring-gray-700 focus:ring-offset-gray-900">
            <SelectValue placeholder="DJ" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {filterOptions?.djs.map((dj) => (
              <SelectItem
                key={dj}
                value={dj}
                className="hover:bg-gray-700 focus:bg-gray-700 text-white hover:text-white focus:text-white"
              >
                {dj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("year", value)}
          value={selectedYear || ""}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700 focus:ring-gray-700 focus:ring-offset-gray-900">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {filterOptions?.years.map((year) => (
              <SelectItem
                key={year}
                value={year}
                className="hover:bg-gray-700 focus:bg-gray-700 text-white hover:text-white focus:text-white"
              >
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="secondary"
          size="sm"
          onClick={clearFilters}
          className="flex items-center space-x-1 bg-gray-700 hover:bg-gray-600 text-white border-gray-600"
        >
          <X className="w-4 h-4" />
          <span>Clear Filters</span>
        </Button>
      )}
    </div>
  );
}

// Main component that wraps with Suspense
function Filters() {
  return (
    <Suspense fallback={<FiltersLoading />}>
      <FiltersContent />
    </Suspense>
  );
}

export default Filters;
