import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

const UpdateDetails = () => {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/suppliers/${id}`
        );
        setInputs(response.data.supplier);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8080/suppliers/${id}`, {
        name: String(inputs.name),
        bname: String(inputs.bname),
        email: String(inputs.email),
        contact: String(inputs.contact),
        address: String(inputs.address),
        tax: String(inputs.tax),
        total: String(inputs.total),
        date: String(inputs.date),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("Update successfully!");
      history("/supplier-details");
    });
  };
  return (
    <div className="update-details-container">
      <h1 className="admin_topic_client">
        Update <span className="client-us">Supplier</span>
      </h1>
      <div className="item_full_box">
        <form onSubmit={handleSubmit} className="item_form_admin">
          <label className="form_box_item_lable">Name</label>
          <br />
          <input
            type="text"
            name="name"
            className="form_box_item_input"
            value={inputs.name}
            onChange={handleChange}
          />
          <br />

          {/* Business Name */}
          <label className="form_box_item_lable">Business Name</label>
          <br />
          <input
            type="text"
            name="bname"
            className="form_box_item_input"
            value={inputs.bname}
            onChange={handleChange}
          />
          <br />

          {/* Email */}
          <label className="form_box_item_lable">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            className="form_box_item_input"
            required
          />
          <br />

          {/* Contact */}
          <label className="form_box_item_lable">Contact</label>
          <br />
          <input
            type="text"
            name="contact"
            value={inputs.contact}
            onChange={handleChange}
            className="form_box_item_input"
            required
          />
          <br />

          {/* Address */}
          <label className="form_box_item_lable">Address</label>
          <br />
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={handleChange}
            className="form_box_item_input"
            required
          />
          <br />

          {/* Tax */}
          <label className="form_box_item_lable">Tax</label>
          <br />
          <input
            type="number"
            name="tax"
            value={inputs.tax}
            onChange={handleChange}
            className="form_box_item_input"
            required
          />
          <br />

       

          {/* Total */}
          <label className="form_box_item_lable">Total</label>
          <br />
          <input
            type="number"
            name="total"
            value={inputs.total}
            onChange={handleChange}
            className="form_box_item_input"
            required
          />
          <br />

          <button type="submit" className="admin_form_cneter_btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDetails;
