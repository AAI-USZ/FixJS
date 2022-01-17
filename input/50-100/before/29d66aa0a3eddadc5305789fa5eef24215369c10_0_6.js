function(callback) {
  if (callback === undefined) {
    this.send_waitForStart();
    this.recv_waitForStart();
  } else {
    var postData = this.send_waitForStart(true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_waitForStart);
  }
}