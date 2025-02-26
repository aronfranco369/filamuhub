// app/layout.js
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SearchInput from "./components/SearchInput";
import Footer from "./components/Footer"; // Import the Footer component
import { getDrawer } from "./actions/drawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Filamu Hub | Pakua muvi na sizoni za kutafsiriwa",
  description:
    "Pakua muvi/sizoni zilizotafsiriwa kwa lugha ya kiswahili. Filamu bora zaidi zinazotafsiriwa Kiswahili.",
  keywords: [
    "filamu",
    "filamu hub",
    "muvi",
    "sizoni",
    "movie",
    "series",
    "kutafsiriwa",
    "kiswahili",
    "download",
    "kutafsiriwa kiswahili",
    "Dj Mack",
    "Dj Afro",
    "Dj Six Fingers",
  ],
  openGraph: {
    title: "Filamu Hub | Pakua muvi na sizoni za kutafsiriwa",
    description:
      "Pakua muvi/sizoni za kutafsiriwa kwa urahisi. Filamu bora zaidi zinazotafsiriwa Kiswahili.",
    url: "https://filamuhub24.vercel.app",
    siteName: "Filamu Hub",
    images: [
      {
        url: "https://filamuhub24.vercel.app/og-image.jpg", // Create this image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Filamu Hub | Pakua muvi na sizoni za kutafsiriwa",
    description: "Pakua muvi/sizoni za kutafsiriwa kwa urahisi",
    images: ["https://filamuhub24.vercel.app/og-image.jpg"], // Same as OpenGraph image
  },
  alternates: {
    canonical: "https://filamuhub24.vercel.app",
  },
};

export default async function RootLayout({ children }) {
  const customNames = {
    "usa-series": "Sizoni za wamarekani",
    "usa-movie": "Muvi za wamarekani",
    "india-series": "Sizoni za kihindi",
    "india-movie": "Muvi za kihindi",
    "turkey-series": "Sizoni za waturuki",
    "turkey-movie": "Muvi za waturuki",
    "tanzania-series": "Tamthilia za kitanzania",
    "tanzania-movie": "Filamu za kitanzania",
    "south korea-series": "Sizoni za kikorea",
    "south korea-movie": "Muvi za kikorea",

    // Add more custom names as needed
  };

  const categories = await getDrawer(customNames);

  return (
    <html lang="sw" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-900 text-white">
        <Providers>
          {/* Fixed header section with explicit height */}
          <header className="fixed top-0 left-0 w-full bg-gray-900 z-50 h-14">
            <SearchInput categories={categories} />
          </header>

          {/* Main content with padding matching header height */}
          <main className="pt-14">{children}</main>

          {/* Footer */}
          <Footer />

          <Script
            id="movie-structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: `
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Filamu Hub",
        "url": "https://filamuhub24.vercel.app",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://filamuhub24.vercel.app?q={search_term_string}",
          "query-input": "required name=search_term_string"
        },
        "description": "Pakua muvi/sizoni zilizotafsiriwa kwa lugha ya kiswahili. Filamu bora zaidi zinazotafsiriwa Kiswahili."
      }
    `,
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
