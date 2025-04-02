// import React, { useState } from "react";
// import axios from "axios";

// const CreateOrder = () => {
  

//   const [customer_id, setCustomerId] = useState("");
//   const [total_amount, setTotalAmount] = useState("");
//   const [shipping_address, setShippingAddress] = useState("");
//   const [product_id, setProductId] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [price, setPrice] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const orderData = {
//       customer_id: Number(customer_id),
//       total_amount: Number(total_amount),
//       shipping_address,
//       items: [
//         {
//           product_id: Number(product_id),
//           quantity: Number(quantity),
//           price: Number(price),
//         },
//       ],
//     };

//     try {
//       const response = await axios.post("http://localhost:5000/api/orders", orderData);
//       setMessage(`Order created successfully! Order ID: ${response.data.order_id}`);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       setMessage("Failed to create order.");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create New Order</h2>
//       {message && <div className="alert alert-info">{message}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label className="form-label">Customer ID:</label>
//           <input type="number" className="form-control" value={customer_id} onChange={(e) => setCustomerId(e.target.value)} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Total Amount:</label>
//           <input type="number" className="form-control" value={total_amount} onChange={(e) => setTotalAmount(e.target.value)} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Shipping Address:</label>
//           <input type="text" className="form-control" value={shipping_address} onChange={(e) => setShippingAddress(e.target.value)} required />
//         </div>

//         <h4>Product Details</h4>
//         <div className="mb-3">
//           <label className="form-label">Product ID:</label>
//           <input type="number" className="form-control" value={product_id} onChange={(e) => setProductId(e.target.value)} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Quantity:</label>
//           <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">Price:</label>
//           <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
//         </div>

//         <button type="submit" className="btn btn-primary">
//           Create Order
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateOrder;
import React, { useState } from "react";
import axios from "axios";

const CreateOrder = () => {
  const [customer_id, setCustomerId] = useState("");
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [shipping_address, setShippingAddress] = useState("");
  const [product_id, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      customer_id: Number(customer_id),
      name,
      phone_number,
      total_amount: Number(total_amount),
      shipping_address,
      items: [
        {
          product_id: Number(product_id),
          quantity: Number(quantity),
          price: Number(price),
        },
      ],
    };

    try {
      const response = await axios.post("http://localhost:5000/api/orders", orderData);
      setMessage(`✅ Order created successfully! Order ID: ${response.data.order_id}`);
    } catch (error) {
      console.error("❌ Error creating order:", error);
      setMessage("⚠️ Failed to create order.");
    }
  };

  return (
    <div className="container">
      <h2>Create New Order</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer ID:</label>
          <input type="number" className="form-control" value={customer_id} onChange={(e) => setCustomerId(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Customer Name:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number:</label>
          <input type="text" className="form-control" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Total Amount:</label>
          <input type="number" className="form-control" value={total_amount} onChange={(e) => setTotalAmount(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Shipping Address:</label>
          <input type="text" className="form-control" value={shipping_address} onChange={(e) => setShippingAddress(e.target.value)} required />
        </div>

        <h4>Product Details</h4>
        <div className="mb-3">
          <label className="form-label">Product ID:</label>
          <input type="number" className="form-control" value={product_id} onChange={(e) => setProductId(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity:</label>
          <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
