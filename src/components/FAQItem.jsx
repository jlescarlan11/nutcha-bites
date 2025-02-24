import React, { useState, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "../hooks/useMeasure";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";
import useVote from "../hooks/useVote";

const FAQItem = ({ faq, isOpen, toggle, index }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    () => localStorage.getItem(`fav-${index}`) === "true"
  );
  const { userVote, upCount, downCount, handleUpVote, handleDownVote } =
    useVote();

  const [measureRef, { height: viewHeight }] = useMeasure();

  const animationProps = useSpring({
    height: isOpen ? viewHeight : 0,
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
    immediate: prefersReducedMotion,
  });

  const iconProps = useSpring({
    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 20 },
    immediate: prefersReducedMotion,
  });

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") toggle(index);
  };

  const handleShare = useCallback(() => {
    const textToShare = `FAQ: ${faq.question}\n\nAnswer: ${faq.answer}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToShare).then(() => setCopied(true));
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

  return (
    <article className="border-b border-[var(--color-tertiary)]/20">
      <header className="flex justify-between items-center">
        <button
          onClick={() => toggle(index)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-left py-3 sm:py-4 text-base sm:text-lg text-[var(--color-secondary)]/80 font-medium focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/10 transition-colors duration-300 bg-[var(--color-secondary)]/5 hover:shadow-md"
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${index}`}
        >
          {faq.question}
        </button>
        <div className="flex gap-2 items-center px-2">
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
          <animated.svg
            style={iconProps}
            className="w-6 h-6 text-[var(--color-secondary)]/80"
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
          </animated.svg>
        </div>
      </header>
      <animated.div
        id={`faq-answer-${index}`}
        style={{ ...animationProps, overflow: "hidden" }}
      >
        <div
          ref={measureRef}
          className="py-2 sm:py-3 px-4 sm:px-6 text-[var(--color-secondary)]/70 mr-12"
        >
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
                  aria-label="Upvote this FAQ"
                >
                  <span role="img" aria-label="thumbs up">
                    👍
                  </span>
                  <span>{upCount}</span>
                </button>
                <button
                  onClick={handleDownVote}
                  className={`flex items-center space-x-1 bg-transparent text-[var(--color-secondary)]/70 focus:outline-none ${
                    userVote === "down" ? "font-bold" : ""
                  }`}
                  aria-label="Downvote this FAQ"
                >
                  <span role="img" aria-label="thumbs down">
                    👎
                  </span>
                  <span>{downCount}</span>
                </button>
              </div>
              <div className="mt-2 sm:mt-0">
                <button
                  onClick={handleShare}
                  className="px-3 py-1 bg-[var(--color-accent)]/80 text-[var(--color-primary)]/90 rounded hover:bg-[var(--color-accent)]/90 transition focus:outline-none"
                  aria-label="Share this FAQ"
                >
                  {copied ? (
                    <span role="alert">Copied!</span>
                  ) : (
                    "Share this FAQ"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </animated.div>
    </article>
  );
};

export default FAQItem;
