function tx(message, next) {
    try {
      var cipher = crypto.createCipher(algorithm, key);
      var msg = cipher.update(message.toString('binary'), 'binary', 'binary');
      msg += cipher.final('binary');
    } catch (err) {
      return next(err, null);
    }
    next(null, new Buffer(msg, 'binary'));
  }