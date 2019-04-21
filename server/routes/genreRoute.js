import express from 'express';

import GenreController from '../server/controllers/genreController';

const router = express.Router();

router.get('/:id', GenreController.getSingleGenre);
router.put('/:id', GenreController.updateGenre);
router.delete('/:id', GenreController.deleteGenre);
router.get('/', GenreController.getAllgenre);
router.post('/', GenreController.postGenre);

export default router;
