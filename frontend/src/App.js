import React from "react";
import { Route, Routes } from "react-router";

import AddClient from "./Components/Customer_Relationship_Management/Client/Add-Client/AddClient";
import ClientDetails from "./Components/Customer_Relationship_Management/Client/Client/ClientDetails";
import ClientUpdateDetails from "./Components/Customer_Relationship_Management/Client/Client/UpdateDetails";
import Home from "./Components/Customer_Relationship_Management/Home";
import AddSupplier from "./Components/Customer_Relationship_Management/Supplier/Add-Supplier/AddSupplier";
import SupplierDetails from "./Components/Customer_Relationship_Management/Supplier/Supplier/SupplierDetails";
import SupplierUpdateDetails from "./Components/Customer_Relationship_Management/Supplier/Supplier/UpdateDetails";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />

          {/*Client*/}
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/client-details" element={<ClientDetails />} />
          <Route path="/updateclient/:id" element={<ClientUpdateDetails />} />

          {/*Supplier*/}
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/supplier-details" element={<SupplierDetails />} />
          <Route path="/updatesuplier/:id" element={<SupplierUpdateDetails/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
