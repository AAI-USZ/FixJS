function(seqid, input, output) {
  var args = new BombahService_getGameInfo_args();
  args.read(input);
  input.readMessageEnd();
  var result = new BombahService_getGameInfo_result();
  this._handler.getGameInfo(args.gameId, function (success) {
    result.success = success;
    output.writeMessageBegin("getGameInfo", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}