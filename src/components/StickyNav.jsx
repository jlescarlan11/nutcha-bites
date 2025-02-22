// StickyNav.jsx
import React from "react";

const menuItems = [
  "Overview",
  "Recipe",
  "Our Vision",
  "Testimonials",
  "FAQs",
  "Contact Us",
];

const StickyNav = ({ activeSection, visible }) => {
  return (
    <nav
      className={`sticky top-4 z-20 px-4 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <ul className="flex flex-wrap justify-center gap-4 bg-[var(--color-secondary)]/80 text-[var(--color-primary)] px-2 py-4 rounded-4xl">
        {menuItems.map((item, index) => {
          const id = item.toLowerCase().replace(/\s+/g, "-");
          const activeClass =
            activeSection === id
              ? "bg-[var(--color-primary)] text-[var(--color-secondary)]"
              : "hover:bg-[var(--color-primary)] hover:opacity-90 hover:text-[var(--color-secondary)]";
          return (
            <li key={index} className="cursor-pointer">
              <a
                href={`#${id}`}
                className={`px-4 py-3 rounded-4xl transition duration-300 ease-in-out ${activeClass}`}
              >
                {item}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default StickyNav;
