function(err) {
  if (this.error) {
    return;
  }

  this.error = err;
  this.pause();
  this.emit('error', err);
}