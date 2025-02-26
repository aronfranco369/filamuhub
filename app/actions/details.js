// contentService.js
import { supabase } from "../supabaseClient";

export async function fetchContentDetails(name) {
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
    .eq("external_id", name)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    ...data,
    episodes: data.episodes || [],
    latestEpisode:
      data.episodes?.length > 0
        ? data.episodes.reduce((latest, episode) => {
            return new Date(episode.created_at) > new Date(latest.created_at)
              ? episode
              : latest;
          }, data.episodes[0])
        : null,
  };
}
