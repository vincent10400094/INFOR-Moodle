// Babel ES6/JSX Compiler
require('babel-register')

import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import session from 'express-session'
import busboy from 'connect-busboy'
// import expressLayouts from 'express-e6js-layouts'

import Post from './models/post'
import User from './models/user'
import Txt from './models/TXT'
import Comment from './models/comment'
import Pdf from './pdfreader/parse'

//import session from 'cookie-session'
const MongoStore = require('connect-mongo')(session)
// import hbs from 'express-handlebars'  //view engine

import index from './app/routes/index'
import settings from './setting'
import flash from 'connect-flash'
import multer from 'multer'
import fs from 'fs'
import _ from 'underscore'
// import skipMap from 'skip-map'

const debug = require('debug')('blog:server');
import http from 'http'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './app/routes'
import NotFoundPage from './app/components/404'

// var accessLog = fs.createWriteStream('access.log', {
//   flags: 'a'
// })
// var errorLog = fs.createWriteStream('error.log', {
//   flags: 'a'
// })

var app = express()

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/blog')

var passport = require('passport')
require('./passport')(passport)

//ejs
app.set('views', path.join(__dirname, 'app/views/'))
app.set('view engine', 'ejs')

app.use(flash())

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

app.use(logger('dev'))
// app.use(logger('common', {
//   stream: accessLog
// }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(cookieParser())
app.use(busboy())
// app.use(skipMap())

app.use(express.static(path.join(__dirname, 'public')))

// app.use(function(err, req, res, next) {
//   var meta = '[' + new Date() + ']' + req.url + '\n'
//   errorLog.write(meta + err.stack + '\n')
//   next()
// })

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
}))

app.use(passport.initialize())
app.use(passport.session())

//getTen 拿到的posts是每十篇文章 
// total是總共的文章數量，以便計算在前端會不會顯示下一頁或上一頁
app.get('/api/post/:page', (req, res) => {

  if (req.session.user) {
    if (!req.session.user.isVerified) {
      req.flash('error', "請認證email")
    }
  }

  var page = req.params.page
  page = (typeof page !== 'undefined') ? page : 1
  console.log('get page: ', page)

  Post.getTen(null, page, function (err, posts, total) {
    if (err) {
      console.log(err)
      posts = {}
    }
    total = parseInt(total / 10) + 1

    let data = { posts: posts, total: total, page: page }
    res.send(data)
  })
})

//拿到文章內容
app.get('/api/u/:name/:day/:title', function (req, res) {
  Post.getOne(req.params.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      console.log(err)
      req.flash('error', err)
      return res.redirect('/')
    }
    res.send(post)
  })
})

//留言
app.post('/api/comment/:name/:day/:title', function (req, res) {
  var date = new Date
  var time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "" + date.getHours() + ":"
    + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())

  var head = req.session.user.head

  var comment = {
    name: req.session.user.name,
    head: head,
    email: req.session.user.email,
    time: time,
    content: req.body.content,
    star: 0,
    starname: []
  }
  console.log('comment:', comment)
  var newComment = new Comment(req.params.name, req.params.day, req.params.title, comment)

  newComment.save(function (err) {
    if (err) {
      console.log('comment error', err)
      return res.status(500)
    }
    console.log('add comment success')
    res.send(newComment)
  })
  var url = '/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title
})

app.post('/api/edit/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user

  Post.update(currentUser.name, req.params.day, req.params.title, req.body.content, function (err) {
    if (err) {
      return res.status(500)
    }
    res.send({success: true})
  })
})

// app.post('/api/edit/:name/:day/:title', function (req, res) {
//   var currentUser = req.session.user

//   Post.update(currentUser.name, req.params.day, req.params.title, req.body.editor1, function (err) {
//     var url = encodeURI('/u/' + req.params.name + '/' + req.params.day + '/' + req.params.title)
//     if (err) {
//       req.flash('error', err)
//       return res.redirect(url)
//     }

//     req.send({ message: "修改完成!" })
//     res.redirect(url)
//   })
// })

//新增文章
app.post('/api/post', function (req, res) {
  console.log('on post body: ', req.body)
  var currentUser = req.session.user
  //console.log(currentUser)
  var tags = (req.body.tags + '#end').split(/\s*#/)
  // console.log(req.body)
  console.log('files', req.body.file)
  var files = (req.body.files.length) ? req.body.files.split(',') : []

  tags.splice(0, 1)
  tags.splice(tags.length - 1, 1)

  var post = new Post(currentUser.name, currentUser.head, req.body.title, tags, req.body.content, {}, files)
  post.save(function (err) {
    if (err) {
      // req.flash('error', err)
      return res.status(500)
    }
    res.send({success: true})
    // res.send({ message: req.body.title + ' has been posted.' })
  })
})

//刪除文章
app.post('/api/remove/:name/:day/:title', function (req, res) {
  var currentUser = req.session.user

  Post.remove(currentUser.name, req.params.day, req.params.title, function (err) {
    if (err) {
      console.log('remove post failed')
      return res.status(500)
    }
    console.log("remove post success")
    res.send({ success: true })
    // req.flash('success', '刪除成功!')
    // console.log(" come in flash ")

  })
})

//轉載文章
app.post('/api/reprint/:name/:day/:title', function (req, res) {
  Post.edit(req.params.name, req.params.day, req.params.title, function (err, post) {
    if (err) {
      return res.status(500)
    }

    var currentUser = req.session.user
    var reprint_from = {
      name: post.name,
      day: post.time.day,
      title: post.title
    }
    var reprint_to = {
      name: currentUser.name,
      head: currentUser.head
    }

    // console.log(reprint_from)
    // console.log(reprint_to)
    Post.reprint(reprint_from, reprint_to, function (err, post) {
      if (err) {
        console.log(err)
        return res.status(500)
      }

      var reprint_post = new Post(post.name, post.head, post.title, post.tags, post.post, post.reprint_info)
      reprint_post.ReprintSave(function (err) {
        if (err) {
          console.log(err)
          return res.status(500)
        }
        // req.flash('success', '轉載成功')
        //var url = encodeURI('/u/' + post.name +'/'+ post.time.day +'/'+ post.title)
        res.send({ success: true })
        // res.redirect('/')
      })
    })
  })
})

//使用者介面資料
app.get('/api/user/:name', function (req, res) {
  // console.log('username: ', req.params.name)
  User.findOne({
    'name': req.params.name
  }, function (err, user) {
    if (err) {
      console.log('error finding user: ', err)
    } else {
      // console.log(user)
      res.send(user)
    }
  })
})

//留言按讚
app.post('/api/comments/star/', function (req, res) {
  var data = req.body
  //console.log(data)
  if (data.inc == 1) {
    Post.comment_star(data.postname, data.day, data.title, data.username, data.index, function (err) {
      if (err) {
        console.log(err)
        req.flash('error', err)
        return res.redirect('/')
      }
      res.send({ message: '留言按讚成功' })
      res.redirect('back')
    })
  }
  if (data.inc == -1) {
    Post.comment_unstar(data.postname, data.day, data.title, data.username, data.index, function (err) {
      if (err) {
        console.log(err)
        req.flash('error', err)
        return res.redirect('/')
      }
      res.send({ message: '留言取消按贊成功!' })
      res.redirect('back')
    })
  }
})

//文章按讚
app.post('/api/post/star/', function (req, res) {
  console.log('like')
  var data = req.body
  // console.log(data)
  console.log(typeof data.inc)
  if (data.inc == '1') {
    console.log('star')
    Post.star(data.postname, data.day, data.title, data.username, function (err) {
      if (err) {
        console.log(err)
        return res.status(500)
      }
      res.send(true)
    })
  }
  if (data.inc == '-1') {
    console.log('unstar')
    Post.unstar(data.postname, data.day, data.title, data.username, function (err) {
      if (err) {
        console.log(err)
        return res.status(500)
      }
      res.send(false)
    })
  }
})

//標籤
app.get('/api/tags/:tag', function (req, res) {
  console.log('tag:', req.params.tag)
  Post.getTag(req.params.tag, function (err, posts) {
    if (err) {
      console.log('find tag page error: ', err)
    }
    let data = { posts: posts, tag: req.params.tag }
    res.send(data)
  })
})

//文章列表
app.get('/api/history', function (req, res) {

  Post.getArchive(function (err, posts) {
    if (err) {
      return res.redirect('/')
    }
    //console.log(posts)
    res.send(posts)
  })
})

app.get('/api/search', function (req, res) {
  Post.search(req.query.keyword, function (err, posts) {
    console.log('search query: ', req.query.keyword)
    if (err) {
      console.log('search error: ', err)
    }
    //console.log("Search:" + posts)
    let data = { posts: posts, keyword: req.query.keyword }
    // console.log(data)
    res.send(data)
  })
})

app.post('/api/login', function (req, res, next) {
  console.log(req.body)
  passport.authenticate('local-login', function (err, user, info) {
    console.log('err', err)
    console.log('user', user)
    console.log('info', info)
    if (err) {
      return res.status(400).json({
        success: false,
        message: err
      })
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: err
      })
    }
    req.logIn(user, function (err) {
      if (err) { return next(err) }
      return res.json({
        success: true,
        message: 'Login Success'
      })
    })
  })(req, res, next)
})

// app.post('/api/login', passport.authenticate('local-login', function (err, user, info) {
//   // console.log('log in: ', req.body)
//   // console.log("req.body.username: " + req.body.username)
//   // console.log("req.body.password: " + req.body.password)
//   console.log('err', err)
//   console.log('user', user)
//   console.log('info', info)
//   res.send({ isLoggedIn: req.body.user !== NULL, errMessage: '' })
// }))

app.post('/api/signup', passport.authenticate('local-signup'), (req, res) => {
  res.send('sign up success')
})

app.get('/logout', function (req, res) {
  req.session.user = null
  res.redirect('/')
})

// route for facebook authentication and login
app.get('/auth/facebook', passport.authenticate('facebook-login', {
  scope: 'email'
}))

// handle the callback after facebook has authenticated the user
app.get('/auth/facebook/callback', passport.authenticate('facebook-login',
  {
    successRedirect: '/',
    failureRedirect: '/login',
    session: false
  }))

app.get('/api/getSession', (req, res) => {
  res.send(req.session)
})

app.post('/uploadfile', function (req, res) {
  //console.log(req.busboy)
  var fstream
  req.pipe(req.busboy)
  req.busboy.on('file', function (fieldname, file, filename) {
    console.log("Uploading: " + filename)
    fstream = fs.createWriteStream('./public/files/' + filename)
    file.pipe(fstream)
    fstream.on('close', function () {
      res.end()
    })
  })
})

//題目列表
app.get('/api/test', function (req, res) {
  Txt.getList({}, function (err, docs) {
    if (err) {
      console.log('err:', err)
      return res.status(500)
    }
    console.log('docs: ', docs)
    res.send(docs)
  })
})

//答題介面
app.get('/api/test/:txtname', function(req, res) {
  Txt.get(req.params.txtname, function(err, doc) {
    if (err) {
      console.log("err: " + err);
      return res.status('/');
    }
    //console.log("doc: " + doc);
    res.send(doc)
  });
});

app.get('/api/rank/:title', function(req, res) {
  Txt.Rankget(req.params.title, function(err, userrank, doc) {
    if (err) {
      return res.status(500);
    }
    //console.log(doc);
    res.send(userrank)
  });
});

app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message)
      }
      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      }

      // generate the React markup for the current route
      let markup
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps} />)
      } else {
        res.status(404)
      }
      // render the index template with the embedded React markup
      return res.render('index', { markup })
    }
  )
})

var port = normalizePort(process.env.PORT || settings.serverport)
app.set('port', port)

var server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)
console.log('listening on port: ', port)

function normalizePort(val) {
  var port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
