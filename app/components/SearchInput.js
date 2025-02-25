// SearchInput.js
"use client";
import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "use-debounce";

const SearchInput = ({ defaultValue = "" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(!!defaultValue);
  const inputRef = useRef(null);

  // Check if we're on the home page
  const isHomePage = pathname === "/";

  // Debounced search term
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  // Handle search with debounced value
  useEffect(() => {
    if (!isHomePage) return; // Only process search on home page

    const handleSearch = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(searchParams);

      if (debouncedSearchTerm) {
        params.set("q", debouncedSearchTerm);
      } else {
        params.delete("q");
      }

      await router.push(`?${params.toString()}`);
      setIsLoading(false);
    };

    handleSearch();
  }, [debouncedSearchTerm, router, searchParams, isHomePage]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsLoading(false);
    setIsSearchOpen(false);
    router.push("/");
  };

  const handleKeyDown = (e) => {
    // Close search on Escape
    if (e.key === "Escape") {
      handleClearSearch();
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="w-auto">
            <a
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent hover:from-gray-50 hover:to-gray-300 transition-all"
            >
              Filamu Hub
            </a>
          </div>

          {isHomePage && (
            <div className="flex items-center flex-1 justify-end">
              <div
                className={`
                  flex items-center relative
                  transition-all duration-300 ease-in-out
                  ${isSearchOpen ? "w-3/4 ml-4" : "w-8"}
                `}
              >
                {isSearchOpen && (
                  <div className="w-full relative">
                    <input
                      ref={inputRef}
                      type="text"
                      role="searchbox"
                      aria-label="Search titles or DJs"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search titles or DJs..."
                      className="w-full bg-gray-800 text-gray-100 placeholder-gray-500
                               px-3 py-1.5 pr-10 outline-none rounded-lg
                               shadow-lg shadow-black/20
                               ring-1 ring-gray-700 focus:ring-2 focus:ring-gray-500
                               transition-all duration-300 text-sm"
                    />
                    {isLoading && (
                      <Loader2
                        className="absolute right-10 top-1/2 transform -translate-y-1/2
                                 h-3 w-3 animate-spin text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )}

                <button
                  onClick={searchTerm ? handleClearSearch : toggleSearch}
                  aria-label={isSearchOpen ? "Clear search" : "Open search"}
                  className={`
                    p-1.5 rounded-full
                    transition-all duration-300 ease-in-out
                    ${
                      isSearchOpen
                        ? "bg-gray-700/70 hover:bg-gray-600/70 absolute right-0"
                        : "hover:bg-gray-800/70"
                    }
                  `}
                >
                  {isSearchOpen ? (
                    <X
                      className="w-4 h-4 text-gray-400 hover:text-gray-300"
                      aria-hidden="true"
                    />
                  ) : (
                    <Search
                      className="w-4 h-4 text-gray-400 hover:text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default SearchInput;
