function(message) {
      var broadcast, key, value;
      message.id = socket.id;
      broadcast = {};
      if (buffer[socket.id]) {
        for (key in message) {
          value = message[key];
          if ((value != null) && (typeof value !== 'string' || value.length < 8096)) {
            buffer[socket.id][key] = value;
            if (key === 'x' || key === 'y') {
              buffer[socket.id].dx = 0;
              buffer[socket.id].dy = 0;
            }
            broadcast[key] = value;
          }
        }
      } else {
        buffer[socket.id] = message;
      }
      return socket.broadcast.emit('player', broadcast);
    }