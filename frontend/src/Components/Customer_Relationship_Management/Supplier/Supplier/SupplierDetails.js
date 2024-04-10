import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
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
        const updatedSuppliers = suppliers.filter((supplier) => supplier._id !== id);
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
    <div className="supplier-details">
      <div className="admin_topic_supplier">
        Admin<span className="admin_sub_topic_supplier"> Dashboard</span>
      </div>
      <div className="supplier_details_body">
        <div className="btn_con_supplier">
        <Link to="/add-supplier">
          <button>Add Client</button>
        </Link>
          <button type="submit" className="supplier-add-btn-admin" onClick={handlePrint}>
            Generate Report
          </button>
        </div>
        <div className="search_box_supplier">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="search_ipt"
            placeholder="Search Suppliers"
          />
          <button onClick={handleSearch} className="searchbtn">
            Search
          </button>
        </div>
        <div ref={summaryRef}>
          <div className="admin_topic_supplier">
            Supplier<span className="admin_sub_topic_supplier"> Details</span>
          </div>
          <br />
          <table className="supplier-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Business Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Tax</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {noResults ? (
                <tr>
                  <td colSpan="8">No results found</td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr key={supplier._id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.bname}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.contact}</td>
                    <td>{supplier.address}</td>
                    <td>{supplier.tax}</td>
                    <td>{supplier.total}</td>
                    <td>
                      <button className="update_btn_supplier" onClick={() => handleUpdate(supplier._id)}>Update</button>
                      <button className="dlt_btn_supplier" onClick={() => handleDelete(supplier._id)}>Delete</button>
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
