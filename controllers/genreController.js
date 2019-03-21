import data from '../datastorage/genre';

export default class GenreController {
  static getAllgenre(req, res) {
    if (!data.genres) return res.send({ status: 404, error: 'No genre is found!' });
    return res.send({ status: 200, data: data.genres });
  }
}
