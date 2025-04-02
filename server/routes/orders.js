import express from 'express';
import { fetchOrders, fetchOrderById, createNewOrder, updateOrderStatus } from '../controllers/ordersController.js';

const router = express.Router();

router.get('/', fetchOrders);
router.get('/:id', fetchOrderById);
router.post('/', createNewOrder);
router.post('/:orderId/status', updateOrderStatus); 


export default router;
