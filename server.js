// Babel ES6/JSX Compiler
require('babel-register');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var busboy = require('connect-busboy');
// var expressLayouts = require('express-e6js-layouts');

var Post = require('./models/post');
var User = require('./models/user');
var Txt = require('./models/TXT');
var Comment = require('./models/comment');
var Pdf = require('./pdfreader/parse');

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

var User = require('./models/user');

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

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
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
//app.use(passport.session());

//getTen 拿到的posts是每十篇文章 
// total是總共的文章數量，以便計算在前端會不會顯示下一頁或上一頁
app.get('/api/post/:page', (req, res) => {

  if (req.session.user) {
    if (!req.session.user.isVerified) {
      req.flash('error', "請認證email");
    }
  }

  var page = req.params.page;
  page = (typeof page !== 'undefined') ? page : 1;
  console.log('get page: ', page);

  Post.getTen(null, page, function (err, posts, total) {
    if (err) {
      console.log(err);
      posts = {};
    }
    total = parseInt(total / 10) + 1;

    let data = { posts: posts, total: total };
    res.send(data);
  });
});

//拿到文章內容
app.get('/api/u/:name/:day/:title', function (req, res) {
  Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      console.log(err);
      req.flash('error', err);
      return res.redirect('/');
    }


    res.send(post);
  });
});

//留言
app.post('/api/comment/:name/:day/:title', function (req, res) {
  var date = new Date;
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "" + date.getHours() + ":"
    + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

  var head = req.session.user.head;

  var comment = {
    name: req.session.user.name,
    head: head,
    email: req.session.user.email,
    time: time,
    content: req.body.content,
    star: 0,
    starname: []
  };
  var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment);

  newComment.save(function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
    req.flash('success', '留言成功');

  });
  var url = '/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title;
});

// 編輯文章介面
app.get('/api/edit/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user;

  Post.edit(currentUser.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      req.flash('error', err);
      return res.redirect('back');
    }
    //文章內容放在textarea
    res.send(post);
  });
});

//編輯文章完成
app.post('/api/edit/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user;

  Post.update(currentUser.name, req.params.day, req.params.title, req.body.editor1, function (err) {
    var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title);
    if (err) {
      req.flash('error', err);
      return res.redirect(url);
    }

    req.send({ message: "修改完成!" });
    res.redirect(url);
  });
});

//新增文章
app.post('/api/post', function (req, res) {

  var currentUser = req.session.user;
  //console.log(currentUser);
  var tags = (req.body.tags + '#end').split(/\s*#/);
  // console.log(req.body);
  var file = (typeof req.body.file !== 'undefined') ? req.body.fileName.split(',') : [];

  tags.splice(0, 1);
  tags.splice(tags.length - 1, 1);

  var post = new Post(currentUser.name, currentUser.head, req.body.title, tags, req.body.editor1, {}, file);
  post.save(function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }

    res.send({ message: req.body.title + ' has been posted.' });
  });
});

//刪除文章
app.get('/api/remove/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user;

  Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
    if (err) {
      req.flash('error', err);
      return res.redirect('back');
    }

    res.send({ message: '刪除成功!' });
    req.flash('success', '刪除成功!');
    res.redirect('/');
  });
});

//轉載文章
app.get('/api/reprint/:name/:day/:title', function (req, res) {
  Post.edit(req.params.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      req.flash('error', err);
      return res.render('back');
    }

    var currentUser = req.session.user;
    var reprint_from = {
      name: post.name,
      day: post.time.day,
      title: post.title
    };
    var reprint_to = {
      name: currentUser.name,
      head: currentUser.head
    };

    // console.log(reprint_from);
    // console.log(reprint_to);
    Post.reprint(reprint_from, reprint_to, function (err, post) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        return res.redirect('back');
      }

      var reprint_post = new Post(post.name, post.head, post.title, post.tags, post.post, post.reprint_info);
      reprint_post.ReprintSave(function (err) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/');
        }

        req.flash('success', '轉載成功');
        //var url = encodeURI('/u/' + post.name +'/'+ post.time.day +'/'+ post.title);
        res.send({ message: '轉載成功!' });
        res.redirect('/');
      });
    });
  });
});

//使用者介面資料
app.get('/api/user/:name', function (req, res) {
  console.log('username: ', req.params.name)
  User.findOne({
    'name': req.params.name
  }, function (err, user) {
    if (err) {
      console.log('error finding user: ', err);
    } else {
      console.log(user);
      res.send(user);
    }
  });
});

//留言按讚
app.post('/api/comments/star/', function (req, res) {
  var data = req.body;
  //console.log(data);
  if (data.inc == 1) {
    Post.comment_star(data.postname, data.day, data.title, data.username, data.index, function (err) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        return res.redirect('/');
      }
      res.send({message: '留言按讚成功'});
      res.redirect('back');
    });
  }
  if (data.inc == -1) {
    Post.comment_unstar(data.postname, data.day, data.title, data.username, data.index, function (err) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        return res.redirect('/');
      }
      res.send({message: '留言取消按贊成功!'});
      res.redirect('back');
    });
  }
});

//文章按讚
app.post('/api/post/star/', function (req, res) {
  var data = req.body;
  if (data.inc == 1) {
    Post.star(data.postname, data.day, data.title, data.username, function (err) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        return res.redirect('/');
      }
      res.send({message: '文章按讚成功'});
      res.redirect('back');
    });
  }
  if (data.inc == -1) {
    Post.unstar(data.postname, data.day, data.title, data.username, function (err) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        return res.redirect('/');
      }
      res.send({message: '文章取消按贊成功!'});
      res.redirect('back');
    });
  }
});

//標籤
app.get('/api/tags/:tag', function (req, res) {

  Post.getTag(req.params.tag, function (err, posts) {
    if (err) {
      req.flash('error', err);
      return res.redirect('/');
    }

    res.send(posts);
  });
});

//文章列表
app.get('/api/history', function (req, res) {

  Post.getArchive(function (err, posts) {
    if (err) {
      return res.redirect('/');
    }
    //console.log(posts);
    res.send(posts);
  });
});

app.post('/api/login', function (req, res) {
  console.log(req);
  console.log("req.body.email: " + req.body.email);
  console.log("req.body.password: " + req.body.password);
  passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true, // allow flash messages
    session: false
  })
});

app.post('/api/signup', passport.authenticate('local-signup', {
  successRedirect: '/', // redirect to the secure profile section
  failureRedirect: '/signup', // redirect back to the signup page if there is an error
  failureFlash: true, // allow flash messages
  session: false
}));

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
        markup = renderToString(<RouterContext {...renderProps} />);
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
