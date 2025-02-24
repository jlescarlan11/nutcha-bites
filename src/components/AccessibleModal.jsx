// AccessibleModal.jsx
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: var(--color-primary);
  color: var(--color-secondary);
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 500px;
  position: relative;
  animation: ${fadeIn} 0.3s ease forwards;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-secondary);
  &:hover {
    color: var(--color-accent);
  }
`;

// New styled components for spacing
const ModalHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: semibold;
  color: var(--color-secondary-90);
  margin-bottom: 0.5rem;
`;

const ModalDescription = styled.p`
  margin-bottom: 1.5rem;
  color: var(--color-secondary-80);
`;

const ModalBody = styled.div``;

/**
 * AccessibleModal Component
 *
 * Provides a fully accessible modal dialog with focus trapping and Escape key support.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.onClose - Callback to close the modal.
 * @param {string} props.title - Modal title.
 * @param {string} props.description - Modal description.
 * @param {React.ReactNode} props.children - Modal content.
 */
const AccessibleModal = ({ isOpen, onClose, title, description, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocusedElement = document.activeElement;
    modalRef.current && modalRef.current.focus();

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
      modalRef.current &&
        modalRef.current.removeEventListener("keydown", handleKeyDown);
      previouslyFocusedElement && previouslyFocusedElement.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <ModalOverlay onClick={onClose} role="presentation">
      <ModalContent
        ref={modalRef}
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessible-modal-title"
        aria-describedby="accessible-modal-description"
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton onClick={onClose} aria-label="Close modal">
          &times;
        </CloseButton>
        <ModalHeader id="accessible-modal-title">{title}</ModalHeader>
        <ModalDescription id="accessible-modal-description">
          {description}
        </ModalDescription>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>,
    document.body
  );
};

export default AccessibleModal;
