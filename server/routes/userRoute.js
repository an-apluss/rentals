/* eslint-disable linebreak-style */

import express from 'express';
import Auth from '../middleware/Auth';
import UserValidation from '../middleware/UserValidator';
import UserController from '../controllers/userController';

const { signupCheck, signinCheck } = UserValidation;
const { postSignup, postSignin } = UserController;
const {
  getUser,
  adminCheck,
} = Auth;

const router = express.Router();

router.post('/signup', signupCheck, postSignup);
router.post('/signin', signinCheck, postSignin);
router.post('/createuser', getUser, adminCheck, signupCheck, postSignup);

export default router;
