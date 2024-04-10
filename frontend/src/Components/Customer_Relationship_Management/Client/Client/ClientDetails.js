import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "../../Client.css"; // Assuming you have a CSS file for styling
const URL = "http://localhost:8080/clients";

const ClientDetails = () => {
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

  const handleUpdate = async (id) => {
    const selectedClient = clients.find((client) => client._id === id);
    if (selectedClient) {
      setUpdateData({
        id: selectedClient._id,
        name: selectedClient.name,
        bname: selectedClient.bname,
        email: selectedClient.email,
        contact: selectedClient.contact,
        address: selectedClient.address,
        tax: selectedClient.tax,
        rproject: selectedClient.rproject,
        cproject: selectedClient.cproject,
        total: selectedClient.total,
      });
    }
  };

  const handleChange = (newValue, name) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <button
            type="submit"
            className="client-add-btn-admin"
            onClick={() => (window.location.href = "/admin/addclient")}
          >
            Add Client
          </button>
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
          <div className="card_set_client">
            {noResults ? (
              <h1 className="client-topic">
                No results <span className="client-us">found</span>
              </h1>
            ) : (
              clients.map((client) => (
                <div>
                  <div className="">
                    <div key={client._id} className="card_client">
                      <p className="clname">{client.name}</p>
                      <div className="details_card_client">
                        <p className="card_details_client">
                          <b>Business Name:</b> {client.bname}
                        </p>
                        <p className="card_details_client">
                          <b>Email:</b> {client.email}
                        </p>
                        <p className="card_details_client">
                          <b>Contact:</b> {client.contact}
                        </p>
                        <p className="card_details_client">
                          <b>Address:</b> {client.address}
                        </p>
                        <p className="card_details_client">
                          <b>Tax:</b> {client.tax}
                        </p>
                        <p className="card_details_client">
                          <b>Recent Project:</b> {client.rproject}
                        </p>
                        <p className="card_details_client">
                          <b>Current Project:</b> {client.cproject}
                        </p>
                        <p className="card_details_client">
                          <b>Total:</b> {client.total}
                        </p>
                      </div>

                      <div className="btn_box_client">
                        <button
                          className="update_btn_client"
                          onClick={() => handleUpdate(client._id)}
                        >
                          Update
                        </button>
                        <button
                          className="dlt_btn_client"
                          onClick={() => handleDelete(client._id)}
                        >
                          Delete
                        </button>
                      </div>
                      {updateData.id === client._id && (
                        <form className="update_form_client" onSubmit={handleSubmit}>
                          <hr />
                          <br />
                          <label className="client-full-box-label">Name</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="text"
                            name="name"
                            value={updateData.name}
                            onChange={(e) => handleChange(e.target.value, "name")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Business Name</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="text"
                            name="bname"
                            value={updateData.bname}
                            onChange={(e) => handleChange(e.target.value, "bname")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Email</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="email"
                            name="email"
                            value={updateData.email}
                            onChange={(e) => handleChange(e.target.value, "email")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Contact</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="text"
                            name="contact"
                            value={updateData.contact}
                            onChange={(e) => handleChange(e.target.value, "contact")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Address</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="text"
                            name="address"
                            value={updateData.address}
                            onChange={(e) => handleChange(e.target.value, "address")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Tax</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="number"
                            name="tax"
                            value={updateData.tax}
                            onChange={(e) => handleChange(e.target.value, "tax")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Recent Project</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="text"
                            name="rproject"
                            value={updateData.rproject}
                            onChange={(e) => handleChange(e.target.value, "rproject")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Current Project</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="text"
                            name="cproject"
                            value={updateData.cproject}
                            onChange={(e) => handleChange(e.target.value, "cproject")}
                            required
                          />
                          <br />
                          <label className="client-full-box-label">Total</label>
                          <br />
                          <input
                            className="client-full-box-input_update"
                            type="number"
                            name="total"
                            value={updateData.total}
                            onChange={(e) => handleChange(e.target.value, "total")}
                            required
                          />
                          <br />
                          <button type="submit" className="client-add-btn">
                            Save
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
