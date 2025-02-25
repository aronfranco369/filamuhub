// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import SearchInput from "./components/SearchInput";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Filamu Hub",
  description: "Pakua muvi/sizoni za kutafsiriwa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-900 text-white">
        <Providers>
          {/* Fixed header section */}
          <div className="fixed top-0 left-0 w-full bg-gray-900 z-50">
            <SearchInput />
          </div>

          {/* Main content with padding to account for fixed header */}
          <main className="pt-16">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
