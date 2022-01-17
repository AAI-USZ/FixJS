function onConnect() {
      req.emit('progress', {});

      socket.end(options.encodedBody);
      socket.on('drain', onRequestDrain);

      // same default timeout as http
      socket.setTimeout(options.timeout || 120 * 1000, function () {
        socket.destroy();

        if (!req.isComplete) {
          req.emit('timeout', {});
        } else {
          res.emit('timeout', {});
        }
      });
    }