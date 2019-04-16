/* eslint-disable linebreak-style */
import express from 'express';

import MovieController from '../controllers/movieController';

const router = express.Router();
const { getAllMovie, postMovie, getSingleMovie } = MovieController;

router.get('/', getAllMovie);
router.post('/', postMovie);
router.get('/:id', getSingleMovie);

export default router;
