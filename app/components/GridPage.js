import FilteredContents from "../hooks/FilteredContents";
import SearchResults from "./SearchResults";
import GridLayout from "./GridLayout";

export default async function GridPage({ search, filters }) {
  let data;

  if (search) {
    // Fetch search results
    data = await SearchResults({ searchTerm: search });
  } else {
    // Fetch filtered contents
    data = await FilteredContents({ filters });
  }

  return (
    <GridLayout
      data={data}
      message={data.length === 0 ? "No results found" : ""}
      isLoading={false}
    />
  );
}
