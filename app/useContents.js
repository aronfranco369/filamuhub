"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

export const useContents = () => {
  return useQuery({
    queryKey: ["categorized-contents"],
    queryFn: async () => {
      // Get all distinct combinations of country and type
      const { data: categories, error: categoriesError } = await supabase
        .from("contents")
        .select("country, type")
        .not("country", "is", null)
        .order("country")
        .order("type");

      if (categoriesError) {
        throw new Error(categoriesError.message);
      }

      // Remove duplicates (since Supabase doesn't support DISTINCT on multiple columns)
      const uniqueCategories = Array.from(
        new Set(categories.map((c) => `${c.country}-${c.type}`))
      ).map((cat) => {
        const [country, type] = cat.split("-");
        return { country, type };
      });

      // Fetch 4 items for each category
      const categoryData = await Promise.all(
        uniqueCategories.map(async ({ country, type }) => {
          const { data: items, error: itemsError } = await supabase
            .from("contents")
            .select(
              `
              id,
              title,
              country,
              type,
              year,
              genres,
              poster_url,
              plot_summary,
              dj,
              file_size
            `
            )
            .eq("country", country)
            .eq("type", type)
            .order("created_at", { ascending: false })
            .limit(4);

          if (itemsError) {
            console.error(`Error fetching ${country} ${type}:`, itemsError);
            return null;
          }

          return {
            category: `${country} ${type}`.toUpperCase(),
            items: items || [],
          };
        })
      );

      return categoryData.filter(Boolean);
    },
  });
};
