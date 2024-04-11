import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
      // Handle successful update, redirect or show a success message
    } catch (error) {
      console.error("Error updating client details:", error);
      setError("Error updating client details");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="update-details-container">
      <h1>Update Client Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" name="name" value={clientDetails.name} onChange={handleChange} />
        <br />
        <label>Business Name</label>
        <input type="text" name="bname" value={clientDetails.bname} onChange={handleChange} />
        <br />
        <label>Email</label>
        <input type="email" name="email" value={clientDetails.email} onChange={handleChange} />
        <br />
        <label>Contact</label>
        <input type="text" name="contact" value={clientDetails.contact} onChange={handleChange} />
        <br />
        <label>Address</label>
        <input type="text" name="address" value={clientDetails.address} onChange={handleChange} />
        <br />
        <label>Tax</label>
        <input type="number" name="tax" value={clientDetails.tax} onChange={handleChange} />
        <br />
        <label>Recent Project</label>
        <input type="text" name="rproject" value={clientDetails.rproject} onChange={handleChange} />
        <br />
        <label>Current Project</label>
        <input type="text" name="cproject" value={clientDetails.cproject} onChange={handleChange} />
        <br />
        <label>Total</label>
        <input type="number" name="total" value={clientDetails.total} onChange={handleChange} />
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDetails;
