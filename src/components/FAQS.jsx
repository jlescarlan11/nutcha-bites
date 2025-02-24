import React, { useState, useMemo, useCallback } from "react";
import { useTransition, animated } from "react-spring";
import SearchBar from "./SearchBar";
import FAQItem from "./FAQItem";
import SuggestionForm from "./SuggestionForm";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

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
    question: "What makes Nutcha Bites unique?",
    answer:
      "Nutcha Bites combine a rich blend of traditional ingredients with modern culinary techniques, offering a perfect balance of flavor, texture, and nutritional value.",
  },
  {
    question: "Can I find Nutcha Bites in local stores or only online?",
    answer:
      "Currently, Nutcha Bites are available exclusively through our online store, ensuring that you get the freshest product delivered right to your door.",
  },
  {
    question: "How do Nutcha Bites compare to other snacks?",
    answer:
      "Nutcha Bites stand out with their premium ingredients, meticulous preparation, and dedication to quality. Experience a snack that is both delicious and thoughtfully crafted.",
  },
  {
    question: "What allergens are present in Nutcha Bites?",
    answer:
      "Nutcha Bites contain peanuts and dairy (butter). They are produced in a facility that also processes tree nuts and soy. If you have specific allergies, please review the ingredient list carefully or consult with your healthcare provider before consuming.",
  },
  {
    question:
      "Do Nutcha Bites contain any preservatives or artificial additives?",
    answer:
      "No, Nutcha Bites are made with natural ingredients and do not contain preservatives or artificial additives.",
  },
  {
    question: "Are there any plans to introduce new flavors or variations?",
    answer:
      "We are continually exploring new flavors and variations to delight our customers. Stay tuned to our website and social media channels for updates on upcoming products.",
  },
  {
    question:
      "Can I customize my Nutcha Bites order (e.g., bulk orders, special packaging)?",
    answer:
      "Yes, we offer customization options for bulk orders and special occasions. Please contact our customer service team for more details and to discuss your specific requirements.",
  },
  {
    question:
      "What is the nutritional information for a serving of Nutcha Bites?",
    answer:
      "Each serving of Nutcha Bites (approximately 30g) contains:\n\nCalories: 150\nProtein: 4g\nCarbohydrates: 12g\nSugars: 8g\nFat: 10g\nSaturated Fat: 2g\nSodium: 80mg\n\nPlease note that these values are approximate and may vary slightly between batches.",
  },
  {
    question: "How can I provide feedback or suggestions about Nutcha Bites?",
    answer:
      "We value your feedback and suggestions. You can reach out to us through our website's contact form or email us directly at feedback@nutchabites.com.",
  },
];

const FAQS = () => {
  const [openItems, setOpenItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();

  const toggleItem = useCallback((index) => {
    setOpenItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqData
      .map((faq, idx) => ({ ...faq, originalIndex: idx }))
      .filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm]);

  const areAllExpanded = useMemo(() => {
    return (
      filteredFaqs.length > 0 &&
      filteredFaqs.every((faq) => openItems.includes(faq.originalIndex))
    );
  }, [openItems, filteredFaqs]);

  const toggleAll = useCallback(() => {
    if (areAllExpanded) {
      setOpenItems((prev) =>
        prev.filter(
          (index) => !filteredFaqs.some((faq) => faq.originalIndex === index)
        )
      );
    } else {
      const openIndices = filteredFaqs.map((faq) => faq.originalIndex);
      setOpenItems((prev) => Array.from(new Set([...prev, ...openIndices])));
    }
  }, [areAllExpanded, filteredFaqs]);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const scrollToTop = () => {
    document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
  };

  const transitions = useTransition(filteredFaqs, {
    key: (faq) => faq.originalIndex,
    from: { opacity: 0, transform: "translateY(10px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(10px)" },
    config: { tension: 300, friction: 30 },
    immediate: prefersReducedMotion,
  });

  return (
    <section
      id="faq"
      role="region"
      aria-labelledby="faq-heading"
      className="mt-28 px-4 sm:px-6 md:px-8 transition-colors"
    >
      <noscript>
        <p className="text-center text-[var(--color-secondary)]">
          For the best experience, please enable JavaScript.
        </p>
      </noscript>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center items-center mb-6">
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl mb-6 md:text-5xl font-bold text-[var(--color-secondary)]/80"
          >
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            clearSearch={clearSearch}
          />
          {filteredFaqs.length > 0 && (
            <button
              onClick={toggleAll}
              className="mt-4 sm:mt-0 ml-auto p-2 bg-[var(--color-accent)] text-[var(--color-primary)] rounded hover:bg-[var(--color-accent)]/90 transition-colors focus:outline-none focus:ring-2"
              aria-label={
                areAllExpanded ? "Collapse all FAQs" : "Expand all FAQs"
              }
            >
              {areAllExpanded ? "Collapse All" : "Expand All"}
            </button>
          )}
        </div>
        <div className="mt-6 space-y-4">
          {transitions((style, faq) => (
            <animated.div style={style} key={faq.originalIndex}>
              <FAQItem
                faq={faq}
                isOpen={openItems.includes(faq.originalIndex)}
                toggle={toggleItem}
                index={faq.originalIndex}
              />
            </animated.div>
          ))}
          {filteredFaqs.length === 0 && (
            <p className="text-center text-[var(--color-secondary)]">
              No FAQs match your search.
            </p>
          )}
        </div>
        {filteredFaqs.length > 5 && (
          <div className="mt-6 text-center">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-primary)] rounded hover:bg-[var(--color-accent)]/90 transition shadow-md hover:shadow-lg"
              aria-label="Back to the first FAQ"
            >
              Back to First FAQ
            </button>
          </div>
        )}
        <SuggestionForm />
      </div>
    </section>
  );
};

export default FAQS;
