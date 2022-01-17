function hashMiddleware(opt_options) {
  opt_options = opt_options || {};
  var secret = opt_options.secret || '9ve2cND;d3"Vs';
  var method = 'sha1';

  function tx(message, next) {
    var hash = crypto.createHash(method);
    hash.update(secret + message.toString('binary'));
    hash = hash.digest('binary');
    var buf = new Buffer(message.length + hash.length);
    message.copy(buf, 0, 0);
    buf.write(hash, message.length, hash.length, 'binary');
    next(null, buf);
  }

  function rx(message, remote, next) {
    var hash = crypto.createHash(method);
    hash.update(secret + message.toString('binary', 0, message.length - 20));
    hash = hash.digest('binary');
    if (message.toString('binary', message.length - 20) !== hash) {
      return next(new Error('Hash does not match'), null);
    }
    next(null, message.slice(0, message.length - 20));
  }

  return {name: 'hash', tx: tx, rx: rx};
}