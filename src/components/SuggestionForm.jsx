import React, { useState } from "react";

const SuggestionForm = () => {
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (newQuestion.trim()) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSubmitted(true);
        setNewQuestion("");
        setTimeout(() => setSubmitted(false), 5000);
      }, 1000);
    }
  };

  return (
    <div
      className="mt-10 p-4 border border-[var(--color-tertiary)]/20 rounded-lg bg-[var(--color-secondary)]/10"
      aria-live="polite"
    >
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
          aria-label="Enter your question"
          required
        />
        <div className="flex items-center">
          <button
            type="submit"
            disabled={submitting}
            className={`px-4 py-2 bg-[var(--color-accent)] text-[var(--color-primary)]/90 rounded transition ${
              submitting
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-[var(--color-accent)]/90"
            }`}
            aria-label="Submit your question"
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
          {submitted && (
            <span
              className="ml-4 text-[var(--color-accent)]/60 font-semibold"
              role="alert"
            >
              Submitted!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default SuggestionForm;
