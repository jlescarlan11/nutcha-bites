// BackToTopButton.jsx
import React, { useState, useEffect, useContext } from "react";
import { FaArrowUp } from "react-icons/fa";
import { MobileMenuContext } from "../App"; // Adjust the import path as needed

const BackToTopButton = () => {
  const { showMenu } = useContext(MobileMenuContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
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

  // Do not render the button if the modal is open
  if (showMenu) return null;

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
