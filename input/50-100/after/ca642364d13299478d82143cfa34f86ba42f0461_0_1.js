function(socket) {
  socket.emit('start', thedrawing);
  countusers(socket);

  socket.on('clear', function(data) {
    thedrawing = [];
  });

  socket.on('draw', function(data) {
      persist(data);
      socket.broadcast.emit('draw', data);
      socket.emit('draw', data);
  });
  socket.on('disconnect', function(){ countusers(socket) });
}