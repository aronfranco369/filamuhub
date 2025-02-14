import Header from "./Header";
import ContentGrid from "./ContentGrid";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <ContentGrid />
    </div>
  );
}
