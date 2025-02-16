"use client";
import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { useDebounce } from "use-debounce";

const SearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [debouncedValue] = useDebounce(searchTerm, 300);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsTyping(true);
    onSearch(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm("");
      setIsTyping(false);
      onSearch("");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setIsTyping(false);
    onSearch("");
    setIsSearchOpen(false);
  };

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    }
  }, [isSearchOpen]);

  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="w-auto">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Filamu Hub
            </h1>
          </div>
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
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search titles or DJs..."
                    className="w-full bg-gray-800 text-gray-100 placeholder-gray-500
                             px-3 py-1.5 pr-10 outline-none rounded-lg
                             shadow-lg shadow-black/20
                             ring-1 ring-gray-700 focus:ring-2 focus:ring-gray-500
                             transition-all duration-300 text-sm"
                  />
                  {isTyping && (
                    <Loader2
                      className="absolute right-10 top-1/2 transform -translate-y-1/2
                               h-3 w-3 animate-spin text-gray-400"
                    />
                  )}
                </div>
              )}
              <button
                onClick={searchTerm ? handleClearSearch : toggleSearch}
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
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-300" />
                ) : (
                  <Search className="w-4 h-4 text-gray-400 hover:text-gray-300" />
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
