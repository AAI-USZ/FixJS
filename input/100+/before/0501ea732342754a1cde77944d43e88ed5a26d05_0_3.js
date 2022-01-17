function(request, response) {
  var requestParams = url.parse(request.url, true),
    uri = requestParams.pathname,
    host = request.headers.host.split(":")[0] || "localhost",
    uriComponents = uri.split("/"),
    params = "";

  log.silly("Proxying act request");
  log.silly(uri, "url");
  log.silly(uriComponents[uriComponents.length - 2], "act");

  var proxyReq = https.request({
    path: uri,
    method: request.method,
    host: this.domain,
    headers: request.headers
  }, function(proxyRes) {
    response.writeHead(proxyRes.statusCode, proxyRes.headers);

    proxyRes.on("data", function(chunk) {
      response.write(chunk);
    });
    proxyRes.on("end", function() {
      response.end();
    });
  });

  request.on("data", function(chunk) {
    params += chunk.toString();
    proxyReq.write(chunk);
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