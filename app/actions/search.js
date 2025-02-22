// actions/search.js
"use server";

import { supabase } from "../supabaseClient";

export async function searchContents(searchTerm) {
  if (!searchTerm) return [];

  try {
    const { data, error } = await supabase
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
      .or(`title.ilike.%${searchTerm}%,dj.ilike.%${searchTerm}%`)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data.map((item) => {
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
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}
