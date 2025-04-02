import pool from '../config/db.js';
import twilioClient from '../config/twilio.js';
import { getAllOrders, getOrderById, getTrackingDetails, createOrder, addOrderStatus } from '../models/orderModel.js';

const formatPhoneNumber = (phone) => {
  phone = phone.trim();
  if (phone.startsWith('+')) return phone;
  return `+91${phone}`;
};

const isValidPhoneNumber = (phone) => /^\+\d{10,15}$/.test(phone);

export const fetchOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

export const fetchOrderById = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const tracking = await getTrackingDetails(req.params.id);
    res.json({ order, tracking });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order details' });
  }
};


export const updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status, location, notes } = req.body;
  
    if (!status || !location) {
      return res.status(400).json({ error: 'Status and location are required' });
    }
  
    try {
      await addOrderStatus(orderId, status, location, notes);
  
      let customerPhone = null;
      let customerName = 'Customer';
  
      try {
        const [orderDetails] = await pool.query(
            `SELECT name, phone_number 
             FROM Orders 
             WHERE order_id = ?`,
            [orderId]
          );
          
          
      
  
          if (orderDetails.length > 0) {
            customerName = orderDetails[0].name || "Customer"; 
            customerPhone = orderDetails[0].phone_number ? formatPhoneNumber(orderDetails[0].phone_number) : null;
          
            if (!customerPhone) {
              console.warn(` No valid phone number found for order #${orderId}. Skipping SMS notification.`);
            } else {
              console.log(` Sending SMS to: ${customerPhone} (Order #${orderId})`);
            }
          } else {
            console.warn(` No customer details found for order #${orderId}`);
          }
          
      } catch (dbError) {
        console.error('Failed to fetch customer details:', dbError.message);
      }
  
      if (!customerPhone || !isValidPhoneNumber(customerPhone)) {
        console.warn(' No valid phone number found. Skipping SMS notification.');
        return res.status(200).json({ message: 'Order status updated, but no SMS sent due to missing/invalid phone number.' });
      }
  
      const message = `Hi ${customerName}, your order #${orderId} status: ${status}. Location: ${location}${notes ? '. Notes: ' + notes : ''}`;
  
      try {
        await twilioClient.messages.create({
          body: message,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: customerPhone
        });
        console.log(`SMS sent to ${customerPhone} for order #${orderId}`);
      } catch (twilioError) {
        console.error(' Failed to send SMS:', twilioError.message);
      }
  
      res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  };

  export const createNewOrder = async (req, res) => {
    const { customer_id, name, phone_number, items, total_amount, shipping_address } = req.body;
  
    if (!customer_id || !name || !phone_number || !items || !total_amount || !shipping_address) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    try {
      const orderId = await createOrder(customer_id, name, phone_number, total_amount, shipping_address, items);
  
      const customerPhone = formatPhoneNumber(phone_number);
      if (isValidPhoneNumber(customerPhone)) {
        try {
          await twilioClient.messages.create({
            body: `Hello ${name}, your order #${orderId} has been received and is being processed.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: customerPhone,
          });
          console.log(` SMS sent to ${customerPhone} for order #${orderId}`);
        } catch (twilioError) {
          console.error(" Failed to send SMS:", twilioError.message);
        }
      } else {
        console.warn(` Invalid phone number for customer ${customer_id}`);
      }
  
      res.status(201).json({ order_id: orderId, status: "Order Placed", message: "Order created successfully" });
    } catch (error) {
      console.error(" Error creating order:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  };
  