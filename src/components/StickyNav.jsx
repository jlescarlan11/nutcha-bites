import React, { useState, useEffect, useContext, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MobileMenuContext } from "../App";
import logo from "../assets/logo2.svg";

// Custom hook for media queries
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
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
  "FAQs",
  "Contact Us",
];

// Utility: Throttle Function
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Custom Hook: Focus Trap
const useFocusTrap = (ref, isActive) => {
  useEffect(() => {
    if (!isActive || !ref.current) return;
    const element = ref.current;
    const focusableElementsSelector =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = element.querySelectorAll(
      focusableElementsSelector
    );
    if (!focusableElements.length) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    firstElement.focus();

    return () => {
      if (element) {
        element.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [ref, isActive]);
};

// ScrollProgressIndicator Component
const ScrollProgressIndicator = ({ progress }) => (
  <motion.div
    className="fixed top-0 left-0 h-1 z-50"
    style={{
      background:
        "linear-gradient(to right, var(--color-secondary-70), var(--color-accent))",
      width: `${progress}%`,
    }}
    initial={{ width: 0 }}
    animate={{ width: `${progress}%` }}
    transition={{ ease: "linear", duration: 0.1 }}
  />
);

// DesktopNavigation Component
const DesktopNavigation = ({
  menuItems,
  activeSection,
  scrollToSection,
  navigate,
}) => (
  <>
    <ul className="hidden lg:flex items-center space-x-6 text-base font-medium text-[var(--color-secondary)]/30">
      {menuItems.map((item, index) => {
        const id = item.toLowerCase().replace(/\s+/g, "-");
        const activeClass =
          activeSection === id
            ? "font-bold text-[var(--color-accent)]"
            : "hover:text-[var(--color-accent)] transition-colors duration-300";
        return (
          <li key={index} className="cursor-pointer">
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
              className={`px-3 py-2 rounded-md ${activeClass}`}
            >
              {item}
            </a>
          </li>
        );
      })}
    </ul>
    <div className="hidden lg:flex">
      <button
        className="ml-4 px-6 py-2 rounded-full font-semibold transition-all bg-[var(--color-accent)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]/90 hover:text-[var(--color-primary)] hover:-translate-y-0.5 duration-300 "
        onClick={() => navigate("/order")}
      >
        ORDER NOW
      </button>
    </div>
  </>
);

// MobileModal Component with Portal, Swipe Gesture, and Animated Overlay
const MobileModal = ({
  menuItems,
  scrollToSection,
  onClose,
  navigate,
  modalRef,
}) => {
  useFocusTrap(modalRef, true);

  // Dismiss modal on vertical swipe gesture
  const handleDragEnd = (event, info) => {
    if (info.offset.y > 100) onClose();
  };

  const modalContent = (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Animated overlay */}
      <motion.div
        className="absolute inset-0"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
        }}
      />
      {/* Modal container with swipe support */}
      <motion.div
        ref={modalRef}
        className="relative rounded-xl shadow-xl p-8 w-11/12 max-w-sm z-50"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ duration: 0.4 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.5}
        onDragEnd={handleDragEnd}
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl focus:outline-none   hover:scale-90 transition-all duration-300 ease-in-out"
          style={{ color: "var(--color-secondary)" }}
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        <ul
          className="mt-6 space-y-4 text-center text-lg"
          style={{ color: "var(--color-secondary)" }}
        >
          {menuItems.map((item, index) => {
            const id = item.toLowerCase().replace(/\s+/g, "-");
            return (
              <li key={index} className="cursor-pointer">
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(id);
                    onClose();
                  }}
                  className="block px-4 py-2 rounded-md transition-colors hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-primary)]/90"
                  style={{ color: "var(--color-secondary)" }}
                >
                  {item}
                </a>
              </li>
            );
          })}
          <li className="mt-4">
            <button
              className="w-full px-4 py-2 rounded-full font-semibold transition-all bg-[var(--color-accent)]/90 text-[var(--color-primary)]/90 hover:bg-[var(--color-accent)]/80 hover:text-[var(--color-primary)]/80 hover:scale-95 duration-500 ease-in-out"
              onClick={() => navigate("/order")}
            >
              ORDER NOW
            </button>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
  return ReactDOM.createPortal(modalContent, document.body);
};

// Main StickyNav Component
const StickyNav = ({ activeSection, visible }) => {
  const { setShowMenu } = useContext(MobileMenuContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  useMediaQuery("(min-width: 600px) and (max-width: 1023px)");

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const toggleMenu = () => {
    // Force blur on mousedown so the button doesn’t keep focus during animation
    if (hamburgerButtonRef.current) {
      hamburgerButtonRef.current.blur();
    }
    setIsMenuOpen((prev) => !prev);
  };

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  // Throttled scroll handler
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100);
      setShowBackToTop(scrollTop > 300);
    }, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close modal if click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isMenuOpen &&
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !hamburgerButtonRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <ScrollProgressIndicator progress={scrollProgress} />
      <nav
        className={`fixed top-0 left-0 right-0 z-30 px-6 py-4 transition-transform duration-300 shadow-md`}
        style={{
          backgroundColor: "var(--color-primary)",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
          opacity: visible ? 1 : 0,
        }}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Company Logo" className="w-12" />
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--color-secondary)" }}
            >
              NUTCHA BITES
            </h2>
          </div>
          {/* Desktop Navigation */}
          <DesktopNavigation
            menuItems={menuItems}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            navigate={navigate}
          />
          {/* Mobile Hamburger Button */}
          <div className="lg:hidden">
            <button
              ref={hamburgerButtonRef}
              onMouseDown={(e) => e.preventDefault()} // Prevents delay on blur
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              style={{ color: "var(--color-secondary)" }}
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
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
                  className="w-6 h-6"
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
        {/* Mobile Modal Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <MobileModal
              menuItems={menuItems}
              scrollToSection={scrollToSection}
              onClose={() => setIsMenuOpen(false)}
              navigate={navigate}
              modalRef={modalRef}
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default StickyNav;
