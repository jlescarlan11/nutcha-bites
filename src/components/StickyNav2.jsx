import React, { useState, useEffect, useContext, useRef } from "react";
import logo from "../assets/logo2.svg";
import { useNavigate } from "react-router-dom";
import { MobileMenuContext } from "../App";
import { FaMoon, FaSun } from "react-icons/fa";

// Custom hook for media queries
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
};

const menuItems = [
  "Overview",
  "Recipe",
  "Our Vision",
  "Testimonials",
  // matches change
  "FAQs",
  "Contact Us",

  // Clean up the event listener when the component is unmounted
];

// Return the `matches` state
const StickyNav2 = ({ activeSection, visible, darkMode, setDarkMode }) => {
  const { setShowMenu } = useContext(MobileMenuContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Determine if device is tablet (width between 600px and 1023px)
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1023px)");

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Toggle mobile menu and update context
  const toggleMenu = () => {
    const newValue = !isMenuOpen;
    setIsMenuOpen(newValue);
    setShowMenu(newValue);
  };

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setShowMenu(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [setShowMenu]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // Update scroll progress indicator and Back-to-Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside modal content
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !hamburgerButtonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen, setShowMenu]);

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)]"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav
        className={`fixed top-4 left-0 right-0 z-30 p-4 transition-all duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] bg-opacity-90 rounded-full px-4 py-2 shadow-lg">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Company Logo" className="w-16 h-auto" />
            <h2 className="ml-2 text-lg sm:text-xl md:text-2xl font-bold text-[var(--color-primary)]">
              NUTCHA BITES
            </h2>
          </div>

          {/* Desktop Menu for large screens */}
          <ul className="hidden lg:flex items-center space-x-4 text-[var(--color-primary)]">
            {menuItems.map((item, index) => {
              const id = item.toLowerCase().replace(/\s+/g, "-");
              const activeClass =
                activeSection === id
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-primary)]/70 hover:bg-[var(--color-primary)] hover:text-[var(--color-secondary)]";
              return (
                <li key={index} className="cursor-pointer">
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(id);
                    }}
                    className={`px-4 py-3 rounded-full transition-colors duration-300 ease-in-out ${activeClass}`}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop "ORDER NOW" Button for large screens */}
          <div className="hidden lg:flex gap-2">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-2  size-16  bg-transparent "
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-500 size-8" />
              ) : (
                <FaMoon className="text-[var(--color-primary)]/60 size-8" />
              )}
            </button>
            <button
              className="px-6 py-3 rounded-full font-semibold bg-[var(--color-secondary)]/80 hover:bg-[var(--color-secondary)] transition-colors duration-300"
              onClick={() => navigate("/order")}
            >
              ORDER NOW
            </button>
          </div>

          {/* Mobile & Tablet Hamburger Menu */}
          <div className="lg:hidden">
            <button
              ref={hamburgerButtonRef}
              onClick={toggleMenu}
              className="p-2 focus:outline-none bg-transparent"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
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

        {/* Mobile/Tablet Menu Modal or Sidebar */}
        {isMenuOpen && (
          <>
            ( // Mobile Modal Menu
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)]/30 to-transparent backdrop-blur-sm">
              <div
                ref={modalRef}
                className="relative bg-[var(--color-primary)] rounded-2xl shadow-2xl p-8 w-11/12 max-w-sm animate-slideDown transform transition-all duration-300 hover:scale-105"
                role="dialog"
                aria-modal="true"
              >
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowMenu(false);
                  }}
                  className="absolute top-4 right-4 text-3xl focus:outline-none bg-transparent text-[var(--color-secondary)] transition-transform duration-300 hover:scale-110"
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
                <ul className="mt-8 space-y-6 text-center text-xl text-[var(--color-secondary)]">
                  {menuItems.map((item, index) => {
                    const id = item.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <li
                        key={index}
                        className="cursor-pointer transition-transform duration-300 hover:scale-105"
                      >
                        <a
                          href={`#${id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            scrollToSection(id);
                            setIsMenuOpen(false);
                            setShowMenu(false);
                          }}
                          className="block px-4 py-2 rounded transition-colors duration-300 ease-in-out hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)]"
                        >
                          {item}
                        </a>
                      </li>
                    );
                  })}
                  <li className="mt-6 flex flex-col gap-2">
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
                  </li>
                </ul>
              </div>
            </div>
            )
          </>
        )}
      </nav>
    </>
  );
};

export default StickyNav2;
