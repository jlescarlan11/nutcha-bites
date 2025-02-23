// Header.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.svg";
import { MobileMenuContext } from "../App";

const Header = () => {
  const navigate = useNavigate();
  const { showMenu, setShowMenu } = useContext(MobileMenuContext);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode by adding/removing a "dark" class on the documentElement.
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Nutcha Bites Logo"
            className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 hover:scale-105"
          />
          <span className="ml-2 text-xl md:text-2xl font-semibold">
            NUTCHA BITES
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate("/order")}
            className="px-4 py-2 font-semibold bg-[var(--color-accent)]/80 text-[var(--color-primary)] hover:scale-105 transition-all duration-500 hover:bg-[var(--color-accent)]/90 focus:outline-none"
          >
            ORDER NOW
          </button>
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none"
          >
            {darkMode ? (
              // Moon icon for dark mode active
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800 dark:text-gray-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                />
              </svg>
            ) : (
              // Sun icon for light mode active
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05L5.636 5.636"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setShowMenu(true)}
          className="md:hidden focus:outline-none"
          aria-label="Open mobile menu"
        >
          {/* Hamburger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-[var(--color-primary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[var(--color-primary)] flex flex-col items-center justify-center z-50 transition duration-300">
          <button
            onClick={() => setShowMenu(false)}
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
            aria-label="Close mobile menu"
          >
            &times;
          </button>
          <nav className="space-y-6 text-2xl text-white">
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/");
              }}
            >
              Home
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                document
                  .getElementById("overview")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Overview
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                navigate("/order");
              }}
            >
              Order Now
            </button>
            {/* Add more nav items as needed */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
