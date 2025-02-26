"use client";
import { useSearchParams } from "next/navigation";
import DrawerContent from "../components/DrawerContent";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ContentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get country and type from URL query parameters
  const country = searchParams.get("country");
  const type = searchParams.get("type");

  if (!country || !type) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4">Missing Parameters</h1>
        <p className="mb-6">Country and content type are required.</p>
        <Button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700"
        >
          <ArrowLeft size={16} /> Go Back Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto">
        <DrawerContent country={country} type={type} />
      </div>
    </div>
  );
}
