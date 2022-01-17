function(path, encoding_) {
  var encoding = typeof(encoding_) === 'string' ? encoding_ : null;
  var callback = arguments[arguments.length - 1];
  if (typeof(callback) !== 'function') callback = function() {};

  // first, stat the file, so we know the size.
  var size;
  var buffer; // single buffer with file data
  var buffers; // list for when size is unknown
  var pos = 0;
  var fd;

  fs.open(path, constants.O_RDONLY, 438 /*=0666*/, function(er, fd_) {
    if (er) return callback(er);
    fd = fd_;

    fs.fstat(fd, function(er, st) {
      if (er) return callback(er);
      size = st.size;
      if (size === 0) {
        // the kernel lies about many files.
        // Go ahead and try to read some bytes.
        buffers = [];
        return read();
      }

      buffer = new Buffer(size);
      read();
    });
  });

  function read() {
    if (size === 0) {
      buffer = new Buffer(8192);
      fs.read(fd, buffer, 0, 8192, pos, afterRead);
    } else {
      fs.read(fd, buffer, pos, size - pos, pos, afterRead);
    }
  }

  function afterRead(er, bytesRead) {
    if (er) {
      return fs.close(fd, function(er2) {
        return callback(er);
      });
    }

    pos += bytesRead;
    if (size !== 0) {
      if (pos === size) close();
      else read();
    } else {
      // unknown size, just read until we don't get bytes.
      if (bytesRead > 0) {
        buffers.push(buffer.slice(0, bytesRead));
        read();
      } else {
        close();
      }
    }
  }

  function close() {
    fs.close(fd, function(er) {
      if (size === 0) {
        // collected the data into the buffers list.
        buffer = Buffer.concat(buffer.length, pos);
      }

      if (encoding) buffer = buffer.toString(encoding);
      return callback(er, buffer);
    });
  }
}