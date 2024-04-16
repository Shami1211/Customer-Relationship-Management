import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "../../Customer.css";
const URL = "http://localhost:8080/clients";

const ClientDetails = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [updateDataMap, setUpdateDataMap] = useState({});

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(URL);
      setClients(response.data.clients);
      // Initialize updateDataMap with empty objects for each client
      const map = {};
      response.data.clients.forEach((client) => {
        map[client._id] = {
          id: client._id,
          name: client.name,
          bname: client.bname,
          email: client.email,
          contact: client.contact,
          address: client.address,
          tax: client.tax,
          rproject: client.rproject,
          cproject: client.cproject,
          total: client.total,
        };
      });
      setUpdateDataMap(map);
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
    try {
      await axios.put(`${URL}/${id}`, updateDataMap[id]);
      // Refresh client data after update
      fetchClients();
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleChange = (newValue, id, name) => {
    setUpdateDataMap((prevMap) => ({
      ...prevMap,
      [id]: {
        ...prevMap[id],
        [name]: newValue,
      },
    }));
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
        <div className="action_admin_con">
          <div className="search_box_admin">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              name="search"
              className="serch_inpt"
              placeholder="Search Clients"
            />
            <button onClick={handleSearch} className="btn_dash_admin">
              Search
            </button>
          </div>
          <div className="btn_con_client">
            <Link to="/add-client">
              <button className="btn_dash_admin">Add Client</button>
            </Link>
            <button
              type="submit"
              className="btn_dash_admin"
              onClick={handlePrint}
            >
              Generate Report
            </button>
          </div>
        </div>
        <div ref={summaryRef}>
          <div className="admin_topic_client">
            Client<span className="admin_sub_topic_client"> Details</span>
          </div>
          <br />
          <table className="table_details_admin">
            <thead>
              <tr>
                <th className="admin_tbl_th">Name</th>
                <th className="admin_tbl_th">Business Name</th>
                <th className="admin_tbl_th">Email</th>
                <th className="admin_tbl_th">Contact</th>
                <th className="admin_tbl_th">Address</th>
                <th className="admin_tbl_th">Tax</th>
                <th className="admin_tbl_th">Recent Project</th>
                <th className="admin_tbl_th">Current Project</th>
                <th className="admin_tbl_th">Total</th>
                <th className="admin_tbl_th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {noResults ? (
                <tr>
                  <td className="admin_tbl_td" colSpan="10">
                    No results found
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client._id}>
                    <td className="admin_tbl_td">{client.name}</td>
                    <td className="admin_tbl_td">{client.bname}</td>
                    <td className="admin_tbl_td">{client.email}</td>
                    <td className="admin_tbl_td">{client.contact}</td>
                    <td className="admin_tbl_td">{client.address}</td>
                    <td className="admin_tbl_td">{client.tax}</td>
                    <td className="admin_tbl_td">{client.rproject}</td>
                    <td className="admin_tbl_td">{client.cproject}</td>
                    <td className="admin_tbl_td">{client.total}</td>
                    <td className="admin_tbl_td">
                      <Link
                        to={`/updateclient/${client._id}`}
                        className="btn_dash_admin"
                      >
                        Update
                      </Link>

                      <button
                        className="btn_dash_admin_dlt"
                        onClick={() => handleDelete(client._id)}
                      >
                        Delete
                      </button>
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
