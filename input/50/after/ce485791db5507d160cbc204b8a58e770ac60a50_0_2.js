function() {
  this.input.resume();
  if (this.enabled) {
    tty.setRawMode(true);
  }
  this.paused = false;
  this.emit('resume');
}