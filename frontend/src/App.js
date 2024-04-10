import React from "react";
import { Route, Routes } from "react-router";

import AddClient from "./";
import ItemDetails from "./Components/Items/Admin/Item/ItemDetails";
import DashBoard from "./Components/Items/User/DashBoard/DashBoard";


function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*Client*/}
          <Route path="/" element={<AddClient />} />
          <Route path="/admin/itemdash" element={<ItemDetails />} />
          <Route path="/" element={<DashBoard />} />
   
          <Route path="/getitem" element={<GetItem />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
