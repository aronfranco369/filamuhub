// ContentCollapsible.jsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";

export default function SummarySection({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="relative">
        <p
          className={`text-gray-300 leading-6 ${
            !isExpanded ? "line-clamp-3" : ""
          }`}
        >
          {content}
        </p>
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-800 to-transparent" />
        )}
      </div>
      <CollapsibleTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto mt-2 text-blue-400 hover:text-blue-300"
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  );
}
