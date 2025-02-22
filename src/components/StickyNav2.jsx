import React, { useState, useEffect, useRef } from "react";
import logo from "../assets/logo1.svg";
import { useNavigate } from "react-router-dom";

const menuItems = [
  "Overview",
  "Recipe",
  "Our Vision",
  "Testimonials",
  "FAQs",
  "Contact Us",
];

const StickyNav2 = ({ activeSection, visible }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close mobile menu if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu on "Escape" key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-30 p-4 transition-all duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Company Logo" className="w-16 h-auto" />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-4 bg-gradient-to-tr from-[var(--color-secondary)] to-[var(--color-accent)] text-[var(--color-primary)] px-2 py-4 rounded-full opacity-95">
          {menuItems.map((item, index) => {
            const id = item.toLowerCase().replace(/\s+/g, "-");
            const activeClass =
              activeSection === id
                ? "bg-[var(--color-primary)] text-[var(--color-secondary)]"
                : "hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]";
            return (
              <li key={index} className="cursor-pointer">
                <a
                  href={`#${id}`}
                  className={`px-4 py-3 rounded-full transition-colors duration-300 ease-in-out ${activeClass}`}
                >
                  {item}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Desktop "ORDER NOW" Button */}
        <div className="hidden md:block">
          <button
            className="px-6 py-3 rounded-full font-semibold bg-[var(--color-secondary)]/80 hover:bg-[var(--color-secondary)] transition-colors duration-300"
            onClick={() => navigate("/order")}
          >
            ORDER NOW
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="p-2 focus:outline-none"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-8 h-8 text-gray-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-[var(--color-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu Dropdown with Slide-down Transition */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden mt-4 bg-gradient-to-tr from-[var(--color-secondary)] to-[var(--color-accent)] rounded-xl opacity-95 p-4 transition-transform duration-300 transform origin-top scale-100 text-gray-200"
        >
          <ul className="flex flex-col space-y-2">
            {menuItems.map((item, index) => {
              const id = item.toLowerCase().replace(/\s+/g, "-");
              const activeClass =
                activeSection === id
                  ? "bg-[var(--color-primary)] text-[var(--color-secondary)]"
                  : "hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]";
              return (
                <li key={index} className="cursor-pointer">
                  <a
                    href={`#${id}`}
                    className={`block px-4 py-2 rounded transition-colors duration-300 ease-in-out ${activeClass}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
            <li>
              <button
                className="w-full mt-2 px-4 py-3 rounded-full font-semibold bg-[var(--color-secondary)]/80 hover:bg-[var(--color-secondary)] transition-colors duration-300"
                onClick={() => navigate("/order")}
              >
                ORDER NOW
              </button>
            </li>
          </ul>
        </div>
      )}
      {/* Optional: Mobile Backdrop Overlay
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-25"
          onClick={() => setIsMenuOpen(false)}
        />
      )} */}
    </nav>
  );
};

export default StickyNav2;
