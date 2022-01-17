function () {
  if (this.app.address()) console.log('Subway started on port %s', this.app.address().port);
  this.io = io.listen(this.app);

  var app = this.app;
  this.io.sockets.on('connection', function(socket) {
    irchandler.irchandler(socket, app);
  });
}