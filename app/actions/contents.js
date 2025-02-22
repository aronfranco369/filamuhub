import { supabase } from "../supabaseClient";

export async function getContents(filters) {
  try {
    if (filters.country || filters.genre || filters.dj || filters.year) {
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

      if (error) throw error;

      return items.map(processItem);
    }

    // Get all distinct combinations of country and type
    const { data: categories, error: categoriesError } = await supabase
      .from("contents")
      .select("country, type")
      .not("country", "is", null)
      .order("country")
      .order("type");

    if (categoriesError) throw categoriesError;

    const uniqueCategories = Array.from(
      new Set(categories.map((c) => `${c.country}-${c.type}`))
    ).map((cat) => {
      const [country, type] = cat.split("-");
      return { country, type };
    });

    const categoryData = await Promise.all(
      uniqueCategories.map(async ({ country, type }) => {
        const { data: items, error: itemsError } = await supabase
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

        if (itemsError) return null;

        return {
          category: `${country} ${type}`.toUpperCase(),
          items: items.map(processItem),
        };
      })
    );

    return categoryData.filter(Boolean);
  } catch (error) {
    console.error("Error fetching contents:", error);
    throw error;
  }
}

function processItem(item) {
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
            return new Date(episode.created_at) > new Date(latest.created_at)
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
}
