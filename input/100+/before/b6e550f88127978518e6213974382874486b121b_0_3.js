function(error, player) {
    var currentPlayer = player;

    if(error) { // emit error to client
      callback({err: 'there was an error'}, undefined);
      return;
    }

    if(currentPlayer === null) { // no player by that fbid in db yet, create one
      currentPlayer = new Player({ fbid: data.fbid, time: 0 }).save();
    }

    socket.set('player', currentPlayer, function() {
      callback(undefined, currentPlayer);
    });
  }