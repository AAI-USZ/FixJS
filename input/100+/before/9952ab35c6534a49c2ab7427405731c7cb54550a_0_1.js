function (data) {
    socket.emit('test', { receivedData: data, mongooseErr: errOnMongoose });
    socket.set('fbid', data.fbid, function() {
      addPlayerToSocket(data.fbid, socket, function (err, player) {
        if(err) {
          socket.emit('error');
        } else {
          socket.emit('test', { msg: "done adding player to socket", err: err, player: player });
          socket.emit('ready');
        }
      });
    });
  }