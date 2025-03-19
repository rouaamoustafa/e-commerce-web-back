import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
} from '../controllers/ordersController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);
router.delete('/:id', deleteOrder);

export default router;
