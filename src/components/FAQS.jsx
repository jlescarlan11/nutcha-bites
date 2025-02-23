import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";

// Sample FAQ data
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
];

//
// SearchBar Component
//
const SearchBar = ({ searchTerm, setSearchTerm, clearSearch }) => (
  <div className="w-full sm:w-1/2 md:w-1/3 relative">
    <div className="relative">
      <input
        type="text"
        placeholder="Search FAQs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 pl-10 pr-10 rounded border border-[var(--color-secondary)]/40 text-[var(--color-secondary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
        aria-label="Search FAQs"
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
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  </div>
);

//
// FAQItem Component
//
const FAQItem = ({ faq, isOpen, toggle, index }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    () => localStorage.getItem(`fav-${index}`) === "true"
  );

  // New states for vote counts and user vote:
  const [userVote, setUserVote] = useState(null); // "up", "down", or null
  const [upCount, setUpCount] = useState(0);
  const [downCount, setDownCount] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen, faq.answer]);

  // Reset copy message after 3 seconds.
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") toggle(index);
  };

  // Share FAQ with fallback support.
  const handleShare = useCallback(() => {
    const textToShare = `FAQ: ${faq.question}\n\nAnswer: ${faq.answer}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToShare).then(() => {
        setCopied(true);
      });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = textToShare;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  }, [faq]);

  const toggleFavorite = () => {
    const newFavState = !isFavorite;
    setIsFavorite(newFavState);
    localStorage.setItem(`fav-${index}`, newFavState);
  };

  // Vote Handlers:
  const handleUpVote = () => {
    if (userVote === "up") return;
    if (userVote === "down") {
      setDownCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
    setUpCount((prev) => prev + 1);
    setUserVote("up");
  };

  const handleDownVote = () => {
    if (userVote === "down") return;
    if (userVote === "up") {
      setUpCount((prev) => (prev > 0 ? prev - 1 : 0));
    }
    setDownCount((prev) => prev + 1);
    setUserVote("down");
  };

  return (
    <article className="border-b border-[var(--color-tertiary)]/30">
      <header className="flex justify-between items-center ">
        <button
          onClick={() => toggle(index)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-left py-3 sm:py-4 text-base sm:text-lg text-[var(--color-secondary)]/80 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/10 transition-colors duration-300 bg-[var(--color-secondary)]/10 hover:shadow-md"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          {faq.question}
        </button>
        <div className="flex gap-2 items-center px-2 ">
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            role="button"
            tabIndex={0}
            aria-label={
              isFavorite ? "Remove from favorites" : "Mark as favorite"
            }
            className="cursor-pointer focus:outline-none hover:scale-110 transition-transform duration-300"
          >
            <svg
              className={`size-5 ${
                isFavorite
                  ? "text-yellow-500"
                  : "text-[var(--color-secondary)]/40"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.455a1 1 0 00-.364 1.118l1.286 3.966c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.385 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.612 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
            </svg>
          </div>
          <svg
            className={`w-6 h-6 transition-transform duration-300 transform text-[var(--color-secondary)]/80 ${
              isOpen ? "rotate-45" : "rotate-0"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </header>
      <div
        id={`faq-answer-${index}`}
        ref={contentRef}
        style={{
          maxHeight: height,
          transition: "max-height 0.35s ease-in-out",
        }}
        className={`overflow-hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="py-2 sm:py-3 px-4 sm:px-6 text-[var(--color-secondary)]/70 mr-12">
          <p>{faq.answer}</p>
          {isOpen && (
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
              <div
                className="flex gap-2 items-center space-x-6"
                aria-live="polite"
              >
                <button
                  onClick={handleUpVote}
                  className={`flex items-center space-x-1 bg-transparent text-[var(--color-secondary)]/70 focus:outline-none ${
                    userVote === "up" ? "font-bold" : ""
                  }`}
                >
                  <span>👍</span>
                  <span>{upCount}</span>
                </button>
                <button
                  onClick={handleDownVote}
                  className={`flex items-center space-x-1 bg-transparent text-[var(--color-secondary)]/70 focus:outline-none ${
                    userVote === "down" ? "font-bold" : ""
                  }`}
                >
                  <span>👎</span>
                  <span>{downCount}</span>
                </button>
              </div>
              <div className="mt-2 sm:mt-0">
                <button
                  onClick={handleShare}
                  className="px-3 py-1 bg-[var(--color-accent)]/80 text-[var(--color-primary)]/90 rounded hover:bg-[var(--color-accent)]/90 transition focus:outline-none"
                  aria-live="polite"
                >
                  {copied ? "Copied!" : "Share this FAQ"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

//
// SuggestionForm Component
//
const SuggestionForm = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setSubmitting(true);
      // Simulate an asynchronous submission.
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        setNewQuestion("");
        // Clear the submission message after 5 seconds.
        setTimeout(() => setSubmitted(false), 5000);
      }, 1000);
    }
  };

  return (
    <div className="mt-10 p-4 border border-[var(--color-tertiary)]/20 rounded-lg bg-[var(--color-accent)]/10">
      <h3 className="text-xl font-semibold mb-2 text-[var(--color-secondary)]/90">
        Didn't find your question?
      </h3>
      <p className="mb-2 text-[var(--color-secondary)]/80">
        Submit your question below and we'll update our FAQs soon!
      </p>
      <form
        onSubmit={handleQuestionSubmit}
        className="flex flex-col sm:flex-row items-center"
      >
        <input
          type="text"
          placeholder="Your question..."
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="w-full p-2 rounded border border-[var(--color-secondary)]/40 text-[var(--color-secondary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] mb-2 sm:mb-0 sm:mr-2"
          required
        />
        <div className="flex items-center">
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 bg-[var(--color-accent)]/80 text-[var(--color-primary)]/90 rounded transition ${
              submitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[var(--color-accent)]/90"
            }`}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          {submitted && (
            <span className="ml-4 text-[var(--color-accent)]/60 font-semibold">
              Submitted!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

//
// Main FAQS Component
//
const FAQS = () => {
  const [openItems, setOpenItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");

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

  return (
    <section
      id="faq"
      role="region"
      aria-labelledby="faq-heading"
      className="mt-32 px-4 sm:px-6 md:px-8 transition-colors"
    >
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
              className="mt-4 sm:mt-0 ml-auto p-2 bg-[var(--color-accent)]/80 text-[var(--color-primary)] rounded hover:bg-[var(--color-accent)]/90 transition-colors focus:outline-none focus:ring-2"
            >
              {areAllExpanded ? "Collapse All" : "Expand All"}
            </button>
          )}
        </div>
        <div className="mt-6 space-y-4">
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
        {filteredFaqs.length > 5 && (
          <div className="mt-6 text-center">
            <button
              onClick={scrollToTop}
              className="px-4 py-2 bg-[var(--color-accent)]/80 text-[var(--color-primary)] rounded hover:bg-[var(--color-accent)]/90 transition shadow-md hover:shadow-lg"
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
