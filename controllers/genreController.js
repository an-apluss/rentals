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
    return res.json({ status: 400, error: 'No genre with such ID' });
  }

  static updateGenre(req, res) {
    const genreId = req.params.id;
    const genre = data.genres.find(g => g.id === parseInt(genreId, 10));
    if (!genre) return res.json({ status: 400, error: 'No genre with such ID' });
    genre.name = req.body.name;
    return res.json({ status: 200, messsage: 'Genre successfully updated' });
  }

  static deleteGenre(req, res) {
    const genreId = req.params.id;
    const genre = data.genres.find(g => g.id === parseInt(genreId, 10));
    if (!genre) return res.json({ status: 400, error: 'No genre with such ID' });
    const genreIndex = data.genres.indexOf(genre);
    data.genres.splice(genreIndex, 1);
    return res.json({ status: 200, message: 'Genre successfully updated' });
  }
}
