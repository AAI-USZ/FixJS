function(path, encoding) {
  var fd = fs.openSync(path, constants.O_RDONLY, 438 /*=0666*/);

  var size;
  var threw = true;
  try {
    size = fs.fstatSync(fd).size;
    threw = false;
  } finally {
    if (threw) fs.closeSync(fd);
  }

  if (size === 0) {
    fs.closeSync(fd);
    return encoding ? '' : new Buffer(0);
  }

  var buffer = new Buffer(size);
  var pos = 0;

  while (pos < size) {
    var threw = true;
    try {
      var bytesRead = fs.readSync(fd, buffer, pos, size - pos, pos);
      threw = false;
    } finally {
      if (threw) fs.closeSync(fd);
    }

    pos += bytesRead;
  }

  fs.closeSync(fd);

  if (encoding) buffer = buffer.toString(encoding);
  return buffer;
}