function (err, player) {
        if(err) {
          socket.emit('error', { err: err.err });
        } else {
          //socket.broadcast('player connected', { name: player.name  });
          socket.emit('ready');
        }
      }