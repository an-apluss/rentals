/* eslint-disable linebreak-style */
import express from 'express';

import MovieController from '../controllers/movieController';

const router = express.Router();
const { getAllMovie } = MovieController;

router.get('/', getAllMovie);

export default router;
