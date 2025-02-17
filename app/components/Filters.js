import React, { useState, useEffect } from "react";
import { useFilters } from "../hooks/useFilters";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FiltersSkeleton from "./skeltons/FiltersSkelton";

const Filters = ({ onFilterChange }) => {
  const { data: filterOptions, isLoading, isError } = useFilters();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedDj, setSelectedDj] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    onFilterChange({
      country: selectedCountry,
      genre: selectedGenre,
      dj: selectedDj,
      year: selectedYear,
    });
  }, [
    selectedCountry,
    selectedGenre,
    selectedDj,
    selectedYear,
    onFilterChange,
  ]);

  const handleFilterChange = (type, value) => {
    switch (type) {
      case "country":
        setSelectedCountry(value);
        break;
      case "genre":
        setSelectedGenre(value);
        break;
      case "dj":
        setSelectedDj(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
    }
  };

  const clearFilters = () => {
    setSelectedCountry(null);
    setSelectedGenre(null);
    setSelectedDj(null);
    setSelectedYear(null);
  };

  if (isLoading) return <FiltersSkeleton />;
  if (isError) return <div>Error loading filters</div>;

  const hasActiveFilters =
    selectedCountry || selectedGenre || selectedDj || selectedYear;

  return (
    <div className="space-y-2 p-2">
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
};

export default Filters;
