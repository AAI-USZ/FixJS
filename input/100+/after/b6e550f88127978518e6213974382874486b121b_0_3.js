function(error, player) {
    var currentPlayer = player;
    socket.emit('test', { msg: "in findOne callback", error: error, player: player });

    if(error) { // emit error to client
      callback({err: 'there was an error'}, undefined);
      return;
    }

    if(currentPlayer === null) { // no player by that fbid in db yet, create one
      socket.emit('test', { msg: "currentPlayer was created and hopefully saved before", currentPlayer: currentPlayer });

      currentPlayer = new Player({ fbid: fbid, time: 0 }).save(function (err) {
        console.log("errror while saving player");
        socket.emit('test', { msg: "error while saving player to db", error: err });
      });

      socket.emit('test', { msg: "currentPlayer was created and hopefully saved after", currentPlayer: currentPlayer });
    }

    socket.set('player', currentPlayer, function() {
      callback(undefined, currentPlayer);
    });
  }