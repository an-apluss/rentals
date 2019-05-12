/* eslint-disable linebreak-style */
import Joi from 'joi';
import 'dotenv/config';
import bycrpt from 'bcrypt';
import jwt from 'jsonwebtoken';

const hashPassword = async (plaintext, salt) => {
  const gensalt = await bycrpt.genSalt(salt);
  const password = await bycrpt.hash(plaintext, gensalt);
  return password;
};

const compareHashedPassword = async (plainTextPassword, hashedPassword) => {
  const comparedPassword = await bycrpt.compare(plainTextPassword, hashedPassword);
  return comparedPassword;
};

const generateId = (data) => {
  const lastId = data[data.length - 1].id;
  const newId = lastId + 1;
  return newId;
};

const generateUserType = (userType) => {
  if (typeof userType === 'undefined') return 'client';
  userType.toString().toLowerCase();
  if (userType === 'admin') return 'admin';
  if (userType === 'staff') return 'staff';
  return false;
};

const validateSignup = (user) => {
  const schema = {
    firstname: Joi.string().regex(/^[a-z]+$/i).required(),
    lastname: Joi.string().regex(/^[a-z]+$/i).required(),
    password: Joi.string().alphanum().min(6).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    type: Joi.string().required(),
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

const validateRegisterCustomer = (customer) => {
  const schema = {
    firstname: Joi.string().required().trim(),
    lastname: Joi.string().required().trim(),
    phone: Joi.string().regex(/\+?([0-9]{3})?(0)?([0-9]{10})/).required().trim(),
  };
  return Joi.validate(customer, schema);
};

const validateUpdateCustomer = (customer) => {
  const schema = {
    firstname: Joi.string(),
    lastname: Joi.string(),
    phone: Joi.string().regex(/\+?([0-9]{3})?(0)?([0-9]{10})/),
  };
  return Joi.validate(customer, schema);
};

const validateRegisterGenre = (genre) => {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(genre, schema);
};

const validateUpdateGenre = (genre) => {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(genre, schema);
};

const generateToken = (user) => {
  const token = jwt.sign({
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    type: user.type,
    email: user.email,
  }, process.env.JWTPRIVATEKEY, { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  const decode = jwt.verify(token, process.env.JWTPRIVATEKEY);
  return decode;
};

export {
  hashPassword,
  compareHashedPassword,
  generateId,
  generateUserType,
  validateSignup,
  validateSignin,
  validateRegisterCustomer,
  validateUpdateCustomer,
  validateRegisterGenre,
  validateUpdateGenre,
  generateToken,
  verifyToken,
};
