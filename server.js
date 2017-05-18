// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var busboy = require('connect-busboy');
// var expressLayouts = require('express-e6js-layouts');

//var session = require('cookie-session');
var MongoStore = require('connect-mongo')(session);
// var hbs = require('express-handlebars');  //view engine

var index = require('./app/routes/index');
var settings = require('./setting');
var flash = require('connect-flash');
var multer = require('multer');
var fs = require('fs');
var _ = require('underscore');

var debug = require('debug')('blog:server');
var http = require('http');

var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('./app/routes');

var accessLog = fs.createWriteStream('access.log', {
  flags: 'a'
});
var errorLog = fs.createWriteStream('error.log', {
  flags: 'a'
});

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog');

var passport = require('passport');
require('./passport')(passport);

//ejs
app.set('views', path.join(__dirname, 'app/views/'));
app.set('view engine', 'ejs');

app.use(flash());

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(logger('common', {
  stream: accessLog
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  var meta = '[' + new Date() + ']' + req.url + '\n';
  errorLog.write(meta + err.stack + '\n');
  next();
});

app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30 //30天
  },
  seen: 0,
  store: new MongoStore({
    db: settings.db,
    host: settings.host,
    port: settings.port,
    url: 'mongodb://localhost:27017/blog'
  })
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use('/', index);

app.use(function(req, res) {
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
        console.log(renderProps);
        console.log(Router.RoutingContext);
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps))
        res.render('index', html)
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
// app.use(function(err, req, res, next) {
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   res.locals.user = req.session.user;
//   res.locals.req = req;
//
//   res.status(err.status || 500);
//
//   if (err.status == 500) {
//     res.render('error', {
//       title: 'Oops',
//       code: err.status,
//     });
//   } else {
//     res.render('error', {
//       title: 'Not found',
//       code: err.status,
//     });
//   }
//   next();
// });

var port = normalizePort(process.env.PORT || '1209');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('listening on port: ', port);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
