import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function AddSupplier() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    bname: "",
    email: "",
    contact: "",
    address: "",
    tax: 0,
    total: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !inputs.name ||
      !inputs.bname ||
      !inputs.email ||
      !inputs.contact ||
      !inputs.address ||
      !inputs.tax ||
      !inputs.total
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/suppliers", inputs);
      showAlert("Supplier added successfully!");
      navigate("/supplier-details");
    } catch (error) {
      console.error("Error adding supplier:", error);
      showAlert("Error adding supplier. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewSuppliers = () => {
    navigate("/suppliers");
  };

  return (
    <div>
      <div className="supplier-full-box">
        <div>
          <h1 className="supplier-topic">
            Add <span className="supplier-us">Supplier</span>
          </h1>
          <form onSubmit={handleSubmit} className="supplier-full-box-form">
            {/* Input fields for supplier information */}
            {/* Name */}
            <label className="supplier-full-box-label">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="supplier-full-box-input"
              required
            />
            <br />

            {/* Business Name */}
            <label className="supplier-full-box-label">Business Name</label>
            <br />
            <input
              type="text"
              name="bname"
              value={inputs.bname}
              onChange={handleChange}
              className="supplier-full-box-input"
              required
            />
            <br />

            {/* Email */}
            <label className="supplier-full-box-label">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="supplier-full-box-input"
              required
            />
            <br />

            {/* Contact */}
            <label className="supplier-full-box-label">Contact</label>
            <br />
            <input
              type="text"
              name="contact"
              value={inputs.contact}
              onChange={handleChange}
              className="supplier-full-box-input"
              required
            />
            <br />

            {/* Address */}
            <label className="supplier-full-box-label">Address</label>
            <br />
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              className="supplier-full-box-input"
              required
            />
            <br />

            {/* Tax */}
            <label className="supplier-full-box-label">Tax</label>
            <br />
            <input
              type="number"
              name="tax"
              value={inputs.tax}
              onChange={handleChange}
              className="supplier-full-box-input"
              required
            />
            <br />

            {/* Total */}
            <label className="supplier-full-box-label">Total</label>
            <br />
            <input
              type="number"
              name="total"
              value={inputs.total}
              onChange={handleChange}
              className="supplier-full-box-input"
              required
            />
            <br />

            <button type="submit" className="supplier-add-btn">
              Add Supplier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSupplier;
