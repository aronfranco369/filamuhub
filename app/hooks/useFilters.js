"use client";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";

export const useFilters = () => {
  return useQuery({
    queryKey: ["filter-options"],
    queryFn: async () => {
      // Fetch unique countries
      const { data: countries, error: countriesError } = await supabase
        .from("contents")
        .select("country")
        .not("country", "is", null)
        .order("country", { ascending: true });

      if (countriesError) throw new Error(countriesError.message);

      // Fetch unique genres
      const { data: genres, error: genresError } = await supabase
        .from("contents")
        .select("genres")
        .not("genres", "is", null);

      if (genresError) throw new Error(genresError.message);

      // Flatten and get unique genres
      const uniqueGenres = [
        ...new Set(genres.flatMap((item) => item.genres)),
      ].sort();

      // Fetch unique DJs
      const { data: djs, error: djsError } = await supabase
        .from("contents")
        .select("dj")
        .not("dj", "is", null)
        .order("dj", { ascending: true });

      if (djsError) throw new Error(djsError.message);

      // Fetch unique years
      const { data: years, error: yearsError } = await supabase
        .from("contents")
        .select("year")
        .not("year", "is", null)
        .order("year", { ascending: false });

      if (yearsError) throw new Error(yearsError.message);

      return {
        countries: [...new Set(countries.map((c) => c.country))],
        genres: uniqueGenres,
        djs: [...new Set(djs.map((d) => d.dj))],
        years: [...new Set(years.map((y) => y.year))],
      };
    },
  });
};
