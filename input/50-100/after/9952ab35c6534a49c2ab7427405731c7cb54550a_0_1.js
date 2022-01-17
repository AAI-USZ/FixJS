function (err, player) {
        if(err) {
          socket.emit('error');
        } else {
          socket.emit('ready');
        }
      }