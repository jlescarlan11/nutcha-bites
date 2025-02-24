import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, clearSearch }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 relative">
    <div className="relative">
      <input
        type="text"
        placeholder="Search FAQs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 pl-10 pr-10 rounded border border-[var(--color-secondary)]/40 text-[var(--color-secondary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        aria-label="Search Frequently Asked Questions"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <svg
          className="w-5 h-5 text-[var(--color-secondary)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z"
          />
        </svg>
      </div>
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary)] focus:outline-none"
          aria-label="Clear search input"
        >
          ✕
        </button>
      )}
    </div>
  </div>
);

export default SearchBar;
