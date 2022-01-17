function () {
  this.stopped = true;
  send.call(this, 'shutdown');
}