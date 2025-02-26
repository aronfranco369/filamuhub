import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import GridLayout from "../GridLayout";
import { fetchRelatedContent } from "@/app/actions/related";

async function RelatedContent({ content }) {
  const relatedContent = await fetchRelatedContent(content);
  //   console.log(relatedContent);

  if (!relatedContent || relatedContent.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 bg-gray-800 border-gray-700">
      <CardHeader className="pb-2 pt-2">
        {" "}
        {/* Reduce bottom padding */}
        <CardTitle className="text-white text-lg">
          Zinazofanana na{" "}
          <span className="italic font-normal">"{content.title}"</span>
        </CardTitle>
      </CardHeader>
      <div className="px-1">
        {" "}
        {/* Remove vertical padding */}
        <GridLayout data={relatedContent} message="No related content found" />
      </div>
    </Card>
  );
}

export default RelatedContent;
