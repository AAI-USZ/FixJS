function(gameId, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_debugResetGame(gameId);
}