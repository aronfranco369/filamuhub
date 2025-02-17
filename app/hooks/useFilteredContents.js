"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

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
      if (filters.year) query = query.eq("year", filters.year);

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
