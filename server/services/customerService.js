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
    };
  }
}
