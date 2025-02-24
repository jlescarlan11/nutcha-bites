import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, title, description, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
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
        // Check if modalRef.current exists before removing the event listener.
        if (modalRef.current) {
          modalRef.current.removeEventListener("keydown", handleKeyDown);
        }
        previouslyFocusedElement && previouslyFocusedElement.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      // Here we set an extremely high z-index to ensure the modal is on top.
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white p-6 rounded shadow-xl max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="modal-title" className="text-2xl font-bold">
          {title}
        </h2>
        <p id="modal-description" className="mt-2">
          {description}
        </p>
        <div className="mt-4">{children}</div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
