function() {
    io.sockets.in(room.id).emit('update-players', { players: room.players, showResult: room.done() });
  }