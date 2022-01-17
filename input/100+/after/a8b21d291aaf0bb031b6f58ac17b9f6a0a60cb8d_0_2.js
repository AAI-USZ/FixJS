function hashMiddleware(opt_options) {
  opt_options = opt_options || {};
  var secret = opt_options.secret || '9ve2cND;d3"Vs';
  var algorithm = opt_options.algorithm || 'sha1';

  function digest(data) {
    var hash = crypto.createHash(algorithm);
    hash.update(secret + data);
    return hash.digest('binary');
  }

  var length = digest('').length;

  function tx(message, next) {
    var hash = digest(message.toString('binary'));
    var buf = new Buffer(message.length + length);
    buf.write(hash, 0, length, 'binary');
    message.copy(buf, length, 0);
    next(null, buf);
  }

  function rx(message, remote, next) {
    var hash = digest(message.toString('binary', length));
    if (message.toString('binary', 0, length) !== hash) {
      return next(new Error('Hash does not match'), null);
    }
    next(null, message.slice(length));
  }

  return {name: 'hash', tx: tx, rx: rx};
}