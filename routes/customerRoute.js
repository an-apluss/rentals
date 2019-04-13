import express from 'express';

import CustomerController from '../controllers/customerController';

const router = express.Router();

router.get('/', CustomerController.getAllCustomer);
router.post('/', CustomerController.postCustomer);

export default router;
