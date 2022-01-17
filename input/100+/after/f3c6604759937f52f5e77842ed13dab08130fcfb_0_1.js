function (error, player) {
    var currentPlayer = player;

    if(error) { // emit error to client
      callback({err: 'there was an error for Player.findOne()'}, undefined);
      return;
    }

    if(currentPlayer === null) { // no player by that fbid in db yet, create one
      currentPlayer = new Player({ fbid: fbid, name: name, time: 0 }).save(function (err) {
        callback({err: 'there was an error for new Player().save()'}, undefined);
      });
    }

    socket.set('player', currentPlayer, function () {
      callback(undefined, currentPlayer);
    });
  }