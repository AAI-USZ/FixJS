function(e) {
    var msg = e.data;
    var json = JSON.parse(msg);
    var body = json.body;
    var replyAddress = json.replyAddress;
    var address = json.address;
    var replyHandler;
    if (replyAddress) {
      replyHandler = function(reply, replyHandler) {
        // Send back reply
        that.send(replyAddress, reply, replyHandler);
      };
    }
    var handlers = handlerMap[address];
    if (handlers) {
      // We make a copy since the handler might get unregistered from within the
      // handler itself, which would screw up our iteration
      var copy = handlers.slice(0);
      for (var i  = 0; i < copy.length; i++) {
        copy[i](body, replyHandler);
      }
    } else {
      // Might be a reply message
      var handler = replyHandlers[address];
      if (handler) {
        delete replyHandlers[address];
        handler(body, replyHandler);
      }
    }
  }