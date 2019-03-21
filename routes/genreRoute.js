import express from 'express';

import GenreController from '../controllers/genreController';

const router = express.Router();

router.get('/', GenreController.getAllgenre);

export default router;
