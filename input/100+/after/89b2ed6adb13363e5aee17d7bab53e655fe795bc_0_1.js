function proxy_to_deejay(request, response) {
  var path = request_path(request);
  request.headers['x-forwarded-for'] = request.headers['x-forwarded-for'] || request.connection.remoteAddress;
  var deejay_request = http.request({
    host: process.env.DEEJAY_HOST,
    path: path,
    port: parseInt(process.env.DEEJAY_PORT),
    method: request.method,
    headers: request.headers,
    agent: false });

  deejay_request.on('response', function(deejay_response) {
    var status_code = deejay_response.statusCode
    var recordable = (!deejay_response.headers['content-encoding'])
    var response_body = ""
    deejay_response.on('data', function(chunk) {
      response.write(chunk, 'binary');
      if (recordable) { response_body += chunk.toString('utf8'); }
    });
    deejay_response.on('end', function() {
      response.end();
      console.log("Successfully proxied " + request.headers['host'] + path);
    });
    response.writeHead(deejay_response.statusCode, deejay_response.headers);
  });
  request.on('data', function(chunk) {
    deejay_request.write(chunk, 'binary');
  });
  request.on('end', function() {
    deejay_request.end();
  });
  request.on('close', function() {
    console.log("Connection terminated before expected");
  });
  buffer.replay(request);
}