function() {
      browserSocket.emit('closedConnection', request.params.portNum, 'http');
      socketOpen[request.params.portNum] = false;
      delete serverHttp[request.params.portNum];
    }