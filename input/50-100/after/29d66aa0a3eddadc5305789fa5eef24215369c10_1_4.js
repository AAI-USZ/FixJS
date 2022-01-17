function(gameId, ticks) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('waitTicks', Thrift.MessageType.CALL, this.seqid);
  var args = new BombahService_waitTicks_args();
  args.gameId = gameId;
  args.ticks = ticks;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
}