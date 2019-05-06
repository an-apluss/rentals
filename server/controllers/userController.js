/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import UserService from '../services/userService';

class UserController {
  async postSignup(req, res, next) {
    try {
      const response = await UserService.createUser(req.body);
      return res.status(response.status).json(response);
    } catch (ex) {
      return next(ex);
    }
  }

  async postSignin(req, res, next) {
    try {
      const response = await UserService.loginUser(req.body);
      return res.status(response.status).json(response);
    } catch (ex) {
      return next(ex);
    }
  }
}

export default new UserController();
