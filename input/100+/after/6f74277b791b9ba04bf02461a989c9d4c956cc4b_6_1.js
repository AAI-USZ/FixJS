function () {
  var self = this;
  self.registration_callbacks = [];
  self.open_sockets = [];

  // unique id for this instantiation of the server. If this changes
  // between client reconnects, the client will reload. You can set the
  // environment variable "SERVER_ID" to control this. For example, if
  // you want to only force a reload on major changes, you can use a
  // custom server_id which you only change when something worth pushing
  // to clients immediately happens.
  if (process.env.SERVER_ID)
    self.server_id = process.env.SERVER_ID;
  else
    self.server_id = Meteor.uuid();

  // set up sockjs
  var sockjs = __meteor_bootstrap__.require('sockjs');
  var sockPath = __meteor_bootstrap__.require('path').join('/', 'sockjs');
  self.server = sockjs.createServer({
    prefix: sockPath, log: function(){},
    // this is the default, but we code it explicitly because we depend
    // on it in stream_client:HEARTBEAT_TIMEOUT
    heartbeat_delay: 25000,
    jsessionid: false});
  self.server.installHandlers(__meteor_bootstrap__.app);

  // Support the /websocket endpoint
  self._redirectWebsocketEndpoint();

  self.server.on('connection', function (socket) {
    socket.send = function (data) {
      socket.write(data);
    };
    socket.on('close', function () {
      self.open_sockets = _.without(self.open_sockets, socket);
    });
    self.open_sockets.push(socket);


    // Send a welcome message with the server_id. Client uses this to
    // reload if needed.
    socket.send(JSON.stringify({server_id: self.server_id}));

    // call all our callbacks when we get a new socket. they will do the
    // work of setting up handlers and such for specific messages.
    _.each(self.registration_callbacks, function (callback) {
      callback(socket);
    });
  });

}