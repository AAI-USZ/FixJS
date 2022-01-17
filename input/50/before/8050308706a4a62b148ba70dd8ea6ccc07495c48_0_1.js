function stream() {
    if (done) return;
    req.socket.removeListener('error', error);
    if (fn) self.on('finish', fn);
  }