// Header.jsx
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.svg";
import { MobileMenuContext } from "../App";
import { FaMoon, FaSun } from "react-icons/fa";
import { span } from "framer-motion/client";

const menuItems = [
  "Overview",
  "Recipe",
  "Our Vision",
  "Testimonials",
  "FAQs",
  "Contact Us",
];

const Header = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const { showMenu, setShowMenu } = useContext(MobileMenuContext);

  // Toggle dark mode by adding/removing a "dark" class on the documentElement.

  // Disable background scroll when mobile menu is open
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showMenu]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <header className="relative z-20 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Nutcha Bites Logo"
            className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 hover:scale-110"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-primary)] ml-2">
            NUTCHA BITES
          </h2>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4 items-center space-x-6">
          <button
            onClick={toggleDarkMode}
            className="flex items-center p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-500 size-5" />
            ) : (
              <FaMoon className="text-[var(--color-primary)]/60 size-5" />
            )}
          </button>
          <button
            onClick={() => navigate("/order")}
            className="px-4 py-2 font-semibold bg-[var(--color-accent)]/80 text-[var(--color-primary)]/90 transition-transform duration-300 hover:scale-105 hover:bg-[var(--color-accent)]/90 focus:outline-none"
          >
            ORDER NOW
          </button>
        </nav>

        {/* Mobile Navigation Button */}
        <button
          onClick={() => setShowMenu(true)}
          className="md:hidden focus:outline-none bg-transparent"
          aria-label="Open mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-[var(--color-primary)] transition-transform duration-300"
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

      {/* Mobile Menu Overlay with Enhanced Effects */}
      {showMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)]/30 to-transparent backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowMenu(false);
            }
          }}
        >
          <div className="relative bg-[var(--color-primary)] rounded-2xl shadow-2xl p-8 w-11/12 max-w-md animate-slideDown transform transition-all duration-300 hover:scale-105">
            <button
              onClick={() => setShowMenu(false)}
              className="absolute top-4 right-4 text-3xl focus:outline-none bg-transparent text-[var(--color-secondary)] transform transition-transform duration-300 hover:scale-110"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ul className="mt-8 space-y-6 text-center text-lg sm:text-xl text-[var(--color-secondary)]">
              {menuItems.map((item, index) => {
                const id = item.toLowerCase().replace(/\s+/g, "-");
                return (
                  <li
                    key={index}
                    className="cursor-pointer transform transition-transform duration-300 hover:scale-105"
                  >
                    <a
                      href={`#${id}`}
                      className="block px-4 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                      onClick={() => setShowMenu(false)}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-col gap-2">
              <button
                onClick={toggleDarkMode}
                className="w-full px-4 py-3 rounded-full flex justify-center items-center font-semibold bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)] hover:from-[var(--color-secondary-light)] hover:to-[var(--color-secondary)] transform transition-all duration-300 hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <span className="flex gap-2 items-center">
                    <FaSun className="text-yellow-500" />
                    <p> Dark Mode</p>
                  </span>
                ) : (
                  <span className="flex gap-2 items-center">
                    <FaMoon className="text-gray-600" />
                    <p>Light Mode</p>
                  </span>
                )}
              </button>
              <button
                className="w-full px-4 py-3 rounded-full font-semibold bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-secondary-light)] hover:from-[var(--color-secondary-light)] hover:to-[var(--color-secondary)] transform transition-all duration-300 hover:scale-105"
                onClick={() => {
                  setShowMenu(false);
                  navigate("/order");
                }}
              >
                ORDER NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
