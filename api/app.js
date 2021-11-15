var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const config = require('config');
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');

var apiRouter = require('./routes/api');

var app = express();

const MONGODB_URI = config.get('db');
const PORT = config.get('app.port');

// connect to mongo
mongoose
  .connect(MONGODB_URI, {})
  .then(() => console.log('mongodb connected...'))
  .catch(err => console.log(err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const swaggerDocument = require('./swagger.json');

app.use('/v1/bribed', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));

module.exports = app;
