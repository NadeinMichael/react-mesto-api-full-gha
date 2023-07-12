const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET } = process.env;

const generateToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
module.exports = {
  generateToken,
};
