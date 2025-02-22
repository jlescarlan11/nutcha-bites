// OrderForm.jsx
import React, { useState } from "react";

const OrderForm = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process order here
    console.log("Order submitted:", customerInfo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Order Information</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={customerInfo.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          name="address"
          value={customerInfo.address}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={customerInfo.email}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
