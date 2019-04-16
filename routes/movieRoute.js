/* eslint-disable linebreak-style */
import express from 'express';

import MovieController from '../controllers/movieController';

const router = express.Router();
const { getAllMovie, postMovie } = MovieController;

router.get('/', getAllMovie);
router.post('/', postMovie);

export default router;
