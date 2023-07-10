const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const cors = require('cors');

const { PORT = 3000, connectAddress = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const routes = require('./routes');

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

// app.use(cors({
//   origin: 'http://localhost:3000',
// }));

app.use(express.json());

app.post('/api/signin', validationSignIn, login);
app.post('/api/signup', validationSignup, createUser);

app.use('/api', routes);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
