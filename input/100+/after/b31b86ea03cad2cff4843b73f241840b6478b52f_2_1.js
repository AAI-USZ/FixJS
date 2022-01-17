function (stream) {
    var handler = new swh.Handler(executive);
    var parser = new swp.SwankParser(
      function onMessage (message) {
        handler.receive(message);
      });
    handler.on(
      "response", function (response) {
        var responseBuf = swp.buildMessage(response);
        console.log("response: %s", responseBuf.toString());
        stream.write(responseBuf);
      });
    stream.on(
      "data", function (data) {
        parser.execute(data);
      });
    stream.on(
      "end", function () {
        // FIXME: notify handler -> executive
        // TBD: destroy the handler
        handler.removeAllListeners("response");
      });
  }