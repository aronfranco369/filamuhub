import { supabase } from "../supabaseClient";

export async function getFilterOptions() {
  try {
    const [countriesRes, genresRes, djsRes, yearsRes] = await Promise.all([
      supabase
        .from("contents")
        .select("country")
        .not("country", "is", null)
        .order("country"),
      supabase.from("contents").select("genres").not("genres", "is", null),
      supabase.from("contents").select("dj").not("dj", "is", null).order("dj"),
      supabase
        .from("contents")
        .select("year")
        .not("year", "is", null)
        .order("year", { ascending: false }),
    ]);

    // Add error checking
    if (countriesRes.error)
      throw new Error(`Countries error: ${countriesRes.error.message}`);
    if (genresRes.error)
      throw new Error(`Genres error: ${genresRes.error.message}`);
    if (djsRes.error) throw new Error(`DJs error: ${djsRes.error.message}`);
    if (yearsRes.error)
      throw new Error(`Years error: ${yearsRes.error.message}`);

    // Add null checks and data validation
    const countries = Array.isArray(countriesRes.data) ? countriesRes.data : [];
    const genres = Array.isArray(genresRes.data) ? genresRes.data : [];
    const djs = Array.isArray(djsRes.data) ? djsRes.data : [];
    const years = Array.isArray(yearsRes.data) ? yearsRes.data : [];

    // Process and deduplicate the data
    const uniqueCountries = [
      ...new Set(
        countries
          .filter((c) => c.country && typeof c.country === "string")
          .map((c) => c.country.trim())
          .filter(Boolean)
      ),
    ].sort();

    const uniqueGenres = [
      ...new Set(
        genres
          .flatMap((item) => (Array.isArray(item.genres) ? item.genres : []))
          .filter(Boolean)
          .map((genre) => genre.trim())
      ),
    ].sort();

    const uniqueDjs = [
      ...new Set(
        djs
          .filter((d) => d.dj && typeof d.dj === "string")
          .map((d) => d.dj.trim())
          .filter(Boolean)
      ),
    ].sort();

    const uniqueYears = [
      ...new Set(
        years
          .filter((y) => y.year && !isNaN(y.year))
          .map((y) => Number(y.year))
          .filter(Boolean)
      ),
    ].sort((a, b) => b - a); // Sort years descending

    return {
      countries: uniqueCountries,
      genres: uniqueGenres,
      djs: uniqueDjs,
      years: uniqueYears,
    };
  } catch (error) {
    console.error("Error fetching filter options:", error);
    // Return empty arrays as fallback
    return {
      countries: [],
      genres: [],
      djs: [],
      years: [],
    };
  }
}
