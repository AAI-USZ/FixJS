function readHttp (req, res){
    var data = ''
      ;
    data += req.method.toUpperCase() + ' ' + req.url + ' ' + 'HTTP/' + req.httpVersion + '\r\n';
    Object.keys(req.headers).forEach(function (key) {
      data += key + ': ' + req.headers[key] + '\r\n';
    });
    data += '\r\n';
    browserSocket.emit('httpData', {
        "headers": data
      , "body": req.rawBody
      , "protocol": 'http'
    }, req.params.portNum);
    if(isLoggingHttp[req.params.portNum]){
      if(includeHeaders) {
        httpBuffer += (data + req.rawBody + '\r\n\r\n');
      }
      else{
        httpBuffer += (req.rawBody + '\r\n\r\n');
      }
      browserSocket.emit('seperateFiles', 'http', req.params.portNum);
    }
    res.end('Hello from Connect!\n');
  }