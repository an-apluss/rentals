/* eslint-disable class-methods-use-this */
/* eslint-disable linebreak-style */
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import { generateId, hashPassword, generateUserType } from '../helpers/helpers';

class User {
  constructor() {
    this.users = [
      {
        id: 1, firstname: 'Anu', lastname: 'Akin', password: '$2b$10$v9WDyrkYXE6kOpJumrWpO.LC..mvVejWEhz2eInkqvQuud74cxJYy', email: 'ann@gmail.com', type: 'admin',
      },
      {
        id: 2, firstname: 'Titi', lastname: 'Bankole', password: '$2b$10$v9WDyrkYXE6kOpJumrWpO.LC..mvVejWEhz2eInkqvQuud74cxJYy', email: 'titi@gmail.com', type: 'staff',
      },
      {
        id: 3, firstname: 'Lola', lastname: 'Kalejaiye', password: '$2b$10$v9WDyrkYXE6kOpJumrWpO.LC..mvVejWEhz2eInkqvQuud74cxJYy', email: 'lola@gmail.com', type: 'client',
      },
    ];
  }

  fetchAll() {
    return this.users;
  }

  async create(data) {
    const newUser = {
      id: generateId(this.users),
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
      email: data.email,
      type: data.type || false,
    };
    newUser.type = generateUserType(newUser.type);
    if (newUser.type === 'unallowed') return false;
    newUser.password = await hashPassword(newUser.password, 10);
    await this.users.push(newUser);
    return newUser;
  }

  fetchOne(id) {
    return this.users.find(user => user.id === id);
  }

  async update(id, data) {
    // eslint-disable-next-line no-param-reassign
    data.type = generateUserType(data.type);
    if (data.type === 'unallowed') return false;
    const user = await this.fetchOne(id);
    const userIndex = await this.users.indexOf(user);
    this.users[userIndex].firstname = data.firstname || user.firstname;
    this.users[userIndex].lastname = data.lastname || user.lastname;
    this.users[userIndex].email = data.email || user.email;
    this.users[userIndex].password = await hashPassword(data.password) || user.password;
    this.users[userIndex].type = data.type || user.type;
    return this.users[userIndex];
  }

  delete(id) {
    const user = this.fetchOne(id);
    const userIndex = this.users.indexOf(user);
    return this.users.splice(userIndex, 1);
  }
}

const validateSignup = (user) => {
  const schema = {
    firstname: Joi.string().regex(/^[a-z]+$/i).required(),
    lastname: Joi.string().regex(/^[a-z]+$/i).required(),
    password: Joi.string().alphanum().min(6).required(),
    email: Joi.string().email().required(),
    type: Joi.string(),
  };
  return Joi.validate(user, schema);
};

const validateSignin = (user) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).required(),
  };
  return Joi.validate(user, schema);
};

const generateAuthToken = (user) => {
  const token = jwt.sign({ id: user.id, type: user.type }, process.env.JWTPRIVATEKEY);
  return token;
};

export {
  User,
  validateSignup,
  validateSignin,
  generateAuthToken,
};
