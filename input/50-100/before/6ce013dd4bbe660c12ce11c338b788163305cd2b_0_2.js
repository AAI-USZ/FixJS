function read() {
    fs.read(fd, buffer, pos, size - pos, pos, afterRead);
  }