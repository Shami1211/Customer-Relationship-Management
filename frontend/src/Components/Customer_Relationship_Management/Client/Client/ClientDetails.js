import React, { useState, useEffect, useRef  } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8080/clients";

const ClientDetails = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
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
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(URL);
      setClients(response.data.clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const handleSearch = () => {
    const filteredClients = clients.filter((client) =>
      Object.values(client).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setClients(filteredClients);
    setNoResults(filteredClients.length === 0);
  };

  const handleUpdate = (id) => {
    // Navigate to UpdateDetails page with the client ID
    navigate(`/update/${id}`);
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Update Data:", updateData); // Add this line for debugging
    try {
      await axios.put(`${URL}/${updateData.id}`, updateData);
      fetchClients(); // Refresh clients after update
      setUpdateData({
        id: "",
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
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedClients = clients.filter((client) => client._id !== id);
        setClients(updatedClients); // Update clients after delete
      } catch (error) {
        console.error("Error deleting client:", error);
      }
    }
  };

  /*PDF---------- */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Client Document",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled"),
  });

  return (
    <div className="clientdetails">
      <div className="admin_topic_client">
        Admin<span className="admin_sub_topic_client"> Dash Board</span>
      </div>
      <div className="client_details_body">
        <div className="btn_con_client">
        <Link to="/add-client">
          <button>Add Client</button>
        </Link>
           
          <button type="submit" className="client-add-btn-admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>
        <div className="search_box_client">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="serch_ipt"
            placeholder="Search Clients"
          />
          <button onClick={handleSearch} className="serchbtn">
            Search
          </button>
        </div>
        <div ref={summaryRef}>
          <div className="admin_topic_client">
            Client<span className="admin_sub_topic_client"> Details</span>
          </div>
          <br />
          <table className="client-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Business Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Tax</th>
                <th>Recent Project</th>
                <th>Current Project</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {noResults ? (
                <tr>
                  <td colSpan="10">No results found</td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client._id}>
                    <td>{client.name}</td>
                    <td>{client.bname}</td>
                    <td>{client.email}</td>
                    <td>{client.contact}</td>
                    <td>{client.address}</td>
                    <td>{client.tax}</td>
                    <td>{client.rproject}</td>
                    <td>{client.cproject}</td>
                    <td>{client.total}</td>
                    <td>
                      <button className="update_btn_client" onClick={() => handleUpdate(client._id)}>Update</button>
                      <button className="dlt_btn_client" onClick={() => handleDelete(client._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
