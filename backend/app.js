const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();

const { PORT = 3000, connectAddress = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const routes = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/error-handler');
const {
  validationSignup,
  validationSignIn,
} = require('./utils/validation');

mongoose.connect(connectAddress).then(() => {
  console.log('connected to bd');
});

const app = express();

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/api/signin', validationSignIn, login);
app.post('/api/signup', validationSignup, createUser);

app.use('/api', routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
