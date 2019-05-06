/* eslint-disable no-param-reassign */

import storage from '../datastorage/customer';

export default class CustomerService {
  static findAllCustomer() {
    const { customers } = storage;
    if (!customers) return { status: 404, error: 'No customer to fetch' };
    return { status: 200, data: customers };
  }
}
