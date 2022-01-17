function() {
  if (this.paused) return;
  if (this.enabled) {
    tty.setRawMode(false);
  }
  this.input.pause();
  this.paused = true;
  this.emit('pause');
}