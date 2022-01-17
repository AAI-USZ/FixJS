function() {
  var app, conn, cradle, db, express, io, port, routes, socket, stylus, usernames;

  require("coffee-script");

  express = require('express');

  stylus = require('stylus');

  routes = require('./routes');

  cradle = require('cradle');

  socket = require('socket.io');

  app = module.exports = express.createServer();

  io = socket.listen(app);

  if (app.settings.env === 'production') {
    io.configure(function() {
      io.set('transports', ['xhr-polling']);
      return io.set('polling duration', 10);
    });
    socket = new io.Socket();
  }

  app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
      secret: 'your secret here'
    }));
    app.use(express.logger({
      format: '\x1b[1m:method\x1b[0m \x1b[33m:url\x1b[0m :response-time ms'
    }));
    app.use(stylus.middleware({
      src: __dirname + '/views',
      dest: __dirname + '/public'
    }));
    app.use(app.router);
    app.use(express["static"](__dirname + '/public'));
    return app.use(express.logger());
  });

  app.configure('development', function() {
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.set('db-uri', 'localhost:5984');
    return app.set('db-name', 'musicarena');
  });

  app.configure('production', function() {
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    app.set('db-uri', 'http://exilium.iriscouch.com');
    return app.set('db-name', 'musicarena');
  });

  conn = new cradle.Connection(app.set('db-uri'));

  db = conn.database(app.set('db-name'));

  app.get('/', routes.login);

  app.post('/login', function(req, res) {
    var data;
    data = req.body;
    return db.get(data.username, function(err, doc) {
      if (!doc) {
        return res.render('login', {
          flash: 'No user found',
          title: 'Music Arena. Log in'
        });
      } else {
        if (doc.password !== data.password) {
          return res.render('login', {
            flash: 'Wrong password!',
            title: 'Music Arena. Log in'
          });
        } else {
          return res.render('index', {
            title: 'Music Arena',
            username: data.username
          });
        }
      }
    });
  });

  app.post('/register', function(req, res) {
    var data;
    data = req.body;
    return db.get(data.username, function(err, doc) {
      if (doc) {
        return res.render('login', {
          flash: 'Username is in use',
          title: 'Music Arena. Log in'
        });
      } else {
        if (data.password !== data.confirm_password) {
          return res.render('login', {
            flash: 'Password does not match',
            title: 'Music Arena. Log in'
          });
        } else {
          delete data.confirm_password;
          return db.save(data.username, data, function(db_err, db_res) {
            return res.render('login', {
              flash: 'User created',
              title: 'Music Arena. Log in'
            });
          });
        }
      }
    });
  });

  port = process.env.PORT || 9294;

  app.listen(port, function() {
    return console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  });

  usernames = {};

  io.sockets.on('connection', function(socket) {
    socket.on('sendchat', function(data) {
      return io.sockets.emit('updatechat', socket.username, data);
    });
    socket.on('adduser', function(username) {
      socket.username = username;
      usernames[username] = username;
      socket.emit('updatechat', 'SERVER', 'you have connected');
      socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
      return io.sockets.emit('updateusers', usernames);
    });
    return socket.on('disconnect', function() {
      delete usernames[socket.username];
      io.sockets.emit('updateusers', usernames);
      return socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
    });
  });

}