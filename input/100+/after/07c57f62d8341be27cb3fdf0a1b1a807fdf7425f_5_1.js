function () {
  var connections = {};
  
  mongoose.connect(this.app.set('mongoose_auth'));
  
  // link up socket.io with our express app
  this.io = io.listen(this.app);
  
  this.io.sockets.on('connection', function(socket) {
    sockethandler(socket, connections);
  });
  
  // restore sessions
  require('./restore')(connections);
  
  if (this.app.address()) console.log('Subway started on port %s', this.app.address().port);
}