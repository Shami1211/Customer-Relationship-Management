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
      alert("Successfully uploaded client details");
      window.location.href = "/client-details";
    } catch (error) {
      console.error("Error updating client details:", error);
      setError("Error updating client details");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="update-details-container">
      <div className="client-full-box">
        <div>
          <h1 className="admin_topic_client">
            Update <span className="client-us">Client</span>
          </h1>
          <div className="item_full_box">
            <form onSubmit={handleSubmit} className="item_form_admin">
              {/* Input fields for client information */}
              {/* Name */}
              <label className="form_box_item_lable">Name</label>
              <br />
              <input
                type="text"
                name="name"
                value={clientDetails.name}
                onChange={handleChange}
                className="form_box_item_input"
                required
              />
              <br />

              {/* Business Name */}
              <label className="form_box_item_lable">Business Name</label>
              <br />
              <input
                type="text"
                name="bname"
                value={clientDetails.bname}
                onChange={handleChange}
                className="form_box_item_input"
                required
              />
              <br />

              {/* Email */}
              <label className="form_box_item_lable">Email</label>
              <br />
              <input
                type="email"
                name="email"
                value={clientDetails.email}
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
                value={clientDetails.contact}
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
                value={clientDetails.address}
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
                value={clientDetails.tax}
                onChange={handleChange}
                className="form_box_item_input"
                required
              />
              <br />

              {/* Recent Project */}
              <label className="form_box_item_lable">Recent Project</label>
              <br />
              <input
                type="text"
                name="rproject"
                value={clientDetails.rproject}
                onChange={handleChange}
                className="form_box_item_input"
                required
              />
              <br />

              {/* Current Project */}
              <label className="form_box_item_lable">Current Project</label>
              <br />
              <input
                type="text"
                name="cproject"
                value={clientDetails.cproject}
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
                value={clientDetails.total}
                onChange={handleChange}
                className="form_box_item_input"
                required
              />
              <br />

              <button type="submit" className="admin_form_cneter_btn">
                Update Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetails;
