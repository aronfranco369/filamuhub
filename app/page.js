"use client";
import { useState } from "react";
import ContentGrid from "./components/ContentGrid";
import SearchInput from "./components/SearchInput";
import { useSearchQuery } from "./hooks/useSearchQuery";
import GridLayout from "./components/GridLayout";
import { Loader2 } from "lucide-react";
import AppDownloadBanner from "./components/DownloadApp";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults, isLoading: isSearching } =
    useSearchQuery(searchTerm);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* <AppDownloadBanner /> */}
      <SearchInput onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        {searchTerm ? (
          <>
            <h1 className="text-2xl mb-4">Search Results for "{searchTerm}"</h1>
            {isSearching ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
              <GridLayout
                data={searchResults}
                message="No results found for your search"
              />
            )}
          </>
        ) : (
          <ContentGrid />
        )}
      </div>
    </div>
  );
}
