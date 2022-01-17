function() {
      browserSocket.emit('closedConnection', request.params.portNum, 'http');
      socketOpen = false;
    }