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