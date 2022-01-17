function (aMessage) {
    var msg = aMessage.message;
    var re = /^\[.*Error:.*(chrome|resource):\/\/.*/i;
    if (msg.match(re)) {
      broker.fail(aMessage);
    }
  }