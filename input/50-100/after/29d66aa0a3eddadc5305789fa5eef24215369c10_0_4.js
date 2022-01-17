function(gameId, ticks, callback) {
  if (callback === undefined) {
    this.send_waitTicks(gameId, ticks);
    return this.recv_waitTicks();
  } else {
    var postData = this.send_waitTicks(gameId, ticks, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_waitTicks);
  }
}