// pages/index.js
import Header from "./Header";
import ContentGrid from "./ContentList";
import MovieCard from "./MovieCard";

export default function Home() {
  return (
    <div>
      <Header />

      <ContentGrid />
    </div>
  );
}
