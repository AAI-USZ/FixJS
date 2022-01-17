function(path, options, fn){
  var self = this
    , req = self.req
    , next = this.req.next
    , options = options || {}
    , done;

  // support function as second arg
  if ('function' == typeof options) {
    fn = options;
    options = {};
  }

  // socket errors
  req.socket.on('error', error);

  // errors
  function error(err) {
    if (done) return;
    done = true;

    // clean up
    req.socket.removeListener('error', error);
    if (!self.headerSent) self.removeHeader('Content-Disposition');

    // callback available
    if (fn) return fn(err);

    // list in limbo if there's no callback
    if (self.headerSent) return;

    // delegate
    next(err);
  }

  // streaming
  function stream() {
    if (done) return;
    req.socket.removeListener('error', error);
    if (fn) self.on('finish', fn);
  }

  // transfer
  var file = send(req, path);
  if (options.root) file.root(options.root);
  file.maxage(options.maxAge || 0);
  file.on('error', error);
  file.on('directory', next);
  file.on('stream', stream);
  file.pipe(this);
}