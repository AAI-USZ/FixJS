function(output) {
  output.writeStructBegin('FlameState');
  if (this.coordinate) {
    output.writeFieldBegin('coordinate', Thrift.Type.STRUCT, 1);
    this.coordinate.write(output);
    output.writeFieldEnd();
  }
  if (this.ticksRemaining) {
    output.writeFieldBegin('ticksRemaining', Thrift.Type.I32, 2);
    output.writeI32(this.ticksRemaining);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
}