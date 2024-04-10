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

  useEffect(() => {
    fetchClientDetails();
  }, [id]);

  const fetchClientDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/clients/${id}`);
      setClientDetails(response.data.client);
    } catch (error) {
      console.error("Error fetching client details:", error);
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
    }
  };

  return (
    <div className="update-details-container">
      <h1>Update Client Details</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={clientDetails.name} onChange={handleChange} />
        <input type="text" name="bname" value={clientDetails.bname} onChange={handleChange} />
        {/* Add input fields for other client details */}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateDetails;
