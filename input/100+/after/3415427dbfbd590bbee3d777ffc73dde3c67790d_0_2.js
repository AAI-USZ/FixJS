function() {
  var self = this;

  if (!this._doneFlag) {
    this._doneFlag = true;

    if (this.ssl.timer) {
      clearTimeout(this.ssl.timer);
      this.ssl.timer = null;
    }

    this.ssl.error = null;
    this.ssl.close();
    this.ssl = null;

    self.encrypted.writable = self.encrypted.readable = false;
    self.cleartext.writable = self.cleartext.readable = false;

    process.nextTick(function() {
      self.cleartext.emit('end');
      self.encrypted.emit('close');
      self.cleartext.emit('close');
    });
  }
}