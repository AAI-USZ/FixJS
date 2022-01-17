function rx(message, remote, next) {
    var hash = digest(message.toString('binary', length));
    if (message.toString('binary', 0, length) !== hash) {
      return next(new Error('Hash does not match'), null);
    }
    next(null, message.slice(length));
  }