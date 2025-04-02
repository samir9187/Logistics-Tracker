import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleUpdateStatus = async () => {
    if (!status || !location) {
      setError(' Status and Location are required.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/orders/${orderId}/status`, {
        status,
        location,
        notes,
      });
      setMessage(` ${response.data.message}`);
      setError('');
    } catch (err) {
      setError(' Failed to update order status.');
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Admin Panel - Update Order Status</h2>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group mt-3">
        <label htmlFor="orderId">Order ID:</label>
        <input
          type="text"
          className="form-control"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="status">Status:</label>
        <select
          className="form-control"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Select Status</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Packed">Packed</option>
          <option value="Product Shipped">Product Shipped</option>
          <option value="Product in Transit">Product in Transit</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Product Delivered">Product Delivered</option>
        </select>
      </div>

      <div className="form-group mt-3">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          className="form-control"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter Location"
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="notes">Notes:</label>
        <textarea
          className="form-control"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter any additional notes"
        />
      </div>

      <button className="btn btn-primary mt-3" onClick={handleUpdateStatus}>
        Update Status
      </button>
    </div>
  );
};

export default AdminPanel;
