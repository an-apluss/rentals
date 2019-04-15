import express from 'express';

import CustomerController from '../controllers/customerController';

const router = express.Router();

router.get('/', CustomerController.getAllCustomer);
router.post('/', CustomerController.postCustomer);
router.get('/:id', CustomerController.getSingleCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

export default router;
