// ScrollToTop.jsx
import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-[var(--color-accent)] text-[var(--color-primary)] rounded-full shadow-lg hover:shadow-xl transition duration-300"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTop;
