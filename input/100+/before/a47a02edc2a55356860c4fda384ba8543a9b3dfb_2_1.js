function startListening(request, response){
    var connectObj = connect.createServer()
      .use(getBody)
      .use(function (req, res, next){ req.params = request.params; next(); })
      .use(readHttp);
    serverHttp[request.params.portNum] = connectObj.listen(request.params.portNum);
    socketOpen[request.params.portNum] = true;
    currentHttpPort = request.params.portNum;
    serverHttp[request.params.portNum].on('close', function() {
      browserSocket.emit('closedConnection', request.params.portNum, 'http');
      socketOpen[request.params.portNum] = false;
    });
    response.end();
  }