"use client";
import React from "react";
import {
  Download,
  Smartphone,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";

const AppDownloadBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const screenshots = [
    "https://f003.backblazeb2.com/file/tiebooks/appscreenshots/poster1.jpg",
    "https://f003.backblazeb2.com/file/tiebooks/appscreenshots/poster2.jpg",
    "https://f003.backblazeb2.com/file/tiebooks/appscreenshots/poster3.jpg",
    "https://f003.backblazeb2.com/file/tiebooks/appscreenshots/poster4.jpg",
    "https://f003.backblazeb2.com/file/tiebooks/appscreenshots/poster5.jpg",
    "https://f003.backblazeb2.com/file/tiebooks/appscreenshots/poster6.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [screenshots.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % screenshots.length);
  };

  const previousImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 p-4 bg-gray-900">
      {/* Main Download Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">
            Pakua Programu Yetu
          </CardTitle>
          <CardDescription className="text-gray-300">
            Ili kuendelea kupakua na kuangalia sizoni na muvi pakua progamu yetu
            BUREE !!.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Universal APK Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-700 p-3 rounded-full">
                <Smartphone className="h-6 w-6 text-purple-400" />
              </div>
              <div className="flex-1 space-y-2">
                <Button
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href =
                      "https://f003.backblazeb2.com/file/tiebooks/filamuhub.apk";
                    link.setAttribute("download", "FilamuHub.apk");
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  FilamuHub.apk
                </Button>
              </div>
            </div>
          </div>

          {/* Play Store Status Alert */}
          <Alert className="bg-gray-800 border-gray-700">
            <div className="flex items-center space-x-2">
              <img src="/playstore.svg" alt="Play Store" className="h-4 w-4" />
              <AlertTitle className="text-gray-100 font-medium">
                Inakuja Hivi Karibuni kwenye Play Store!
              </AlertTitle>
            </div>
            <AlertDescription className="text-gray-300">
              Timu yetu inafanya kazi kuhakikisha programu inapatikana kwenye
              Google Play Store. Kaa chanjo!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Screenshotsss Carousel */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gray-100">
            Picha za Programu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex justify-center items-center">
              <Button
                variant="ghost"
                className="absolute left-0 z-10 text-gray-100 hover:bg-gray-700/50"
                onClick={previousImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="overflow-hidden relative h-[250px] w-full px-8">
                <img
                  src={screenshots[currentImageIndex]}
                  alt={`Skrinshoti ${currentImageIndex + 1}`}
                  className="object-contain w-full h-full rounded-lg transition-opacity duration-500"
                  style={{
                    animation: "fadeInOut 5s infinite",
                  }}
                />
                <style jsx>{`
                  @keyframes fadeInOut {
                    0% {
                      opacity: 0.3;
                    }
                    10% {
                      opacity: 1;
                    }
                    90% {
                      opacity: 1;
                    }
                    100% {
                      opacity: 0.3;
                    }
                  }
                `}</style>
              </div>

              <Button
                variant="ghost"
                className="absolute right-0 z-10 text-gray-100 hover:bg-gray-700/50"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex justify-center mt-2 gap-2">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex
                      ? "bg-purple-400"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppDownloadBanner;
