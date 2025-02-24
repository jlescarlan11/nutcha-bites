import React, { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * BenefitItem Component
 *
 * Displays a single benefit item with a checkmark and a fade-in slide animation.
 * The checkmark is styled using the accent color.
 *
 * @param {Object} props
 * @param {string} props.benefit - The benefit text to display.
 */
const BenefitItem = ({ benefit }) => {
  const shouldReduceMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.li
      className="flex items-center text-[var(--color-secondary)]/70"
      initial="hidden"
      animate="visible"
      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
      variants={variants}
    >
      <span style={{ marginRight: "0.5rem", color: "var(--color-accent)" }}>
        ✅
      </span>
      <span>{benefit}</span>
    </motion.li>
  );
};

export default memo(BenefitItem);
