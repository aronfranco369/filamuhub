// actions/countryContentFetch.js
import { supabase } from "../supabaseClient";

export async function fetchDrawerContents({
  country,
  type,
  offset = 0,
  limit = 6,
}) {
  try {
    console.log(
      `Fetching ${type} content for ${country} with offset ${offset} and limit ${limit}`
    );

    // First get total count of content for specific country and type
    const { data: totalContent, error: countError } = await supabase
      .from("contents")
      .select("country")
      .select("external_id")
      .eq("type", type)
      .eq("country", country);

    if (countError) throw countError;

    // Get the content with pagination, handling both movies and series
    let query = supabase
      .from("contents")
      .select("external_id")
      .select(
        `
        *,
        episodes (
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
      .eq("country", country)
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    // Add specific conditions based on content type
    if (type === "series") {
      // For series, ensure there's at least one episode
      query = query.not("episodes", "is", null);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return { items: [], totalCount: 0, hasMore: false };
    }

    // Process the data
    const processedItems = data.map((item) => {
      let processedItem = { ...item };

      if (type === "series" && item.episodes) {
        // For series, get the latest episode
        const latestEpisode = item.episodes.reduce((latest, episode) => {
          return new Date(episode.created_at) > new Date(latest.created_at)
            ? episode
            : latest;
        }, item.episodes[0]);

        processedItem.latestEpisode = latestEpisode;
      }

      return processedItem;
    });

    return {
      items: processedItems,
      totalCount: totalContent.length,
      hasMore: totalContent.length > offset + limit,
    };
  } catch (error) {
    console.error("Error in fetchContentBySpecificCountry:", error);
    throw error;
  }
}
