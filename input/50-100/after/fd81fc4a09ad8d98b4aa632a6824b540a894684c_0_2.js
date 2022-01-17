function rx(message, remote, next) {
    try {
      var decipher = crypto.createDecipher(algorithm, key);
      var msg = decipher.update(message.toString('binary'), 'binary', 'binary');
      msg += decipher.final('binary');
    } catch (err) {
      return next(err, null);
    }
    next(null, new Buffer(msg, 'binary'));
  }