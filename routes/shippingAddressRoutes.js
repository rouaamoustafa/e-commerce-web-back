import express from 'express';
import * as shippingAddressController from '../controllers/shippingAddressController.js';

const router = express.Router();

router.post('/', shippingAddressController.createShippingAddress);
router.get('/', shippingAddressController.getAllShippingAddresses);
router.get('/:id', shippingAddressController.getShippingAddressById);
router.put('/:id', shippingAddressController.updateShippingAddress);
router.delete('/:id', shippingAddressController.deleteShippingAddress);

export default router;