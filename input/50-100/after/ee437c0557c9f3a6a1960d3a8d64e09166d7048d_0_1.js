function end(chunk, cb) {
  if (this._hadError) return true;

  var self = this;
  this._ending = true;
  var ret = this.write(chunk, function() {
    self.emit('end');
    if (cb) cb();
  });
  this._ended = true;
  return ret;
}