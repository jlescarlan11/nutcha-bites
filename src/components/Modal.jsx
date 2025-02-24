import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ onClose }) => {
  const [modalContainer, setModalContainer] = useState(null);
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Revised interactive chapters with a detailed and professional narrative
  const chapters = [
    {
      id: 1,
      title: "Chapter 1: A Legacy Begins",
      content:
        "Our journey began in the heart of the Philippines, where a family legacy in culinary arts sparked a passion for preserving time-honored recipes. Founded with humble beginnings, every dish was crafted with care and an unwavering commitment to quality.",
    },
    {
      id: 2,
      title: "Chapter 2: Bridging Cultures",
      content:
        "As we evolved, we embraced the distinctive flavors of Japanese matcha, merging them with cherished Filipino traditions. This cultural fusion was not without its challenges, yet it paved the way for innovative culinary techniques that set us apart.",
    },
    {
      id: 3,
      title: "Chapter 3: A Commitment to Excellence",
      content:
        "Today, our brand stands as a testament to relentless dedication and excellence. We honor our rich heritage while pioneering new culinary frontiers, ensuring every product reflects our legacy, integrity, and passion for the art of flavor.",
    },
  ];
  const [currentChapter, setCurrentChapter] = useState(0);

  // Touch event state for swipe detection
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const diff = touchStartX - touchEndX;
    if (diff > 50 && currentChapter < chapters.length - 1) {
      // Swipe left: next chapter
      setCurrentChapter(currentChapter + 1);
    } else if (diff < -50 && currentChapter > 0) {
      // Swipe right: previous chapter
      setCurrentChapter(currentChapter - 1);
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleNextChapter = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapter > 0) {
      setCurrentChapter(currentChapter - 1);
    }
  };

  useEffect(() => {
    // Set the container to document.body so that the modal is appended there
    setModalContainer(document.body);
  }, []);

  useEffect(() => {
    previouslyFocusedElement.current = document.activeElement;
    if (modalRef.current) modalRef.current.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [onClose]);

  if (!modalContainer) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-gradient-to-br from-[var(--color-secondary)]/30 to-transparent backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div
        ref={modalRef}
        tabIndex="-1"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative bg-[var(--color-primary)] rounded-2xl shadow-2xl max-w-lg w-full p-6 mx-4 z-50 border border-[var(--color-tertiary)]/30 animate-modalIn"
      >
        <div className="flex justify-between items-center mb-4">
          <h3
            id="modal-title"
            className="text-2xl font-bold text-[var(--color-secondary)]/80"
          >
            Our Journey
          </h3>
          <button
            onClick={onClose}
            className="text-4xl text-[var(--color-secondary)] bg-transparent hover:text-[var(--color-accent)] focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          <h4 className="text-xl font-semibold text-[var(--color-accent)] mb-2">
            {chapters[currentChapter].title}
          </h4>
          <p className="text-[var(--color-secondary)]/80">
            {chapters[currentChapter].content}
          </p>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevChapter}
              disabled={currentChapter === 0}
              className="px-4 py-2 bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]/80 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={handleNextChapter}
              disabled={currentChapter === chapters.length - 1}
              className="px-4 py-2 bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]/80 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>,
    modalContainer
  );
};

export default Modal;
