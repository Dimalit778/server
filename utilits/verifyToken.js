import jwt from 'jsonwebtoken';
import { createError } from './error.js';

/// # VERIFY THAT USER HAVE VALID TOKEN # ///
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(createError(401, 'You are not authenticateddd'));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, 'Token is not valid'));
    req.user = user;
    next();
  });
};
/// # VERIFY USER TOKEN BY ID #///
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not authorized'));
    }
  });
};
/// # VERIFY THAT USER IS ADMIN #///
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, 'You are not Admin'));
    }
  });
};
