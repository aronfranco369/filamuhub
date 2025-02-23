import { supabase } from "../supabaseClient";

const transformContent = (item) => {
  // Process episodes if they exist (for both series and multi-part movies)
  let latestEpisode = null;
  if (item.episodes && item.episodes.length > 0) {
    latestEpisode = item.episodes.reduce((latest, episode) => {
      return new Date(episode.created_at) > new Date(latest.created_at)
        ? episode
        : latest;
    }, item.episodes[0]);
  }

  return {
    id: item.id,
    title: item.title,
    poster_url: item.poster_url,
    type: item.type,
    created_at: item.created_at,
    genres: item.genres,
    dj: item.dj,
    plot_summary: item.plot_summary,
    trending: item.trending,
    download_url: item.download_url,
    file_size: item.file_size,
    episodes: item.episodes || [],
    latestEpisode, // Can exist for both series and multi-part movies
  };
};

export async function fetchCategorizedContent() {
  const ITEMS_PER_SECTION = 9;

  // Common select query with episodes
  const baseQuery = (type, isTrending = false) => {
    let query = supabase
      .from("contents")
      .select(
        `
        *,
        episodes(
          id,
          title,
          download_url,
          file_size,
          created_at,
          updated_at
        )
      `
      )
      .eq("type", type)
      .limit(ITEMS_PER_SECTION);

    if (isTrending) {
      query = query
        .not("trending", "is", null)
        .order("trending", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    return query;
  };

  // Parallel fetch all sections
  const [
    { data: latestMovies },
    { data: latestSeries },
    { data: trendingSeries },
    { data: trendingMovies },
  ] = await Promise.all([
    baseQuery("movie"),
    baseQuery("series"),
    baseQuery("series", true),
    baseQuery("movie", true),
  ]);

  // Return with original property names
  return {
    muviMpya: (latestMovies || []).map(transformContent),
    sizonMpya: (latestSeries || []).map(transformContent),
    sizoniZinazotrendi: (trendingSeries || []).map(transformContent),
    muviZinazotrend: (trendingMovies || []).map(transformContent),
  };
}
