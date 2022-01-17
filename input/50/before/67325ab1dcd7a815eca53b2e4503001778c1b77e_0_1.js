function (err, result) {
    if(err) {
      socket.emit('error', { err: err.err });
    } else {
      socket.emit('init', { result: result});
    }
  }