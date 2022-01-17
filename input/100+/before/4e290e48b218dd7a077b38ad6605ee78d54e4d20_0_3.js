function(path, data, encoding) {
  var fd = fs.openSync(path, 'a');
  if (!Buffer.isBuffer(data)) {
    data = new Buffer('' + data, encoding || 'utf8');
  }
  var written = 0;
  var position = null;
  var length = data.length;

  while (written < length) {
    try {
      written += fs.writeSync(fd, data, written, length - written, position);
    } catch (e) {
      try {
        fs.closeSync(fd);
      } catch (e) {
        // swallow exception
      }
      throw e;
    }
    position += written;
  }
  fs.closeSync(fd);
}