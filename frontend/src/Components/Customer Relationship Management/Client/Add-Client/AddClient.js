import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../../Client.css"; // Assuming you have a CSS file for styling

function AddClient() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    bname: "",
    email: "",
    contact: "",
    address: "",
    tax: 0,
    rproject: "",
    cproject: "",
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
      !inputs.rproject ||
      !inputs.cproject ||
      !inputs.total
    ) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/clients", inputs);
      showAlert("Client added successfully!");
      navigate("/admin/clientdash");
    } catch (error) {
      console.error("Error adding client:", error);
      showAlert("Error adding client. Please try again.");
    }
  };

  const showAlert = (message) => {
    alert(message);
  };

  const handleViewClients = () => {
    navigate("/clients");
  };

  return (
    <div>
      <div className="client-full-box">
        <div>
          <h1 className="client-topic">
            Add <span className="client-us">Client</span>
          </h1>
          <form onSubmit={handleSubmit} className="client-full-box-form">
            {/* Input fields for client information */}
            {/* Name */}
            <label className="client-full-box-label">Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Business Name */}
            <label className="client-full-box-label">Business Name</label>
            <br />
            <input
              type="text"
              name="bname"
              value={inputs.bname}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Email */}
            <label className="client-full-box-label">Email</label>
            <br />
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Contact */}
            <label className="client-full-box-label">Contact</label>
            <br />
            <input
              type="text"
              name="contact"
              value={inputs.contact}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Address */}
            <label className="client-full-box-label">Address</label>
            <br />
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Tax */}
            <label className="client-full-box-label">Tax</label>
            <br />
            <input
              type="number"
              name="tax"
              value={inputs.tax}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Recent Project */}
            <label className="client-full-box-label">Recent Project</label>
            <br />
            <input
              type="text"
              name="rproject"
              value={inputs.rproject}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Current Project */}
            <label className="client-full-box-label">Current Project</label>
            <br />
            <input
              type="text"
              name="cproject"
              value={inputs.cproject}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            {/* Total */}
            <label className="client-full-box-label">Total</label>
            <br />
            <input
              type="number"
              name="total"
              value={inputs.total}
              onChange={handleChange}
              className="client-full-box-input"
              required
            />
            <br />

            <button type="submit" className="client-add-btn">
              Add Client
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClient;
