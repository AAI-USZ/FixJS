function(seqid, input, output) {
  var args = new BombahService_waitForStart_args();
  args.read(input);
  input.readMessageEnd();
  var result = new BombahService_waitForStart_result();
  this._handler.waitForStart(function (success) {
    result.success = success;
    output.writeMessageBegin("waitForStart", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}