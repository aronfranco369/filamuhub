"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import GridLayout from "./GridLayout";
import GridLayoutSkeleton from "./skeltons/GridLayoutSkelton";

const fetchCategoryContents = async (category) => {
  const [country, type] = category.split(" ").map((str) => str.toLowerCase());

  console.log("Country:", country);
  console.log("Type", type);

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
    .eq("country", country)
    .eq("type", type)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const processedData = data.map((item) => {
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
  });

  return processedData;
};

const AllContentPage = () => {
  const { category } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["category-contents", category],
    queryFn: () => fetchCategoryContents(decodeURIComponent(category)),
  });

  if (isLoading) return <GridLayoutSkeleton />;
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <div className="bg-transparent p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold text-white">
          {decodeURIComponent(category)}
        </h1>
      </div>
      <GridLayout data={data} />
    </div>
  );
};

export default AllContentPage;
