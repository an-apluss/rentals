/* eslint-disable linebreak-style */

import express from 'express';
import UserController from '../controllers/userController';

const { postSignup, postSignin } = UserController;

const router = express.Router();

router.post('/signup', postSignup);
router.post('/signin', postSignin);

export default router;
