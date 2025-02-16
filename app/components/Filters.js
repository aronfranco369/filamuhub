import React, { useState, useEffect } from "react";
import { useFilters } from "../useFilters";
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

  useEffect(() => {
    onFilterChange({
      country: selectedCountry,
      genre: selectedGenre,
      dj: selectedDj,
    });
  }, [selectedCountry, selectedGenre, selectedDj, onFilterChange]);

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
    }
  };

  const clearFilters = () => {
    setSelectedCountry(null);
    setSelectedGenre(null);
    setSelectedDj(null);
  };

  if (isLoading) return <FiltersSkeleton />;
  if (isError) return <div>Error loading filters</div>;

  const hasActiveFilters = selectedCountry || selectedGenre || selectedDj;

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 p-4 rounded-lg">
        <Select
          onValueChange={(value) => handleFilterChange("country", value)}
          value={selectedCountry}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700 focus:ring-gray-700 focus:ring-offset-gray-900">
            <SelectValue
              placeholder="Select Country"
              className="text-gray-400"
            />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {filterOptions?.countries.map((country) => (
              <SelectItem
                key={country}
                value={country}
                className="hover:bg-gray-700 focus:bg-gray-700"
              >
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("genre", value)}
          value={selectedGenre}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700 focus:ring-gray-700 focus:ring-offset-gray-900">
            <SelectValue placeholder="Select Genre" className="text-gray-400" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {filterOptions?.genres.map((genre) => (
              <SelectItem
                key={genre}
                value={genre}
                className="hover:bg-gray-700 focus:bg-gray-700"
              >
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(value) => handleFilterChange("dj", value)}
          value={selectedDj}
        >
          <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700 focus:ring-gray-700 focus:ring-offset-gray-900">
            <SelectValue placeholder="Select DJ" className="text-gray-400" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white border-gray-700">
            {filterOptions?.djs.map((dj) => (
              <SelectItem
                key={dj}
                value={dj}
                className="hover:bg-gray-700 focus:bg-gray-700"
              >
                {dj}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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
    </div>
  );
};

export default Filters;
