import dummydata from '../datastorage/customer';

class CustomerController {
  static getAllCustomer(req, res) {
    const customer = dummydata.customers;
    if (!customer) return res.json({ status: 404, error: 'No customer to fetch' });
    return res.json({ status: 200, data: customer });
  }

  static postCustomer(req, res) {
    const lastCustomerId = dummydata.customers[dummydata.customers.length - 1].id;
    const newCustomerId = lastCustomerId + 1;
    const { firstname, lastname, phone } = req.body;
    const newCustomer = {
      id: newCustomerId, firstname, lastname, phone,
    };
    const insertNewCustomer = dummydata.customers.push(newCustomer);
    if (!insertNewCustomer) return res.json({ status: 401, error: 'Customer cannot be added' });
    return res.json({ status: 201, message: 'customer successfully added' });
  }
}

export default CustomerController;
