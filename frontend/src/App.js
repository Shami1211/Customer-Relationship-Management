import React from "react";
import { Route, Routes } from "react-router";

import AddClient from "./Components/Customer_Relationship_Management/Client/Add-Client/AddClient";
import ClientDetails from "./Components/Customer_Relationship_Management/Client/Client/ClientDetails";
import UpdateDetails from "./Components/Customer_Relationship_Management/Client/Client/UpdateDetails";

import Home from "./Components/Customer_Relationship_Management/Home";

import AddSupplier from "./Components/Customer_Relationship_Management/Supplier/Add-Supplier/AddSupplier";
import SupplierDetails from "./Components/Customer_Relationship_Management/Supplier/Supplier/SupplierDetails";




function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>

        <Route path="/" element={<Home />} />
 

          {/*Client*/}
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/client-details" element={<ClientDetails />} />
          <Route path="/update/:id" component={UpdateDetails} />

          {/*Supplier*/}
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/supplier-details" element={<SupplierDetails />} />
          <Route path="/update/:id" component={UpdateDetails} />

   
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
