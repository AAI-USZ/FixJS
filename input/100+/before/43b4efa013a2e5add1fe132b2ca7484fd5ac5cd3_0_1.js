function() {
  var Clients, Logger, Pong, PongGame, Security, app, express, io, port;

  port = process.env.PORT || 3001;

  express = require('express');

  app = express.createServer();

  io = require('socket.io').listen(app);

  app.listen(port);

  app.use(express.bodyParser());

  app.set('views', __dirname + '/views');

  app.use(express.static(__dirname + '/views'));

  Clients = require("./javascripts/clients").Clients;

  Clients = new Clients;

  Security = require("./javascripts/security").Security;

  Security = new Security;

  Logger = require("./logger").Logger;

  Logger = new Logger;

  PongGame = require('./javascripts/pong/main_loop').MainLoop;

  Pong = new PongGame(1, io);

  app.get('/', function(req, res) {
    if (Security.checkCredentials(req.body.credentials)) {
      res.render("views/index.html");
      Logger.info("!! GET REQUEST RECEIVED !!");
      return io.sockets["in"](req.body.channel).emit(req.body.message_type, {
        message: req.body.message
      });
    }
  });

  app.get('/pong', function(req, res) {
    res.sendfile("pong.html");
    return Logger.info("!! PONG GET REQUEST RECEIVED !!");
  });

  app.get('/pong/javascripts/:file', function(req, res) {
    res.sendfile("javascripts/" + req.params.file);
    return Logger.info("!! PONG GET REQUEST RECEIVED !!");
  });

  app.get('/javascripts/:file', function(req, res) {
    res.sendfile("javascripts/" + req.params.file);
    return Logger.info("!! JAVASCRIPT GET REQUEST RECEIVED !!");
  });

  app.post('/', function(req, res) {
    if (Security.checkCredentials(req.body.credentials)) {
      res.send("received");
      Logger.info("EMMITING (post) " + req.body.message_type + " to channel " + req.body.channel + ": " + req.body.message);
      return io.sockets["in"](req.body.channel).emit(req.body.message_type, {
        message: req.body.message
      });
    }
  });

  io.sockets.on('connection', function(socket) {
    Logger.info("Client connected");
    Clients.newClient(socket);
    socket.on('set nickname', function(data) {
      Logger.info("Nickname set " + data.nickname);
      return Clients.setNickname(socket, data.nickname);
    });
    socket.on("change channel", function(data) {
      Logger.info("Client joining channel " + data.channel);
      return Clients.joinChannel(socket, data.channel);
    });
    socket.on('disconnect', function() {
      Logger.info("Client disconnected. " + socket.id);
      return Clients.disconnect(socket);
    });
    socket.on('broadcast', function(data) {
      Logger.info("Client Broadcasting " + socket.id);
      return Clients.broadcast(socket, data.message);
    });
    return socket.on('paddleMove', function(data) {
      Logger.info("Paddle Move " + socket.id);
      return Pong.world.paddleMoving(data.paddle, data.direction);
    });
  });

}