function () {
    log.debug("Trying to reestablish the connection to the Cloudeo Streaming " +
                  "Server");

//    1. Define the result handler
    var succHandler = function () {
      log.debug("Connection successfully reestablished!");
      CDOT.postConnectHandler(CDOT.currentConnDescriptor);
    };

//    2. Define the failure handler
    var errHandler = function () {
      log.warn("Failed to reconnect. Will try again in 5 secs");
      CDOT.tryReconnect();
    };
//    3. Try to connect
    var connDescriptor = CDOT.genConnectionDescriptor();
    CDO.getService().connect(CDO.createResponder(succHandler, errHandler),
                             connDescriptor);
  }