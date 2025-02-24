import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  { code: "NEWSLETTER20", description: "20% Off Newsletter Signup" },
  { code: "FREESHIP", description: "Free Shipping Voucher" },
  { code: "SAVE20", description: "20% Off Special Offer" },
  { code: "FREEGIFT", description: "Free One Product Voucher" },
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

// Helper: debounce function
function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Enhanced ProgressBar with gradient & smooth transitions
const ProgressBar = ({ step }) => (
  <div className="mb-6">
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <motion.div
        className="h-2 rounded-full"
        style={{
          background:
            "linear-gradient(to right, var(--color-secondary), var(--color-accent))",
        }}
        initial={{ width: 0 }}
        animate={{ width: `${(step / 2) * 100}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
    <p
      className="text-center text-sm mt-2"
      style={{ color: "var(--color-secondary)" }}
    >
      Step {step} of 2
    </p>
  </div>
);

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
  <div className="mb-4">
    {/* Force equal label height */}
    <div className="min-h-12 sm:min-h-7 flex items-center">
      <label
        htmlFor={id}
        className="block font-medium mb-1 text-[var(--color-secondary)]/70"
      >
        {label}
      </label>
    </div>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      className={`w-full p-4 rounded-md border  text-[var(--color-secondary)]/90 focus:outline-none focus:ring-4 transition-shadow shadow-sm ${
        error ? "border-red-500" : "border-[var(--color-secondary)]/80"
      }`}
      {...rest}
    />
    <AnimatePresence>
      {error && (
        <motion.span
          key="error"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          role="alert"
          className="mt-1 block text-red-500 text-xs"
        >
          {error}
        </motion.span>
      )}
    </AnimatePresence>
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

  const validateField = useCallback(
    (name, value) => {
      let error = "";
      if (!value.trim()) {
        error = `${name} is required`;
      } else {
        if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
          error = "Email format is invalid";
        }
      }
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [setErrors]
  );

  const debouncedValidateField = useMemo(
    () => debounce(validateField, 500),
    [validateField]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setBuyerInfo((prev) => ({ ...prev, [name]: value }));
      debouncedValidateField(name, value);
    },
    [setBuyerInfo, debouncedValidateField]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      validateField(name, value);
    },
    [validateField]
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
    <div className="px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-[var(--color-secondary)]/90">
        Customer & Order Details
      </h2>
      <div className="flex flex-col gap-2 md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        {/* Customer Information */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)]/80">
            Customer Information
          </h3>
          {["name", "email", "phone", "address"].map((field) => (
            <InputField
              key={field}
              id={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type={field === "email" ? "email" : "text"}
              value={buyerInfo[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={`Enter your ${field}`}
              error={errors[field]}
              name={field}
              required
            />
          ))}
        </div>
        {/* Order Details */}
        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-bold mb-4 text-[var(--color-secondary)]/90">
            Order Details
          </h3>
          <div className="mb-4">
            <label
              htmlFor="product"
              className="block font-medium mb-1 text-[var(--color-secondary)]/70"
            >
              Select Product
            </label>
            <select
              id="product"
              value={selectedProduct.id}
              onChange={handleProductChange}
              className="w-full p-4 border border-[var(--color-secondary)]/80 text-[var(--color-secondary)]/90 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-sm transition-shadow"
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
          <div
            className="mt-12 p-6 rounded-lg shadow-lg border"
            style={{
              backgroundColor: "var(--color-primary)",
              borderColor: "var(--color-secondary)",
            }}
          >
            <h3 className="font-bold text-xl mb-3 text-[var(--color-secondary)]/90">
              Order Summary
            </h3>
            <div className="flex items-start gap-4 space-x-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div>
                <p className="text-[var(--color-secondary)]/80  font-semibold">
                  {selectedProduct.name}
                </p>
                <p className="text-xs text-[var(--color-secondary)]/70">
                  x {quantity} = ₱{totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          className="px-8 py-3 rounded-full transition-transform shadow-md text-[var(--color-primary)]/80"
          style={{
            background:
              "linear-gradient(to right, var(--color-secondary), var(--color-accent))",
          }}
        >
          Next: Payment Details
        </motion.button>
      </div>
    </div>
  );
};

// PaymentForm component (Step 2)
const PaymentForm = ({
  buyerInfo,
  setBuyerInfo,
  errors,
  setErrors,
  onBack,
  onSubmit,
  isSubmitting,
  selectedProduct,
  quantity,
  reward,
  setReward,
}) => {
  const validatePaymentField = useCallback(
    (name, value) => {
      let error = "";
      if (!value.trim()) {
        error = `${name} is required`;
      } else if (
        name === "expiration" &&
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)
      ) {
        error = "Expiration must be in MM/YY format";
      }
      setErrors((prev) => ({ ...prev, [name]: error }));
    },
    [setErrors]
  );

  const debouncedValidatePaymentField = useMemo(
    () => debounce(validatePaymentField, 500),
    [validatePaymentField]
  );

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setBuyerInfo((prev) => ({ ...prev, [name]: value }));
      debouncedValidatePaymentField(name, value);
    },
    [setBuyerInfo, debouncedValidatePaymentField]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      validatePaymentField(name, value);
    },
    [validatePaymentField]
  );

  const formatCardNumber = (value) =>
    value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

  // Voucher validation
  const [voucherFeedback, setVoucherFeedback] = useState(null);

  const validateVoucher = useCallback(
    (code) => {
      if (!code.trim()) {
        setVoucherFeedback(null);
        setReward("");
        return;
      }
      const matchedVoucher = vouchers.find(
        (v) => v.code.toUpperCase() === code.trim().toUpperCase()
      );
      if (matchedVoucher) {
        setVoucherFeedback({
          status: "success",
          message: `Voucher Applied: ${matchedVoucher.description}`,
        });
        setReward(matchedVoucher.description);
      } else {
        setVoucherFeedback({
          status: "error",
          message: "Invalid voucher code",
        });
        setReward("");
      }
    },
    [setReward]
  );

  const debouncedValidateVoucher = useMemo(
    () => debounce(validateVoucher, 500),
    [validateVoucher]
  );

  // Automatically validate saved voucher code
  useEffect(() => {
    if (buyerInfo.voucherCode.trim() !== "") {
      debouncedValidateVoucher(buyerInfo.voucherCode);
    }
  }, [buyerInfo.voucherCode, debouncedValidateVoucher]);

  const handleVoucherChange = useCallback(
    (e) => {
      const { value } = e.target;
      setBuyerInfo((prev) => ({ ...prev, voucherCode: value }));
      debouncedValidateVoucher(value);
    },
    [setBuyerInfo, debouncedValidateVoucher]
  );

  // Price calculations
  const basePrice = selectedProduct.price * quantity;
  let shippingFee = 50;
  let discountAmount = 0;

  if (reward) {
    if (/free\s+product/i.test(reward)) {
      discountAmount = quantity >= 1 ? selectedProduct.price : 0;
    } else {
      let discountPercentage = 0;
      const discountMatch = reward.match(/(\d+)%\s*Off/i);
      if (discountMatch) discountPercentage = parseFloat(discountMatch[1]);
      discountAmount = basePrice * (discountPercentage / 100);
      if (/free\s+(delivery|shipping)/i.test(reward)) shippingFee = 0;
    }
  }
  const finalPrice = basePrice - discountAmount + shippingFee;

  return (
    <div
      className="p-6 sm:p-8 rounded-lg shadow-lg border"
      style={{
        backgroundColor: "var(--color-primary)",
        borderColor: "var(--color-secondary)",
      }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-[var(--color-secondary)]/90">
        Payment Details
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column: Payment Inputs & Voucher/Purchase Summary */}
        <div className="flex-1">
          <div className="space-y-6">
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
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-1 items-start">
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

          {/* Mobile Credit Card Preview */}
          <div className="mb-6 md:hidden flex justify-center items-center scale-90">
            <CreditCard
              number={buyerInfo.cardNumber}
              name={buyerInfo.name}
              expiry={buyerInfo.expiration.replace("/", "")}
              cvc={buyerInfo.cvv}
              focused=""
            />
          </div>

          {/* Voucher Code Input */}
          <div className="mt-6">
            <label
              htmlFor="voucherCode"
              className="block font-medium mb-1 text-[var(--color-secondary)]/70"
            >
              Voucher Code
            </label>
            <input
              list="voucherOptions"
              id="voucherCode"
              name="voucherCode"
              value={buyerInfo.voucherCode}
              onChange={handleVoucherChange}
              placeholder="Enter voucher code"
              className={`w-full p-4 rounded-md border text-[var(--color-secondary)]  focus:outline-none transition-shadow shadow-sm ${
                voucherFeedback && voucherFeedback.status === "error"
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[var(--color-secondary)]/70 focus:ring-blue-300"
              }`}
            />
            <AnimatePresence>
              {voucherFeedback && voucherFeedback.message && (
                <motion.div
                  key="voucherFeedback"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1 text-xs"
                  style={{
                    color: voucherFeedback.status === "error" ? "red" : "green",
                  }}
                >
                  {voucherFeedback.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Purchase Summary */}
          <div className="mt-8 p-6 rounded-lg shadow-md  border border-[var(--color-secondary)]/80">
            <h3 className="font-bold text-xl mb-3 text-[var(--color-secondary)]/90">
              Purchase Summary
            </h3>
            <p className="text-[var(--color-secondary)]/80">
              <strong>Product:</strong> {selectedProduct.name}
            </p>
            <p className="text-[var(--color-secondary)]/80">
              <strong>Quantity:</strong> {quantity}
            </p>
            <p className="text-[var(--color-secondary)]/80">
              <strong>Base Price:</strong> ₱{basePrice.toFixed(2)}
            </p>
            {reward ? (
              <>
                {/free\s+product/i.test(reward) ? (
                  <p style={{ color: "green" }}>
                    <strong>Discount:</strong> -₱
                    {selectedProduct.price.toFixed(2)} (Free One Product
                    Voucher)
                  </p>
                ) : (
                  <>
                    {(() => {
                      let discountPercentage = 0;
                      const discountMatch = reward.match(/(\d+)%\s*Off/i);
                      if (discountMatch)
                        discountPercentage = parseFloat(discountMatch[1]);
                      return discountPercentage > 0 ? (
                        <p style={{ color: "green" }}>
                          <strong>Discount:</strong> -₱
                          {discountAmount.toFixed(2)} ({reward})
                        </p>
                      ) : null;
                    })()}
                    {!/(\d+)%\s*Off/i.test(reward) &&
                      /free\s+(delivery|shipping)/i.test(reward) && (
                        <p style={{ color: "green" }}>
                          <strong>Free Shipping Voucher Applied</strong>
                        </p>
                      )}
                  </>
                )}
              </>
            ) : (
              <p className="text-[var(--color-secondary)]/80">
                No voucher applied
              </p>
            )}
            <p className="text-[var(--color-secondary)]/80">
              <strong>Shipping Fee:</strong> ₱{shippingFee.toFixed(2)}
            </p>
            <p className="mt-3 font-bold text-[var(--color-secondary)]/80">
              <strong>Total Price:</strong> ₱{finalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        {/* Desktop Credit Card Preview */}
        <div className="w-full md:w-1/3 hidden md:flex justify-center -mt-3 items-start mb-6 md:mb-0 transform scale-90">
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
      <div className="flex flex-col gap-4 sm:flex-row justify-between mt-8">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          type="button"
          className="px-8 py-3 sm:block hidden rounded-full transition-transform shadow-md text-[var(--color-primary)]/80"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={onSubmit}
          whileHover={{ scale: 1.05 }}
          type="button"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-full transition-transform shadow-md text-[var(--color-primary)]/80 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            background:
              "linear-gradient(to right, var(--color-secondary), var(--color-accent))",
          }}
        >
          {isSubmitting ? "Processing..." : "Confirm Order"}
        </motion.button>
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          type="button"
          className="px-8 py-3 block sm:hidden rounded-full transition-transform shadow-md text-[var(--color-primary)]/80"
          style={{ backgroundColor: "var(--color-secondary)" }}
        >
          Back
        </motion.button>
      </div>
    </div>
  );
};

// Confirmation page
const Confirmation = ({
  buyerInfo,
  selectedProduct,
  quantity,
  reward,
  navigate,
}) => {
  const baseProductPrice = selectedProduct.price * quantity;
  let shippingFee = 50;
  if (reward && /free\s+(delivery|shipping)/i.test(reward)) shippingFee = 0;

  let discountAmount = 0;
  if (reward && /free\s+product/i.test(reward)) {
    discountAmount = quantity >= 1 ? selectedProduct.price : 0;
  } else if (reward) {
    let discountPercentage = 0;
    const discountMatch = reward.match(/(\d+)%\s*Off/i);
    if (discountMatch) discountPercentage = parseFloat(discountMatch[1]);
    discountAmount = baseProductPrice * (discountPercentage / 100);
  }

  const finalPrice = baseProductPrice - discountAmount + shippingFee;

  return (
    <div
      className="p-6 rounded-xl w-full max-w-md mx-auto my-4 shadow-xl border"
      style={{
        backgroundColor: "var(--color-primary)",
        borderColor: "var(--color-secondary)",
      }}
    >
      <h1 className="text-3xl font-extrabold text-[var(--color-primary)]/80 text-center mb-4">
        Nutcha Bites
      </h1>
      <h2 className="text-2xl font-semibold mb-6 text-center text-[var(--color-secondary)]/90">
        Order Confirmation
      </h2>
      <p className="mb-4 text-[var(--color-secondary)]/80">
        Thank you, {buyerInfo.name}! Your order has been confirmed.
      </p>
      <div className="p-4 rounded-lg shadow-md mb-6 border bg-[var(--color-primary)]/80 border-[var(--color-secondary)]/80">
        <p className="text-[var(--color-secondary)]/70">
          <strong>Product:</strong> {selectedProduct.name}
        </p>
        <p className="text-[var(--color-secondary)]/70">
          <strong>Quantity:</strong> {quantity}
        </p>{" "}
        <p className="text-[var(--color-secondary)]/70">
          <strong>Base Price:</strong> ₱{baseProductPrice.toFixed(2)}
        </p>
        {reward ? (
          /free\s+product/i.test(reward) ? (
            <p style={{ color: "green" }}>
              <strong>Discount:</strong> -₱{selectedProduct.price.toFixed(2)}{" "}
              (Free One Product Voucher)
            </p>
          ) : (
            <>
              {(() => {
                let discountPercentage = 0;
                const discountMatch = reward.match(/(\d+)%\s*Off/i);
                if (discountMatch)
                  discountPercentage = parseFloat(discountMatch[1]);
                return discountPercentage > 0 ? (
                  <p style={{ color: "green" }}>
                    <strong>Discount:</strong> -₱{discountAmount.toFixed(2)} (
                    {reward})
                  </p>
                ) : null;
              })()}
              {!/(\d+)%\s*Off/i.test(reward) &&
                /free\s+(delivery|shipping)/i.test(reward) && (
                  <p style={{ color: "green" }}>
                    <strong>Free Shipping Voucher Applied</strong>
                  </p>
                )}
            </>
          )
        ) : (
          <p className="text-[var(--color-secondary)]/60">No voucher applied</p>
        )}
        <p className="text-[var(--color-secondary)]/70">
          <strong>Shipping Fee:</strong> ₱{shippingFee.toFixed(2)}
        </p>
        <p className="mt-3 font-bold text-[var(--color-secondary)]/80">
          <strong>Total Price:</strong> ₱{finalPrice.toFixed(2)}
        </p>
      </div>
      {reward && (
        <div className="mb-6 text-center" style={{ color: "green" }}>
          Voucher Applied: <span className="font-semibold">{reward}</span>
        </div>
      )}
      <motion.button
        onClick={() => navigate("/")}
        whileHover={{ scale: 1.05 }}
        className="w-full p-3 rounded-full mt-4 shadow-md bg-[var(--color-secondary)]/80 text-[var(--color-primary)]/80"
      >
        Back to Home
      </motion.button>
    </div>
  );
};

const OrderForm = () => {
  const navigate = useNavigate();
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
    voucherCode:
      JSON.parse(localStorage.getItem("newsletterVoucher"))?.code || "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [reward, setReward] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = buyerInfo;
    localStorage.setItem(
      "customerDetails",
      JSON.stringify({ name, email, phone, address })
    );
  }, [buyerInfo.name, buyerInfo.email, buyerInfo.phone, buyerInfo.address]);

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
    if (!reward && buyerInfo.voucherCode.trim() !== "") {
      const selectedVoucher = vouchers.find(
        (v) => v.code === buyerInfo.voucherCode.trim()
      );
      if (selectedVoucher) {
        setReward(selectedVoucher.description);
      }
    }

    // Remove the saved newsletter voucher so it can't be reused
    localStorage.removeItem("newsletterVoucher");
    setBuyerInfo((prev) => ({ ...prev, voucherCode: "" }));

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
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center p-4 z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="w-full max-w-3xl sm:mx-4 md:mx-auto rounded-2xl shadow-2xl overflow-auto border"
        style={{
          backgroundColor: "var(--color-primary)",
          borderColor: "var(--color-secondary)",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sticky Header */}
        <header
          className="sticky top-0 z-10 p-6 flex justify-between items-center border-b"
          style={{
            background:
              "linear-gradient(to right, var(--color-secondary), var(--color-accent))",
            borderColor: "var(--color-secondary)",
          }}
        >
          <h1 className="text-3xl font-extrabold text-[var(--color-primary)]/80">
            Nutcha Bites
          </h1>
          <motion.button
            whileHover={{ scale: 1.2, rotate: 90 }}
            className="cursor-pointer text-[var(--color-primary)]/80 focus:outline-none"
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
        {/* Scrollable Content */}
        <div
          className="overflow-y-auto p-6 relative sm:p-8"
          style={{
            maxHeight: "calc(100vh - 100px)",
            WebkitOverflowScrolling: "touch",
          }}
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
                  selectedProduct={selectedProduct}
                  quantity={quantity}
                  reward={reward}
                  setReward={setReward}
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
