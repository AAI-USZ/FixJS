function rx(message, remote, next) {
    var decipher = crypto.createDecipher(algorithm, key);
    var msg = decipher.update(message.toString('binary'), 'binary', 'binary');
    msg += decipher.final('binary');
    next(null, new Buffer(msg, 'binary'));
  }