/* eslint-disable linebreak-style */
import dummydata from '../datastorage/movie';

class MovieController {
  static getAllMovie(req, res) {
    const { movies } = dummydata;
    if (!movies) res.status(404).json({ status: 404, error: 'No movie is available' });
    return res.status(200).json({ status: 200, data: movies });
  }
}

export default MovieController;
