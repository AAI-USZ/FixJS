function onRequestError(err) {
      req.isComplete = true;
      req.emit('error', err);
      socket.destroy();
    }