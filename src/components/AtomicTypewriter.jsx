import React, { useState, memo } from "react";
import Typewriter from "typewriter-effect";
import { motion, useReducedMotion } from "framer-motion";

/**
 * AtomicTypewriter Component
 *
 * Displays a dynamic typewriter effect for an array of strings with symbol controls for
 * pause/resume, slow down, and speed up. It uses the following control symbols:
 * - Pause/Resume: ⏸ / ▶
 * - Slow Down: ⏪
 * - Speed Up: ⏩
 *
 * Color scheme used:
 * --color-primary: background,
 * --color-secondary: text,
 * --color-tertiary: button backgrounds,
 * --color-accent: hover accents.
 *
 * @param {Object} props
 * @param {string[]} props.strings - Array of strings to display.
 * @param {boolean} [props.loop=true] - Whether the typewriter should loop.
 */
const AtomicTypewriter = ({ strings, loop = true }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [restartKey, setRestartKey] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const togglePause = () => {
    setIsPaused((prev) => !prev);
    setRestartKey((prev) => prev + 1);
  };

  const slowDown = () => setSpeed((prev) => prev + 20);
  const speedUp = () => setSpeed((prev) => Math.max(prev - 20, 10));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      <div aria-live="polite" aria-atomic="true">
        <Typewriter
          key={restartKey}
          options={{
            strings,
            autoStart: !isPaused,
            loop,
            delay: speed,
          }}
          onInit={(typewriter) => {
            if (!isPaused) typewriter.start();
          }}
        />
      </div>
      <div className="mt-2 mb-6 flex gap-2 text-sm space-x-2">
        <button
          onClick={slowDown}
          className="bg-[var(--color-accent)]/20 text-[var(--color-secondary)]/70 border-[var(--color-secondary)]/10 py-1 px-2 rounded-md border cursor-pointer hover:scale-105 transition-all duration-300"
          aria-label="Slow down typewriter"
        >
          ⏪
        </button>
        <button
          onClick={togglePause}
          className="bg-[var(--color-accent)]/20 text-[var(--color-secondary)]/70 border-[var(--color-secondary)]/10 py-1 px-2 rounded-md border cursor-pointer hover:scale-105 transition-all duration-300"
          aria-label={isPaused ? "Resume typewriter" : "Pause typewriter"}
        >
          {isPaused ? "▶" : "⏸"}
        </button>
        <button
          onClick={speedUp}
          className="bg-[var(--color-accent)]/20 text-[var(--color-secondary)]/70 border-[var(--color-secondary)]/10 py-1 px-2 rounded-md border cursor-pointer hover:scale-105 transition-all duration-300"
          aria-label="Speed up typewriter"
        >
          ⏩
        </button>
      </div>
    </motion.div>
  );
};

export default memo(AtomicTypewriter);
