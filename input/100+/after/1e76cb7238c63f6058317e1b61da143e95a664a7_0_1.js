function (to, namespace) {
  var io = this.io = socketio.listen(to);
  io.configure( function () {
    io.set('browser.client', false);
    io.set('transports', racer.get('transports'));
  });
  io.configure('production', function () {
    io.set('log level', 1);
  });
  io.configure('development', function () {
    io.set('log level', 0);
  });
  this.mixinEmit('socketio', this, io);
  var socketUri = (typeof to === 'number')
                ? ':'
                : '';
  if (namespace) {
    this.setSockets(io.of('/' + namespace), socketUri + '/' + namespace);
  } else {
    this.setSockets(io.sockets, socketUri);
  }
}