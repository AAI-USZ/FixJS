function read() {
    if (size === 0) {
      buffer = new Buffer(8192);
      fs.read(fd, buffer, 0, 8192, pos, afterRead);
    } else {
      fs.read(fd, buffer, pos, size - pos, pos, afterRead);
    }
  }