function(callback) {
  if (callback === undefined) {
    this.send_getMapState();
    return this.recv_getMapState();
  } else {
    var postData = this.send_getMapState(true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getMapState);
  }
}