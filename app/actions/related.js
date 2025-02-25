import { supabase } from "../supabaseClient";

export async function fetchRelatedContent(content) {
  const { type, genres, dj, country, id } = content;

  // Start with base query without any conditions
  let query = supabase.from("contents").select(`
      id,
      type,
      title,
      poster_url,
      genres,
      dj,
      country,
      created_at,
      plot_summary,
      episodes:episodes(
        id,
        title,
        created_at
      )
    `);

  // Build query based on current content
  let filterQuery = query.neq("id", id); // Always exclude current content

  if (country) {
    filterQuery = filterQuery.eq("country", country); // Prioritize country match
  }

  // Get primary matches
  const { data: primaryMatches, error: primaryError } = await filterQuery
    .order("created_at", { ascending: false })
    .limit(6);

  if (primaryError) {
    console.error("Error in primary search:", primaryError);
    return [];
  }

  // If we don't have enough primary matches, get additional content
  let allMatches = primaryMatches || [];

  if (allMatches.length < 8) {
    const remainingCount = 8 - allMatches.length;

    // Get additional content, excluding already found items
    const { data: secondaryMatches, error: secondaryError } = await query
      .neq("id", id)
      .not("id", "in", `(${allMatches.map((m) => m.id).join(",")})`)
      .order("created_at", { ascending: false })
      .limit(remainingCount);

    if (!secondaryError && secondaryMatches) {
      allMatches = [...allMatches, ...secondaryMatches];
    }
  }

  // Score and sort results with updated priorities
  const scoredResults = allMatches.map((item) => {
    let score = 0;

    // Country match gets highest priority (10 points)
    if (country && item.country === country) score += 10;

    // Type match gets second priority (8 points)
    if (item.type === type) score += 8;

    // Score based on matching genres (third priority, up to 6 points)
    if (genres && item.genres) {
      const matchingGenres = genres.filter((g) => item.genres.includes(g));
      score += matchingGenres.length * 2; // Each matching genre worth 2 points
    }

    // DJ match gets lowest priority (4 points)
    if (dj && item.dj === dj) score += 4;

    // Add a small random factor to break ties
    score += Math.random() * 0.1;

    return { ...item, score };
  });

  // Sort by score and format the result
  return scoredResults
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      ...item,
      latestEpisode:
        item.episodes?.length > 0
          ? item.episodes.reduce((latest, episode) => {
              return new Date(episode.created_at) > new Date(latest.created_at)
                ? episode
                : latest;
            }, item.episodes[0])
          : null,
    }));
}
