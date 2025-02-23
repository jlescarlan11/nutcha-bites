import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import backgroundImage from "../assets/nutchaOverview.webp";
import { useNavigate } from "react-router-dom";

// Modal component using React Portal with fallback and improved accessibility
const Modal = ({ onClose }) => {
  // Get the target container safely
  const [modalContainer, setModalContainer] = useState(null);

  useEffect(() => {
    const container = document.getElementById("modal-root") || document.body;
    setModalContainer(container);
  }, []);

  if (!modalContainer) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)]/30 to-transparent backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative bg-[var(--color-primary)] rounded-2xl shadow-2xl max-w-lg w-full p-6 mx-4 z-50 border border-[var(--color-tertiary)]/30 transition-transform duration-300 transform animate-modalIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-[var(--color-secondary)]/80">
            More About Our Journey
          </h3>
          <button
            onClick={onClose}
            className="text-4xl text-[var(--color-secondary)] bg-transparent/80 hover:text-[var(--color-accent)]/80 focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <p className="text-[var(--color-secondary)]/70 mb-6 text-justify">
          Our story is one of passion, innovation, and respect for the timeless
          traditions of Filipino cuisine, enriched with the artistry of Japanese
          matcha. From sourcing the finest ingredients to perfecting the
          delicate balance of flavors, every step of our process is a
          celebration of culinary craftsmanship. Dive deeper into the Nutcha
          Bites experience and discover the legacy of taste and innovation that
          defines us.
        </p>
      </div>
    </div>,
    modalContainer
  );
};

const Story = () => {
  const [showModal, setShowModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Throttle scroll updates using requestAnimationFrame for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset(window.pageYOffset);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Allow closing modal with Escape key for accessibility
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  // Dynamic background style with subtle parallax effect
  const backgroundStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPositionY: offset * 0.5,
  };

  return (
    <section
      id="our-vision"
      aria-label="Our Story section with background image"
      className="relative mt-24 bg-cover bg-center bg-scroll md:bg-fixed"
      style={backgroundStyles}
    >
      {/* Gradient overlay for improved contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-secondary)]/35 to-[var(--color-secondary)]/75 backdrop-blur-sm transition-opacity duration-500" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 md:py-24 text-center animate-fadeIn">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-primary)]/90 mb-4 sm:mb-6">
          Our Vision
        </h2>
        <p className="text-base sm:text-lg md:text-2xl text-[var(--color-primary)]/80 mb-6 sm:mb-8">
          Nutcha Bites is a fusion of Filipino tradition and Japanese
          innovation. Born from a passion for culinary artistry, we blend the
          rich heritage of Filipino bandi with the vibrant, earthy notes of
          matcha to create a snack that tells a story in every bite.
        </p>
        <figure className="max-w-xl mx-auto mb-8">
          <blockquote className="text-[var(--color-primary)]/70 italic border-l-4 pl-4 border-green-500">
            "Nutcha Bites bring together the soul of Filipino flavors and the
            spirit of Japanese matcha. Every bite is a journey through tradition
            and modern taste."
          </blockquote>
          <figcaption className="text-green-300 mt-4">
            - A Satisfied Customer
          </figcaption>
        </figure>
        <div className="flex flex-col sm:flex-row items-center gap-2 justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigate("/order")}
            className="px-6 py-3 bg-[var(--color-accent)]/50 text-[var(--color-primary)] rounded-full hover:bg-[var(--color-accent)]/60 transition-transform duration-300 focus:outline-none transform hover:scale-105"
          >
            Order Now
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-[var(--color-primary)]/90 text-[var(--color-accent)]/50 rounded-full hover:bg-[var(--color-primary)] transition-transform duration-300 focus:outline-none transform hover:scale-105"
          >
            Read More
          </button>
        </div>
      </div>

      {showModal && <Modal onClose={() => setShowModal(false)} />}

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
