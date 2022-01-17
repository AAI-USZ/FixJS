function() {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getMapState', Thrift.MessageType.CALL, this.seqid);
  var args = new BombahService_getMapState_args();
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
}