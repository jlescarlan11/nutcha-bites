import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
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
    review: "Gagi Bro, ang sarap! Crisp and authentic texture!",
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

  // Swipe handlers for touch devices (using react-swipeable)
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true,
  });

  return (
    <section
      className="relative m-32 py-12 px-4"
      aria-label="Customer testimonials"
      onKeyDown={handleKeyDown}
      tabIndex="0" // Makes the container focusable for keyboard events
      {...swipeHandlers}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
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
                className="min-w-full flex flex-col items-center p-6"
                aria-hidden={current !== index}
              >
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s review`}
                  className="w-20 h-20 rounded-full mb-4"
                  loading="lazy"
                />
                <p className="text-lg italic text-gray-700">
                  "{testimonial.review}"
                </p>
                <p className="text-gray-900 font-semibold">
                  {testimonial.name}
                </p>
                <div
                  className="flex mt-2"
                  aria-label={`Rating: ${testimonial.rating} out of 5`}
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
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
              </div>
            ))}
          </div>
        </div>
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
          aria-label="Previous testimonial"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
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
              className={`w-3 h-3 rounded-full focus:outline-none ${
                current === index ? "bg-green-600" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={current === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
