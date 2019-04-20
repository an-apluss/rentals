/* eslint-disable linebreak-style */
import express from 'express';

import MovieController from '../controllers/movieController';

const router = express.Router();
const {
  getAllMovie, postMovie, getSingleMovie, deleteMovie, updateMovie,
} = MovieController;

router.get('/', getAllMovie);
router.post('/', postMovie);
router.get('/:id', getSingleMovie);
router.delete('/:id', deleteMovie);
router.put('/:id', updateMovie);

export default router;
