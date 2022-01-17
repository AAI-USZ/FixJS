function () {
  this.stopped = true;
  send.call('shutdown');
}