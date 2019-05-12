/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { generateId } from '../helpers/helpers';
import storage from '../datastorage/genre';
import Genre from '../models/genre';

export default class genreService {
  static findAllGenre() {
    const { genres } = storage;
    if (!genres) return { status: 404, error: 'No genre is found!' };
    return { status: 200, data: genres };
  }

  static createGenre(data) {
    const { genres } = storage;
    data.id = generateId(genres);
    const newGenre = new Genre(data);
    genres.push(newGenre);
    const {
      id,
      name,
    } = newGenre;
    return {
      status: 201,
      data: [{
        id,
        name,
      }],
      message: 'Genre added successfully',
    };
  }

  static findOneGenre(id) {
    const { genres } = storage;
    const genreExist = genres.find(genre => genre.id === parseInt(id, 10));
    if (!genreExist) return { status: 404, error: 'No genre with such ID' };
    return { status: 200, data: [genreExist] };
  }

  static deleteOneGenre(id) {
    const { genres } = storage;
    const genreExist = genres.find(genre => genre.id === parseInt(id, 10));
    if (!genreExist) return { status: 404, error: 'No genre with such ID' };
    const genreIndex = genres.indexOf(genreExist);
    genres.splice(genreIndex, 1);
    return { status: 200, data: [genreExist], message: 'Genre successfully deleted' };
  }

  static updateOneGenre(id, data) {
    const { genres } = storage;
    const genreExist = genres.find(genre => genre.id === parseInt(id, 10));
    if (!genreExist) return { status: 404, error: 'No genre with such ID' };
    genreExist.name = data.name || genreExist.name;
    return { status: 200, data: genreExist, message: 'Genre successfully updated' };
  }
}
