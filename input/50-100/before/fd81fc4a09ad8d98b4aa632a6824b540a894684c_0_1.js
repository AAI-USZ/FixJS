function tx(message, next) {
    var cipher = crypto.createCipher(algorithm, key);
    var msg = cipher.update(message.toString('binary'), 'binary', 'binary');
    msg += cipher.final('binary');
    next(null, new Buffer(msg, 'binary'));
  }