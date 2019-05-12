/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
import { validateRegisterGenre, validateUpdateGenre } from '../helpers/helpers';

export default class GenreValidator {
  static checkGenreRegister(req, res, next) {
    const { error } = validateRegisterGenre(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    return next();
  }

  static checkGenreUpdate(req, res, next) {
    const { error } = validateUpdateGenre(req.body);
    if (error) return res.status(400).json({ status: 400, error: error.details[0].message });
    return next();
  }
}
