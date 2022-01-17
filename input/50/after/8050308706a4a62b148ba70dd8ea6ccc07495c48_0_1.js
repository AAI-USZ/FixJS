function stream() {
    if (done) return;
    cleanup();
    if (fn) self.on('finish', fn);
  }