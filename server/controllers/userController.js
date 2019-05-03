/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import bycrpt from 'bcrypt';
import {
  User,
  validateSignup,
  validateSignin,
  generateAuthToken,
} from '../models/user';

class UserController {
  async postSignup(req, res) {
    const user = new User();
    const { error } = validateSignup(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    const emailExist = user.fetchAll().find(u => u.email === req.body.email);
    if (emailExist) return res.status(409).json({ status: 409, error: 'Email Already Exist' });
    const newUser = await user.create(req.body);
    if (!newUser) return res.status(400).json({ status: 400, error: 'Incorrect User Type' });
    const token = generateAuthToken(newUser);
    return res.status(201).json({ status: 201, data: [{ token, user: newUser }], message: 'User Successfully Created' });
  }

  async postSignin(req, res) {
    const user = new User();
    const { error } = validateSignin(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    const userExist = user.fetchAll().find(u => u.email === req.body.email);
    if (!userExist) {
      return res.status(400).json({ status: 400, error: 'Email or Password is Incorrect' });
    }
    const validPassword = await bycrpt.compare(req.body.password, userExist.password);
    if (!validPassword) {
      return res.status(400).json({ status: 400, error: 'Email or Password is Incorrect' });
    }
    return res.status(200).json({ status: 200, data: [{ token: generateAuthToken(userExist) }] });
  }
}

export default new UserController();
