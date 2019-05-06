/* eslint-disable no-param-reassign */
import {
  generateUserType,
  validateSignup,
  validateSignin,
} from '../helpers/helpers';
import storage from '../datastorage/user';

export default class UserValidator {
  static signupCheck(req, res, next) {
    const { users } = storage;
    req.body.type = generateUserType(req.body.type);
    if (req.path === '/createuser') {
      if (req.body.type !== 'admin' && req.body.type !== 'staff') return res.status(400).json({ status: 400, error: 'User type can only be Admin or Staff' });
    }
    if (req.body.type === false) return res.status(400).json({ status: 400, error: 'User type is invalid' });
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    const emailExist = users.find(user => user.email === req.body.email);
    if (emailExist) return res.status(409).json({ status: 409, error: 'Email Already Exist' });

    return next();
  }

  static signinCheck(req, res, next) {
    const { users } = storage;
    const { error } = validateSignin(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    const userExist = users.find(user => user.email === req.body.email);
    if (!userExist) return res.status(401).json({ status: 401, error: 'Authentication Failed. Invalid Login credentials provided' });

    return next();
  }
}
