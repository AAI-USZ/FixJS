function(ticks, callback) {
  this.output.writeMessageBegin('waitTicks', Thrift.MessageType.CALL, this.seqid);
  var args = new BombahService_waitTicks_args();
  args.ticks = ticks;
  args.write(this.output);
  this.output.writeMessageEnd();
  return this.output.getTransport().flush(callback);
}