// components/UpdatedSideDrawer.jsx
"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function UpdatedSideDrawer({ categories = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleCategoryClick = (country, type) => {
    // Navigate to the content page with country and type as query parameters
    router.push(
      `/content?country=${encodeURIComponent(
        country
      )}&type=${encodeURIComponent(type)}`
    );
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Drawer Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-800/70 transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-gray-300" />
        ) : (
          <Menu className="w-5 h-5 text-gray-300" />
        )}
      </button>

      {/* Drawer Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 z-50 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 shadow-xl"
          >
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Categories</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-700"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-screen">
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <button
                      onClick={() =>
                        handleCategoryClick(category.country, category.type)
                      }
                      className="block w-full text-left p-2 rounded-lg hover:bg-gray-700/50 text-gray-200 transition-colors"
                    >
                      {category.displayName ||
                        `${category.country} ${category.type}`.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when drawer is open */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
