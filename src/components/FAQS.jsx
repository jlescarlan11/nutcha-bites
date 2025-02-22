import React, { useState, useRef, useEffect, useMemo } from "react";

// FAQ data remains unchanged.
const faqData = [
  {
    question: "How long is the shelf life of Nutcha Bites?",
    answer:
      "Nutcha Bites have a shelf life of up to 2 months when stored in an airtight container in a cool, dry place.",
  },
  {
    question: "How should I store Nutcha Bites?",
    answer:
      "Store Nutcha Bites in an airtight container, preferably in a cool, dry area. Avoid direct sunlight and high humidity to maintain their crisp texture.",
  },
  {
    question: "What ingredients are used in Nutcha Bites?",
    answer:
      "Our Nutcha Bites are made with raw peanuts, muscovado sugar, white granulated sugar, water, unsalted butter, culinary-grade matcha powder, fine salt, baking soda, and (optionally) vanilla extract.",
  },
  {
    question: "Are Nutcha Bites gluten-free and vegan?",
    answer:
      "Nutcha Bites are gluten-free. However, our current recipe includes butter, so if you need a vegan version, please check our future updates for a dairy-free alternative.",
  },
  {
    question: "What are the nutritional values of Nutcha Bites?",
    answer:
      "Each serving of Nutcha Bites provides a balanced mix of protein, healthy fats, and natural sugars. For detailed nutritional information, please refer to our product label.",
  },
];

// FAQItem component handles the individual FAQ logic and animation.
const FAQItem = ({ faq, isOpen, toggle, index }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  // Measure content height for a smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, faq.answer]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      toggle(index);
    }
  };

  return (
    <div className="border-b border-[var(--color-tertiary)] ">
      <button
        onClick={() => toggle(index)}
        onKeyDown={handleKeyDown}
        className="w-full flex justify-between items-center py-4 text-left text-lg font-medium focus:outline-none focus:ring-2 bg-[var(--color-accent)] focus:ring-[var(--color-accent)]"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="text-[var(--color-primary)]">{faq.question}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        id={`faq-answer-${index}`}
        ref={contentRef}
        style={{
          maxHeight: height,
          transition: "max-height 0.35s ease-in-out",
        }}
        className="overflow-hidden"
      >
        <p className="py-3 px-4 text-[var(--color-secondary)]/70">
          {faq.answer}
        </p>
      </div>
    </div>
  );
};

const FAQS = () => {
  // Use an array to allow multiple FAQs to be open at once.
  const [openItems, setOpenItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle a single FAQ item's open/closed state.
  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Filter FAQs based on the search term (case-insensitive).
  const filteredFaqs = useMemo(() => {
    return faqData
      .map((faq, idx) => ({ ...faq, originalIndex: idx }))
      .filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm]);

  // Determine if all filtered FAQs are currently expanded.
  const areAllExpanded = useMemo(() => {
    return (
      filteredFaqs.length > 0 &&
      filteredFaqs.every((faq) => openItems.includes(faq.originalIndex))
    );
  }, [openItems, filteredFaqs]);

  // Toggle expansion for all filtered FAQs.
  const toggleAll = () => {
    if (areAllExpanded) {
      // Collapse all
      setOpenItems((prev) =>
        prev.filter(
          (index) => !filteredFaqs.some((faq) => faq.originalIndex === index)
        )
      );
    } else {
      // Expand all filtered FAQs by adding their original indices.
      const openIndices = filteredFaqs.map((faq) => faq.originalIndex);
      setOpenItems((prev) => Array.from(new Set([...prev, ...openIndices])));
    }
  };

  // Clear the search input.
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <section
      id="faq"
      className="mt-32 px-4 bg-[var(--color-primary)] transition-colors"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-[var(--color-secondary)]/80">
          Frequently Asked Questions
        </h2>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
          <div className="w-full sm:w-1/2 relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 pr-10 rounded border border-[var(--color-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] "
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-sm text-[var(--color-primary)] hover:text-[var(--color-secondary) ]"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {filteredFaqs.length > 0 && (
            <button
              onClick={toggleAll}
              className="mt-4 sm:mt-0 ml-auto p-2 bg-[var(--color-accent)] text-[var(--color-primary)] rounded hover:bg-[var(--color-accent)] hover:opacity-90 transition-colors"
            >
              {areAllExpanded ? "Collapse All" : "Expand All"}
            </button>
          )}
        </div>
        <div className="mt-6 space-y-4 ">
          {filteredFaqs.length ? (
            filteredFaqs.map((faq) => (
              <FAQItem
                key={faq.originalIndex}
                faq={faq}
                isOpen={openItems.includes(faq.originalIndex)}
                toggle={toggleItem}
                index={faq.originalIndex}
              />
            ))
          ) : (
            <p className="text-center text-[var(--color-secondary)]">
              No FAQs match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQS;
