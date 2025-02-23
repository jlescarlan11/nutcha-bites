// Story.jsx
import React, { useState } from "react";
import backgroundImage from "../assets/nutchaBackground.webp";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  return (
    <section
      id="our-vision"
      aria-label="Our Story section with background image"
      className="relative mt-24 bg-cover bg-center bg-scroll md:bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Enhanced overlay with gradient for improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.35)] to-[rgba(0,0,0,0.75)] backdrop-blur-sm transition-opacity duration-500" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-24 text-center animate-fadeIn">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-[var(--color-primary)] mb-4 sm:mb-6">
          Our Vision
        </h2>
        <p className="text-base sm:text-lg md:text-2xl text-white/95 dark:text-[var(--color-primary)]/95 mb-6 sm:mb-8">
          Nutcha Bites is a fusion of Filipino tradition and Japanese
          innovation. Born from a passion for culinary artistry, we blend the
          rich heritage of Filipino bandi with the vibrant, earthy notes of
          matcha to create a snack that tells a story in every bite.
        </p>
        <figure className="max-w-xl mx-auto mb-8">
          <blockquote className="text-white/80 italic border-l-4 pl-4 border-green-500">
            "Nutcha Bites bring together the soul of Filipino flavors and the
            spirit of Japanese matcha. Every bite is a journey through tradition
            and modern taste."
          </blockquote>
          <figcaption className="text-green-300 mt-4">
            - A Satisfied Customer
          </figcaption>
        </figure>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate("/order")}
            className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 transform hover:scale-105"
          >
            Order Now
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-white text-green-500 rounded-full hover:bg-gray-100 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 transform hover:scale-105"
          >
            Read More
          </button>
        </div>
      </div>

      {/* Modal for additional story details */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-6 mx-4 z-50 border border-green-300 transition-transform duration-300 transform animate-modalIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-2xl text-[var(--color-secondary)] hover:text-[var(--color-accent)] focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              More About Our Journey
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Our story is one of passion, innovation, and respect for the
              timeless traditions of Filipino cuisine, enriched with the
              artistry of Japanese matcha. From sourcing the finest ingredients
              to perfecting the delicate balance of flavors, every step of our
              process is a celebration of culinary craftsmanship. Dive deeper
              into the Nutcha Bites experience and discover the legacy of taste
              and innovation that defines us.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Close
              </button>
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </section>
  );
};

export default Story;
