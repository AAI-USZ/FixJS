function(gameId) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('waitForStart', Thrift.MessageType.CALL, this.seqid);
  var args = new BombahService_waitForStart_args();
  args.gameId = gameId;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
}