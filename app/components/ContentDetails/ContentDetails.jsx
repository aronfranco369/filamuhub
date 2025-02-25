import React, { Suspense } from "react";
import ContentDetailsSkeleton from "../skeltons/ContentDetailsSketon";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { fetchContentDetails } from "@/app/actions/details";
import SummarySection from "./SummarySection";
import EpisodesSection from "./EpisodesSection";
import RelatedContent from "./RelatedContent";

// Component that fetches and displays the content
async function ContentDetailsData({ id }) {
  const content = await fetchContentDetails(id);
  if (!content) {
    return <div>Content not found</div>;
  }
  const fallbackImageUrl = "/api/placeholder/400/320";

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row gap-8 mb-8 w-full">
        <div className="w-full md:w-1/3 h-64 sm:h-72 md:h-80 lg:h-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden relative">
          {content.poster_url ? (
            <Image
              src={content.poster_url}
              alt={content.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
              priority={true}
            />
          ) : (
            <Image
              src={fallbackImageUrl}
              alt="No image available"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
              priority={true}
            />
          )}
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
          <div className="mb-4">
            <span className="text-gray-400">Mwaka: {content.year}</span>
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
      <Card className="mb-6 bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <h2 className="font-semibold mb-2 text-white">Summary</h2>
          <SummarySection content={content.plot_summary} />
        </CardContent>
      </Card>
      <div className="space-y-8">
        {" "}
        {/* Added wrapper with vertical spacing */}
        <EpisodesSection content={content} />
        <RelatedContent content={content} />
      </div>
    </div>
  );
}

// Wrapper component that handles the loading state
function ContentDetails({ id }) {
  return (
    <Suspense fallback={<ContentDetailsSkeleton />}>
      <ContentDetailsData id={id} />
    </Suspense>
  );
}

export default ContentDetails;
