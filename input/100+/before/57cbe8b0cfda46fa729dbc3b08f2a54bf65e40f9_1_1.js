function retrieve(url, callback) {
    callback = callback || emptyCallback;

    var parsedUrl = urlParser.parse(url, true), request, result = "";

    if(parsedUrl.protocol == "https:" && !parsedUrl.port) {
      parsedUrl.port = 443;
    }

    if(parsedUrl.query === undefined) {
      parsedUrl.query = {};
    }
    var path = parsedUrl.pathname + "?" + qs.stringify(parsedUrl.query);
    logger.debug("Requesting: " + path);
    request = https.request({
      "host" : parsedUrl.hostname,
      "port" : parsedUrl.port,
      "path" : path,
      "method" : "GET",
      "headers" : {
        "Content-Length": 0
      }
    }, function(res) {
      res.on("data", function(chunk) {
        result += chunk;
      });
      res.on("end", function() {
        callback(null, res.statusCode, result);
      });
    });
    request.on("error", function(error) {
      logger.error("Error calling remote host: " + error.message);
      callback(error);
    });

    request.end();
  }