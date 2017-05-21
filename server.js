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

var Post = require('./models/post')

//var session = require('cookie-session');
var MongoStore = require('connect-mongo')(session);
// var hbs = require('express-handlebars');  //view engine

var index = require('./app/routes/index');
var settings = require('./setting');
var flash = require('connect-flash');
var multer = require('multer');
var fs = require('fs');
var _ = require('underscore');
var skipMap = require('skip-map');

var debug = require('debug')('blog:server');
var http = require('http');

var React = require('react');
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router'
import routes from './app/routes';
import NotFoundPage from './app/components/404';

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
app.use(skipMap());

app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(err, req, res, next) {
//   var meta = '[' + new Date() + ']' + req.url + '\n';
//   errorLog.write(meta + err.stack + '\n');
//   next();
// });

// app.use(session({
//   secret: settings.cookieSecret,
//   key: settings.db,
//   resave: true,
//   saveUninitialized: true,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 30 //30天
//   },
//   seen: 0,
//   store: new MongoStore({
//     db: settings.db,
//     host: settings.host,
//     port: settings.port,
//     url: 'mongodb://localhost:27017/blog'
//   })
// }));

// app.use(passport.initialize());
// app.use(passport.session());

//getTen 拿到的posts是每十篇文章 
// total是總共的文章數量，以便計算在前端會不會顯示下一頁或上一頁
app.get('/api/post/:page', (req, res) => {
  
  // if (req.session.user) {
  //   if (!req.session.user.isVerified) {
  //     req.flash('error', "請認證email");
  //   }
  // }

  var page = page ? page : 1;
  console.log('page: ', page);

  Post.getTen(null, page, function (err, posts, total) {
    if (err) {
      console.log(err);
      posts = {};
    }
    total = parseInt(total / 10) + 1;

    console.log(posts);
    res.send(posts);
  });
});

//新增文章
// app.post('/api/post', function (req, res) {

//   var currentUser = req.session.user;
//   //console.log(currentUser);
//   var tags = (req.body.tags + '#end').split(/\s*#/);
//   // console.log(req.body);
//   var file = (typeof req.body.file !== 'undefined') ? req.body.fileName.split(',') : [];

//   tags.splice(0, 1);
//   tags.splice(tags.length - 1, 1);

//   var post = new Post(currentUser.name, currentUser.head, req.body.title, tags, req.body.editor1, {}, file);
//   post.save(function (err) {
//     if (err) {
//       req.flash('error', err);
//       return res.redirect('/');
//     }

//      res.send({ message: req.body.title + ' has been posted.' });
//   });
// });

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }
      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        res.status(404);
      }
      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

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
