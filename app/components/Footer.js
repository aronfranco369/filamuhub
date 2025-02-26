// components/Footer.js
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        {/* Logo Section */}
        <div className="flex justify-center mb-4">
          <Image
            src="/filamuhub.svg"
            alt="Filamu Hub Logo"
            width={100} // Reduced logo size
            height={30}
            className="w-24 h-auto" // Adjusted logo size
          />
        </div>

        {/* Quick Links - Horizontal */}
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-sm font-semibold mb-2">Quick Links</h3>{" "}
          {/* Reduced font size */}
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-400 text-sm">
                {" "}
                {/* Reduced font size */}
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/category/movie"
                className="hover:text-gray-400 text-sm"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                href="/category/series"
                className="hover:text-gray-400 text-sm"
              >
                Series
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-400 text-sm">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-400 text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links with Icons */}
        <div className="flex flex-col items-center mb-4">
          <h3 className="text-sm font-semibold mb-2">Follow Us</h3>{" "}
          {/* Reduced font size */}
          <div className="flex space-x-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaFacebook className="w-5 h-5" /> {/* Reduced icon size */}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/+255682993140"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="border-t border-gray-700 mt-4 pt-4 text-center">
          <p className="text-xs">
            {" "}
            {/* Reduced font size */}
            &copy; {new Date().getFullYear()} Filamu Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
