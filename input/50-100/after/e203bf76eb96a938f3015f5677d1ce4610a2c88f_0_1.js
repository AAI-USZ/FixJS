function () {
      socket.emit('welcome', name);
      socket.broadcast.emit('connected', {
        time: new Date().getTime(),
        user: name
      });
    }