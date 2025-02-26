import { supabase } from "./supabaseClient";

export default async function sitemap() {
  // Fetch data from Supabase
  const { data: movies = [] } = await supabase
    .from("contents")
    .select("id, title, created_at, external_id, updated_at")
    .eq("type", "movie");

  const { data: series = [] } = await supabase
    .from("contents")
    .select("id, title, created_at, external_id , updated_at")
    .eq("type", "series");

  // Ensure we handle null values and properly format dates
  const movieUrls = movies.map((movie) => ({
    url: `https://filamuhub24.vercel.app/movie/${movie.external_id}`,
    lastModified: new Date(movie.updated_at || movie.created_at).toISOString(),
  }));

  const seriesUrls = series.map((series) => ({
    url: `https://filamuhub24.vercel.app/series/${series.external_id}`,
    lastModified: new Date(
      series.updated_at || series.created_at
    ).toISOString(),
  }));

  // Add static pages
  const routes = ["", "/category/movie", "/category/series"].map((route) => ({
    url: `https://filamuhub24.vercel.app${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...movieUrls, ...seriesUrls];
}
