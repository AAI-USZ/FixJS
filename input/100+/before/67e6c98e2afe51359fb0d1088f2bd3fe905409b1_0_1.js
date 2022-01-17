function(request, response) {
  var requestParams = url.parse(request.url, true),
    uri = requestParams.pathname,
    host = request.headers.host.split(":")[0] || "localhost";


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
    proxyReq.write(chunk);
  });

  request.on("end", function() {
    proxyReq.end();
  });
}