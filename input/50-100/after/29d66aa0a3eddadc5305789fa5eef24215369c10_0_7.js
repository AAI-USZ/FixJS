function(gameId, callback) {
  if (callback === undefined) {
    this.send_getMapState(gameId);
    return this.recv_getMapState();
  } else {
    var postData = this.send_getMapState(gameId, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getMapState);
  }
}