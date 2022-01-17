function startListening(request, response){
    var connectObj = connect.createServer()
      .use(getBody)
      .use(function (req, res, next){ req.params = request.params; next(); })
      .use(readHttp);
    if(serverHttp[request.params.portNum]){
      response.json({"error": 'That port is already in use!'});
      browserSocket.emit('httpData', {
          "headers": ''
        , "body": 'That port is already being used!'
        , "protocol": 'http'
      }, request.params.portNum);
      return;
    }
    serverHttp[request.params.portNum] = connectObj.listen(request.params.portNum,function(){
      response.json({"error": false});
      socketOpen[request.params.portNum] = true;
      currentHttpPort = request.params.portNum;
    });
    serverHttp[request.params.portNum].on('error', function(err) {
      browserSocket.emit('httpData', {
          "headers": ''
        , "body": 'That port is already being used!'
        , "protocol": 'http'
      }, request.params.portNum);
      if(err.code === 'EADDRINUSE'){
        response.json({"error": 'That port is already in use!'});
      }
      else{
        response.json({"error": err.code});
      }
    });
    serverHttp[request.params.portNum].on('close', function() {
      browserSocket.emit('closedConnection', request.params.portNum, 'http');
      socketOpen[request.params.portNum] = false;
      delete serverHttp[request.params.portNum];
    });
  }