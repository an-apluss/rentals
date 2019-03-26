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
    return res.send({ status: 201, message: 'Genre added succussfully' });
  }
}
