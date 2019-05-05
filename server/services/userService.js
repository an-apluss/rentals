/* eslint-disable no-param-reassign */
import {
  hashPassword,
  compareHashedPassword,
  generateId,
  generateToken,
} from '../helpers/helpers';
import storage from '../datastorage/user';
import User from '../models/user';

export default class UserService {
  static async createUser(data) {
    const { users } = storage;
    data.id = generateId(users);
    data.password = await hashPassword(data.password, 10);
    const newUser = new User(data);
    users.push(newUser);
    const {
      id,
      firstname,
      lastname,
      email,
      type,
    } = newUser;
    const token = generateToken(newUser);
    return {
      status: 201,
      data: [{
        token,
        id,
        firstname,
        lastname,
        email,
        type,
      }],
    };
  }

  static async loginUser(data) {
    const { users } = storage;
    const existUser = users.find(user => user.email === data.email);
    const existPassword = await compareHashedPassword(data.password, existUser.password);
    const {
      id,
      firstname,
      lastname,
      email,
      type,
    } = existUser;
    if (existPassword) {
      return {
        status: 200,
        data: [{
          token: generateToken(existUser),
          id,
          firstname,
          lastname,
          email,
          type,
        }],
      };
    }

    return {
      status: 401,
      error: 'Authentication Failed. Invalid Login credentials provided',
    };
  }
}
