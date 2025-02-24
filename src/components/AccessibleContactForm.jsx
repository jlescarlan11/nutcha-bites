import React, { useState } from "react";

const AccessibleContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "General Question",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.message) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Simulate successful form submission (replace with your submission logic)
      console.log("Form submitted:", formData);
      setFormSubmitted(true);
      setFormData({
        name: "",
        email: "",
        inquiry: "General Question",
        message: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg my-12">
      {formSubmitted && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
          Thank you for your message!
        </div>
      )}
      <form onSubmit={handleSubmit} noValidate>
        {/* Name Field */}
        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded transition-colors duration-200 focus:outline-none focus:ring ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : null}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded transition-colors duration-200 focus:outline-none focus:ring ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : null}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Inquiry Type Dropdown */}
        <div className="mb-6">
          <label htmlFor="inquiry" className="block text-gray-700 mb-1">
            Inquiry Type
          </label>
          <select
            id="inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded transition-colors duration-200 focus:outline-none focus:ring-blue-500 border-gray-300"
          >
            <option>General Question</option>
            <option>Order Inquiry</option>
            <option>Wholesale/Partnership</option>
            <option>Feedback</option>
          </select>
        </div>

        {/* Message Field */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded transition-colors duration-200 focus:outline-none focus:ring ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : null}
          ></textarea>
          {errors.message && (
            <p id="message-error" className="mt-1 text-sm text-red-600">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none transition-all duration-200 font-sans font-semibold"
          >
            Send Snack Love
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccessibleContactForm;
