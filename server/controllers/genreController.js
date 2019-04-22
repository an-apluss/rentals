/* eslint-disable linebreak-style */
import Joi from 'joi';
import data from '../datastorage/genre';

export default class GenreController {
  static getAllgenre(req, res) {
    if (!data.genres) return res.status(404).json({ status: 404, error: 'No genre is found!' });
    return res.send({ status: 200, data: data.genres });
  }

  static postGenre(req, res) {
    const lastGenreId = data.genres[data.genres.length - 1].id;
    const nextGenreId = lastGenreId + 1;
    const formData = {
      id: nextGenreId,
      name: req.body.name,
    };
    const schema = {
      id: Joi.number().required(),
      name: Joi.string().required(),
    };
    const { error } = Joi.validate(formData, schema);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    data.genres.push(formData);
    return res.status(201).send({ status: 201, message: 'Genre added successfully' });
  }

  static getSingleGenre(req, res) {
    const genreId = req.params.id;
    const genre = data.genres.find(g => g.id === parseInt(genreId, 10));
    if (!genre) return res.status(400).json({ status: 400, error: 'No genre with such ID' }); return res.json({ status: 200, data: [genre] });
  }

  static updateGenre(req, res) {
    const genreId = req.params.id;
    const { name } = req.body;
    const genre = data.genres.find(g => g.id === parseInt(genreId, 10));
    if (!genre) return res.status(400).json({ status: 400, error: 'No genre with such ID' });
    const updateData = { id: genreId, name };
    const schema = {
      id: Joi.number().required(),
      name: Joi.string().required(),
    };
    const { error } = Joi.validate(updateData, schema);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    genre.name = name;
    return res.json({ status: 200, data: [genre], messsage: 'Genre successfully updated' });
  }

  static deleteGenre(req, res) {
    const genreId = req.params.id;
    const genre = data.genres.find(g => g.id === parseInt(genreId, 10));
    if (!genre) return res.json({ status: 400, error: 'No genre with such ID' });
    const genreIndex = data.genres.indexOf(genre);
    data.genres.splice(genreIndex, 1);
    return res.json({ status: 200, data: genre, message: 'Genre successfully deleted' });
  }
}
