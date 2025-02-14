import Header from "./Header";
import ContentGrid from "./components/ContentGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <ContentGrid />
    </div>
  );
}
