// NewsletterSignup.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon, LoaderIcon } from "lucide-react";
import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Define vouchers mapping.
const vouchers = [
  {
    reward: "10% Off",
    code: "NEWSLETTER10",
    description: "10% Off Newsletter Signup",
  },
  {
    reward: "Free Shipping",
    code: "FREESHIP",
    description: "Free Shipping Voucher",
  },
  {
    reward: "20% Off",
    code: "NEWSLETTER20",
    description: "20% Off Special Offer",
  },
  {
    reward: "No Prize",
    code: "NONE",
    description: "No Prize Voucher",
  },
];

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
const Confetti = () => (
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
          animate={{ y: [0, 100], opacity: [1, 0] }}
          transition={{ duration: 2, delay: i * 0.1, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  </AnimatePresence>
);

// ProgressBar showing community growth.
const ProgressBar = ({ progress }) => (
  <div className="w-full max-w-md mx-auto mb-4 text-xs text-[var(--color-secondary)]/70">
    <div className=" mb-1">
      Join our community! {progress}% of our goal (100 subscribers) reached.
    </div>
    <div className="w-full bg-[var(--color-secondary)]/20 rounded-full h-2">
      <motion.div
        className="bg-[var(--color-accent)] h-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />
    </div>
  </div>
);

// Animation variants.
const pulseVariant = {
  pulse: {
    scale: [1, 1.05, 1],
    transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
  },
};

const flipVariant = {
  initial: { rotateY: 90, opacity: 0 },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// SpinWheelModal simulating a roulette wheel with interactive effects.
const SpinWheelModal = ({ onClose }) => {
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
    // Set focus when modal opens.
    modalRef.current.focus();
    const liveRegion = document.getElementById("live-announcement");
    if (liveRegion)
      liveRegion.textContent =
        "Reward Roulette modal opened. Use Escape key to close.";
  }, []);

  // Handle keyboard events for modal.
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  const spinWheel = () => {
    setSpinning(true);
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setTimeout(() => {
      setSelectedReward(randomReward);
      setSpinning(false);
    }, 2000);
  };

  const handleClose = () => {
    const liveRegion = document.getElementById("live-announcement");
    if (liveRegion) liveRegion.textContent = "Reward Roulette modal closed.";
    onClose(selectedReward);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-secondary)]/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="spinWheelModalTitle"
      aria-describedby="spinWheelModalDesc"
      tabIndex={0}
      ref={modalRef}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden accessible title and description */}
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
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="relative mx-auto mb-4 w-48 h-48 rounded-full border-4 border-[var(--color-accent)]/70 flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 flex items-center justify-center text-[var(--color-secondary)]/70 text-2xl font-bold"
            animate={{ rotate: spinning ? 1080 : 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
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
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 text-xs text-[var(--color-secondary)]/50">
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
              transition: { ease: "easeOut", duration: 0.3 },
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
  const { email, setEmail, isValid, handleChange } = useEmailValidation();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [recentSignups, setRecentSignups] = useState(50); // initial value
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [reward, setReward] = useState("");
  const [shakeInput, setShakeInput] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const subscriberGoal = 100;
  const shareTimeoutRef = useRef(null);
  const liveRegionRef = useRef(null);
  const navigate = useNavigate();

  // Update live region messaging when status changes.
  useEffect(() => {
    if (liveRegionRef.current && status) {
      const announcement =
        status === "success"
          ? "Subscription successful. Reward roulette available."
          : "Error: " + message;
      liveRegionRef.current.textContent = announcement;
    }
  }, [status, message]);

  // Fetch subscriber count from API with fallback simulation.
  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch("/api/subscriberCount");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const count = data.subscriberCount;
        setRecentSignups(count);
        setProgress(Math.min(100, Math.floor((count / subscriberGoal) * 100)));
      } catch (error) {
        console.error("Failed to fetch subscriber count:", error);
        // Fallback: simulate incremental increases.
        setRecentSignups((prev) => {
          const newCount = prev + Math.floor(Math.random() * 3);
          setProgress(
            Math.min(100, Math.floor((newCount / subscriberGoal) * 100))
          );
          return newCount;
        });
      }
    };

    fetchSubscriberCount();
    const intervalId = setInterval(fetchSubscriberCount, 10000);
    return () => clearInterval(intervalId);
  }, [subscriberGoal]);

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

    // Safely parse stored emails from localStorage.
    let storedEmails = [];
    try {
      const parsed = JSON.parse(localStorage.getItem("newsletterSubscribed"));
      if (Array.isArray(parsed)) {
        storedEmails = parsed;
      }
    } catch (err) {
      storedEmails = [];
    }

    // Check if the email is already subscribed.
    if (storedEmails.includes(email)) {
      setMessage("You have already subscribed.");
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      // Simulated API call.
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add the new email to the array and update localStorage.
      storedEmails.push(email);
      localStorage.setItem(
        "newsletterSubscribed",
        JSON.stringify(storedEmails)
      );

      // Clear the input immediately.
      setEmail("");

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

  // When the spin modal closes, check for a matching voucher and save it.
  const handleModalClose = (selectedReward) => {
    const voucher = vouchers.find(
      (v) => v.reward.toLowerCase() === selectedReward.toLowerCase()
    );
    if (voucher) {
      localStorage.setItem("newsletterVoucher", JSON.stringify(voucher));
      setReward(voucher); // Now reward is an object with both reward and code.
    } else {
      setReward({ reward: selectedReward, code: "N/A" });
    }
    setShowSpinWheel(false);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 5000);
  };

  return (
    <section
      className="relative mt-32 bg-[var(--color-primary)] border border[var(--color-secondary)]  py-8 md:py-12 px-4 md:px-6 shadow-lg rounded-t-lg overflow-hidden"
      aria-live="polite"
    >
      {/* Live region for accessibility announcements */}
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
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold mb-4 text-[var(--color-secondary)]/90"
        >
          🍵 Join Our Matcha Revolution
        </motion.h2>
        <p className="mb-8 text-base md:text-lg text-[var(--color-secondary)]/80">
          Subscribe to receive exclusive recipes, updates, and rewards directly
          in your inbox.
        </p>
        <ProgressBar progress={progress} />
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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
              className={`p-3 pr-10 rounded-md w-full sm:w-80 md:w-96 border border-[var(--color-secondary)]/40 text-[var(--color-secondary)]/90 focus:ring-2 outline-none transition ${
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
            className="bg-[var(--color-accent)]/90 text-[var(--color-primary)]/90 font-semibold p-3 rounded-md hover:bg-[var(--color-accent)]/80 transition flex items-center ml-0 sm:ml-4 mt-4 sm:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            aria-label="Submit your email to subscribe and spin the reward roulette"
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
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
                  ? "text-[var(--color-accent)]/70"
                  : "text-[var(--color-tertiary)]/50"
              }`}
              role="alert"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {status === "success" ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
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
            className="mt-6 p-4 bg-[var(--color-secondary)]/10 text-[var(--color-accent)] border border-[var(--color-tertiary)]/10 rounded-md shadow-md flex flex-col items-center justify-center"
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
              🎁 {reward.reward} - use {reward.code} to redeem the reward
            </motion.span>
            <motion.button
              onClick={() => navigate("/order")}
              whileHover={{
                scale: 1.15,
                transition: { ease: "easeOut", duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-[var(--color-accent)]/90 text-[var(--color-primary)]/90 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
              aria-label="Proceed to shop using your reward"
            >
              Shop Now
            </motion.button>
            <motion.div
              className="text-xs text-[var(--color-secondary)]/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Congratulations! Enjoy your reward.
            </motion.div>
          </motion.div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 gap-2 items-stretch">
          <button
            onClick={handleGoogleSubscribe}
            className="flex items-center justify-center px-4 py-2 border border-[var(--color-tertiary)]/10 bg-[var(--color-secondary)]/10 rounded-md dark:hover:bg-[var(--color-accent)]/10 transition"
            aria-label="Subscribe with Google"
          >
            <FaGoogle size={20} className="mr-2" />
            Subscribe with Google
          </button>
          <button
            onClick={handleFacebookSubscribe}
            className="flex items-center justify-center px-4 py-2 border border-[var(--color-tertiary)]/10 bg-[var(--color-secondary)]/10 rounded-md dark:hover:bg-[var(--color-accent)]/10 transition"
            aria-label="Subscribe with Facebook"
          >
            <FaFacebook size={20} className="mr-2" />
            Subscribe with Facebook
          </button>
          <button
            onClick={handleInstagramShare}
            className="flex items-center justify-center px-4 py-2 border border-[var(--color-tertiary)]/10 bg-[var(--color-secondary)]/10 rounded-md dark:hover:bg-[var(--color-accent)]/10 transition"
            aria-label="Subscribe with Instagram"
          >
            <FaInstagram size={20} className="mr-2" />
            Subscribe with Instagram
          </button>
        </div>
        {shareMessage && (
          <div
            className="mt-4 text-xs text-[var(--color-secondary)]/30"
            role="status"
          >
            {shareMessage}
          </div>
        )}
        <p className="mt-6 text-sm text-[var(--color-secondary)]/70">
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
