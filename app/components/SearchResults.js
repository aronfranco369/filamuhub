// app/search/[query]/page.js
"use client";
import { useParams } from "next/navigation";
import { useSearchQuery } from "../hooks/useSearchQuery";
import GridLayout from "./GridLayout";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

// Loading component for Suspense fallback
function SearchResultsLoading() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Loading search results...</h1>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    </div>
  );
}

// Component that uses the query param
function SearchResultsContent() {
  const { query } = useParams();
  const decodedQuery = decodeURIComponent(query);
  const { data, isLoading, isError } = useSearchQuery(decodedQuery);

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl mb-4">Error loading search results</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl mb-4">Search Results for "{decodedQuery}"</h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <GridLayout data={data} message="No results found for your search" />
        )}
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function SearchResults() {
  return (
    <Suspense fallback={<SearchResultsLoading />}>
      <SearchResultsContent />
    </Suspense>
  );
}
