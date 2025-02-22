import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

// Simple progress bar component
const ProgressBar = ({ step }) => (
  <div className="mb-4">
    <div className="w-full bg-gray-300 h-2 rounded">
      <div
        className="bg-blue-500 h-2 rounded transition-all duration-500"
        style={{ width: `${(step / 2) * 100}%` }}
      ></div>
    </div>
    <p className="text-center text-sm mt-1">Step {step} of 2</p>
  </div>
);

// Combined customer and order details in two columns
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

  const handleCancel = () => {
    navigate("/");
  };

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
      <h2 className="text-xl font-semibold mb-4">Customer & Order Details</h2>
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Left Column: Customer Info */}
        <div className="md:w-1/2 space-y-4">
          <h3 className="text-lg font-bold">Customer Information</h3>
          <div>
            <label htmlFor="name" className="block font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={buyerInfo.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.name}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={buyerInfo.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={buyerInfo.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full p-2 border rounded"
            />
            {errors.phone && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.phone}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="address" className="block font-medium">
              Delivery Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={buyerInfo.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.address}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Order Details */}
        <div className="md:w-1/2 space-y-4 mt-4 md:mt-0">
          <h3 className="text-lg font-bold">Order Details</h3>
          <div>
            <label htmlFor="product" className="block font-medium">
              Select Product
            </label>
            <select
              id="product"
              value={selectedProduct.id}
              onChange={handleProductChange}
              className="w-full p-2 border rounded"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - ₱{product.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="quantity" className="block font-medium">
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
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mt-4 p-4 bg-white rounded shadow">
            <h3 className="font-bold mb-2">Order Summary</h3>
            <div className="flex items-center space-x-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p>{selectedProduct.name}</p>
                <p className="text-sm">
                  x {quantity} = ₱{totalPrice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={onNext}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex-1 mr-2"
        >
          Next: Payment Details
        </button>
      </div>
    </div>
  );
};

// Payment details form with live credit card preview
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

  // Format card number into groups of 4 digits for display
  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="cardNumber" className="block font-medium">
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
            className="w-full p-2 border rounded"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
          />
          {errors.cardNumber && (
            <span role="alert" className="text-red-500 text-xs">
              {errors.cardNumber}
            </span>
          )}
        </div>
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label htmlFor="expiration" className="block font-medium">
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
              className="w-full p-2 border rounded"
              placeholder="MM/YY"
              maxLength={5}
            />
            {errors.expiration && (
              <span role="alert" className="text-red-500 text-xs">
                {errors.expiration}
              </span>
            )}
          </div>
          <div className="w-1/2">
            <label htmlFor="cvv" className="block font-medium">
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
              className="w-full p-2 border rounded"
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
        {/* Live credit card preview */}
        <div className="mt-4">
          <CreditCard
            number={buyerInfo.cardNumber}
            name={buyerInfo.name}
            expiry={buyerInfo.expiration.replace("/", "")}
            cvc={buyerInfo.cvv}
            focused=""
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={onBack}
            type="button"
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            type="button"
            disabled={isSubmitting}
            className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Confirm Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Order confirmation component
const Confirmation = ({ buyerInfo, selectedProduct, quantity, navigate }) => {
  const totalPrice = (selectedProduct.price * quantity).toFixed(2);
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center text-yellow-600 mb-4">
        Nutcha Bites
      </h1>
      <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
      <p className="mb-2">
        Thank you, {buyerInfo.name}! Your order has been confirmed.
      </p>
      <div className="p-4 bg-white rounded shadow mb-4">
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
      <button
        onClick={() => navigate("/")}
        className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Back to Home
      </button>
    </div>
  );
};

// Main OrderForm component managing the flow between steps
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

  // Validation functions
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

  const validateStep2 = () => {
    const newErrors = {};
    if (!buyerInfo.cardNumber.trim())
      newErrors.cardNumber = "Card number is required";
    if (!buyerInfo.expiration.trim()) {
      newErrors.expiration = "Expiration date is required";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(buyerInfo.expiration)) {
      newErrors.expiration = "Expiration must be in MM/YY format";
    }
    if (!buyerInfo.cvv.trim()) newErrors.cvv = "CVV is required";
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

  const handleBack = () => setStep(1);

  const handleSubmit = async () => {
    const step2Errors = validateStep2();
    if (Object.keys(step2Errors).length > 0) {
      setErrors(step2Errors);
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Order confirmed", { buyerInfo, selectedProduct, quantity });
    setIsSubmitting(false);
    setOrderSubmitted(true);
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
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-center text-yellow-600 mb-4">
          Nutcha Bites
        </h1>
        <span
          className="material-symbols-outlined"
          onClick={() => navigate("/")}
        >
          close
        </span>
      </div>
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
          onBack={handleBack}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
};

export default OrderForm;
