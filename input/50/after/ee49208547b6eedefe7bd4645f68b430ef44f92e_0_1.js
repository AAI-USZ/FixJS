function (aMessage) {
    var msg = aMessage.message;
    var re = /^\[.*Error:.*(chrome|resource):\/\/(jsbridge|mozmill).*/i;
    if (msg.match(re)) {
      dump(msg + "\n");
      broker.fail(aMessage);
    }
  }