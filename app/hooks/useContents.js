"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export const useContents = () => {
  return useQuery({
    queryKey: ["categorized-contents"],
    queryFn: async () => {
      // Get all distincttt combinations of country and type
      const { data: categories, error: categoriesError } = await supabase
        .from("contents")
        .select("country, type")
        .not("country", "is", null)
        .order("country")
        .order("type");

      if (categoriesError) {
        throw new Error(categoriesError.message);
      }

      // Remove duplicates
      const uniqueCategories = Array.from(
        new Set(categories.map((c) => `${c.country}-${c.type}`))
      ).map((cat) => {
        const [country, type] = cat.split("-");
        return { country, type };
      });

      // Fetch items for each category
      const categoryData = await Promise.all(
        uniqueCategories.map(async ({ country, type }) => {
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
            .eq("country", country)
            .eq("type", type)
            .order("created_at", { ascending: false })
            .limit(4);

          const { data: items, error: itemsError } = await query;

          if (itemsError) {
            console.error(`Error fetching ${country} ${type}:`, itemsError);
            return null;
          }

          // Process items based on type
          const processedItems = items.map((item) => {
            if (item.type === "movie") {
              // For movies, ensure episodes is an empty array
              return {
                ...item,
                episodes: [],
                latestEpisode: null,
              };
            } else if (item.type === "series") {
              // For series, find the latest episode if episodes exist
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

          return {
            category: `${country} ${type}`.toUpperCase(),
            items: processedItems || [],
          };
        })
      );

      return categoryData.filter(Boolean);
    },
  });
};
