function(message, expectedFields) {
    // keep track of the original start function.  When the start function is
    // called, call the proxy start function and then the original start
    // function.  This allows proxy start functions to be chained and multiple
    // expectedMessages to be called.
    start = function(origStart) {
      TestHelpers.testTriggered(message, expectedFields);
      start = origStart;
      start();
    }.bind(null, start);

    register(message);
  }