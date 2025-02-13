import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

const MovieCard = ({
  imageUrl,
  title,
  year,
  duration,
  genre,
  director,
  description,
}) => {
  // Add console.log to print the image URL
  console.log("Movie Card Image URL:", imageUrl || "/api/placeholder/400/320");

  return (
    <Card className="max-w-sm overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={imageUrl || "/api/placeholder/400/320"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </div>
      <CardHeader className="space-y-1 p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{title}</CardTitle>
          <span className="text-sm text-gray-500">{year}</span>
        </div>
        {(duration || director) && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {duration && <span>{duration}</span>}
            {duration && director && <span>•</span>}
            {director && <span>Dir. {director}</span>}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {genre && genre.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {genre.map((g) => (
              <Badge key={g} variant="secondary" className="rounded-full">
                {g}
              </Badge>
            ))}
          </div>
        )}
        {description && (
          <CardDescription className="line-clamp-3 text-sm text-gray-600">
            {description}
          </CardDescription>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieCard;
