"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import DownloadButton from "../DownloadButton";
import { useRouter } from "next/navigation";

const INITIAL_EPISODES_SHOWN = 3;

export default function EpisodesSection({ content }) {
  const [isEpisodesExpanded, setIsEpisodesExpanded] = useState(false);
  const router = useRouter();

  const handleDownload = () => {
    router.push("/download");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">
        {content.type === "series" ? "Episodes" : "Download"}
      </h2>
      {content.type === "series" ? (
        <Collapsible
          open={isEpisodesExpanded}
          onOpenChange={setIsEpisodesExpanded}
        >
          <div className="space-y-4">
            {content.episodes
              .slice(0, isEpisodesExpanded ? undefined : INITIAL_EPISODES_SHOWN)
              .map((episode) => (
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
                    <DownloadButton
                      onClick={handleDownload}
                      fileSize={episode.file_size}
                      className="px-2 py-1 text-xs"
                    />
                  </div>
                </Card>
              ))}
          </div>
          {content.episodes.length > INITIAL_EPISODES_SHOWN && (
            <CollapsibleTrigger asChild>
              <Button
                variant="link"
                className="p-0 h-auto mt-4 text-blue-400 hover:text-blue-300"
              >
                {isEpisodesExpanded ? "Onyesha chache" : "Onyesha zaidi"}
              </Button>
            </CollapsibleTrigger>
          )}
        </Collapsible>
      ) : (
        <Card className="bg-gray-800 border-gray-700">
          <div className="flex justify-between items-start p-4">
            <span className="font-semibold text-white">{content.title}</span>
            <DownloadButton
              onClick={handleDownload}
              fileSize={content.file_size}
              className="px-2 py-1 text-xs"
            />
          </div>
        </Card>
      )}
    </div>
  );
}
