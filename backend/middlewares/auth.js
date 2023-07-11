const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');
require('dotenv').config();

const { JWT_SECRET } = process.env;

function doesUserHavePermission(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new UnauthorizedError('Нет доступа'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new UnauthorizedError('Нет доступа'));
  }
  req.user = payload;
  return next();
}

module.exports = doesUserHavePermission;
