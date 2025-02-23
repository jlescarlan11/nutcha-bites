//NewsletterSignup.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, LoaderIcon } from "lucide-react";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Hook to manage email state and validation.
const useEmailValidation = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setIsValid(validateEmail(e.target.value) || e.target.value === "");
  };

  return { email, setEmail, isValid, handleChange };
};

// Confetti component for celebration.
const Confetti = () => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <AnimatePresence>
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-yellow-300 rounded-full"
            style={{
              width: 8,
              height: 8,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, shouldReduceMotion ? 10 : 100],
              opacity: [1, 0],
            }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 2,
              delay: i * (shouldReduceMotion ? 0.05 : 0.1),
              ease: shouldReduceMotion ? "linear" : "easeOut",
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

// ProgressBar showing community growth.
const ProgressBar = ({ progress }) => {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="w-full max-w-md mx-auto mb-4 text-[var(--color-primary)]/70">
      <div className="text-sm mb-1">
        Join our community! {progress}% of our goal (100 subscribers) reached.
      </div>
      <div className="w-full bg-[var(--color-secondary)]/20 rounded-full h-2">
        <motion.div
          className="bg-green-700 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : 1.5,
            ease: shouldReduceMotion ? "linear" : "easeOut",
          }}
        />
      </div>
    </div>
  );
};

// SpinWheelModal simulating a roulette wheel with enhanced interactive effects.
const SpinWheelModal = ({ onClose }) => {
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef(null);
  const [spinning, setSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState("");

  const rewards = [
    "10% Off",
    "Free Shipping",
    "5% Off",
    "No Prize",
    "20% Off",
    "Free Gift",
  ];

  useEffect(() => {
    modalRef.current.focus();
    const liveRegion = document.getElementById("live-announcement");
    if (liveRegion)
      liveRegion.textContent =
        "Reward Roulette modal opened. Use Escape key to close.";
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const spinWheel = () => {
    setSpinning(true);
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setTimeout(
      () => {
        setSelectedReward(randomReward);
        setSpinning(false);
      },
      shouldReduceMotion ? 100 : 2000
    );
  };

  const handleClose = () => {
    const liveRegion = document.getElementById("live-announcement");
    if (liveRegion) liveRegion.textContent = "Reward Roulette modal closed.";
    onClose(selectedReward);
  };

  // Define flip variant inside the component
  const flipVariant = {
    initial: { rotateY: 90, opacity: 0 },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: shouldReduceMotion ? "linear" : "easeOut",
      },
    },
  };

  // Define pulse variant inside the component
  const pulseVariant = {
    pulse: {
      scale: [1, shouldReduceMotion ? 1 : 1.05, 1],
      transition: {
        duration: shouldReduceMotion ? 0.1 : 1,
        repeat: Infinity,
        ease: shouldReduceMotion ? "linear" : "easeInOut",
      },
    },
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[var(--color-secondary)]/30 to-transparent backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spinWheelModalTitle"
      aria-describedby="spinWheelModalDesc"
      tabIndex={0}
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      <h3 id="spinWheelModalTitle" className="sr-only">
        Reward Roulette
      </h3>
      <p id="spinWheelModalDesc" className="sr-only">
        Spin the roulette to win a reward. Press Escape to close the modal.
      </p>
      <motion.div
        className="bg-[var(--color-primary)] p-8 rounded-lg shadow-xs text-center relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          boxShadow: "0 0 5px rgba(0,255,0,0.8)",
        }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          duration: shouldReduceMotion ? 0.1 : 0.8,
          ease: shouldReduceMotion ? "linear" : "easeOut",
        }}
      >
        <div className="relative mx-auto mb-4 w-48 h-48 rounded-full border-4 border-[var(--color-accent)]/70 flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-[var(--color-secondary)]/70 text-2xl font-bold"
            animate={{ rotate: spinning ? 1080 : 0 }}
            transition={{
              duration: shouldReduceMotion ? 0.1 : 2,
              ease: shouldReduceMotion ? "linear" : "easeOut",
            }}
          >
            {spinning ? (
              "Spinning..."
            ) : selectedReward ? (
              <motion.span
                variants={flipVariant}
                initial="initial"
                animate="animate"
                className="inline-block"
              >
                <motion.span variants={pulseVariant} animate="pulse">
                  {selectedReward}
                </motion.span>
              </motion.span>
            ) : (
              "?"
            )}
          </motion.div>
          {!spinning && !selectedReward && (
            <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[var(--color-secondary)]/50">
              {[
                "10% Off",
                "Free Shipping",
                "5% Off",
                "No Prize",
                "20% Off",
                "Free Gift",
                "Try Again",
                "Bonus",
                "Extra 5% Off",
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center border border-dashed border-[var(--color-secondary)]-200"
                >
                  {text}
                </div>
              ))}
            </div>
          )}
        </div>
        {!spinning && !selectedReward && (
          <motion.button
            onClick={spinWheel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 px-4 py-2 bg-[var(--color-accent)]/60 text-[var(--color-primary)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40"
            aria-label="Spin the roulette"
          >
            Spin Roulette
          </motion.button>
        )}
        {selectedReward && (
          <motion.button
            onClick={handleClose}
            whileHover={{
              scale: 1.1,
              transition: {
                ease: shouldReduceMotion ? "linear" : "easeOut",
                duration: shouldReduceMotion ? 0.1 : 0.3,
              },
            }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 px-4 py-2 bg-[var(--color-accent)]/60 text-[var(--color-primary)]/90 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            aria-label="Claim your reward"
          >
            Claim Reward
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

const shakeVariant = {
  shake: { x: [0, -5, 5, -5, 5, 0], transition: { duration: 0.4 } },
  normal: { x: 0 },
};

const NewsletterSignup = () => {
  const shouldReduceMotion = useReducedMotion();
  const { email, setEmail, isValid, handleChange } = useEmailValidation();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recentSignups, setRecentSignups] = useState(
    Math.floor(Math.random() * 50) + 50
  );
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [reward, setReward] = useState("");
  const [shakeInput, setShakeInput] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const subscriberGoal = 100;
  const shareTimeoutRef = useRef(null);
  const liveRegionRef = useRef(null);
  const navigate = useNavigate();

  // Define animation variants inside the component so we can use shouldReduceMotion
  const pulseVariant = {
    pulse: {
      scale: [1, shouldReduceMotion ? 1 : 1.05, 1],
      transition: {
        duration: shouldReduceMotion ? 0.1 : 1,
        repeat: Infinity,
        ease: shouldReduceMotion ? "linear" : "easeInOut",
      },
    },
  };

  const flipVariant = {
    initial: { rotateY: 90, opacity: 0 },
    animate: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: shouldReduceMotion ? "linear" : "easeOut",
      },
    },
  };

  useEffect(() => {
    if (liveRegionRef.current && status) {
      const announcement =
        status === "success"
          ? "Subscription successful. Reward roulette available."
          : "Error: " + message;
      liveRegionRef.current.textContent = announcement;
    }
  }, [status, message]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRecentSignups((prev) => {
        const newCount = prev + Math.floor(Math.random() * 3);
        setProgress(
          Math.min(100, Math.floor((newCount / subscriberGoal) * 100))
        );
        return newCount;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    if (!isValid || !email) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 400);
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, shouldReduceMotion ? 100 : 1500)
      ); // Simulated API call
      setMessage("🎉 You're in! Get ready to spin the roulette for a reward.");
      setStatus("success");
      setSubmitted(true);
      setShowSpinWheel(true);
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const updateShareMessage = (platform) => {
    setShareMessage(`Subscribed on ${platform}!`);
    if (shareTimeoutRef.current) clearTimeout(shareTimeoutRef.current);
    shareTimeoutRef.current = setTimeout(() => {
      setShareMessage("");
      shareTimeoutRef.current = null;
    }, 2000);
  };

  const handleGoogleSubscribe = () => updateShareMessage("Google");
  const handleFacebookSubscribe = () => updateShareMessage("Facebook");
  const handleInstagramShare = () => updateShareMessage("Instagram");

  const handleModalClose = (selectedReward) => {
    setReward(selectedReward);
    localStorage.setItem("newsletterReward", selectedReward);
    setShowSpinWheel(false);
    setTimeout(
      () => {
        setSubmitted(false);
        setEmail("");
      },
      shouldReduceMotion ? 100 : 5000
    );
  };

  return (
    <section
      className="relative mt-24 md:mt-32 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] py-8 md:py-12 px-4 md:px-6 shadow-lg rounded-t-lg overflow-hidden"
      aria-live="polite"
    >
      {/* Inline style to respect prefers-reduced-motion globally */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
      <div
        id="live-announcement"
        ref={liveRegionRef}
        className="sr-only"
        aria-live="assertive"
      />
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.1 : 0.5,
            ease: shouldReduceMotion ? "linear" : "easeOut",
          }}
          className="text-3xl md:text-4xl font-extrabold mb-4 text-[var(--color-primary)]/90"
        >
          🍵 Join Our Matcha Revolution
        </motion.h2>
        <p className="mb-8 text-base md:text-lg text-[var(--color-primary)]/90">
          Subscribe to receive exclusive recipes, updates, and rewards directly
          in your inbox.
        </p>
        <ProgressBar progress={progress} />
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: shouldReduceMotion ? 0.1 : 0.3 }}
          aria-label="Newsletter Signup Form"
        >
          <div className="relative w-full sm:w-auto">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              aria-invalid={!isValid}
              aria-describedby={!isValid ? "email-error" : undefined}
              aria-label="Email address input field"
              className={`p-3 pr-10 rounded-md w-full sm:w-80 md:w-96 border border-[var(--color-primary)]/40 text-[var(--color-primary)]/90 focus:ring-2 outline-none transition ${
                isValid
                  ? "border-[var(--color-accent)]/30 focus:ring-[var(--color-accent)]/40"
                  : "border-red-300 focus:ring-red-400"
              }`}
              variants={shakeVariant}
              animate={shakeInput ? "shake" : "normal"}
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--color-primary)]/80 text-[var(--color-secondary)]/70 font-semibold p-3 rounded-md hover:bg-[var(--color-primary)]/60 transition flex items-center ml-0 sm:ml-4 mt-4 sm:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            aria-label="Submit your email to subscribe and spin the reward roulette"
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: shouldReduceMotion ? 0.1 : 1,
                  ease: "linear",
                }}
              >
                <LoaderIcon size={18} />
              </motion.span>
            ) : (
              "Subscribe & Spin!"
            )}
          </motion.button>
        </motion.form>
        <AnimatePresence>
          {message && (
            <motion.div
              className={`mt-4 text-lg flex items-center justify-center ${
                status === "success"
                  ? "text-[var(--color-primary)]/60"
                  : "text-red-300"
              }`}
              role="alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{
                duration: shouldReduceMotion ? 0.1 : 0.4,
                ease: shouldReduceMotion ? "linear" : "easeOut",
              }}
            >
              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: shouldReduceMotion ? 100 : 300,
                  }}
                  className="mr-2"
                >
                  <CheckCircleIcon size={20} />
                </motion.div>
              ) : (
                <XCircleIcon className="mr-2" size={20} />
              )}
              <span id={!isValid ? "email-error" : undefined}>{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
        {reward && (
          <motion.div
            className="mt-6 p-4 bg-[var(--color-secondary)]/20 text-green-300 rounded-md shadow-md flex flex-col items-center justify-center"
            variants={flipVariant}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.span
              className="text-xl font-bold mb-2"
              variants={pulseVariant}
              animate="pulse"
            >
              🎁 {reward}
            </motion.span>
            <motion.button
              onClick={() => navigate("/order")}
              whileHover={{
                scale: 1.15,
                transition: {
                  ease: shouldReduceMotion ? "linear" : "easeOut",
                  duration: shouldReduceMotion ? 0.1 : 0.3,
                },
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-green-600 text-[var(--color-primary)]/90 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
              aria-label="Proceed to shop using your reward"
            >
              Shop Now
            </motion.button>
            <motion.div
              className="text-sm text-blue-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: shouldReduceMotion ? 0.1 : 0.5 }}
            >
              Congratulations! Enjoy your reward.
            </motion.div>
          </motion.div>
        )}
        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 gap-2 items-stretch">
          <button
            onClick={handleGoogleSubscribe}
            className="flex items-center justify-center px-4 py-2 border border-[var(--color-secondary)]/10 rounded-md dark:hover:bg-[var(--color-secondary)]/30 transition"
            aria-label="Subscribe with Google"
          >
            <FaGoogle size={20} className="mr-2" />
            Subscribe with Google
          </button>
          <button
            onClick={handleFacebookSubscribe}
            className="flex items-center flex-grow justify-center px-4 py-2 border border-[var(--color-secondary)]/10 rounded-md dark:hover:bg-[var(--color-secondary)]/30 transition"
            aria-label="Subscribe with Facebook"
          >
            <FaFacebook size={20} className="mr-2" />
            Subscribe with Facebook
          </button>
          <button
            onClick={handleInstagramShare}
            className="flex items-center flex-grow justify-center px-4 py-2 border border-[var(--color-secondary)]/10 rounded-md dark:hover:bg-[var(--color-secondary)]/30 transition"
            aria-label="Subscribe with Instagram"
          >
            <FaInstagram size={20} className="mr-2" />
            Subscribe with Instagram
          </button>
        </div>
        {shareMessage && (
          <div
            className="mt-4 text-sm text-[var(--color-primary)]/30"
            role="status"
          >
            {shareMessage}
          </div>
        )}
        <p className="mt-6 text-sm text-[var(--color-primary)]/50">
          🔥 {recentSignups}+ people joined recently! Don’t miss out.
        </p>
      </div>
      <AnimatePresence>
        {showSpinWheel && <SpinWheelModal onClose={handleModalClose} />}
      </AnimatePresence>
      {submitted && status === "success" && <Confetti />}
    </section>
  );
};

export default NewsletterSignup;
