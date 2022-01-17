function(path, encoding_) {
  var encoding = typeof(encoding_) === 'string' ? encoding_ : null;
  var callback = arguments[arguments.length - 1];
  if (typeof(callback) !== 'function') callback = function() {};

  // first, stat the file, so we know the size.
  var size;
  var buffer;
  var pos = 0;
  var fd;

  fs.open(path, constants.O_RDONLY, 438 /*=0666*/, function(er, fd_) {
    if (er) return callback(er);
    fd = fd_;

    fs.fstat(fd, function(er, st) {
      if (er) return callback(er);
      size = st.size;
      if (size === 0) {
        buffer = new Buffer(0);
        return afterRead(null, 0);
      }

      buffer = new Buffer(size);
      read();
    });
  });

  function read() {
    fs.read(fd, buffer, pos, size - pos, pos, afterRead);
  }

  function afterRead(er, bytesRead) {
    if (er) {
      return fs.close(fd, function(er2) {
        return callback(er);
      });
    }

    pos += bytesRead;
    if (pos === size) close();
    else read();
  }

  function close() {
    fs.close(fd, function(er) {
      if (encoding) buffer = buffer.toString(encoding);
      return callback(er, buffer);
    });
  }
}