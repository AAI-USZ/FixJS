function onConnect() {
      req.emit('progress', {});

      socket.end(options.encodedBody);
      socket.on('drain', onRequestDrain);
    }