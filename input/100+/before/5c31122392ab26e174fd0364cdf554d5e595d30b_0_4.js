function(request, response) {
  var requestParams = url.parse(request.url, true),
    uri = requestParams.pathname,
    uriComponents = uri.split("/"),
    act = uriComponents[uriComponents.length - 2],
    params = "";

  log.silly("Proxying act request");
  log.silly(uri, "url");
  log.silly(act, "act");

  //delete request.headers.host;

  var opts = {
    path: uri,
    method: request.method,
    host: this.target
    //headers: this.headers
  };

  var proxyReq = https.request(opts, function(proxyRes) {
    response.writeHead(proxyRes.statusCode, proxyRes.headers);

    proxyRes.on("data", function(chunk) {
      response.write(chunk.toString());
    });
    proxyRes.on("end", function() {
      response.end();
    });
  });

  request.on("data", function(chunk) {
    params += chunk.toString();
    proxyReq.write(chunk.toString());
  });

  request.on("end", function() {
    var parsedParams;
    try {
      parsedParams = JSON.parse(params);
      log.silly(parsedParams,"params");
    }
    catch(e) {
      log.silly(params,"params");
    }
    proxyReq.end();
  });

}