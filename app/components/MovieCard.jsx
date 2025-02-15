import React from "react";
import Link from "next/link";
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
  id,
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
    <Link href={`/details/${id}`}>
      <Card className="h-full w-full transition-all hover:shadow-lg relative overflow-hidden group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>

        {/* Reduced height of image container while maintaining aspect ratio */}
        <div className="relative aspect-[2/2] w-full overflow-hidden">
          {/* Smaller director badge */}
          {director && (
            <Badge className="absolute top-0 left-0 z-10 bg-black/75 text-white text-xs rounded-r-md rounded-l-none px-2 py-0.5 leading-none">
              {director}
            </Badge>
          )}
          <img
            src={imageUrl || "/api/placeholder/400/320"}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Reduced padding in header */}
        <CardHeader className="space-y-0.5 p-2 bg-gray-900">
          <div className="flex items-start justify-between gap-1">
            <CardTitle className="text-xs line-clamp-1 text-white">
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
    </Link>
  );
};

export default MovieCard;
