"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _indexRouter = _interopRequireDefault(require("./routes/indexRouter"));

var _apiRouter = _interopRequireDefault(require("./routes/apiRouter"));

var _appRouter = _interopRequireDefault(require("./routes/appRouter"));

var express = require('express');

var cookieParser = require('cookie-parser');

var logger = require('morgan');

var compression = require('compression');

var env = process.env.NODE_ENV || 'development';
var app = express();

if (env === 'production') {
  app.enable('trust proxy');
  app.use(compression()); // Enforce SSL & HSTS in production

  app.use(function (req, res, nextPlug) {
    var proto = req.headers['x-forwarded-proto'];

    if (proto === 'https') {
      res.set({
        'Strict-Transport-Security': 'max-age=31557600' // one-year

      });
      return nextPlug();
    }

    res.redirect("https://".concat(req.headers.host).concat(req.url));
  });
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use('/', _indexRouter["default"]);
app.use('/api', _apiRouter["default"]);
app.use('/app', _appRouter["default"]);
module.exports = app;