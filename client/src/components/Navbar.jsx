import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Logistics Tracker</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/create-order">Create Order</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">Customer Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Panel</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
