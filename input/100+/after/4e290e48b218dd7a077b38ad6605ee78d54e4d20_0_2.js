function(path, data, encoding) {
  var fd = fs.openSync(path, 'w');
  if (!Buffer.isBuffer(data)) {
    data = new Buffer('' + data, encoding || 'utf8');
  }
  var written = 0;
  var length = data.length;
  try {
    while (written < length) {
      written += fs.writeSync(fd, data, written, length - written, written);
    }
  } finally {
    fs.closeSync(fd);
  }
}