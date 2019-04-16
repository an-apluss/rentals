/* eslint-disable linebreak-style */
import dummydata from '../datastorage/movie';
import dummydata2 from '../datastorage/genre';

class MovieController {
  static getAllMovie(req, res) {
    const { movies } = dummydata;
    if (!movies) res.status(404).json({ status: 404, error: 'No movie is available' });
    return res.status(200).json({ status: 200, data: movies });
  }

  static postMovie(req, res) {
    const { movies } = dummydata;

    const lastMovieId = movies[movies.length - 1].id;
    const newMovieId = lastMovieId + 1;

    const { genres } = dummydata2;

    const { title, stock, genre } = req.body;

    const genreExist = genres.find(g => g.name === genre);
    let genreId;
    if (genreExist) {
      genreId = genreExist.id;
    } else {
      const lastGenreId = genres[genres.length - 1].id;
      genreId = lastGenreId + 1;

      const newGenre = {
        id: genreId,
        name: genre,
      };

      genres.push(newGenre);
    }
    const newMovie = {
      id: newMovieId, title, stock, genreId,
    };

    movies.push(newMovie);
    return res.status(201).json({
      status: 201, message: 'movie successfully added', data: newMovie,
    });
  }
}

export default MovieController;
