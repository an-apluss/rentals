/* eslint-disable linebreak-style */
import customerService from '../services/customerService';

export default class CustomerController {
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
    const response = customerService.updateOneCustomer(req.params.id, req.body);
    return res.status(response.status).json(response);
  }
}
