import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      console.log('Fetching order data for ID:', orderId);
      const response = await axios.get(`http://localhost:5000/api/orders/${orderId}`);
      // console.log('Response data:', response.data); 
      setOrderData(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching order data:', err);
      setError('Order not found!');
      setOrderData(null);
    }
  };

  return (
    <div>
      <h2>Order Tracker</h2>
      <div className="form-group">
        <label htmlFor="orderId">Enter Order ID:</label>
        <input
          type="text"
          className="form-control"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your Order ID"
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleSearch}>
        Track Order
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {orderData && (
        <div className="mt-4">
          <h4>Order ID: {orderData.order.order_id}</h4>
          <p>Status: {orderData.order.status}</p>
          <p>Shipping Address: {orderData.order.shipping_address}</p>
          <p>Order Placed At: {new Date(orderData.order.created_at).toLocaleString()}</p>
          
          <h5 className="mt-4">Tracking History</h5>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Status</th>
                <th>Location</th>
                <th>Timestamp</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {orderData.tracking.map((track, index) => (
                <tr key={track.status_id}>
                  <td>{track.status}</td>
                  <td>{track.location}</td>
                  <td>{new Date(track.timestamp).toLocaleString()}</td>
                  <td>{track.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
