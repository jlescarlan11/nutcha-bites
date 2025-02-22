import React, { useState, useEffect } from "react";
import { CheckCircleIcon, XCircleIcon, LoaderIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion"; // Framer Motion for animations

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
  const [status, setStatus] = useState("");
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
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulating API request

      setMessage("🎉 Thank you for joining our Matcha Revolution!");
      setStatus("success");
      setSubmitted(true);
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

  return (
    <section className="mt-32 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-accent)] text-[var(--color-primary)] py-12 px-6 shadow-lg rounded-t-lg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-4"
        >
          🍵 Join Our Matcha Revolution
        </motion.h2>
        <p className="mb-8 text-lg">
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
              className={`p-3 pr-10 rounded-md text-[var(--color-primary)] w-full sm:w-80 border ${
                isValid
                  ? "border-[var(--color-primary)]"
                  : "border-[var(--color-primary)]"
              } focus:ring-2 focus:ring-[var(--color-accent)] outline-none transition`}
              autoFocus={status === "error"} // Autofocus on error
              initial={{ x: 0 }}
              animate={{ x: !isValid ? [-5, 5, -5, 5, 0] : 0 }} // Shake animation on invalid input
              transition={{ duration: 0.3 }}
            />
            {!isValid && (
              <XCircleIcon
                className="absolute right-3 top-3 text-[var(--color-tertiary)]"
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

          <button
            type="submit"
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
          </button>
        </motion.form>

        {message && (
          <motion.div
            className={`mt-4 text-lg flex items-center justify-center ${
              status === "success"
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-tertiary)]"
            }`}
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {status === "success" ? (
              <CheckCircleIcon className="mr-2" size={20} />
            ) : (
              <XCircleIcon className="mr-2" size={20} />
            )}
            {message}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NewsletterSignup;
