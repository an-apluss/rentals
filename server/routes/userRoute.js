/* eslint-disable linebreak-style */

import express from 'express';
import UserController from '../controllers/userController';

const { postSignup } = UserController;

const router = express.Router();

router.post('/signup', postSignup);

export default router;
