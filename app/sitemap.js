// app/sitemap.js (Next.js 13+ route handler for sitemap)
import { supabase } from "./supabaseClient";

export default async function sitemap() {
  const { data: movies } = await supabase
    .from("contents")
    .select("id, title, created_at, updated_at")
    .eq("type", "movie");

  const { data: series } = await supabase
    .from("contents")
    .select("id, title, created_at, updated_at")
    .eq("type", "series");

  const movieUrls = movies.map((movie) => ({
    url: `https://filamuhub24.vercel.app/details/${movie.id}`,
    lastModified: movie.updated_at || movie.created_at,
  }));

  const seriesUrls = series.map((series) => ({
    url: `https://filamuhub24.vercel.app/details/${series.id}`,
    lastModified: series.updated_at || series.created_at,
  }));

  // Add static pages
  const routes = ["", "/category/movie", "/category/series"].map((route) => ({
    url: `https://filamuhub24.vercel.app${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...movieUrls, ...seriesUrls];
}
