import dummydata from '../datastorage/customer';

class CustomerController {
  static getAllCustomer(req, res) {
    const customer = dummydata.customers;
    if (!customer) return res.json({ status: 404, error: 'No customer to fetch' });
    return res.json({ status: 200, data: customer });
  }
}

export default CustomerController;
