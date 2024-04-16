import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:8080/suppliers";

const SupplierDetails = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
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
    total: 0,
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(URL);
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleSearch = () => {
    const filteredSuppliers = suppliers.filter((supplier) =>
      Object.values(supplier).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setSuppliers(filteredSuppliers);
    setNoResults(filteredSuppliers.length === 0);
  };

  const handleUpdate = (id) => {
    // Navigate to UpdateDetails page with the supplier ID
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
      fetchSuppliers(); // Refresh suppliers after update
      setUpdateData({
        id: "",
        name: "",
        bname: "",
        email: "",
        contact: "",
        address: "",
        tax: 0,
        total: 0,
      });
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        const updatedSuppliers = suppliers.filter(
          (supplier) => supplier._id !== id
        );
        setSuppliers(updatedSuppliers); // Update suppliers after delete
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  /*PDF---------- */
  const summaryRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => summaryRef.current,
    documentTitle: "Supplier Document",
    onAfterPrint: () => alert("Successfully Downloaded!"),
    onClose: () => alert("Print canceled"),
  });

  return (
    <div className="clientdetails">
      <div className="admin_topic_client">
        Admin<span className="admin_sub_topic_supplier"> Dashboard</span>
      </div>
      <div className="supplier_details_body">
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
            <Link to="/add-supplier">
              <button className="btn_dash_admin">Add Supplier</button>
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
            Supplier<span className="admin_sub_topic_client"> Details</span>
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
                <th className="admin_tbl_th">Total</th>
                <th className="admin_tbl_th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {noResults ? (
                <tr>
                  <td className="admin_tbl_td" colSpan="8">
                    No results found
                  </td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr key={supplier._id}>
                    <td className="admin_tbl_td">{supplier.name}</td>
                    <td className="admin_tbl_td">{supplier.bname}</td>
                    <td className="admin_tbl_td">{supplier.email}</td>
                    <td className="admin_tbl_td">{supplier.contact}</td>
                    <td className="admin_tbl_td">{supplier.address}</td>
                    <td className="admin_tbl_td">{supplier.tax}</td>
                    <td className="admin_tbl_td">{supplier.total}</td>
                    <td className="admin_tbl_td">
                     
                      <Link
                        to={`/updatesuplier/${supplier._id}`}
                        className="btn_dash_admin"
                      >
                        Update
                      </Link>
                      <button
                        className="btn_dash_admin_dlt"
                        onClick={() => handleDelete(supplier._id)}
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

export default SupplierDetails;
