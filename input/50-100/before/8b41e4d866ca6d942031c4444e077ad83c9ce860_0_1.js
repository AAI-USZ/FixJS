function(data) {
    console.log('player [%s] clicked %s', player_id, data.score);
    room.players[player_id].score = data.score;
    updatePlayers();

    if (room.done()) {
      io.sockets.in(room.id).emit('show-result');
    }
  }