function(path, encoding) {
  var fd = fs.openSync(path, constants.O_RDONLY, 438 /*=0666*/);
  var buffer = new Buffer(4048);
  var buffers = [];
  var nread = 0;
  var lastRead = 0;

  try {
    do {
      if (lastRead) {
        buffer._bytesRead = lastRead;
        nread += lastRead;
        buffers.push(buffer);
      }
      var buffer = new Buffer(4048);
      lastRead = fs.readSync(fd, buffer, 0, buffer.length, null);
    } while (lastRead > 0);
  } finally {
    fs.closeSync(fd);
  }

  if (buffers.length > 1) {
    var offset = 0;
    var i;
    buffer = new Buffer(nread);
    buffers.forEach(function(i) {
      if (!i._bytesRead) return;
      i.copy(buffer, offset, 0, i._bytesRead);
      offset += i._bytesRead;
    });
  } else if (buffers.length) {
    // buffers has exactly 1 (possibly zero length) buffer, so this should
    // be a shortcut
    buffer = buffers[0].slice(0, buffers[0]._bytesRead);
  } else {
    buffer = new Buffer(0);
  }

  if (encoding) buffer = buffer.toString(encoding);
  return buffer;
}