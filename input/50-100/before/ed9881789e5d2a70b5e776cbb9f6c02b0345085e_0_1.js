function (err, result) {
    if(err) {
      socket.emit('error', { err: err.err });
    } else {
      socket.emit('debug', { result_length: result.length(), result: result });
      socket.emit('init', { result: result});
    }
  }