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