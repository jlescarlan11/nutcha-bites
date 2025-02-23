// BackToTopButton.jsx
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-[var(--color-secondary)] text-white p-3 rounded-full shadow-lg hover:bg-[var(--color-accent)] transition-all"
        aria-label="Back to Top"
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default BackToTopButton;
