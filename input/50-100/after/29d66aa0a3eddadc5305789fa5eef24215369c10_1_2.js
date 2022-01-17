function(output) {
  output.writeStructBegin('BombahService_waitForStart_args');
  if (this.gameId) {
    output.writeFieldBegin('gameId', Thrift.Type.I32, 1);
    output.writeI32(this.gameId);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
}