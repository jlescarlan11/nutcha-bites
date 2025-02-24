import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import { useSwipeable } from "react-swipeable";
import {
  FaClipboard,
  FaCheck,
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import Confetti from "react-confetti";
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
      "Gagi Bro, ang sarap! Plus points pa for its crisp and authentic texture!",
    rating: 4,
    image: review2,
  },
  {
    name: "Ming Ming",
    review:
      "Arf Arf! The quality and heritage behind Nutcha Bites makes me wanna bite more.",
    rating: 5,
    image: review3,
  },
];

const RatingStars = ({ rating, size = "w-5 h-5" }) => (
  <div className="flex" aria-label={`Rating: ${rating} out of 5`}>
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`${size} ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.959c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.286-3.959a1 1 0 00-.364-1.118L2.07 9.386c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.959z" />
      </svg>
    ))}
  </div>
);

const TestimonialModal = ({
  testimonial,
  onClose,
  onLike,
  likes,
  onBookmark,
  bookmarked,
}) => {
  const [copyStatus, setCopyStatus] = useState("");
  const modalRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  useEffect(() => {
    lastFocusedElementRef.current = document.activeElement;
    if (modalRef.current) modalRef.current.focus();
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      lastFocusedElementRef.current && lastFocusedElementRef.current.focus();
    };
  }, [onClose]);

  const handleShare = () => {
    navigator.clipboard
      .writeText(testimonial.review)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000);
      })
      .catch(() => {
        setCopyStatus("Failed to copy.");
        setTimeout(() => setCopyStatus(""), 2000);
      });
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalHeading"
      aria-describedby="modalReview"
    >
      <div
        className="fixed inset-0 bg-gradient-to-br from-[var(--color-secondary)]/30 to-transparent backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <FocusLock>
        <div
          ref={modalRef}
          tabIndex="-1"
          className="relative bg-[var(--color-primary)] rounded-2xl shadow-2xl max-w-sm w-full p-6 z-50 transition-transform duration-300 transform animate-modalIn"
        >
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-4xl bg-transparent text-[var(--color-secondary)] hover:text-[var(--color-accent)] focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
          <img
            src={testimonial.image}
            alt={`${testimonial.name}'s review`}
            className="w-20 h-20 rounded-full mx-auto mb-4"
            loading="lazy"
          />
          <p
            id="modalReview"
            className="text-base md:text-lg italic text-[var(--color-secondary)]/70 mb-2"
          >
            "{testimonial.review}"
          </p>
          <p className="text-[var(--color-secondary)]/90 font-semibold">
            - {testimonial.name}
          </p>
          <div className="flex items-center justify-center my-2">
            <RatingStars rating={testimonial.rating} size="w-5 h-5" />
          </div>
          <div className="mt-4 flex flex-row gap-2 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center px-3 py-2 border border-[var(--color-tertiary)]/20 rounded-full text-xs font-medium transition-colors duration-300 bg-[var(--color-secondary)]/10 hover:bg-[var(--color-accent)]/30 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/40"
            >
              <FaClipboard className="mr-2" />
              Copy
            </button>
            <button
              onClick={onLike}
              className="flex items-center px-3 py-2 border border-[var(--color-tertiary)]/20 rounded-full text-xs font-medium transition-colors duration-300 bg-[var(--color-secondary)]/10 hover:bg-[var(--color-accent)]/30 focus:outline-none focus:ring-1  focus:ring-red-200"
              title={likes[testimonial.name]?.liked ? "Unlike" : "Like"}
            >
              {likes[testimonial.name]?.liked ? (
                <FaHeart className="mr-2 text-red-500" />
              ) : (
                <FaRegHeart className="mr-2 text-red-500" />
              )}
              Like ({likes[testimonial.name]?.count || 0})
            </button>
            <button
              onClick={onBookmark}
              className="flex items-center px-3 py-2 border border-[var(--color-tertiary)]/20 rounded-full text-xs font-medium transition-colors duration-300 bg-[var(--color-secondary)]/10 hover:bg-[var(--color-accent)]/30 focus:outline-none focus:ring-1  focus:ring-blue-200"
              title={bookmarked ? "Remove Bookmark" : "Bookmark"}
            >
              {bookmarked ? (
                <FaBookmark className="mr-2 text-blue-500" />
              ) : (
                <FaRegBookmark className="mr-2 text-blue-500" />
              )}
              {bookmarked ? "Bookmarked" : "Bookmark"}
            </button>
          </div>
          {copyStatus && (
            <div className="flex items-center justify-center mt-2 text-sm text-[var(--color-accent)]/50 transition-opacity duration-300">
              <FaCheck className="inline mr-1" /> {copyStatus}
            </div>
          )}
        </div>
      </FocusLock>
    </div>,
    document.body
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;
  const [paused, setPaused] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [likes, setLikes] = useState({});
  const [bookmarks, setBookmarks] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedLikes = localStorage.getItem("testimonialLikes");
    if (savedLikes) setLikes(JSON.parse(savedLikes));
    const savedBookmarks = localStorage.getItem("testimonialBookmarks");
    if (savedBookmarks) setBookmarks(JSON.parse(savedBookmarks));
  }, []);

  useEffect(() => {
    localStorage.setItem("testimonialLikes", JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    localStorage.setItem("testimonialBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

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

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    else if (e.key === "ArrowRight") handleNext();
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  const handleLikeForTestimonial = (testimonial) => {
    setLikes((prev) => {
      const currentState = prev[testimonial.name] || { count: 0, liked: false };
      const newLiked = !currentState.liked;
      const newCount = newLiked
        ? currentState.count + 1
        : Math.max(currentState.count - 1, 0);
      if (newLiked && !currentState.liked) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
      return {
        ...prev,
        [testimonial.name]: { count: newCount, liked: newLiked },
      };
    });
  };

  const handleBookmarkForTestimonial = (testimonial) => {
    setBookmarks((prev) => ({
      ...prev,
      [testimonial.name]: !prev[testimonial.name],
    }));
  };

  const handleLike = () => {
    if (selectedTestimonial) handleLikeForTestimonial(selectedTestimonial);
  };

  const handleBookmark = () => {
    if (selectedTestimonial) handleBookmarkForTestimonial(selectedTestimonial);
  };

  return (
    <section
      className="relative mt-24 mx-4 sm:mx-8 overflow-hidden md:mx-16 lg:mx-32 py-8 md:py-12 px-4 bg-[var(--color-primary)]"
      aria-label="Testimonials Slider"
      onKeyDown={handleKeyDown}
      tabIndex="0"
      {...swipeHandlers}
    >
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <div className="max-w-full md:max-w-4xl mx-auto text-center relative">
        <h2 className="text-3xl sm:text-4xl mb-6 md:text-5xl font-bold text-[var(--color-secondary)]/80">
          What Our Customers Say
        </h2>
        <div
          className="overflow-hidden bg-[var(--color-primary)] border border-[var(--color-tertiary)]/10 shadow-xs rounded-2xl relative w-full"
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
                className="min-w-full relative flex flex-col items-center p-4 sm:p-6 transition-opacity duration-500"
                aria-hidden={current !== index}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="absolute top-3 right-3 gap-2 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeForTestimonial(testimonial);
                    }}
                    className="flex items-center bg-transparent text-red-500 hover:text-red-600"
                    title={likes[testimonial.name]?.liked ? "Unlike" : "Like"}
                    aria-label="Like testimonial"
                  >
                    {likes[testimonial.name]?.liked ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                    <span className="ml-1 text-xs">
                      {likes[testimonial.name]?.count || 0}
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmarkForTestimonial(testimonial);
                    }}
                    className="flex items-center bg-transparent text-blue-500 hover:text-blue-600"
                    title={
                      bookmarks[testimonial.name]
                        ? "Remove Bookmark"
                        : "Bookmark"
                    }
                    aria-label="Bookmark testimonial"
                  >
                    {bookmarks[testimonial.name] ? (
                      <FaBookmark />
                    ) : (
                      <FaRegBookmark />
                    )}
                  </button>
                </div>
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s review`}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mb-4 cursor-pointer hover:opacity-90 transition-transform duration-200 transform hover:scale-105"
                  loading="lazy"
                />
                <p className="text-base md:text-lg italic text-[var(--color-secondary)]/70">
                  "{testimonial.review}"
                </p>
                <p className="text-[var(--color-secondary)]/90 font-semibold mt-2 text-lg">
                  {testimonial.name}
                </p>
                <RatingStars
                  rating={testimonial.rating}
                  size="w-4 h-4 md:w-5 md:h-5"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTestimonial(testimonial);
                  }}
                  className="mt-2 px-4 py-1 text-sm bg-[var(--color-accent)] text-[var(--color-primary)]/90 rounded hover:bg-[var(--color-accent)]/90 transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
          {/* Progress bar at the bottom border of the card */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--color-secondary)]/20 rounded">
            <div
              key={`progress-${current}`}
              className="h-1 bg-[var(--color-accent)] rounded"
              style={{
                animation: paused ? "none" : "progress 5000ms linear forwards",
              }}
            ></div>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30 ${
                current === index
                  ? "bg-[var(--color-accent)]/50"
                  : "bg-[var(--color-secondary)]/30"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={current === index ? "true" : "false"}
            />
          ))}
          <button
            onClick={handlePrev}
            className="absolute left-1 sm:left-3 top-11/12 transform -translate-y-1/2 bg-[var(--color-accent)]/50 text-[var(--color-primary)] p-2 sm:p-3 rounded-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30"
            aria-label="Previous testimonial"
          >
            ◀
          </button>
          <button
            onClick={handleNext}
            className="absolute right-1 sm:right-3 top-11/12 transform -translate-y-1/2 bg-[var(--color-accent)]/50 text-[var(--color-primary)] p-2 sm:p-3 rounded-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/30"
            aria-label="Next testimonial"
          >
            ▶
          </button>
        </div>
        <div className="block sm:hidden mt-4 text-sm text-[var(--color-secondary)]/50">
          Swipe left or right to navigate
        </div>
      </div>
      {selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
          onLike={() => handleLikeForTestimonial(selectedTestimonial)}
          likes={likes}
          onBookmark={() => handleBookmarkForTestimonial(selectedTestimonial)}
          bookmarked={bookmarks[selectedTestimonial.name] || false}
        />
      )}
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        /* Global focus style for consistency */
        button:focus,
        [tabindex]:focus {
          outline: 1px solid var(--color-accent);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
