function(path, data, encoding) {
  var fd = fs.openSync(path, 'a');
  if (!Buffer.isBuffer(data)) {
    data = new Buffer('' + data, encoding || 'utf8');
  }
  var written = 0;
  var position = null;
  var length = data.length;

  try {
    while (written < length) {
      written += fs.writeSync(fd, data, written, length - written, position);
      position += written; // XXX not safe with multiple concurrent writers?
    }
  } finally {
    fs.closeSync(fd);
  }
}