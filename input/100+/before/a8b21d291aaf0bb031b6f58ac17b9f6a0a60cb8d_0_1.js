function rx(message, remote, next) {
    var hash = crypto.createHash(method);
    hash.update(secret + message.toString('binary', 0, message.length - 20));
    hash = hash.digest('binary');
    if (message.toString('binary', message.length - 20) !== hash) {
      return next(new Error('Hash does not match'), null);
    }
    next(null, message.slice(0, message.length - 20));
  }