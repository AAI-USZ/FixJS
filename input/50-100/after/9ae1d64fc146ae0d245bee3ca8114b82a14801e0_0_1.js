function onRequestDrain() {
      socket.removeListener('error', onRequestError);
      socket.on('error', onResponseError);
      req.isComplete = true;
      req.emit('load', {});
    }