// app/page.js
import { Suspense } from "react";
import ContentGrid from "./components/ContentGrid";
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
    <div className="container mx-auto px-0">
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
  );
}
