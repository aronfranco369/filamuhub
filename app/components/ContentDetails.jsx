"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ContentDetailsSkeleton from "./skeltons/ContentDetailsSketon";

const fetchContentDetails = async (id) => {
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
    .eq("id", id)
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
};

const ContentDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();
  const {
    data: content,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["content-details", id],
    queryFn: () => fetchContentDetails(id),
  });

  if (isLoading) return <ContentDetailsSkeleton />;
  if (isError) return <div>Error fetching content details</div>;
  if (!content) return <div>Content not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      {/* Top section with image and basic info in row layout */}
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full">
        {/* Image container taking 1/3 width on larger screens */}
        <div className="w-full md:w-1/3 h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {content.poster_url ? (
            <img
              src={content.poster_url}
              alt={content.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-gray-400 h-full flex items-center justify-center">
              No Image Available
            </div>
          )}
        </div>

        {/* Metadata section taking 2/3 width on larger screens */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
          <div className="mb-4">
            <span className="text-gray-400">Year: {content.year}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.genres.map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2 text-white">Summary</h2>
          <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
            <div className="relative">
              <p
                className={`text-gray-300 leading-6 ${
                  !isExpanded ? "line-clamp-3" : ""
                }`}
              >
                {content.plot_summary}
              </p>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800 to-transparent" />
              )}
            </div>
            <CollapsibleTrigger asChild>
              <Button
                variant="link"
                className="p-0 h-auto mt-2 text-blue-400 hover:text-blue-300"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Episodes Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">
          {content.type === "series" ? "Episodes" : "Download"}
        </h2>
        {content.type === "series" ? (
          content.episodes.map((episode) => (
            <Card key={episode.id} className="bg-gray-800 border-gray-700">
              <div className="flex justify-between items-start p-4">
                <div className="flex flex-col gap-2">
                  <span className="font-semibold text-white">
                    {episode.title}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {new Date(episode.created_at).toLocaleDateString()}
                  </span>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-gray-900 hover:bg-gray-700 text-white flex items-center gap-1 px-2 py-1 text-xs"
                >
                  <Download className="w-3 h-3" />
                  <span>{episode.file_size} MB</span>
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <Card className="bg-gray-800 border-gray-700">
            <div className="flex justify-between items-start p-4">
              <span className="font-semibold text-white">{content.title}</span>
              <Button
                variant="default"
                size="sm"
                className="bg-gray-900 hover:bg-gray-700 text-white flex items-center gap-1 px-2 py-1 text-xs"
              >
                <Download className="w-3 h-3" />
                <span>{content.file_size} MB</span>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ContentDetails;
