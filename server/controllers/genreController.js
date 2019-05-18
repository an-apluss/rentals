/* eslint-disable linebreak-style */
import genreService from '../services/genreService';

export default class GenreController {
  static getAllgenre(req, res) {
    const response = genreService.findAllGenre(req.body);
    return res.status(response.status).send(response);
  }

  static postGenre(req, res) {
    const response = genreService.createGenre(req.body);
    return res.status(response.status).send(response);
  }

  static getSingleGenre(req, res) {
    const { id } = req.params;
    const response = genreService.findOneGenre(id);
    return res.status(response.status).json(response);
  }

  static updateGenre(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    const response = genreService.updateOneGenre(id, name);
    return res.status(response.status).json(response);
  }

  static deleteGenre(req, res) {
    const response = genreService.deleteOneGenre(req.params.id);
    return res.status(response.status).json(response);
  }
}
