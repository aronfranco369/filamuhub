import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MovieCard = ({
  imageUrl,
  title,
  year,
  duration,
  genre,
  director,
  description,
}) => {
  return (
    <Card className="h-full w-full transition-all hover:shadow-lg">
      <div className="relative aspect-[2/3] w-full overflow-hidden">
        {/* DJ Badge at Top-Left */}
        {director && (
          <Badge className="absolute top-2 left-2 z-10 bg-black/75 text-white text-xs">
            {director}
          </Badge>
        )}
        <img
          src={imageUrl || "/api/placeholder/400/320"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-1 p-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xs sm:text-sm line-clamp-1">
            {title}
          </CardTitle>

          <span className="text-xs text-gray-500 whitespace-nowrap">
            {year}
          </span>
        </div>
        {duration && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="line-clamp-1">{duration}</span>
          </div>
        )}
      </CardHeader>
      {/* Conditionally Render Genres and Description */}
      <CardContent className="p-3 pt-0 hidden sm:block">
        {genre && genre.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="secondary" className="text-xs px-2 py-0">
                {g}
              </Badge>
            ))}
          </div>
        )}
        {description && (
          <CardDescription className="line-clamp-2 text-xs text-gray-600">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
