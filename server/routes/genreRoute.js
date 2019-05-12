/* eslint-disable linebreak-style */
import express from 'express';

import GenreController from '../controllers/genreController';
import GenreValidation from '../middleware/GenreValidator';

const router = express.Router();

const {
  getSingleGenre,
  updateGenre,
  deleteGenre,
  getAllgenre,
  postGenre,
} = GenreController;

const {
  checkGenreRegister,
  checkGenreUpdate,
} = GenreValidation;

router.get('/:id', getSingleGenre);
router.put('/:id', checkGenreUpdate, updateGenre);
router.delete('/:id', deleteGenre);
router.get('/', getAllgenre);
router.post('/', checkGenreRegister, postGenre);

export default router;
