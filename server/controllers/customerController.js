/* eslint-disable linebreak-style */
import Joi from 'joi';
import dummydata from '../datastorage/customer';

class CustomerController {
  static getAllCustomer(req, res) {
    const customer = dummydata.customers;
    if (!customer) return res.json({ status: 404, error: 'No customer to fetch' });
    return res.json({ status: 200, data: customer });
  }

  static postCustomer(req, res) {
    const { customers } = dummydata;
    const lastCustomerId = customers[customers.length - 1].id;
    const newCustomerId = lastCustomerId + 1;
    const { firstname, lastname, phone } = req.body;
    const newCustomer = {
      id: newCustomerId, firstname, lastname, phone,
    };
    const schema = {
      firstname: Joi.string().required().trim(),
      lastname: Joi.string().required().trim(),
      phone: Joi.string().regex(/\+?([0-9]{3})?(0)?([0-9]{10})/).required().trim(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    customers.push(newCustomer);
    return res.json({ status: 201, data: newCustomer, message: 'customer successfully added' });
  }

  static getSingleCustomer(req, res) {
    const { id } = req.params;
    const customerExist = dummydata.customers.find(customer => customer.id === parseInt(id, 10));
    if (!customerExist) return res.json({ status: 404, error: 'No such customer ID' });
    return res.json({ status: 200, data: customerExist });
  }

  static deleteCustomer(req, res) {
    const { id } = req.params;
    const customerExist = dummydata.customers.find(customer => customer.id === parseInt(id, 10));
    if (!customerExist) return res.json({ status: 404, error: 'No such customer ID' });
    const customerIndex = dummydata.customers.indexOf(customerExist);
    dummydata.customers.splice(customerIndex, 1);
    return res.json({ status: 200, data: customerExist, message: 'customer deleted successfully' });
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
    return res.json({ status: 200, message: 'Customer updated successfully' });
  }
}

export default CustomerController;
