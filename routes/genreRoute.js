import express from 'express';

import GenreController from '../controllers/genreController';

const router = express.Router();

router.get('/:id', GenreController.getSingleGenre);
router.get('/', GenreController.getAllgenre);
router.post('/', GenreController.postGenre);

export default router;
