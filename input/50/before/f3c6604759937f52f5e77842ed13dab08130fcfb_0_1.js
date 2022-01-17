function (err, player) {
        if(err) {
          socket.emit('error');
        } else {
          //socket.broadcast('player connected', { name: player.name  });
          socket.emit('ready');
        }
      }