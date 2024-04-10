import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the ..</h1>
      <div>
        <h2>Are you going to Add Client?(ADMIN)</h2>
        <Link to="/add-client">
          <button>Add Client</button>
        </Link>
        <Link to="/client-details">
          <button>View Clients</button>
        </Link>
        <h2>Are you going to Add Supplier?(ADMIN)</h2>
        <Link to="/add-supplier">
          <button>Add Supplier</button>
        </Link>
        <Link to="/supplier-details">
          <button>View Suppliers</button>
        </Link>
      </div>
    </div>
  );
}
