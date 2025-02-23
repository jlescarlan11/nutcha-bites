// ScrollProgress.jsx
import React, { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollWidth(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div
        className="h-1 bg-[var(--color-accent)] transition-all duration-200"
        style={{ width: `${scrollWidth}%` }}
      ></div>
    </div>
  );
};

export default ScrollProgress;
