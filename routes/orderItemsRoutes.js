import express from 'express';
import {
    createOrderItem,
    getAllOrderItems,
    getOrderItemById,
    getOrderItemsByOrderId,
    updateOrderItem,
    deleteOrderItem
} from '../controllers/orderItemsController.js';

const router = express.Router();

router.post('/', createOrderItem); 
router.get('/', getAllOrderItems); 
router.get('/:id', getOrderItemById);
router.get('/byOrder/:orderId', getOrderItemsByOrderId);
router.put('/:id', updateOrderItem); 
router.delete('/:id', deleteOrderItem); 


export default router;
