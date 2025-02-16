import ContentGrid from "./components/ContentGrid";
import SearchInput from "./components/SearchInput";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* <Header /> */}
      <SearchInput />
      <ContentGrid />
    </div>
  );
}
