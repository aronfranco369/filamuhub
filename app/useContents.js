"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "./supabaseClient";

export const useContents = () => {
  return useQuery({
    queryKey: ["contents"],
    queryFn: async () => {
      const { data: contentsData, error: contentsError } = await supabase
        .from("contents")
        .select("*");

      if (contentsError) {
        throw new Error(contentsError.message);
      }

      const contentsWithEpisodes = await Promise.all(
        contentsData.map(async (content) => {
          let episodes = [];

          if (content.type === "series") {
            const { data: episodesData, error: episodesError } = await supabase
              .from("episodes")
              .select("*")
              .eq("content_id", content.id);

            if (!episodesError && episodesData) {
              episodes = episodesData;
            }
          }

          return {
            ...content,
            episodes,
          };
        })
      );

      return contentsWithEpisodes;
    },
  });
};
