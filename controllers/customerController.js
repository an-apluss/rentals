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
}

export default CustomerController;
