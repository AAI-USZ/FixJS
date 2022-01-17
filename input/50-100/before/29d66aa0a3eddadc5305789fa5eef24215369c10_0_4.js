function(ticks, callback) {
  if (callback === undefined) {
    this.send_waitTicks(ticks);
    return this.recv_waitTicks();
  } else {
    var postData = this.send_waitTicks(ticks, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_waitTicks);
  }
}