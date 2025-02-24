import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AtomicModal from "./AtomicModal";
import AtomicTypewriter from "./AtomicTypewriter";
import AtomicImage from "./AtomicImage";
import BenefitItem from "./BenefitItem";
import nutcha from "../assets/nutchaOverview.webp";

/**
 * Overview Component
 *
 * Presents an overview section with an adaptive layout, fluid typography,
 * and dynamic spacing. Applies the color scheme:
 * - Background: var(--color-primary)
 * - Text: var(--color-secondary)
 *
 * Memoized event handlers and computed values optimize performance.
 */
const Overview = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  const benefits = useMemo(
    () => [
      "Irresistibly crunchy texture",
      "Unique fusion of matcha and muscovado flavors",
      "Honors rich cultural heritage with a modern twist",
    ],
    []
  );

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      aria-label="Overview Section"
      className="mx-auto px-4 py-6 min-h-dvh flex items-center md:py-12 lg:py-16 max-w-6xl bg-[var(--color-primary)] text-[var(--color-secondary)]/80"
      initial="hidden"
      animate="visible"
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
      variants={sectionVariants}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        {/* Image Section */}
        <div className="flex justify-center">
          <AtomicImage
            src={nutcha}
            alt="Delicious Nutcha Bites showcasing a modern twist on traditional flavors"
            onClick={openModal}
            className="w-full max-w-xs rounded-lg shadow-2xl"
          />
        </div>
        {/* Content Section */}
        <div className="space-y-4 py-4">
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.5rem, 5vw, 2.5rem)",
              lineHeight: 1.2,
            }}
          >
            When Tradition Meets{" "}
            <span aria-live="polite">
              <AtomicTypewriter
                strings={["Innovation", "Modernization", "Transformation"]}
              />
            </span>
          </h2>
          <ul style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)" }}>
            {benefits.map((benefit, idx) => (
              <BenefitItem key={idx} benefit={benefit} />
            ))}
          </ul>
        </div>
      </div>
      <AtomicModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Enlarged Nutcha Bites"
        description="A closer look at our delicious Nutcha Bites"
      >
        <AtomicImage
          src={nutcha}
          alt="Enlarged view of Nutcha Bites"
          className="max-w-full rounded shadow-2xl"
        />
      </AtomicModal>
    </motion.section>
  );
};

export default Overview;
