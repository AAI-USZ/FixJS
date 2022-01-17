function(cb) {
  var self = this;

  if (!this.readable) return;
  this.readable = false;

  function close() {
    fs.close(self.fd, function(err) {
      if (err) {
        if (cb) cb(err);
        self.emit('error', err);
        return;
      }

      if (cb) cb(null);
      self.emit('close');
    });
  }

  if (this.fd === null) {
    this.addListener('open', close);
  } else {
    close();
  }
}