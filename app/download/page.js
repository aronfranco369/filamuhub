"use client";

import { Suspense } from "react";
import AppDownloadBanner from "../components/DownloadApp";

function DownloadContent() {
  return (
    <div className="min-h-screen bg-gray-900">
      <AppDownloadBanner />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <DownloadContent />
    </Suspense>
  );
}
