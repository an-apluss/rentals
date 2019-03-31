/* eslint-disable class-methods-use-this */
import data from '../datastorage/genre';

export default class GenreController {
  static getAllgenre(req, res) {
    if (!data.genres) return res.send({ status: 404, error: 'No genre is found!' });
    return res.send({ status: 200, data: data.genres });
  }

  static postGenre(req, res) {
    const lastGenreId = data.genres[data.genres.length - 1].id;
    const nextGenreId = lastGenreId + 1;
    const formData = {
      id: nextGenreId,
      name: req.body.name,
    };
    const addGenre = data.genres.push(formData);
    if (!addGenre) return res.send({ status: 400, error: 'Genre can not be add' });
    return res.send({ status: 201, message: 'Genre added successfully' });
  }

  static getSingleGenre(req, res) {
    const genreId = req.params.id;
    const genre = data.genres.find(g => g.id === parseInt(genreId, 10));
    if (genre) return res.json({ status: 200, data: genre });
    return res.json({ status: 203, error: 'No genre with such ID' });
  }

  static updateGenre(req, res) {
    const formData = {
      id: req.params.id,
      name: req.body.name,
    };
    const updateGenre = data.genres.push(formData);
    if (!updateGenre) return res.json({ status: 404, message: 'No such genre ID' });
    return res.json({ status: 200, message: 'Genre successfully updated' });
  }
}
