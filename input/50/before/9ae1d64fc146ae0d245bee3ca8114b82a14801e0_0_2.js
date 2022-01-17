function () {
        socket.destroy();

        if (!req.isComplete) {
          req.emit('timeout', {});
        } else {
          res.emit('timeout', {});
        }
      }