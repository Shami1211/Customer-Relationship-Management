import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="box_con_test">
        <div
          className="box_home_test"
          onClick={() => (window.location.href = "/client-details")}
        >
          <h3>Clients</h3>
        </div>

        <div
          className="box_home_test"
          onClick={() => (window.location.href = "/supplier-details")}
        >
          <h3>Suppliers</h3>
        </div>
      </div>
    </div>
  );
}
