// useFilters.js
"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

// Fetch unique filter options (countries, genres, DJs)
export const useFilters = () => {
  return useQuery({
    queryKey: ["filter-options"],
    queryFn: async () => {
      // Fetch unique countries
      const { data: countries, error: countriesError } = await supabase
        .from("contents")
        .select("country")
        .not("country", "is", null)
        .order("country", { ascending: true });

      if (countriesError) throw new Error(countriesError.message);

      // Fetch unique genres
      const { data: genres, error: genresError } = await supabase
        .from("contents")
        .select("genres")
        .not("genres", "is", null);

      if (genresError) throw new Error(genresError.message);

      // Flatten and get unique genres
      const uniqueGenres = [
        ...new Set(genres.flatMap((item) => item.genres)),
      ].sort();

      // Fetch unique DJs
      const { data: djs, error: djsError } = await supabase
        .from("contents")
        .select("dj")
        .not("dj", "is", null)
        .order("dj", { ascending: true });

      if (djsError) throw new Error(djsError.message);

      return {
        countries: [...new Set(countries.map((c) => c.country))],
        genres: uniqueGenres,
        djs: [...new Set(djs.map((d) => d.dj))],
      };
    },
  });
};

// Fetch filtered contents based on selected filters
export const useFilteredContents = (filters) => {
  return useQuery({
    queryKey: ["filtered-contents", filters],
    queryFn: async () => {
      let query = supabase
        .from("contents")
        .select(
          `
          id,
          external_id,
          type,
          title,
          country,
          year,
          genres,
          poster_url,
          plot_summary,
          dj,
          season,
          download_url,
          file_size,
          created_at,
          updated_at,
          episodes:episodes(
            id,
            title,
            download_url,
            file_size,
            created_at
          )
        `
        )
        .order("created_at", { ascending: false });

      if (filters.country) query = query.eq("country", filters.country);
      if (filters.genre) query = query.contains("genres", [filters.genre]);
      if (filters.dj) query = query.eq("dj", filters.dj);

      const { data: items, error } = await query;

      if (error) {
        throw new Error(error.message);
      }

      // Process items based on type
      const processedItems = items.map((item) => {
        if (item.type === "movie") {
          return {
            ...item,
            episodes: [],
            latestEpisode: null,
          };
        } else if (item.type === "series") {
          const episodes = item.episodes || [];
          const latestEpisode =
            episodes.length > 0
              ? episodes.reduce((latest, episode) => {
                  return new Date(episode.created_at) >
                    new Date(latest.created_at)
                    ? episode
                    : latest;
                }, episodes[0])
              : null;

          return {
            ...item,
            episodes,
            latestEpisode,
          };
        }
        return item;
      });

      return processedItems;
    },
  });
};
