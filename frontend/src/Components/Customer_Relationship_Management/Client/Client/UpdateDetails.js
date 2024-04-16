import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  CircularProgress,
  Paper,
} from "@material-ui/core";

const UpdateDetails = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [clientDetails, setClientDetails] = useState({
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const fetchClientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/clients/${id}`);
      setClientDetails(response.data.client);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching client details:", error);
      setError("Error fetching client details");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/clients/${id}`, clientDetails);
      alert("Successfully uploaded client details");
      window.location.href = "/client-details";
    } catch (error) {
      console.error("Error updating client details:", error);
      setError("Error updating client details");
    }
  };

  if (loading) return <CircularProgress />;

  if (error) return <Typography variant="h6">{error}</Typography>;

  return (
    <div className="update-details-container">
      <div className="client-full-box">
        <Typography variant="h1" className="admin_topic_client">
          Update <span className="client-us">Client</span>
        </Typography>
        <div className="item_full_box">
          <form onSubmit={handleSubmit} className="item_form_admin">
            {/* Input fields for client information */}
            {/* Name */}
            <TextField
              label="Name"
              name="name"
              value={clientDetails.name}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Business Name */}
            <TextField
              label="Business Name"
              name="bname"
              value={clientDetails.bname}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Email */}
            <TextField
              type="email"
              label="Email"
              name="email"
              value={clientDetails.email}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Contact */}
            <TextField
              label="Contact"
              name="contact"
              value={clientDetails.contact}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Address */}
            <TextField
              label="Address"
              name="address"
              value={clientDetails.address}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Tax */}
            <TextField
              type="number"
              label="Tax"
              name="tax"
              value={clientDetails.tax}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Recent Project */}
            <TextField
              label="Recent Project"
              name="rproject"
              value={clientDetails.rproject}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Current Project */}
            <TextField
              label="Current Project"
              name="cproject"
              value={clientDetails.cproject}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            {/* Total */}
            <TextField
              type="number"
              label="Total"
              name="total"
              value={clientDetails.total}
              onChange={handleChange}
              className="form_box_item_input"
              required
            />
            <br />

            <Button type="submit" variant="contained" color="primary">
              Update Details
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
