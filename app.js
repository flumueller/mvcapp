// Core Modules
var http = require('http');
var path = require('path');
var fs = require('fs');
// Additional Modules
var express = require('express');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var stormpath = require('express-stormpath');
var app = express();
// Database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // http://mongoosejs.com/docs/promises.html
mongoose.connect('localhost:27017/mvcapp');

var routes = require('./router');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.set('port', 8080);
app.set('env', 'development');

// Adding the sass middleware
app.use(sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/css'),
    prefix: '/css',
    debug: false,
    outputStyle: 'compressed'
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({extended: false}));

// Remove hardcoded API credentials for production mode http://docs.stormpath.com/nodejs/express/latest/configuration.html
app.use(stormpath.init(app, {
  apiKey: {
    id: 'test',
    secret: 'test'
  },
  application: {
    href: `https://api.stormpath.com/v1/applications/oN14xV8TWkMAqGrxGdwk9`
  },
  expand: {
    customData: true
  },
  web: {
    login: {
      view: path.join(__dirname, 'views/login.pug')
    }
  }
}));

app.use('/', routes);

app.listen(app.get('port'), function() {
  console.log('Servier listening on port 8080');
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;