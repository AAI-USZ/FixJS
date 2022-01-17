function(gameId, callback) {
  this.output.writeMessageBegin('getMapState', Thrift.MessageType.CALL, this.seqid);
  var args = new BombahService_getMapState_args();
  args.gameId = gameId;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
}