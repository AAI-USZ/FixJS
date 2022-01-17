function startListening (request, response) {
    serverUdp = dgram.createSocket('udp4');
    serverUdp.on("message", function (msg, rinfo) {
      var message = msg.toString('utf8'); //+ rinfo.address + ":" + rinfo.port;
      if(isLoggingUdp){
        udpBuffer += message + '\r\n\r\n';
        browserSocket.emit('seperateFiles', 'udp');
      }
      browserSocket.emit('udpData', {"body": message});
    });
    serverUdp.on("listening", function () {
      var address = serverUdp.address();
      socketOpen = true;
    });
    serverUdp.on("close", function () {
      browserSocket.emit('closedConnection', request.params.portNum, 'udp');
      socketOpen = false;
    });
    serverUdp.on("error", function (e) {
      console.log("UDP error: " + e);
    });
    serverUdp.bind(request.params.portNum);
    currentUdpPort = request.params.portNum;
    response.end();
  }