"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [imageError, setImageError] = React.useState(false);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  // Fallback image URL if the main image fails to load
  const fallbackImageUrl = "/api/placeholder/400/320";

  return (
    <Link href={`/details/${id}`}>
      <Card className="h-full w-full transition-all hover:shadow-lg relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          {director && (
            <Badge className="absolute top-0 left-0 z-10 bg-black/75 text-white text-xs rounded-r-md rounded-l-none px-2 py-0.5 leading-none">
              {director}
            </Badge>
          )}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-700"></div>
          )}
          <Image
            src={imageError ? fallbackImageUrl : imageUrl || fallbackImageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-200 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            priority={false}
          />
        </div>
        <CardHeader className="space-y-0.9 p-2 bg-gray-900">
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
