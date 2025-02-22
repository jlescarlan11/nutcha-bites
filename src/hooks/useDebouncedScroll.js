import { useState, useEffect } from "react";

// This custom hook returns whether the scrollY exceeds a threshold,
// debounced by a specified delay to avoid excessive updates.
const useDebouncedScroll = (threshold = 700, delay = 100) => {
  const [navVisible, setNavVisible] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setNavVisible(window.scrollY > threshold);
      }, delay);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, delay]);

  return navVisible;
};

export default useDebouncedScroll;
