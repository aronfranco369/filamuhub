// actions/countryCategories.js
import { supabase } from "../supabaseClient";

export async function fetchContentByCountry({ type, offset = 0, limit = 6 }) {
  try {
    console.log(
      `Fetching ${type} content with offset ${offset} and limit ${limit}`
    );

    // First get total count of content per country
    const { data: totalContent, error: countError } = await supabase
      .from("contents")
      .select("country")
      .eq("type", type)
      .not("country", "is", null);

    if (countError) throw countError;

    // Get the content with pagination, handling both movies and series
    let query = supabase
      .from("contents")
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
      .not("country", "is", null)
      .order("created_at", { ascending: false });

    // Add specific conditions based on content type
    if (type === "series") {
      // For series, ensure there's at least one episode
      query = query.not("episodes", "is", null);
    }

    const { data, error } = await query;

    if (error) throw error;

    if (!data || data.length === 0) {
      return { results: [], totalCounts: {} };
    }

    // Calculate total counts per country
    const totalCounts = totalContent.reduce((acc, item) => {
      acc[item.country] = (acc[item.country] || 0) + 1;
      return acc;
    }, {});

    // Group and process content
    const contentByCountry = data.reduce((acc, item) => {
      // Process the content based on its type
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

      // Group by country
      if (!acc[item.country]) {
        acc[item.country] = [];
      }
      acc[item.country].push(processedItem);
      return acc;
    }, {});

    // Convert to array format and apply pagination
    const results = Object.entries(contentByCountry).map(
      ([country, items]) => ({
        country,
        items: items.slice(offset, offset + limit),
        hasMore: totalCounts[country] > offset + limit,
      })
    );

    // Filter out empty countries and ensure valid content
    const validResults = results.filter(
      (result) =>
        result.items.length > 0 &&
        (type === "movie" ||
          result.items.every((item) => item.episodes?.length > 0))
    );

    return {
      results: validResults,
      totalCounts,
    };
  } catch (error) {
    console.error("Error in fetchContentByCountry:", error);
    throw error;
  }
}
