const express = require('express');
const morgan = require('morgan');

const app = express();
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/usersRouter');
const movieRouter = require('./routes/moviesRouter');
const listRouter = require('./routes/listsRouter');
// const movieRouter = require('./routes/moviesRouter');
//MIDDLEWARE
//BUILTIN MIDDLEWARE
// if (process.env.ENV_VARIABLE == 'development') {
//   app.use(morgan('dev'));
// }
app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'new massage',
  });
});
//APLICATION MIDDLEWARE
app.use((req, res, next) => {
  console.log('hello from the first midleware');
  next();
});

//ROUTE
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/movies', movieRouter);
app.use('/api/v1/lists', listRouter);

// app.use('/api/v1/movies',movieRouter);

module.exports = app;
