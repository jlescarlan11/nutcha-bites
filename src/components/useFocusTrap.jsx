// src/components/useFocusTrap.js
import { useEffect } from "react";

export const useFocusTrap = (ref, isActive) => {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElementsSelector =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = ref.current.querySelectorAll(
      focusableElementsSelector
    );
    if (focusableElements.length === 0) return;
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          // If Shift+Tab is pressed on the first element, move focus to the last element.
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // If Tab is pressed on the last element, move focus to the first element.
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    ref.current.addEventListener("keydown", handleKeyDown);
    // Focus the first element when the modal opens
    firstElement.focus();

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [ref, isActive]);
};
