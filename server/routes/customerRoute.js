/* eslint-disable linebreak-style */

import express from 'express';

import CustomerController from '../controllers/customerController';
import CustomerValidation from '../middleware/CustomerValidator';

const router = express.Router();

const {
  getAllCustomer,
  postCustomer,
  getSingleCustomer,
  deleteCustomer,
  updateCustomer,
} = CustomerController;

const { checkRegister } = CustomerValidation;

router.get('/', getAllCustomer);
router.post('/', checkRegister, postCustomer);
router.get('/:id', getSingleCustomer);
router.delete('/:id', deleteCustomer);
router.put('/:id', updateCustomer);

export default router;
