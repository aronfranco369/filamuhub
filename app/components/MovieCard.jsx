import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

const MovieCard = ({
  imageUrl,
  title,
  type,
  created_at,
  latestEpisode,
  genre,
  director,
  description,
}) => {
  const uploadTime = formatDistanceToNow(new Date(created_at), {
    addSuffix: true,
  });

  return (
    <Card className="h-full w-full transition-all hover:shadow-lg relative overflow-hidden group">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>

      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {/* Director Badge at Top-Left */}
        {director && (
          <Badge className="absolute top-0 left-0 z-10 bg-black/75 text-white text-xs sm:text-sm md:text-base rounded-r-md rounded-l-none px-2 py-1 leading-none">
            {director}
          </Badge>
        )}
        <img
          src={imageUrl || "/api/placeholder/400/320"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-1 p-3 bg-gray-900">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xs sm:text-sm line-clamp-1 text-white">
            {title}
          </CardTitle>
        </div>
        {type === "movie" && (
          <div className="text-xs text-gray-500">Added {uploadTime}</div>
        )}
        {type === "series" && latestEpisode && (
          <div className="text-xs text-gray-500">
            Added {latestEpisode.title}
            {" · "}
            {formatDistanceToNow(new Date(latestEpisode.created_at), {
              addSuffix: true,
            })}
          </div>
        )}
      </CardHeader>
    </Card>
  );
};

export default MovieCard;
