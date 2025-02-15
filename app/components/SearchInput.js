// components/SearchInput.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "use-debounce";

const SearchInput = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedValue] = useDebounce(searchTerm, 500);
  const [isTyping, setIsTyping] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length >= 2) {
      router.push(`/search/${encodeURIComponent(debouncedValue)}`);
      setIsTyping(false);
    } else if (debouncedValue.length === 0) {
      router.push("/");
      setIsTyping(false);
    }
  }, [debouncedValue, router]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsTyping(true);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setSearchTerm("");
    }
  };

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo/Title Section */}
          <div
            className={`transform transition-all duration-300 ${
              isSearchOpen ? "scale-0 w-0" : "scale-100 w-auto"
            }`}
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Filamu Hub
            </h1>
          </div>

          {/* Search Section */}
          <div className="flex items-center flex-1 justify-end">
            <div
              className={`
                flex items-center relative
                transition-all duration-300 ease-in-out
                ${isSearchOpen ? "w-full ml-4" : "w-10"}
              `}
            >
              {isSearchOpen && (
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search titles or DJs..."
                  className="w-full bg-gray-800/50 text-gray-100 placeholder-gray-500
                           border-b-2 border-gray-700 focus:border-gray-500
                           px-4 py-2 outline-none rounded-tl rounded-tr
                           transition-all duration-300"
                />
              )}
              {isTyping && isSearchOpen && (
                <Loader2 className="absolute right-14 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
              )}
              <button
                onClick={toggleSearch}
                className={`
                  p-2 rounded-full
                  transition-all duration-300
                  ${
                    isSearchOpen
                      ? "bg-gray-800/70 hover:bg-gray-700/70"
                      : "hover:bg-gray-800/70"
                  }
                `}
              >
                {isSearchOpen ? (
                  <X className="w-6 h-6 text-gray-400 hover:text-gray-300" />
                ) : (
                  <Search className="w-6 h-6 text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchInput;
