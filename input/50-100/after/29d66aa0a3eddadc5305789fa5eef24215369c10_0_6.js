function(gameId, callback) {
  if (callback === undefined) {
    this.send_getGameInfo(gameId);
    return this.recv_getGameInfo();
  } else {
    var postData = this.send_getGameInfo(gameId, true);
    return this.output.getTransport()
      .jqRequest(this, postData, arguments, this.recv_getGameInfo);
  }
}