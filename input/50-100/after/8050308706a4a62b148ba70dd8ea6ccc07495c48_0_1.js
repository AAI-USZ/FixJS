function error(err) {
    if (done) return;
    done = true;

    // clean up
    cleanup();
    if (!self.headerSent) self.removeHeader('Content-Disposition');

    // callback available
    if (fn) return fn(err);

    // list in limbo if there's no callback
    if (self.headerSent) return;

    // delegate
    next(err);
  }