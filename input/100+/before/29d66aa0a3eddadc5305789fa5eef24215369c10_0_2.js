function(output) {
  output.writeStructBegin('BombahService_waitTicks_args');
  if (this.ticks) {
    output.writeFieldBegin('ticks', Thrift.Type.I32, 1);
    output.writeI32(this.ticks);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
}