/* eslint-disable linebreak-style */
import Joi from 'joi';
import dummydata from '../datastorage/customer';
import customerService from '../services/customerService';

class CustomerController {
  static getAllCustomer(req, res) {
    const response = customerService.findAllCustomer();
    return res.status(response.status).json(response);
  }

  static postCustomer(req, res) {
    const response = customerService.createCustomer(req.body);
    return res.status(response.status).json(response);
  }

  static getSingleCustomer(req, res) {
    const response = customerService.findOneCustomer(req.params.id);
    return res.status(response.status).json(response);
  }

  static deleteCustomer(req, res) {
    const response = customerService.deleteOneCustomer(req.params.id);
    return res.status(response.status).json(response);
  }

  static updateCustomer(req, res) {
    const { id } = req.params;
    const customerExist = dummydata.customers.find(customer => customer.id === parseInt(id, 10));
    if (!customerExist) return res.json({ status: 404, error: 'No such customer ID' });
    const schema = {
      firstname: Joi.string(),
      lastname: Joi.string(),
      phone: Joi.string().regex(/\+?([0-9]{3})?(0)?([0-9]{10})/),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    const { firstname, lastname, phone } = req.body;
    customerExist.firstname = firstname || customerExist.firstname;
    customerExist.lastname = lastname || customerExist.lastname;
    customerExist.phone = phone || customerExist.phone;
    return res.json({ status: 200, data: customerExist, message: 'Customer updated successfully' });
  }
}

export default CustomerController;
