function makeRequest(req, res, next, logger) {

    var url = req.url = utils.fixurlv2(req.url);
    // -------- decode req and do request -----------
    var req_option = req.encoder.decodeRequest(req);

    if(!req_option) return next();

    var scheme;
    if(req_option.isSecure) {
      scheme = https;
    } else {
      scheme = http;
    }

    var clientRequest = scheme.request(req_option, function(clientResponse) {
        logger.debug('clientResponse callback');
        req_option.encoder = req.encoder;
        req.plugins.handle(req_option, clientResponse, req, res, next, logger);
    });

    // setTimeout, config it, long pull
    if(options.timeout) {

      var timeoutTimer = setTimeout(function() {
          clientRequest.abort()
          var e = new Error("ETIMEDOUT")
          e.code = "ETIMEDOUT"
          clientRequest.emit("error", e)
      }, options.timeout)

      clientRequest.on('end', function() {
          clearTimeout(timeoutTimer);
      });

    }

    clientRequest.on('error', function(err) {
        next(err);
    });

    decodeRequestBodyTo(req, clientRequest);

  }