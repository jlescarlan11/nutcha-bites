// Header.jsx
import React, { useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo2.svg";
import { MobileMenuContext } from "../App";

const menuItems = [
  "Overview",
  "Recipe",
  "Our Vision",
  "Testimonials",
  "FAQs",
  "Contact Us",
];

const Header = () => {
  const navigate = useNavigate();
  const { showMenu, setShowMenu } = useContext(MobileMenuContext);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [showMenu]);

  // Drag handler: if dragged far enough, close the modal
  const handleDragEnd = (event, info) => {
    if (info.point.y > 100) {
      setShowMenu(false);
    }
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
            onClick={() => navigate("/order")}
            className="px-4 py-2 font-semibold bg-[var(--color-accent)]/80 text-[var(--color-primary)]/90 transition-transform duration-300 hover:scale-105 hover:bg-[var(--color-accent)]/90 focus:outline-none"
          >
            ORDER NOW
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
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

      {/* Mobile Menu Modal with Enhanced Effects */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated Overlay */}
            <motion.div
              className="absolute inset-0"
              onClick={() => setShowMenu(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
              }}
            />

            {/* Modal Container with Swipe Support */}
            <motion.div
              className="relative rounded-xl shadow-xl p-8 w-11/12 max-w-md z-50"
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
                onClick={() => setShowMenu(false)}
                className="absolute top-4 right-4 text-3xl focus:outline-none hover:scale-90 transition-all duration-300 ease-in-out"
                style={{ color: "var(--color-secondary)" }}
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
                          // If you have a scrollToSection function, call it here.
                          setShowMenu(false);
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
                    onClick={() => {
                      setShowMenu(false);
                      navigate("/order");
                    }}
                  >
                    ORDER NOW
                  </button>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
