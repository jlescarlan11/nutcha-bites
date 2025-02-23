// NewsletterSignup.jsx
import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, LoaderIcon, XIcon } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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

const NewsletterSignup = () => {
  const { email, setEmail, isValid, handleChange } = useEmailValidation();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success" or "error"
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setStatus("");

    if (!isValid || !email) {
      setMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API request
      setMessage("🎉 Thank you for joining our Matcha Revolution!");
      setStatus("success");
      setSubmitted(true);
      // Optionally trigger confetti animation here
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
      }, 3000);
    } catch (error) {
      setMessage("❌ Something went wrong. Please try again.");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubscribe = () => {
    alert("Google subscription simulated!");
  };

  return (
    <section className="relative mt-16 md:mt-32 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] text-[var(--color-primary)] py-8 md:py-12 px-4 md:px-6 shadow-lg rounded-t-lg overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold mb-4"
        >
          🍵 Join Our Matcha Revolution
        </motion.h2>
        <p className="mb-8 text-base md:text-lg">
          Subscribe to receive updates, exclusive recipes, and promotions
          directly to your inbox.
        </p>
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center"
          aria-live="assertive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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
              className={`p-3 pr-10 rounded-md w-full sm:w-80 md:w-96 border transition focus:ring-2 outline-none ${
                isValid
                  ? "border-green-500 focus:ring-green-300"
                  : "border-red-500 focus:ring-red-300"
              }`}
              animate={!isValid ? { x: [-5, 5, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.3 }}
            />
            {!isValid && (
              <XCircleIcon
                className="absolute right-3 top-3 text-red-500"
                size={20}
              />
            )}
            {email && (
              <button
                type="button"
                className="absolute right-2 top-2 text-[var(--color-primary)] hover:text-[var(--color-accent)]"
                onClick={() => setEmail("")}
                aria-label="Clear email input"
              >
                <XIcon size={18} />
              </button>
            )}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--color-primary)] text-[var(--color-accent)] font-semibold p-3 rounded-md hover:bg-gray-200 transition flex items-center ml-0 sm:ml-4 mt-4 sm:mt-0 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="mr-2"
              >
                <LoaderIcon size={18} />
              </motion.span>
            ) : (
              "Subscribe"
            )}
          </motion.button>
        </motion.form>
        <AnimatePresence>
          {message && (
            <motion.div
              key="message"
              className={`mt-4 text-lg flex items-center justify-center ${
                status === "success" ? "text-green-500" : "text-red-500"
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
        <AnimatePresence>
          {submitted && status === "success" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-yellow-300 rounded-full absolute"
                  initial={{
                    scale: 0,
                    x: Math.random() * 50 - 25,
                    y: Math.random() * 50 - 25,
                  }}
                  animate={{
                    scale: [1, 1.2, 0],
                    y: [0, 80 + Math.random() * 20],
                    x: [0, (i % 2 === 0 ? -1 : 1) * (30 + Math.random() * 20)],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <div className="mt-6">
          <button
            onClick={handleGoogleSubscribe}
            className="flex items-center justify-center mx-auto px-4 py-2 border border-[var(--color-primary)] rounded-md text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-accent)] transition"
          >
            <FaGoogle size={20} className="mr-2" />
            Subscribe with Google
          </button>
        </div>
        <div className="mt-4 text-sm text-gray-200">
          <a href="#privacy" className="underline hover:text-gray-100">
            Privacy Policy
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
