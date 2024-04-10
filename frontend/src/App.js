import React from "react";
import { Route, Routes } from "react-router";

import AddClient from "./Components/Customer_Relationship_Management/Client/add-Client/AddClient";




function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*Client*/}
          <Route path="/" element={<AddClient />} />
          <Route path="/client-details" element={<ClientDetails />} />
         
   
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
