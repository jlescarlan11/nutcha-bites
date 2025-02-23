// OrderForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreditCard from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import nutchaOriginal from "../assets/nutchaOverview.webp";
import { motion, AnimatePresence } from "framer-motion";

// Sample product list
const products = [
  {
    id: 1,
    name: "Nutcha Bites Original",
    price: 45,
    image: nutchaOriginal,
  },
];

// Enhanced ProgressBar with gradient & smooth framer-motion transitions
const ProgressBar = ({ step }) => (
  <div className="mb-4">
    <div className="w-full bg-gray-300 h-2 rounded overflow-hidden">
      <motion.div
        className="h-2 rounded bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
        initial={{ width: 0 }}
        animate={{ width: `${(step / 2) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <p className="text-center text-sm mt-1">Step {step} of 2</p>
  </div>
);

const CustomerOrderForm = ({
  buyerInfo,
  setBuyerInfo,
  errors,
  setErrors,
  onNext,
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
}) => {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    }
  };

  const handleProductChange = (e) => {
    setSelectedProduct(
      products.find((p) => p.id === parseInt(e.target.value, 10))
    );
  };

  const totalPrice = (selectedProduct.price * quantity).toFixed(2);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Customer &amp; Order Details
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        {/* Customer Info */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Customer Information
          </h3>
          {["name", "email", "phone", "address"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block font-medium text-gray-700 dark:text-gray-300"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                name={field}
                value={buyerInfo[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
                placeholder={`Enter your ${field}`}
              />
              {errors[field] && (
                <span role="alert" className="text-red-500 text-xs">
                  {errors[field]}
                </span>
              )}
            </div>
          ))}
        </div>
        {/* Order Details */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Order Details
          </h3>
          <div>
            <label
              htmlFor="product"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Select Product
            </label>
            <select
              id="product"
              value={selectedProduct.id}
              onChange={handleProductChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₱{product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value, 10)))
              }
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
            />
          </div>
          <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
              Order Summary
            </h3>
            <div className="flex items-center space-x-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="text-gray-700 dark:text-gray-300">
                  {selectedProduct.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  x {quantity} = ₱{totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Next Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition flex items-center px-6"
        >
          Next: Payment Details
        </button>
      </div>
    </div>
  );
};

const PaymentForm = ({
  buyerInfo,
  setBuyerInfo,
  errors,
  setErrors,
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
    }
  };

  // Format card number for display
  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Payment Details
      </h2>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="cardNumber"
            className="block font-medium text-gray-700 dark:text-gray-300"
          >
            Card Number
          </label>
          <input
            id="cardNumber"
            type="text"
            name="cardNumber"
            value={formatCardNumber(buyerInfo.cardNumber)}
            onChange={(e) =>
              handleChange({
                target: {
                  name: "cardNumber",
                  value: e.target.value.replace(/\s/g, ""),
                },
              })
            }
            onBlur={handleBlur}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {errors.cardNumber && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.cardNumber}
            </span>
          )}
        </div>
        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="expiration"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Expiration Date
            </label>
            <input
              id="expiration"
              type="text"
              name="expiration"
              value={buyerInfo.expiration}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiration && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.expiration}
              </span>
            )}
          </div>
          <div className="w-full sm:w-1/2">
            <label
              htmlFor="cvv"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              CVV
            </label>
            <input
              id="cvv"
              type="text"
              name="cvv"
              value={buyerInfo.cvv}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
              placeholder="123"
              maxLength={4}
            />
            {errors.cvv && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.cvv}
              </span>
            )}
          </div>
        </div>
        {/* Live Credit Card Preview */}
        <div className="mt-6 flex justify-center">
          <div className="w-full sm:w-2/3 md:w-1/2">
            <CreditCard
              number={buyerInfo.cardNumber}
              name={buyerInfo.name}
              expiry={buyerInfo.expiration.replace("/", "")}
              cvc={buyerInfo.cvv}
              focused=""
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={onBack}
            type="button"
            className="bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition px-6"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            type="button"
            disabled={isSubmitting}
            className={`w-full sm:w-auto bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            } transition px-6`}
          >
            {isSubmitting ? "Submitting..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Confirmation = ({ buyerInfo, selectedProduct, quantity, navigate }) => {
  const totalPrice = (selectedProduct.price * quantity).toFixed(2);
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-xl w-full max-w-md mx-auto relative">
      <h1 className="text-2xl font-bold text-center text-yellow-600 mb-4">
        Nutcha Bites
      </h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Order Confirmation
      </h2>
      <p className="mb-2 text-gray-700">
        Thank you, {buyerInfo.name}! Your order has been confirmed.
      </p>
      <div className="p-4 bg-white rounded-lg shadow-md mb-4">
        <p>
          <strong>Product:</strong> {selectedProduct.name}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Total Price:</strong> ₱{totalPrice}
        </p>
        <p>
          <strong>Delivery Address:</strong> {buyerInfo.address}
        </p>
      </div>
      {/* Animated Confirmation Confetti */}
      <AnimatePresence>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-green-300 rounded-full absolute"
              initial={{
                scale: 0,
                x: Math.random() * 50 - 25,
                y: Math.random() * 50 - 25,
              }}
              animate={{
                scale: [1, 1.3, 0],
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
      </AnimatePresence>
      <button
        onClick={() => navigate("/")}
        className="w-full bg-gray-500 text-white p-3 rounded-lg hover:bg-gray-600 transition mt-4 px-6"
      >
        Back to Home
      </button>
    </div>
  );
};

const OrderForm = () => {
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cardNumber: "",
    expiration: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const navigate = useNavigate();

  // Disable background scroll while modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const validateStep1 = () => {
    const newErrors = {};
    if (!buyerInfo.name.trim()) newErrors.name = "Full Name is required";
    if (!buyerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(buyerInfo.email)) {
      newErrors.email = "Email format is invalid";
    }
    if (!buyerInfo.phone.trim()) newErrors.phone = "Phone number is required";
    if (!buyerInfo.address.trim())
      newErrors.address = "Delivery address is required";
    return newErrors;
  };

  const handleNext = () => {
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return;
    }
    setStep(2);
  };

  if (orderSubmitted) {
    return (
      <Confirmation
        buyerInfo={buyerInfo}
        selectedProduct={selectedProduct}
        quantity={quantity}
        navigate={navigate}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <motion.div
        className="w-full max-w-3xl bg-gray-100 rounded-2xl shadow-2xl mx-auto max-h-screen flex flex-col overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 bg-gray-100 z-10 p-4 flex justify-between items-center border-b border-gray-300">
          <h1 className="text-2xl font-bold text-yellow-600">Nutcha Bites</h1>
          <motion.span
            whileHover={{ scale: 1.2, rotate: 90 }}
            className="cursor-pointer text-3xl text-gray-600"
            onClick={() => navigate("/")}
            aria-label="Close Order Form"
          >
            &times;
          </motion.span>
        </div>
        {/* Scrollable Content */}
        <div
          className="overflow-y-auto p-6 relative"
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          <ProgressBar step={step} />
          {step === 1 && (
            <CustomerOrderForm
              buyerInfo={buyerInfo}
              setBuyerInfo={setBuyerInfo}
              errors={errors}
              setErrors={setErrors}
              onNext={handleNext}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          )}
          {step === 2 && (
            <PaymentForm
              buyerInfo={buyerInfo}
              setBuyerInfo={setBuyerInfo}
              errors={errors}
              setErrors={setErrors}
              onBack={() => setStep(1)}
              onSubmit={async () => {
                const newErrors = {};
                if (!buyerInfo.cardNumber.trim())
                  newErrors.cardNumber = "Card number is required";
                if (!buyerInfo.expiration.trim()) {
                  newErrors.expiration = "Expiration date is required";
                } else if (
                  !/^(0[1-9]|1[0-2])\/\d{2}$/.test(buyerInfo.expiration)
                ) {
                  newErrors.expiration = "Expiration must be in MM/YY format";
                }
                if (!buyerInfo.cvv.trim()) newErrors.cvv = "CVV is required";
                if (Object.keys(newErrors).length > 0) {
                  setErrors(newErrors);
                  return;
                }
                setIsSubmitting(true);
                await new Promise((resolve) => setTimeout(resolve, 1500));
                console.log("Order confirmed", {
                  buyerInfo,
                  selectedProduct,
                  quantity,
                });
                setIsSubmitting(false);
                setOrderSubmitted(true);
              }}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default OrderForm;
