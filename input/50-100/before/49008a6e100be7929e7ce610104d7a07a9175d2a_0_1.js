function (reason, desc) {
  if ('closed' != this.readyState) {
    debug('socket close with reason: "%s"', reason);
    this.readyState = 'closed';
    this.emit('close', reason, desc);
    this.onclose && this.onclose.call(this);
  }
}