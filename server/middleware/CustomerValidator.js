
/* eslint-disable linebreak-style */
import { validateRegisterCustomer } from '../helpers/helpers';

export default class CustomerValidation {
  static checkRegister(req, res, next) {
    const { error } = validateRegisterCustomer(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    return next();
  }
}
