/* eslint-disable no-param-reassign */
import { generateId } from '../helpers/helpers';
import storage from '../datastorage/customer';
import Customer from '../models/customer';

export default class CustomerService {
  static findAllCustomer() {
    const { customers } = storage;
    if (!customers) return { status: 404, error: 'No customer to fetch' };
    return { status: 200, data: customers };
  }

  static createCustomer(data) {
    const { customers } = storage;
    data.id = generateId(customers);
    const newCustomer = new Customer(data);
    customers.push(newCustomer);
    const {
      id,
      firstname,
      lastname,
      phone,
    } = newCustomer;
    return {
      status: 201,
      data: [{
        id,
        firstname,
        lastname,
        phone,
      }],
      message: 'customer successfully added',
    };
  }

  static findOneCustomer(id) {
    const { customers } = storage;
    const customerExist = customers.find(customer => customer.id === parseInt(id, 10));
    if (!customerExist) return { status: 404, error: 'No such customer ID' };
    return { status: 200, data: [customerExist] };
  }

  static deleteOneCustomer(id) {
    const { customers } = storage;
    const customerExist = customers.find(customer => customer.id === parseInt(id, 10));
    if (!customerExist) return { status: 404, error: 'No such customer ID' };
    const customerIndex = customers.indexOf(customerExist);
    customers.splice(customerIndex, 1);
    return { status: 200, data: [customerExist], message: 'customer deleted successfully' };
  }
}
