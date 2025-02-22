// page.js
import { Suspense } from "react";
import ContentGrid from "./components/ContentGrid";
import SearchInput from "./components/SearchInput";
import GridLayout from "./components/GridLayout";
import { Loader2 } from "lucide-react";
import { searchContents } from "./actions/search";

export default async function Home({ searchParams }) {
  // First await searchParams
  const params = await searchParams;
  // Then safely access the q property
  const searchTerm = params?.q || "";

  // Only search if we have a term
  const searchResults = searchTerm ? await searchContents(searchTerm) : [];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Smaller fixed container for SearchInput */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 z-50 py-2 px-4 shadow-md">
        {" "}
        {/* Reduced padding */}
        <SearchInput defaultValue={searchTerm} />
      </div>

      {/* Main content with reduced padding to avoid overlap */}
      <div className="container mx-auto pt-16 p-2">
        {" "}
        {/* Adjusted padding-top to pt-16 */}
        {searchTerm ? (
          <>
            <h1 className="text-2xl mb-4">Search Results for "{searchTerm}"</h1>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              }
            >
              <GridLayout
                data={searchResults}
                message="No results found for your search"
              />
            </Suspense>
          </>
        ) : (
          <ContentGrid searchParams={searchParams} />
        )}
      </div>
    </div>
  );
}
