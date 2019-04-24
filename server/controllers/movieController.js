/* eslint-disable linebreak-style */
import Joi from 'joi';
import dummydata from '../datastorage/movie';
import dummydata2 from '../datastorage/genre';

class MovieController {
  static getAllMovie(req, res) {
    const { movies } = dummydata;
    if (!movies) return res.status(404).json({ status: 404, error: 'No movie is available' });
    return res.status(200).json({ status: 200, data: movies });
  }

  static postMovie(req, res) {
    const { movies } = dummydata;

    const lastMovieId = movies[movies.length - 1].id;
    const newMovieId = lastMovieId + 1;

    const { genres } = dummydata2;

    const { title, stock, genre } = req.body;
    const schema = {
      title: Joi.string().required(),
      stock: Joi.number().required(),
      genre: Joi.string().required(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    const genreExist = genres.find(g => g.name === genre);
    let genreId;
    if (genreExist) genreId = genreExist.id;
    else {
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

  static getSingleMovie(req, res) {
    const { movies } = dummydata;
    const { id } = req.params;
    const movieExist = movies.find(movie => movie.id === parseInt(id, 10));
    if (!movieExist) return res.status(404).json({ status: 404, error: 'No such movie' });
    return res.status(200).json({ status: 200, data: movieExist });
  }

  static deleteMovie(req, res) {
    const { movies } = dummydata;
    const { genres } = dummydata2;
    const { id } = req.params;
    const movieExist = movies.find(movie => movie.id === parseInt(id, 10));
    if (!movieExist) return res.status(404).json({ status: 404, error: 'No such movie' });
    const genreExist = genres.find(genre => genre.id === movieExist.genreId);
    const sameGenre = movies.filter(m => m.genreId === movieExist.genreId).length;
    if (genreExist && sameGenre === 1) {
      const index = genres.indexOf(genreExist);
      genres.splice(index, 1);
    }
    const index = movies.indexOf(movieExist);
    movies.splice(index, 1);

    return res.status(200).json({ status: 200, message: 'movie deleted successfully', data: movieExist });
  }

  static updateMovie(req, res) {
    const { movies } = dummydata;
    const { id } = req.params;
    const { title, stock } = req.body;
    const movieExist = movies.find(movie => movie.id === parseInt(id, 10));
    if (!movieExist) return res.status(404).json({ status: 404, error: 'movie not found' });
    const schema = {
      title: Joi.string(),
      stock: Joi.number(),
    };
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    movieExist.title = title;
    movieExist.stock = stock;
    return res.status(201).json({ status: 200, data: movieExist, message: 'movie updated successfully' });
  }
}

export default MovieController;
