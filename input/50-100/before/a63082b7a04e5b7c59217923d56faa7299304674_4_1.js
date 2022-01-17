function startListening(request, response){
    var connectObj = connect.createServer()
      .use(getBody)
      .use(readHttp);
    serverHttp = connectObj.listen(request.params.portNum);
    socketOpen = true;
    currentHttpPort = request.params.portNum;
    serverHttp.on('close', function() {
      browserSocket.emit('closedConnection', request.params.portNum, 'http');
      socketOpen = false;
    });
    response.end();
  }