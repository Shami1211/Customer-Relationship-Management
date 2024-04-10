import React from "react";
import { Route, Routes } from "react-router";

import AddItem from "./Components/Items/Admin/Add-Items/AddItem";
import ItemDetails from "./Components/Items/Admin/Item/ItemDetails";
import DashBoard from "./Components/Items/User/DashBoard/DashBoard";

import HelmetsDetails from "./Components/Items/User/DashBoard/HelmetsDetails";
import PadsDetails from "./Components/Items/User/DashBoard/PadsDetails";
import ShoesDetails from "./Components/Items/User/DashBoard/ShoesDetails";
import GetItem from "./Components/Items/User/GetItem/GetItem";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*Items*/}
          <Route path="/admin/additem" element={<AddItem />} />
          <Route path="/admin/itemdash" element={<ItemDetails />} />
          <Route path="/" element={<DashBoard />} />
   
          <Route path="/getitem" element={<GetItem />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
