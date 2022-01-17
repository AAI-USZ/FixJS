function (socket) {
  console.log(socket.id);
  
  socket.on('icarus position', function(position){
    socket.broadcast.emit('other icarus position', position);
  });
  
  socket.on('collision', function(data){
    io.sockets.emit('One player has died.');
  });
  
  socket.on('disconnect', function() {
    //io.sockets.emit('Player disconnected.');
    console.log('Player ' + socket.id + ' disconnected.');
  });
}