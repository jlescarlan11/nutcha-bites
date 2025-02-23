import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CreditCard from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import nutchaOriginal from "../assets/nutchaOverview.webp";

// Sample product list
const products = [
  {
    id: 1,
    name: "Nutcha Bites Original",
    price: 45,
    image: nutchaOriginal,
  },
];

// Available vouchers for the customer
const vouchers = [
  { code: "NEWSLETTER10", description: "10% Off Newsletter Signup" },
  { code: "FREESHIP", description: "Free Shipping Voucher" },
  { code: "SAVE20", description: "20% Off Special Offer" },
];

// Variants for the modal container animation
const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// Variants for form step transitions
const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

// Enhanced ProgressBar with gradient & smooth transitions
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
    <p className="text-center text-sm mt-1 text-gray-700">Step {step} of 2</p>
  </div>
);

// Reusable InputField component with error support
const InputField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  ...rest
}) => (
  <div>
    <label
      htmlFor={id}
      className="block font-medium text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm ${
        error ? "border-red-500" : "border-gray-300"
      }`}
      {...rest}
    />
    {error && (
      <span role="alert" className="text-red-500 text-xs">
        {error}
      </span>
    )}
  </div>
);

// CustomerOrderForm component (Step 1)
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

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setBuyerInfo((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [setBuyerInfo, setErrors]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
      }
    },
    [setErrors]
  );

  const handleProductChange = useCallback(
    (e) => {
      const prod = products.find((p) => p.id === parseInt(e.target.value, 10));
      setSelectedProduct(prod);
    },
    [setSelectedProduct]
  );

  const totalPrice = (selectedProduct.price * quantity).toFixed(2);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Customer &amp; Order Details
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        {/* Customer Information */}
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
            Customer Information
          </h3>
          {[
            { id: "name", type: "text", placeholder: "Enter your name" },
            { id: "email", type: "email", placeholder: "Enter your email" },
            { id: "phone", type: "tel", placeholder: "Enter your phone" },
            { id: "address", type: "text", placeholder: "Enter your address" },
          ].map(({ id, type, placeholder }) => (
            <InputField
              key={id}
              id={id}
              label={id.charAt(0).toUpperCase() + id.slice(1)}
              type={type}
              value={buyerInfo[id]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={placeholder}
              error={errors[id]}
              name={id}
              required
            />
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow shadow-sm"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₱{product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <InputField
            id="quantity"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value, 10)))
            }
            placeholder="Enter quantity"
          />
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
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition flex items-center"
        >
          Next: Payment Details
        </motion.button>
      </div>
    </div>
  );
};

// PaymentForm component (Step 2) with credit card preview on the right
const PaymentForm = ({
  buyerInfo,
  setBuyerInfo,
  errors,
  setErrors,
  onBack,
  onSubmit,
  isSubmitting,
  onApplyVoucher,
  selectedProduct,
  quantity,
  reward,
}) => {
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setBuyerInfo((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    [setBuyerInfo, setErrors]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (!value.trim()) {
        setErrors((prev) => ({ ...prev, [name]: `${name} is required` }));
      }
    },
    [setErrors]
  );

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  // Compute purchase summary details
  const basePrice = selectedProduct.price * quantity;
  let shippingFee = 50;
  let discountPercentage = 0;
  if (reward) {
    const discountMatch = reward.match(/(\d+)%\s*Off/i);
    if (discountMatch) discountPercentage = parseFloat(discountMatch[1]);
    if (/free\s+(delivery|shipping)/i.test(reward)) shippingFee = 0;
  }
  const discountAmount = basePrice * (discountPercentage / 100);
  const finalPrice = basePrice - discountAmount + shippingFee;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Payment Details
      </h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column: Payment Inputs & Voucher/Purchase Summary */}
        <div className="flex-1 space-y-4">
          <div className="space-y-4">
            <InputField
              id="cardNumber"
              label="Card Number"
              type="text"
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
              placeholder="1234 5678 9012 3456"
              error={errors.cardNumber}
              maxLength={19}
              name="cardNumber"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <InputField
                id="expiration"
                label="Expiration Date"
                type="text"
                value={buyerInfo.expiration}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="MM/YY"
                error={errors.expiration}
                maxLength={5}
                name="expiration"
                required
              />
              <InputField
                id="cvv"
                label="CVV"
                type="text"
                value={buyerInfo.cvv}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="123"
                error={errors.cvv}
                maxLength={4}
                name="cvv"
                required
              />
            </div>
          </div>
          {/* Voucher Selection */}
          <div>
            <label
              htmlFor="voucherSelect"
              className="block font-medium text-gray-700 dark:text-gray-300"
            >
              Select Voucher
            </label>
            <select
              id="voucherSelect"
              name="voucherCode"
              value={buyerInfo.voucherCode}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-shadow"
            >
              <option value="">-- Choose a voucher --</option>
              {vouchers.map((voucher) => (
                <option key={voucher.code} value={voucher.code}>
                  {voucher.description}
                </option>
              ))}
            </select>
            {errors.voucherCode && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.voucherCode}
              </span>
            )}
            <motion.button
              onClick={onApplyVoucher}
              whileHover={{ scale: 1.05 }}
              type="button"
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
            >
              Apply Voucher
            </motion.button>
          </div>
          {/* Purchase Summary */}
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md border">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100 mb-2">
              Purchase Summary
            </h3>
            <p>
              <strong>Product:</strong> {selectedProduct.name}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity}
            </p>
            <p>
              <strong>Base Price:</strong> ₱{basePrice.toFixed(2)}
            </p>
            {reward ? (
              <>
                {discountPercentage > 0 && (
                  <p className="text-green-600">
                    <strong>Discount:</strong> -₱{discountAmount.toFixed(2)} (
                    {reward})
                  </p>
                )}
                {discountPercentage === 0 &&
                  /free\s+(delivery|shipping)/i.test(reward) && (
                    <p className="text-green-600">
                      <strong>Free Shipping Voucher Applied</strong>
                    </p>
                  )}
              </>
            ) : (
              <p className="text-gray-600">No voucher applied</p>
            )}
            <p>
              <strong>Shipping Fee:</strong> ₱{shippingFee.toFixed(2)}
            </p>
            <p className="mt-2 font-bold">
              <strong>Total Price:</strong> ₱{finalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        {/* Right Column: Credit Card Preview */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          <CreditCard
            number={buyerInfo.cardNumber}
            name={buyerInfo.name}
            expiry={buyerInfo.expiration.replace("/", "")}
            cvc={buyerInfo.cvv}
            focused=""
          />
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          type="button"
          className="bg-gray-500 text-white px-6 py-3 rounded-full hover:bg-gray-600 transition"
        >
          Back
        </motion.button>
        <motion.button
          onClick={onSubmit}
          whileHover={{ scale: 1.05 }}
          type="button"
          disabled={isSubmitting}
          className={`w-full sm:w-auto bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full hover:from-green-500 hover:to-blue-600 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Processing..." : "Confirm Order"}
        </motion.button>
      </div>
    </div>
  );
};

// Confirmation page showing detailed breakdown and applied voucher
const Confirmation = ({
  buyerInfo,
  selectedProduct,
  quantity,
  reward,
  navigate,
  onReset,
}) => {
  const baseProductPrice = selectedProduct.price * quantity;
  let shippingFee = 50;
  if (reward && /free\s+(delivery|shipping)/i.test(reward)) shippingFee = 0;

  let discountPercentage = 0;
  const discountMatch = reward && reward.match(/(\d+)%\s*Off/i);
  if (discountMatch) discountPercentage = parseFloat(discountMatch[1]);
  const discountAmount = baseProductPrice * (discountPercentage / 100);
  const finalPrice = baseProductPrice - discountAmount + shippingFee;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-auto relative border border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold text-center text-yellow-600 mb-4">
        Nutcha Bites
      </h1>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Order Confirmation
      </h2>
      <p className="mb-2 text-gray-700 dark:text-gray-300">
        Thank you, {buyerInfo.name}! Your order has been confirmed.
      </p>
      <div className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md mb-4 border">
        <p>
          <strong>Product:</strong> {selectedProduct.name}
        </p>
        <p>
          <strong>Quantity:</strong> {quantity}
        </p>
        <p>
          <strong>Base Price:</strong> ₱{baseProductPrice.toFixed(2)}
        </p>
        {discountAmount > 0 && (
          <p className="text-green-600">
            <strong>Discount:</strong> -₱{discountAmount.toFixed(2)} ({reward})
          </p>
        )}
        <p>
          <strong>Shipping Fee:</strong> ₱{shippingFee.toFixed(2)}
        </p>
        <p className="mt-2 font-bold">
          <strong>Total Price:</strong> ₱{finalPrice.toFixed(2)}
        </p>
      </div>
      {reward && (
        <div className="mb-4 text-green-700 text-center">
          Voucher Applied: <span className="font-semibold">{reward}</span>
        </div>
      )}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        className="w-full bg-gray-500 text-white p-3 rounded-full hover:bg-gray-600 transition mt-4 px-6"
      >
        Back to Home
      </motion.button>
      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.05 }}
        className="w-full bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition mt-2 px-6"
      >
        Reset Order
      </motion.button>
    </div>
  );
};

const OrderForm = () => {
  const navigate = useNavigate();

  // Load saved customer details (non-sensitive) from localStorage
  const savedCustomerInfo = JSON.parse(
    localStorage.getItem("customerDetails") || "{}"
  );

  const [buyerInfo, setBuyerInfo] = useState({
    name: savedCustomerInfo.name || "",
    email: savedCustomerInfo.email || "",
    phone: savedCustomerInfo.phone || "",
    address: savedCustomerInfo.address || "",
    cardNumber: "",
    expiration: "",
    cvv: "",
    voucherCode: localStorage.getItem("newsletterReward") || "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [reward, setReward] = useState("");

  // Save customer details (non-sensitive) whenever they change
  useEffect(() => {
    const { name, email, phone, address } = buyerInfo;
    localStorage.setItem(
      "customerDetails",
      JSON.stringify({ name, email, phone, address })
    );
  }, [buyerInfo.name, buyerInfo.email, buyerInfo.phone, buyerInfo.address]);

  // Disable background scroll while the modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const validateStep1 = useCallback(() => {
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
  }, [buyerInfo]);

  const handleNext = useCallback(() => {
    const step1Errors = validateStep1();
    if (Object.keys(step1Errors).length > 0) {
      setErrors(step1Errors);
      return;
    }
    setStep(2);
  }, [validateStep1]);

  const resetOrder = useCallback(() => {
    // Reset order but keep the saved customer details
    setBuyerInfo((prev) => ({
      ...prev,
      cardNumber: "",
      expiration: "",
      cvv: "",
      voucherCode: localStorage.getItem("newsletterReward") || "",
    }));
    setErrors({});
    setStep(1);
    setSelectedProduct(products[0]);
    setQuantity(1);
    setReward("");
    setOrderSubmitted(false);
  }, []);

  // Apply voucher from the selected voucher in the dropdown
  const handleApplyVoucher = useCallback(() => {
    if (!buyerInfo.voucherCode.trim()) {
      setErrors((prev) => ({
        ...prev,
        voucherCode: "Please select a voucher",
      }));
      return;
    }
    const selectedVoucher = vouchers.find(
      (v) => v.code === buyerInfo.voucherCode.trim()
    );
    if (selectedVoucher) {
      setReward(selectedVoucher.description);
    }
  }, [buyerInfo.voucherCode]);

  const handlePaymentSubmit = useCallback(async () => {
    const newErrors = {};
    if (!buyerInfo.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (!buyerInfo.expiration.trim()) {
      newErrors.expiration = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(buyerInfo.expiration)) {
      newErrors.expiration = "Expiration must be in MM/YY format";
    }
    if (!buyerInfo.cvv.trim()) newErrors.cvv = "CVV is required";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    // Automatically apply voucher if not applied manually
    if (!reward && buyerInfo.voucherCode.trim() !== "") {
      const selectedVoucher = vouchers.find(
        (v) => v.code === buyerInfo.voucherCode.trim()
      );
      if (selectedVoucher) {
        setReward(selectedVoucher.description);
      }
    }
    setOrderSubmitted(true);
  }, [buyerInfo, reward]);

  if (orderSubmitted) {
    return (
      <Confirmation
        buyerInfo={buyerInfo}
        selectedProduct={selectedProduct}
        quantity={quantity}
        reward={reward}
        navigate={navigate}
        onReset={resetOrder}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center p-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl mx-auto max-h-screen flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-700 dark:to-gray-900 z-10 p-4 flex justify-between items-center border-b border-gray-300">
          <h1 className="text-2xl font-bold text-white">Nutcha Bites</h1>
          <motion.button
            whileHover={{ scale: 1.2, rotate: 90 }}
            className="cursor-pointer text-white focus:outline-none"
            onClick={() => navigate("/")}
            aria-label="Close Order Form"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        </header>
        {/* Scrollable Content with AnimatePresence for step transitions */}
        <div
          className="overflow-y-auto p-6 relative scrollbar-thin scrollbar-thumb-gray-300"
          style={{ maxHeight: "calc(100vh - 80px)" }}
        >
          <ProgressBar step={step} />
          <AnimatePresence exitBeforeEnter>
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
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
              </motion.div>
            )}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <PaymentForm
                  buyerInfo={buyerInfo}
                  setBuyerInfo={setBuyerInfo}
                  errors={errors}
                  setErrors={setErrors}
                  onBack={() => setStep(1)}
                  onSubmit={handlePaymentSubmit}
                  isSubmitting={isSubmitting}
                  onApplyVoucher={handleApplyVoucher}
                  selectedProduct={selectedProduct}
                  quantity={quantity}
                  reward={reward}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderForm;
