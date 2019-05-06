/* eslint-disable linebreak-style */
import { verifyToken } from '../helpers/helpers';

export default class Auth {
  static getUser(req, res, next) {
    if (!req.header('Authorization')) res.status(401).json({ status: 401, error: 'Access denied: No token provided' });
    try {
      const token = req.header('Authorization').split(' ')[1];
      const decode = verifyToken(token);
      req.user = decode;
      return next();
    } catch (ex) {
      return res.status(401).json({
        status: 401,
        error: 'Access denied: No token provided',
      });
    }
  }

  static adminCheck(req, res, next) {
    if (req.user.type === 'admin') return next();
    return res.status(401).json({
      status: 401,
      error: 'Access Denied. You are unauthorized to perform this Action',
    });
  }
}
