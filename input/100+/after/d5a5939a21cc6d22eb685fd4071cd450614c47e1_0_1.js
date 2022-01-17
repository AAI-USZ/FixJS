function (data) {
    socket.set('fbid', data.fbid, function () {
      addPlayerToSocket(data.fbid, data.name, socket, function (err, player) {
        if(err) {
          socket.emit('error', { err: err.err });
        } else {
          sendInfoMail(player.name + " hat angefangen zu spielen", "Beste Zeit von " + player.name + " bisher: " + player.time);
          socket.broadcast.emit('player connected', { name: player.name  });
          socket.emit('ready');
        }
      });
    });
  }