// Testimonials.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { FaClipboard, FaCheck } from "react-icons/fa";
import review1 from "../assets/review1.webp";
import review2 from "../assets/review2.webp";
import review3 from "../assets/review3.webp";

const testimonialsData = [
  {
    name: "Karliann Flores",
    review: "The nutty goodness of Nutcha Bites is a game-changer!",
    rating: 5,
    image: review1,
  },
  {
    name: "Jen Jr.",
    review:
      "Gagi Bro, ang sarap! Plus points for its crisp and authentic texture!",
    rating: 4,
    image: review2,
  },
  {
    name: "Ming Ming",
    review:
      "Arf Arf! The quality and heritage behind Nutcha Bites shine through.",
    rating: 5,
    image: review3,
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;
  const [paused, setPaused] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [copyStatus, setCopyStatus] = useState("");

  // Auto slide effect with pause functionality
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [paused, total]);

  const handleNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation for arrow keys
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      handlePrev();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  };

  // Swipe handlers for touch devices
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  // Toggle auto-play state
  const togglePause = () => {
    setPaused((prev) => !prev);
  };

  // Handle share: copy testimonial review to clipboard
  const handleShare = () => {
    navigator.clipboard.writeText(selectedTestimonial.review).then(() => {
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    });
  };

  return (
    <section
      className="relative mx-4 sm:mx-8 md:mx-16 lg:mx-32 py-8 md:py-12 px-4"
      aria-label="Testimonials Slider"
      onKeyDown={handleKeyDown}
      tabIndex="0"
      {...swipeHandlers}
    >
      <div className="max-w-full md:max-w-4xl mx-auto text-center relative">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-secondary)]/80 mb-6 md:mb-8">
          What Our Customers Say
        </h2>
        <div
          className="overflow-hidden relative w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center p-4 sm:p-6 transition-opacity duration-500"
                aria-hidden={current !== index}
              >
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s review`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 cursor-pointer hover:opacity-90 transition-transform duration-200 transform hover:scale-105"
                  loading="lazy"
                  onClick={() => setSelectedTestimonial(testimonial)}
                />
                <p className="text-base md:text-lg italic text-[var(--color-secondary)]/70">
                  "{testimonial.review}"
                </p>
                <p className="text-[var(--color-secondary)]/90 font-semibold mt-2">
                  {testimonial.name}
                </p>
                <div
                  className="flex mt-2"
                  aria-label={`Rating: ${testimonial.rating} out of 5`}
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.07 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.959z" />
                    </svg>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className="mt-2 px-4 py-1 text-sm bg-[var(--color-accent)]/80 text-[var(--color-primary)] rounded hover:bg-[var(--color-accent)]/90 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300 rounded">
            <div
              key={current}
              className="h-1 bg-[var(--color-accent)] rounded"
              style={{
                animation: paused ? "none" : "progress 5000ms linear forwards",
              }}
            ></div>
          </div>
        </div>
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-[var(--color-secondary)]/80 text-[var(--color-primary)] p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          aria-label="Previous testimonial"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-[var(--color-secondary)]/80 text-[var(--color-primary)] p-2 sm:p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          aria-label="Next testimonial"
        >
          ▶
        </button>
        {/* Dots Navigation */}
        <div className="flex justify-center mt-4 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] ${
                current === index
                  ? "bg-[var(--color-accent)]/60"
                  : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={current === index ? "true" : "false"}
            />
          ))}
        </div>
        {/* Auto-Play Toggle Button */}
        <button
          onClick={togglePause}
          className="mt-4 inline-flex items-center px-3 py-1 border border-[var(--color-secondary)] rounded-full text-sm font-medium text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          aria-label={paused ? "Play testimonials" : "Pause testimonials"}
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      {/* Testimonial Details Modal */}
      {selectedTestimonial && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedTestimonial(null)}
          ></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 mx-4 z-50 transition-transform duration-300 transform animate-modalIn">
            <button
              onClick={() => setSelectedTestimonial(null)}
              className="absolute top-3 right-3 text-2xl text-[var(--color-secondary)] hover:text-[var(--color-accent)] focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <img
              src={selectedTestimonial.image}
              alt={`${selectedTestimonial.name}'s review`}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <p className="text-base md:text-lg italic text-[var(--color-secondary)]/70 mb-2">
              "{selectedTestimonial.review}"
            </p>
            <p className="text-[var(--color-secondary)]/90 font-semibold">
              {selectedTestimonial.name}
            </p>
            <div
              className="flex mt-2 justify-center"
              aria-label={`Rating: ${selectedTestimonial.rating} out of 5`}
            >
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < selectedTestimonial.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.07 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.959z" />
                </svg>
              ))}
            </div>
            <div className="mt-4 flex justify-center items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center px-3 py-2 border rounded-full text-sm font-medium transition-colors duration-300 hover:bg-[var(--color-accent)]/10 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <FaClipboard className="mr-2" />
                Share
              </button>
              {copyStatus && (
                <span className="text-sm text-green-500 transition-opacity duration-300">
                  <FaCheck className="inline mr-1" /> {copyStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modalIn {
          animation: modalIn 0.3s ease-out;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
