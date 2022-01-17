function(err){
    //todo tcp error reconnection
    callback(stream);
    stream.emit('error', err);
    stream.emit('tcp error', err);
  }