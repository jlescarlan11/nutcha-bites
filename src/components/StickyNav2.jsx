// StickyNav.jsx
import React from "react";
import logo from "../assets/logo1.svg";

const menuItems = [
  "Overview",
  "Recipe",
  "Our Vision",
  "Testimonials",
  "FAQs",
  "Contact Us",
];

const StickyNav2 = ({ activeSection, visible }) => {
  return (
    <nav
      className={`fixed top-4 left-0 right-0 z-20 p-4 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-around items-center">
        <div className="flex items-center text-2xl">
          <img src={logo} alt="Logo" className="size-16" />
        </div>
        <ul className="flex flex-wrap justify-center gap-4 bg-[var(--color-secondary)] text-[var(--color-primary)] px-2 py-4 rounded-4xl opacity-90">
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
        <div>
          <button className="px-4 py-4 rounded-4xl font-semibold bg-[var(--color-secondary)]">
            ORDER NOW
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StickyNav2;
