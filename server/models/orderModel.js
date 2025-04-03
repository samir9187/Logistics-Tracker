import pool from '../config/db.js';

export const getAllOrders = async () => {
  const [orders] = await pool.query(`SELECT * FROM Orders`);
  return orders;
};

export const getOrderById = async (orderId) => {
  const [order] = await pool.query('SELECT * FROM Orders WHERE order_id = ?', [orderId]);
  return order.length ? order[0] : null;
};

export const getTrackingDetails = async (orderId) => {
  const [tracking] = await pool.query(
    'SELECT * FROM ShippingStatus WHERE order_id = ? ORDER BY timestamp DESC',
    [orderId]
  );
  return tracking;
};


export const addOrderStatus = async (orderId, status, location, notes) => {
    const connection = await pool.getConnection();
    try {
      await connection.query(
        'INSERT INTO ShippingStatus (order_id, status, location, timestamp, notes) VALUES (?, ?, ?, NOW(), ?)',
        [orderId, status, location, notes || null]
      );
      
      return true;
    } catch (error) {
      throw error;
    } finally {
      connection.release();
    }
  };

  export const createOrder = async (customer_id, name, phone_number, total_amount, shipping_address, items) => {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
  
      const [orderResult] = await connection.query(
        'INSERT INTO Orders (customer_id, name, phone_number, total_amount, shipping_address, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
        [customer_id, name, phone_number, total_amount, shipping_address]
      );
      const orderId = orderResult.insertId;
  
      for (const item of items) {
        await connection.query(
          'INSERT INTO OrderItems (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
        );
      }
  
      await connection.query(
        'INSERT INTO ShippingStatus (order_id, status, location, timestamp, notes) VALUES (?, ?, ?, NOW(), ?)',
        [orderId, 'Order Placed', 'System', 'Order received and processing initiated']
      );
  
      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  };
  