import React, { useEffect, useRef, memo } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * AtomicModal Component
 *
 * Renders a modal dialog using React Portal with synchronized animations.
 * Applies the color scheme: modal content uses var(--color-primary) for background
 * and var(--color-secondary) for text.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls whether the modal is visible.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {string} props.title - Title text for the modal.
 * @param {string} props.description - Descriptive text for the modal.
 * @param {React.ReactNode} props.children - Modal content.
 */
const AtomicModal = ({ isOpen, onClose, title, description, children }) => {
  const modalRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocusedElement = document.activeElement;
    modalRef.current.focus();

    const focusableSelectors =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex]:not([tabindex="-1"])';
    const focusableElements =
      modalRef.current.querySelectorAll(focusableSelectors);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };

    modalRef.current.addEventListener("keydown", handleKeyDown);

    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener("keydown", handleKeyDown);
      }
      previouslyFocusedElement && previouslyFocusedElement.focus();
    };
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
        >
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            className="p-6 rounded shadow-xl max-w-md mx-auto bg-[var(--color-primary)] "
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <h2
              id="modal-title"
              className="text-2xl font-bold text-[var(--color-secondary)]/90"
            >
              {title}
            </h2>
            <p
              id="modal-description"
              className="mt-2 text-[var(--color-secondary)]/80"
            >
              {description}
            </p>
            <div className="mt-4">{children}</div>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-[var(--color-accent)]/20  border  border-[var(--color-secondary)]/10 text-[var(--color-secondary)]/80 rounded cursor-pointer"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default memo(AtomicModal);
